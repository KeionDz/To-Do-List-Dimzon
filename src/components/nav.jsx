import React from "react";
import { Link } from "react-router-dom";
  import AddTodo from "../pages/AddTodo";
  const Nav = () => {
    return (
      <nav className="flex flex-row justify-between items-center  p-4 bg-gray-800 text-white shadow-lg">
       <h1 className="text-2xl font-semibold text-gray-300 hover:text-cyan-400 transition">
        <Link to={"/"}>My Notes</Link>
      </h1>
      <ul className="flex flex-row gap-x-6">
        <li>
          <Link to={"/"} className="text-lg text-gray-400 hover:text-cyan-400 transition">
            Home
          </Link>
        </li>
      </ul>
      </nav>
    );
  };
  
  export default Nav;