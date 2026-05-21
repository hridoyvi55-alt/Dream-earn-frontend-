import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="container p-8">
      <div className="card p-6">
        <h1 className="text-2xl font-bold">Login</h1>
        <p className="text-[#9ca3af] mt-2">Page will be upgraded later.</p>
        <Link to="/signup" className="text-[#06b6d4] mt-4 inline-block">Go to Signup</Link>
      </div>
    </div>
  );
}
