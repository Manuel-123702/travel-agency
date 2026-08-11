import { db } from "./db";
import { sendEmail } from "./resend";

export async function notifyUserById(
  userId: string,
  title: string,
  message: string,
  options?: { sendEmail?: boolean; emailSubject?: string; emailBody?: string }
) {
  // create in-app notification
  await db.notification.create({
    data: { userId, title, message, type: "INFO" },
  });

  if (options?.sendEmail) {
    const user = await db.user.findUnique({ where: { id: userId } });
    if (user?.email) {
      try {
        await sendEmail({
          to: user.email,
          subject: options.emailSubject || title,
          html: options.emailBody || `<p>${message}</p>`,
        });
      } catch (err) {
        console.error("Failed to send notification email", err);
      }
    }
  }
}
