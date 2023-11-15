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
import "./ProductDetail.css";

export default function ProductDetail({ user }) {
  const [cart, setCart] = useState(null);
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  let navigate = useNavigate();
  const location = useLocation();
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

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
      const updatedCart = await ordersAPI.addItemToCart(
        id,
        selectedSize,
        selectedColor
      );
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
    setSelectedColor(color);
  }

  return (
    <>
      <div class="bg-white">
        <div class="pt-6">
        <nav aria-label="Breadcrumb">
      <ol
        role="list"
        class="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
      >
        <li>
          <div class="flex items-center">
            <Link to="/" className="mr-2 text-sm font-medium text-gray-900 hover:underline">
              Home
            </Link>
          </div>
        </li>

        <li>
          <div class="flex items-center">
            <Link to="#" onClick={() => navigate(-1)} className="mr-2 text-sm font-medium text-gray-900 hover:underline">
              Clothing
            </Link>
          </div>
        </li>

        <li class="text-sm">
          <span class="font-medium text-gray-500">{vehicle.name}</span>
        </li>
      </ol>
    </nav>

          <div class="mx-auto mt-6 max-w-2xl w-full md:w-3/5 flex justify-center flex-col md:flex-row">
            <Carousel
              additionalTransfrom={0}
              arrows
              autoPlaySpeed={3000}
              centerMode={false}
              containerClass="container-padding-bottom"
              customTransition="all .5"
              dotListClass=""
              focusOnSelect={false}
              infinite={true}
              itemClass=""
              keyBoardControl
              minimumTouchDrag={80}
              renderButtonGroupOutside={false}
              renderDotsOutside={false}
              responsive={"hello"}
              showDots={false}
              sliderClass=""
              slidesToSlide={1}
              swipeable
            >
              {vehicle.image.map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
                    alt={`${vehicle.name}`}
                    className="h-auto w-full object-cover"
                  />
                </div>
              ))}
            </Carousel>
          </div>
          

          {/* <!-- Product info --> */}
          <div class="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {vehicle.name}
              </h1>
            </div>

            {/* <!-- Options --> */}
            <div class="mt-4 lg:row-span-3 lg:mt-0">
              <h2 class="sr-only">Product information</h2>
              <p class="text-3xl tracking-tight text-gray-900">
                ${vehicle.price}
              </p>

              {/* <!-- Reviews --> */}
              <div class="mt-6">
                <h3 class="sr-only">Reviews</h3>
                <div class="flex items-center">
                  <div class="flex items-center">
                    {/* <!-- Active: "text-gray-900", Default: "text-gray-200" --> */}
                    <svg
                      class="text-gray-900 h-5 w-5 flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <svg
                      class="text-gray-900 h-5 w-5 flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <svg
                      class="text-gray-900 h-5 w-5 flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <svg
                      class="text-gray-900 h-5 w-5 flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <svg
                      class="text-gray-200 h-5 w-5 flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <p class="sr-only">4 out of 5 stars</p>
                  <a
                    // href="#"
                    class="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    117 reviews
                  </a>
                </div>
              </div>

              <form class="mt-10">
                {/* <!-- Colors --> */}
                <div>
                  <h3 class="text-sm font-medium text-gray-900">Color</h3>

                  <fieldset class="mt-4">
                    <legend class="sr-only">Choose a color</legend>
                    <div className="flex items-center space-x-3">
                      {vehicle.color.map((color, index) => (
                        <label
                          key={index}
                          className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-400"
                        >
                          <input
                            type="radio"
                            name="color-choice"
                            value={color}
                            className="sr-only"
                            aria-labelledby={`color-choice-${index}-label`}
                            onClick={() => handleColorSelection(color)}
                          />
                          <span
                            id={`color-choice-${index}-label`}
                            className="sr-only"
                          >
                            {color}
                          </span>
                          <span
                            aria-hidden="true"
                            style={{
                              backgroundColor: color,
                              width: "2rem",
                              height: "2rem",
                              borderRadius: "50%",
                              borderColor: "red",
                              opacity: "0.9",
                            }}
                          ></span>
                          <span
                            aria-hidden="true"
                            className={`absolute inset-px rounded-2xl border-2 ${
                              selectedColor === color
                                ? "border-gray-400"
                                : "border-transparent"
                            }`}
                          ></span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>

                {/* <!-- Sizes --> */}
                <div class="mt-10">
                  <div class="flex items-center justify-between">
                    <h3 class="text-sm font-medium text-gray-900">Size</h3>
                    <a
                      // href="#"
                      class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Size guide
                    </a>
                  </div>

                  <fieldset class="mt-4">
                    <legend class="sr-only">Choose a size</legend>
                    <div class="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                      {/* <!-- Active: "ring-2 ring-indigo-500" --> */}
                      {vehicle.size.map((size, index) => (
    <label
      key={index}
      className={`group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-100 focus:outline-none sm:flex-1 sm:py-6 cursor-pointer ${
        selectedSize === size ? "bg-custom-yellow1 text-white" : ""
      }`}
    >
      <input
        type="radio"
        name="size-choice"
        value={size}
        className="sr-only"
        aria-labelledby={`size-choice-${index}-label`}
        onClick={() => handleSizeSelection(size)}
      />
      <span
        id={`size-choice-${index}-label`}
        className="pointer-events-none"
      >
        {size}
      </span>
    </label>
  ))}
                    </div>
                  </fieldset>
                </div>

                <button
        onClick={() => handleAddToOrder(id, selectedSize, selectedColor)}
                  class="mt-10 hover:bg-custom-yellow flex w-full items-center justify-center hover:text-yellow-700 rounded-md border border-transparent  px-8 py-3 text-base font-medium text-white bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add to bag
                </button>
              </form>
            </div>

            <div class="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* <!-- Description and details --> */}
              <div>
                <h3 class="sr-only">Description</h3>

                <div class="space-y-6">
  <p class="text-base text-gray-900">
    Elevate your baby's wardrobe with the Luxe Essentials Collection. Our Basic Tee 6-Pack is crafted for the most discerning parents who value quality and luxury. Express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of sophistication to your baby's outfit? Our white tee has you covered in style.
  </p>
</div>

<div class="mt-10">
  <h3 class="text-sm font-medium text-gray-900">Luxury Highlights</h3>

  <div class="mt-4">
    <ul role="list" class="list-disc space-y-2 pl-4 text-sm">
      <li class="text-gray-400">
        <span class="text-gray-600">
          Handcrafted with precision and care
        </span>
      </li>
      <li class="text-gray-400">
        <span class="text-gray-600">
          Dyed with our exclusive proprietary colors
        </span>
      </li>
      <li class="text-gray-400">
        <span class="text-gray-600">
          Pre-washed & pre-shrunk for ultimate comfort
        </span>
      </li>
      <li class="text-gray-400">
        <span class="text-gray-600">Ultra-soft 100% cotton for a luxurious feel</span>
      </li>
    </ul>
  </div>
</div>

<div class="mt-10">
  <h2 class="text-sm font-medium text-gray-900">Luxury Details</h2>

  <div class="mt-4 space-y-6">
    <p class="text-sm text-gray-600">
      The Luxe Essentials Collection includes two black, two white, and two heather gray Basic Tees. Elevate your baby's style with our subscription service and be the first to receive new, exciting colors, like our upcoming "Charcoal Gray" limited release.
    </p>
  </div>
</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// <div className="bg-white p-4 md:p-8 mx-auto max-w-6xl">
// <Link to="#" onClick={() => navigate(-1)} className="hover:underline mb-2 inline-flex items-center ">
//   <ChevronLeftIcon className="h-6 w-6" /> Back
// </Link>
// <div className="flex flex-col md:flex-row">
//   <div className="w-full md:w-3/5 rounded-xl overflow-hidden">
// <Carousel
//       additionalTransfrom={0}
//       arrows
//       autoPlaySpeed={3000}
//       centerMode={false}
//       containerClass="container-padding-bottom"
//       customTransition="all .5"
//       dotListClass=""
//       focusOnSelect={false}
//       infinite={true}
//       itemClass=""
//       keyBoardControl
//       minimumTouchDrag={80}
//       renderButtonGroupOutside={false}
//       renderDotsOutside={false}
//       responsive={'hello'}
//       showDots={false}
//       sliderClass=""
//       slidesToSlide={1}
//       swipeable
//     >
//       {vehicle.image.map((image, index) => (
//         <div key={index}>
//           <img src={image} alt={`${vehicle.name}`} className="h-auto w-full object-cover" />
//         </div>
//       ))}
//     </Carousel>
//   </div>
//   <div className="flex-1 mt-6 md:mt-0 md:ml-8 text-left">
//     <h2 className="text-2xl font-medium text-gray-800 mb-2">{vehicle.name}</h2>
//     {vehicle.inStock > 0 ? (
//       <span className="w-3 h-3 text-green-500 font-extrabold ">IN STOCK</span>
//     ):
//     (
//       <span className="w-3 h-3 text-gray-500 font-extrabold">OUT OF STOCK</span>
//     )}
//     <p className="text-black text-lg mt-2">${vehicle.price}</p>
//     <p className="text-gray-600 text-lg mt-4">{vehicle.description}</p>
//     <div className="flex flex-wrap justify-start gap-2 mt-6">
//       {vehicle.size.map((size, index) => (
//         <button
//           key={index}
//           onClick={() => handleSizeSelection(size)}
//           className={`border p-2 text-sm rounded-md ${selectedSize === size ? "border-black" : "border-gray-300"}`}
//         >
//           {size}
//         </button>
//       ))}
//     </div>
//     <div className="flex flex-wrap gap-2 justify-start mt-4">
//       {vehicle.color.map((color, index) => (
//         <button
//           key={index}
//           onClick={() => handleColorSelection(color)}
//           className={`rounded-full w-6 h-6 border-2 border-silver focus:outline-none focus:ring focus:border-blue-300 ${
//             selectedColor === color ? 'border-blue-100' : 'border-gray-300'
//           }`}
//           style={{ backgroundColor: color }}
//         ></button>
//       ))}
//     </div>
//     <div className="mt-6">
      // <button
      //   onClick={() => handleAddToOrder(id, selectedSize, selectedColor)}
//         className="bg-custom-yellow hover:bg-pink-800 text-white font-bold py-3 md:py-2 px-6 md:px-24 rounded w-full md:w-auto"
//       >
//         Add To Cart
//       </button>
//     </div>
//   </div>
// </div>
// </div>
