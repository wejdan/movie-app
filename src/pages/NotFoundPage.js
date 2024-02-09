import React from "react";
import Container from "../components/UI/Container";
import { NavLink } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
      <span className="text-6xl">🧭</span>
      <h1 className="text-4xl font-bold my-6">Oops!</h1>
      <p className="text-xl mb-2">
        We can't seem to find the page you're looking for.
      </p>
      <p className="text-md">Error code: 404</p>
      <NavLink to="/" className="mt-6 text-indigo-600 hover:underline">
        Go back home
      </NavLink>
    </div>
  );
}

export default NotFoundPage;
