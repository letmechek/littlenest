import React from 'react';


export default function BrandsList({ cat, setActiveCat }) {
  return (
    <div
      // onClick={() => setActiveCat(cat)}
      className="m-4 flex flex-col items-center justify-center pt-4"
    >
      <div className="bg-white pr-14 pl-14 p-4 m-2 shadow-xl rounded-lg flex justify-center items-center ">
        <img src={cat} alt={cat.name} className="h-auto object-contain max-w-[100%]" />
      </div>
    </div>
  );
}

