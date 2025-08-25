import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./component/Home.jsx";
import Profile from './component/Profile.jsx';

import { Books } from "./component/Books.js";
import Borrowers from "./component/Borrowers.js";
import BorrowRecords from "./component/BorrowRecords.js";

import Books2 from "./component/Books2.jsx";
import Borrowers2 from "./component/Borrowers2.jsx";
import BorrowRecords2 from "./component/BorrowRecords.jsx";

import Librarians from "./component/Librarians.js";
import Users from "./component/Users.jsx";
import Login from "./component/Login.jsx";
import Register from "./component/Register.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

import Header from "./component/Header.jsx";
import Footer from "./component/Footer.jsx";

import AddBook from "./Operations/AddBook.jsx";
import AddBorrower from "./Operations/AddBorrower.jsx";
import IssueBook from "./Operations/IssueBook.jsx";
import ReturnBook from "./Operations/ReturnBook.jsx";

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes */}
      <Route path="/home" element={<ProtectedRoute><Header /><Home /><Footer /></ProtectedRoute>} />
      <Route path="/profile" element={<Profile />} />

      <Route path="/books" element={<ProtectedRoute><Header /><Books /><Footer /></ProtectedRoute>} />
      <Route path="/borrowers" element={<ProtectedRoute><Header /><Borrowers /><Footer /></ProtectedRoute>} />
      <Route path="/borrow-records" element={<ProtectedRoute><Header /><BorrowRecords /><Footer /></ProtectedRoute>} />

      <Route path="/books2" element={<ProtectedRoute><Header /><Books2 /><Footer /></ProtectedRoute>} />
      <Route path="/borrowers2" element={<ProtectedRoute><Header /><Borrowers2 /><Footer /></ProtectedRoute>} />
      <Route path="/borrow-records2" element={<ProtectedRoute><Header /><BorrowRecords2 /><Footer /></ProtectedRoute>} />

      <Route path="/librarians" element={<ProtectedRoute><Header /><Librarians /><Footer /></ProtectedRoute>} />
      <Route path="/users" element={<ProtectedRoute><Header /><Users /><Footer /></ProtectedRoute>} />

      {/* Library operation routes */}
      <Route path="/add-book" element={<ProtectedRoute><Header /><AddBook /><Footer /></ProtectedRoute>} />
      <Route path="/add-borrower" element={<ProtectedRoute><Header /><AddBorrower /><Footer /></ProtectedRoute>} />
      <Route path="/issue-book" element={<ProtectedRoute><Header /><IssueBook /><Footer /></ProtectedRoute>} />
      <Route path="/return-book" element={<ProtectedRoute><Header /><ReturnBook /><Footer /></ProtectedRoute>} />

      {/* Default / catch-all */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
