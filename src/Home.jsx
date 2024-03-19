/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-image2">
      <div className="mb-8">
        <h1 className="text-white font-bold text-6xl text-center judul"><i className="fa-solid fa-mosque"></i> 
         {""} Ritual Ramadhan List {""} <i className="fa-solid fa-mosque"></i>
        </h1>
        <p className="text-white text-xl text-center">
          Temukan kenyamanan merencanakan ibadah kamu dengan mudah
        </p>
      </div>
      <Link
        to={`/ritual-app`}
        className="bg-gray-500 hover:bg-gray-800 text-white font-semiboldbold py-2 px-4 rounded bg-opacity-50"
      >
        Klik Disini
      </Link>
    </div>
  );
}
