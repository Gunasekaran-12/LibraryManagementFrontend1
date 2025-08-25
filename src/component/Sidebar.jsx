// src/components/Sidebar.jsx
import { Link } from 'react-router-dom';
import { FaBook, FaUsers, FaClipboardList, FaPlus } from 'react-icons/fa';

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Library Dashboard</h2>
      <nav>
        <ul>
          <li className="mb-4">
            <Link to="/books" className="flex items-center space-x-2 text-lg hover:text-yellow-400">
              <FaBook />
              <span>Books</span>
            </Link>
            <ul className="ml-6 mt-2 space-y-2">
              <li>
                <Link to="/books" className="text-sm hover:text-yellow-400">Books List</Link>
              </li>
              <li>
                <Link to="/add-book" className="text-sm hover:text-yellow-400">Add Book</Link>
              </li>
              <li>
                <Link to="/issue-book" className="text-sm hover:text-yellow-400">Issue Book</Link>
              </li>
            </ul>
          </li>
          <li className="mb-4">
            <Link to="/borrowers" className="flex items-center space-x-2 text-lg hover:text-yellow-400">
              <FaUsers />
              <span>Borrowers</span>
            </Link>
            <ul className="ml-6 mt-2 space-y-2">
              <li>
                <Link to="/borrowers" className="text-sm hover:text-yellow-400">Borrowers List</Link>
              </li>
              <li>
                <Link to="/add-borrower" className="text-sm hover:text-yellow-400">Add Borrower</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/borrow-records" className="flex items-center space-x-2 text-lg hover:text-yellow-400">
              <FaClipboardList />
              <span>Borrow Records</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
