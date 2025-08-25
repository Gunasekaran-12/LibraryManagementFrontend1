import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/"); // Redirect to home after signup
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-purple-700 mb-6">Sign Up</h2>
        <input type="text" placeholder="Full Name" className="w-full px-4 py-2 border rounded-lg mb-4" required />
        <input type="email" placeholder="Email" className="w-full px-4 py-2 border rounded-lg mb-4" required />
        <input type="password" placeholder="Password" className="w-full px-4 py-2 border rounded-lg mb-4" required />
        <button type="submit" className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
          Sign Up
        </button>
      </form>
    </div>
  );
}
