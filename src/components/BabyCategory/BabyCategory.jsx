import React from 'react'
import * as vehiclesAPI from '../../utilities/baby-products-api.js';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VehicleItems from '../BabyProductItems/BabyProductItems.jsx';
import VehicleList from '../VehicleList/VehicleList';
import Loader from '../Loader/Loader';

export default function BabyCategory() {
    const [babyProducts, setbabyProducts] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const {modelId} = useParams()
    useEffect(function(){
        async function fetchVehicles(){
            const babyProducts = await vehiclesAPI.getProductByCategory(modelId)
            setbabyProducts(babyProducts)
            setIsLoading(false)
        }
        fetchVehicles()
    }, [modelId])
console.log(babyProducts +'vehicles')
  return (
    <>
    {isLoading ? (
        <div className=''>
            <Loader />
        </div>
    ): (
        
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 ">
        {babyProducts && babyProducts.map(babyProduct => (
            <VehicleList key={babyProduct._id} productItem={babyProduct} />
        ))}
    </div>
    )}
    </>
  )
}

