import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center py-20 px-6">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="font-heading font-bold text-3xl text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-white/60">
            Sign in to access your client dashboard and track your immigration case.
          </p>
        </div>
        <SignIn />
      </div>
    </div>
  );
}
