import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";


export default function BabyProductItems({ babyProductItem }) {
  
  return (
    <Card className=" bg-white p-4 m-4 shadow-xl rounded-lg hover:shadow-2xl flex flex-col items-center justify-between ">
      <Link
        to={`/${babyProductItem.name}/${babyProductItem._id}`}
        className=""
      >
      <CardHeader shadow={false} floated={false} className="h-96">

        <img
          src={babyProductItem.image[0]}
          alt={babyProductItem.name}
          className="h-full w-full object-cover"
        />
        </CardHeader>
        <CardBody>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-lg mt-2 overflow-hidden">{babyProductItem.name}</h2>
        </div>
        <div className="mt-4">
          <p className="text-green-700 font-bold">${babyProductItem.price}</p>
        </div>
        </CardBody>
      </Link>
    </Card>
  );
}

