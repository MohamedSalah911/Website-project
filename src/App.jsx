import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/navbar/Navbar";

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
        errorElement: <>
                        <h1>404 NOT FOUND</h1>
                        <button>
                          <a href="/">Go Home</a>
                        </button>
                      </>
      },
      //TODO
      //add paths and pages to the router from here:
      {}
     ]);
 
  return (
    <>
    <Navbar/>
    <RouterProvider router={router}/>
    </>
  )
 
  
}

export default App
