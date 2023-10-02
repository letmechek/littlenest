import React from 'react';
import VehicleItems from '../VehicleItems/VehicleItems';

export default function VehicleList({ vehicleItem, handleAddToOrder }) {
  return (
    <div >
        <VehicleItems
          key={vehicleItem._id}
          vehicleItem={vehicleItem}
          handleAddToOrder={handleAddToOrder}
        />
    </div>
  );
}