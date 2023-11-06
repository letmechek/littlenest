import { useEffect, useState, useRef, } from "react";
import Banner from "../../components/Banner/Banner";
import Brands from "../../components/Brands/Brands";
import Faq from "../../components/Faq/Faq";
import * as categoriesAPI from '../../utilities/baby-categories-api'
import Loader from "../../components/Loader/Loader";
import Vehicle from "../Vehicle/Vehicle";
import VehicleItems from "../../components/BabyProductItems/BabyProductItems";

export default function Home() {
    const [vehicleItems, setVehicleItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchUniqueCategories = async () => {
          try {
            const vehicles = await categoriesAPI.getAll();
            setVehicleItems(vehicles);
            setIsLoading(false)
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchUniqueCategories();
      }, []);

    return (
      <>
      {isLoading ? (
        <div className="">
          <Loader />
        </div>
      ) : (
        <>
          <Banner />
          <Brands categories={vehicleItems} />
          <Faq />
        </>
      )}
    </>
  );
}

