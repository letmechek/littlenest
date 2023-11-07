import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as vehiclesAPI from "../../utilities/baby-products-api";
import { Carousel } from "react-responsive-carousel";
import first from "../../Assets/images/first.webp";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import * as ordersAPI from "../../utilities/orders-api";
import Loader from "../Loader/Loader";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

export default function ProductDetail({ user }) {
  const [cart, setCart] = useState(null);
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [selectedSize, setSelectedSize] = useState(''); 
  const [selectedColor, setSelectedColor] = useState('')
  let navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function fetchVehicle() {
      try {
        const response = await vehiclesAPI.getById(id);
        setVehicle(response);
      } catch (error) {
        console.error(error);
      }
    }

    fetchVehicle();
  }, [id]);

  if (!vehicle) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  async function handleAddToOrder(id, selectedSize, selectedColor) {
    if (user) {
      const updatedCart = await ordersAPI.addItemToCart(id, selectedSize, selectedColor);
      alert("Your order has been added to the cart");
      setCart(updatedCart);
      navigate("/cart");
    } else {
      navigate("/login", { state: { from: location } });
    }
  }

  function handleSizeSelection(size) {
    console.log(size);
    setSelectedSize(size); 
  }

  function handleColorSelection(color) {
    console.log(color);
    setSelectedColor(color)
  }

  return (
    <>
      <Link to="#" onClick={() => navigate(-1)} className="hover:underline mb-2 inline-flex items-center p-2">
        <ChevronLeftIcon className="h-6 w-6" /> Back
      </Link>
      <div className="bg-white p-4 md:p-8 flex flex-col md:flex-row mx-auto max-w-6xl">
        <div className="w-full md:w-3/5 rounded-xl overflow-hidden">
          <Carousel showThumbs={false}>
            {vehicle.image.map((image, index) => (
              <div key={index}>
                <img src={image} alt={`${vehicle.name} `} className="h-auto w-full object-cover" />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="flex-1 mt-6 md:mt-0 md:ml-8 text-left">
          <h2 className="text-4xl font-semibold text-gray-800 mb-2">{vehicle.name}</h2>
          {vehicle.inStock > 0 ? (
            <span className="w-3 h-3 text-green-500 ">IN STOCK</span>
          ):
          (
            <span className="w-3 h-3 text-gray-300 ">OUT OF STOCK</span>
          )}
          <p className="text-black text-lg mt-2">${vehicle.price}</p>
          <p className="text-gray-600 text-lg mt-4">{vehicle.description}</p>
          <div className="flex flex-wrap justify-start gap-2 mt-6">
            {vehicle.size.map((size, index) => (
              <button
                key={index}
                onClick={() => handleSizeSelection(size)}
                className={`border p-2 text-sm rounded-md ${selectedSize === size ? "border-black" : "border-gray-300"}`}
              >
                {size}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 justify-start mt-4">
            {vehicle.color.map((color, index) => (
              <button
                key={index}
                onClick={() => handleColorSelection(color)}
                className={`rounded-full w-6 h-6 border-2 border-silver focus:outline-none focus:ring focus:border-blue-300 ${
                  selectedColor === color ? 'border-blue-100' : 'border-gray-300'
                }`}
                style={{ backgroundColor: color }}
              ></button>
            ))}
          </div>
          <div className="mt-6">
            <button
              onClick={() => handleAddToOrder(id, selectedSize, selectedColor)}
              className="bg-custom-yellow hover:bg-pink-800 text-white font-bold py-3 md:py-2 px-6 md:px-24 rounded w-full md:w-auto"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}