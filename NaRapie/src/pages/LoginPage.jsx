import LoginForm from "../components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-900">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-black p-6 shadow-lg shadow-red-900/50 border border-red-900">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-red-600">
            Sign in to NaRapie
          </h2>
          <p className="mt-2 text-center text-sm text-gray-300">
            Your source for rap culture
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
