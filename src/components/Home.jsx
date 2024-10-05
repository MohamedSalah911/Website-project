import { Banner } from "./billboards/banner"
import Cards from "./cards/Cards";
import { useState, useEffect } from "react";
import getBillboard from "../../lib/get-billboard.jsx";




export default function Home() {
    /************************ HOW TO GET DATA ******************************/
    //* this is how you can get any data 
    //* if you want the products use await getProducts()
    //* but if you want a specific product just use await getProduct(id) // and you should pass the id of that product
    //* if you want the categories use await getCategories() 
    //* if you want the colors use await getColors() 
    //* if you want the sizes use await getSizes() 
    /*********************************************************************/



    const [billboard, setBillboard] = useState();
    useEffect(() => {
      const getData = async()=> {
          const billboard = await getBillboard("cm0feciu50003f6otoaggci5y")
     setBillboard(billboard)
      }
      getData()
     
     }, []);

    return (
        <>
            <Banner billboard={billboard} />
            <h1 className="cards-title">Featured</h1>
            <div className="card-container">
                <Cards/>
                <Cards/>
                <Cards/>
                <Cards/>
                <Cards/>
                <Cards/>
            </div>
        </>);
}