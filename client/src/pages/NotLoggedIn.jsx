import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuthContext } from "../context/user";

function NotLoggedIn() {
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
      <h1 className="text-3xl font-extrabold text-white tracking-widest capitalize">
        you are not logged in
      </h1>

      <Link to={"/login"} className="mt-5">
        <div className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring">
          <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0" />
          <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
            GO TO LOGIN
          </span>
        </div>
      </Link>
    </main>
  );
}

export default NotLoggedIn;
