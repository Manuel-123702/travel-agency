import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center py-20 px-6">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="font-heading font-bold text-3xl text-white mb-2">
            Create Your Account
          </h1>
          <p className="text-white/60">
            Sign up to start your immigration journey and track your case online.
          </p>
        </div>
        <SignUp />
      </div>
    </div>
  );
}
