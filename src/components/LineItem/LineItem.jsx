import React from 'react'

export default function LineItem({lineItem, isPaid, handleChangeQty}) {
  return (
    <div  className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5 ">
      {/* Product details */}
      <div className="flex w-2/5">
        <div className="w-20">
          <img className="h-20 w-full object-contain" src={lineItem.babyProduct.image[0]} alt={lineItem.babyProduct.name} />
        </div>
        <div>
          
          </div>
        <div className="flex flex-col justify-between ml-4 flex-grow">
          <span className="font-bold text-sm">{lineItem.babyProduct.name}, {lineItem.selectedSize}</span>
        </div>
      </div>
      {/* Quantity */}
      <div className="flex justify-center w-1/5">
      {!isPaid &&
        <button  className="fill-current text-gray-600 w-3" onClick={() => handleChangeQty(lineItem.babyProduct._id, lineItem.qty - 1)}>
            -
          </button>
}
        <span
          className="mx-2 border text-center w-8">
            {lineItem.qty}
          </span>
          {/* Quantity increase icon */}
          {!isPaid &&
          <button onClick={() => handleChangeQty(lineItem.babyProduct._id, lineItem.qty + 1)} className="fill-current text-gray-600 w-3">
            +
          </button>
}
      </div>
      {/* Price */}
      <span className="text-center w-1/5 font-semibold text-sm">${lineItem.babyProduct.price.toFixed(2)}</span>
      {/* Total */}
      <span className="text-center w-1/5 font-semibold text-sm">${(lineItem.qty * lineItem.babyProduct.price).toFixed(2)}</span>
      
    </div>
  );
}
