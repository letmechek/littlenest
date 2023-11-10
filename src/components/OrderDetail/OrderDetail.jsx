import React, { useEffect, useState } from 'react';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import LineItem from '../LineItem/LineItem';
import * as ordersAPI from '../../utilities/orders-api';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import CartIcon from '../CartIcon/CartIcon';


export default function OrderDetail() {
  const [ cart, setCart ] = useState(null)
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchCart() {
      const cart = await ordersAPI.getCart();
      setCart(cart);
    }
    fetchCart();
  }, []);

async function handleChangeQty(babyProductId, newQty) {
  const updatedCart = await ordersAPI.setItemQtyInCart(babyProductId, newQty)
  setCart(updatedCart)
}
// const orderId =  cart._id 
const orderId = cart ? cart._id : null
async function handleCheckout(orderId) {
  try {
    const response = await ordersAPI.checkout(orderId);
    console.log(response.sessionUrl)
    // window.open(response.sessionUrl, '_blank')
    window.location.href = response.sessionUrl
  } catch (error) {
    console.error(error);
  }
}
  const lineItems = cart ? cart.lineItems.map((vehicle) => (
   
    console.log(cart),
    <CartIcon totalQty={cart.lineItems.length} /> 
  )) : null;
 
  return (
    <>
    <div className="container mx-auto mt-10 ">
    <div className="flex shadow-md flex-col my-10 sm:flex-row">
      <div className="w-full sm:w-3/4 bg-white px-10 py-10">
        <div className="flex justify-between border-b pb-8">
          <h1 className="font-semibold text-2xl">Shopping Cart</h1>
          <h2 className="font-semibold text-2xl"> Items</h2>
        </div>
        <div className="flex mt-10 mb-5">
          <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
          <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">Days</h3>
          <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">Price</h3>
          <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">Total</h3>
        </div>
        {cart ? (
          cart.lineItems.map((vehicle) => <LineItem lineItem={vehicle} isPaid={cart.isPaid} key={vehicle._id} handleChangeQty={handleChangeQty} />)
        ) : (
          <p className="text-center py-5">No items in the cart. <Link to="/brands">Continue shopping</Link></p>
        )}
      </div>
  
      <div id="summary" className="w-full sm:w-1/4 px-8 py-10">
        <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
        {cart && (
          <>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">Items {cart.lineItems.length}</span>
              <span className="font-semibold text-sm">
              </span>
            </div>
            <div>
              <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
              <select className="block p-2 text-gray-600 w-full text-sm">
                <option>Self Pickup - $0.00</option>
                <option>Front Door Delivery - $300.00</option>
                <option>Full Tank Of Gas - $200.00</option>
              </select>
            </div>
            <div className="py-10">
              <label htmlFor="promo" className="font-semibold inline-block mb-3 text-sm uppercase">
                Promo Code
              </label>
              <input type="text" id="promo" placeholder="Enter your code" className="p-2 text-sm w-full" />
            </div>
            <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
              Apply
            </button>
            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span>${cart.orderTotal.toFixed(2)}</span>
              </div>
              <button onClick={() => handleCheckout(orderId)} className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  </div>
    </>
  )}  