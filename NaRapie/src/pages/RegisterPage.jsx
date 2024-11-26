import RegisterForm from "../components/auth/RegisterForm";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-900">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-black p-6 shadow-lg shadow-red-900/50 border border-red-900">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-red-600">
            Create an Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-300">
            Or{' '}
            <Link to="/login" className="text-red-600 hover:text-red-500">
              sign in to your account
            </Link>
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage; 