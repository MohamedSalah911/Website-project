import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/navbar/Navbar";
import Category from "./components/categories/Category";
import { useEffect, useState } from "react";
import { Toaster, toast } from 'sonner'
import { Cart } from "./components/cart/Cart";

  function  App() {
    /*********************** Moved to 'src/Home.jsx' ***********************/
    //* this is how you can get any data 
    //* if you want the products use await getProducts()
    //* but if you want a specific product just use await getProduct(id) // and you should pass the id of that product
    //* if you want the categories use await getCategories() 
    //* if you want the colors use await getColors() 
    //* if you want the sizes use await getSizes() 


    // const [billboard, setBillboard] = useState();
    // useEffect(() => {
    //   const getData = async()=> {
    //       const billboard = await getBillboard("cm0feciu50003f6otoaggci5y")
    //  setBillboard(billboard)
    //   }
    //   getData()
     
    //  }, []);
    /*********************************************************************/
    


    // router for navigating through pages using navbar in 'src/navbar'
    const router = createBrowserRouter([
      {
        path: '/',
        element: <Home/>,
      
                    
      },
   
      {
        path: '/categories/:categoryId',
        element: <Category/>,
       
      },
      {
        path:"/cart",
        element: <Cart/>,
      },
      //TODO
      //add paths and pages to the router from here:
      {}
     ]);
 
  return (
    <>

         <Toaster richColors  />

    <RouterProvider router={router}/>
  
    {/* <RouterProvider router={router}/> */}
  
    </>
  )
 
  
}

export default App
