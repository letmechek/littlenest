import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/24/solid'; 

function CartIcon({totalQty}) {
  // const cartItemCount = 3; 
console.log(totalQty + ' order')
  return (
    <div className="relative top-0 right-0 ">
      <Link to="/cart">
      <div className="relative">
        <ShoppingCartIcon className="h-8 w-8 text-white hover:text-gray-300" />
        {/* Conditionally render the red badge */}
        {totalQty > 0 && (
          <div className="absolute top-0 right-0 bg-red-500 text-white w-4 h-4 rounded-full flex items-center justify-center text-xs font-semibold">
            {totalQty}
          </div>
        )}
      </div>
      </Link>
    </div>
  );
}

export default CartIcon;
