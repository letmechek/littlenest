import React, { useEffect, useState, useRef } from 'react'
import * as vehiclesAPI from '../../utilities/baby-products-api';
import VehicleItems from '../../components/BabyProductItems/BabyProductItems';
import Loader from '../../components/Loader/Loader';

export default function Vehicle() {
    const [babyProductItems, setBabyProductItems] = useState([]);
    const [activeCat, setActiveCat] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const categoriesRef = useRef([])

    useEffect(function(){
        (async function(){
            const products = await vehiclesAPI.getAll()
            setBabyProductItems(products)
            setIsLoading(false)
        })()
    }, [])
 
  return (
    <>
    {isLoading ? (
      <div className=''>
        <Loader/>
      </div>
    ) :(
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
    {babyProductItems.map((babyProduct, index) => (
      <VehicleItems key={babyProduct._id} babyProductItem={babyProduct} />
      ))}
  </div>
    )}
  </>
)
}


