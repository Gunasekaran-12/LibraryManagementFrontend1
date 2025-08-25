import { Link } from "react-router-dom";
import Borrowers from "./Borrowers";

export default function LandingPage() {
  return (
    <main className="bg-gray-50 min-h-screen flex flex-col items-center justify-center text-center p-8">
      <h2 className="text-4xl font-bold mb-6 text-purple-700">Welcome to Bookish Hub 📚</h2>
      <p className="text-lg text-gray-600 mb-6">
        Manage books, borrowers, and records seamlessly in one place.
      </p>
      <Link
        to="/books"
        className="px-6 py-3 rounded-xl bg-purple-600 text-white text-lg hover:bg-purple-700 shadow-lg"
      >
        Explore Books
      </Link>

      {/* Show Borrowers List on Home */}
      <div className="mt-12 w-full max-w-3xl">
        <Borrowers />
      </div>
    </main>
  );
}
