import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getStripe, PACKAGES, PackageKey } from "@/lib/stripe";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { userId: clerkId } = await auth();

    if (!clerkId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const clerkUser = await currentUser();

    let prismaUser;
    try {
      prismaUser = await db.user.findUnique({
        where: {
          clerkId,
        },
      });
    } catch (dbError) {
      console.error("Database connection error:", dbError);
      return NextResponse.json(
        {
          error: "Database connection failed. Please try again later.",
          details: "Unable to connect to the database server.",
        },
        {
          status: 503,
        }
      );
    }

    if (!prismaUser) {
      return NextResponse.json(
        {
          error: "User not found. Please complete your profile first.",
        },
        {
          status: 404,
        }
      );
    }

    const { packageKey } = await req.json();

    if (
      !packageKey ||
      !(packageKey in PACKAGES)
    ) {
      return NextResponse.json(
        {
          error: "Invalid package.",
        },
        {
          status: 400,
        }
      );
    }

    const pkg = PACKAGES[packageKey as PackageKey];

    const stripe = getStripe();

    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL ??
      "http://localhost:3000";

    const email =
      clerkUser?.emailAddresses?.[0]?.emailAddress ??
      prismaUser.email;

    // Find the latest application
    const application = await db.application.findFirst({
      where: {
        userId: prismaUser.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!application) {
      return NextResponse.json(
        {
          error: "Please create an application first.",
        },
        {
          status: 400,
        }
      );
    }

    const session =
      await stripe.checkout.sessions.create({
        mode: "payment",

        payment_method_types: ["card"],

        customer_email: email,

        line_items: [
          {
            quantity: 1,

            price_data: {
              currency: pkg.currency,

              unit_amount: pkg.price * 100,

              product_data: {
                name: pkg.name,
                description: getDescription(
                  packageKey as PackageKey
                ),
              },
            },
          },
        ],

        metadata: {
          userId: clerkId,
          prismaUserId: prismaUser.id,
          applicationId: application.id,
          packageKey,
          packageName: pkg.name,
        },

        success_url:
          `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,

        cancel_url:
          `${appUrl}/pricing?cancelled=true`,

        allow_promotion_codes: true,
      });

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    console.error("Checkout error:", error);

    return NextResponse.json(
      {
        error: "Unable to create checkout session.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}

function getDescription(key: PackageKey) {
  switch (key) {
    case "starter":
      return "Starter Immigration Package";

    case "premium":
      return "Premium Immigration Package";

    case "vip":
      return "VIP Immigration Package";

    default:
      return "";
  }
}