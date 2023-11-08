import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "scrollreveal";

export default function BrandsList({ cat }) {
  const sr = ScrollReveal();
  useEffect(() => {
    sr.reveal(".scroll", {
      origin: "bottom",
      distance: "20px",
      duration: 1000,
      delay: 200,
      scale: 1,
    });
  }, []);
  console.log(cat._id);
  return (
    <div className="scroll m-4 flex flex-col items-center justify-center pt-1">
    <Link to={`/model/${cat._id}`}>
      <div className="relative bg-white p-4 m-2 shadow-xl rounded-lg w-34 sm:w-42 hover:scale-105 group">
        <img
          src={cat.image}
          alt={cat.name}
          className="w-full h-full object-contain"
        />
         <div className="hidden absolute inset-0 flex items-center justify-center bg-black bg-opacity-10 text-white group-hover:flex opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
              <span className="text-2xl font-bold">Shop {cat.name}</span>
            </div>
      </div>
    </Link>
  </div>
  );
}
