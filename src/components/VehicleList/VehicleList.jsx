import React , { useEffect}from 'react';
import VehicleItems from '../BabyProductItems/BabyProductItems';
import ScrollReveal from "scrollreveal";

export default function VehicleList({ productItem, handleAddToOrder }) {
  const sr = ScrollReveal();
  useEffect(() => {
    sr.reveal(".scroll", {
      origin: "bottom",
      distance: "20px",
      duration: 1000,
      delay: 200,
      scale: 1,
    });
  }, []);
  return (
    <div className='scroll'>
        <VehicleItems
          key={productItem._id}
          babyProductItem={productItem}
          handleAddToOrder={handleAddToOrder}
        />
    </div>
  );
}
