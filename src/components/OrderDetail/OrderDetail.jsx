import React, { useEffect, useState } from 'react';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import LineItem from '../LineItem/LineItem';
import * as ordersAPI from '../../utilities/orders-api';
import { Navigate } from 'react-router-dom';


export default function OrderDetail() {
  const [ cart, setCart ] = useState(null)

useEffect(function() {  
  (async function() {
    const cart = await ordersAPI.getCart()
    setCart(cart)
})();
}, [])
async function handleAddToOrder(vehicleId) {
  const updatedCart = await ordersAPI.addItemToCart(vehicleId)
  setCart(updatedCart)
}
async function handleChangeQty(vehicleId, newQty) {
  const updatedCart = await ordersAPI.setItemQtyInCart(vehicleId, newQty)
  setCart(updatedCart)
}
async function handleCheckout() {

  await ordersAPI.checkout()
  Navigate('/orders')
}
  const lineItems = cart ? cart.lineItems.map((vehicle) => (
    <LineItem
      lineItem={vehicle}
      isPaid={cart.isPaid}
      key={vehicle._id}
      handleChangeQty={handleChangeQty}
    />
  )) : null;

  return (
    <div className="container mx-auto mt-10">
      <div className="flex shadow-md my-10">
        <div className="w-3/4 bg-white px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl">{cart.length} Items</h2>
          </div>
          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">Quantity</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">Price</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">Total</h3>
          </div>
          {lineItems.length ? (
            cart.map((item) => <LineItem key={item.id} item={item} />)
          ) : (
            <p className="text-center py-5">No items in the cart. <a href="#">Continue shopping</a></p>
          )}
        </div>

        <div id="summary" className="w-1/4 px-8 py-10">
          <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
          {lineItems && (
            <>
              <div className="flex justify-between mt-10 mb-5">
                <span className="font-semibold text-sm uppercase">Items {cart.length}</span>
                <span className="font-semibold text-sm">
                  ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                </span>
              </div>
              <div>
                <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
                <select className="block p-2 text-gray-600 w-full text-sm">
                  <option>Standard shipping - $10.00</option>
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
                  <span>
                    $
                    {cart
                      .reduce((total, item) => total + item.price * item.quantity, 0)
                      .toFixed(2)}
                  </span>
                </div>
                <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}