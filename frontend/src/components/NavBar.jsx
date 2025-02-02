import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function NavBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin"); // Redirect to sign-in page
  };

  return (
    <div className="flex justify-between mt-1 items-center h-16 px-5 shadow-sm">
      <div className="cursor-pointer" onClick={()=>{
        navigate("/")
      }}>Travel Planner</div>

      {!token && (
        <div>
          <button
            className="bg-black text-white rounded-l border-2 border-transparent p-2 text-sm cursor-pointer"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Signin
          </button>
        </div>
      )}

      {token && (
        <div className="flex gap-4">
          <button
            className="rounded-3xl border-1 border-gray-200 p-2 text-sm cursor-pointer"
            onClick={() => {
              navigate("/create");
            }}
          >
            + Create Trip
          </button>
          <button
            className="rounded-3xl border-1 border-gray-200 p-2 text-sm cursor-pointer"
            onClick={() => {
              navigate("/trips");
            }}
          >
            My Trips
          </button>

          {/* Avatar and dropdown menu */}
          <div
            className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 cursor-pointer"
            onClick={() => setDropdownVisible(!dropdownVisible)}
          >
            <svg
              className="absolute w-12 h-12 text-gray-400 -left-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>

          {/* Dropdown menu for logout */}
          {dropdownVisible && (
            <div className="absolute right-0 mt-12 w-48 bg-white border rounded-lg shadow-lg p-2">
              <button
                onClick={handleLogout}
                className="w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-200 rounded"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
