import { useState, useEffect } from 'react';
import Navbar from './navbar/Navbar';
import { Banner } from './billboards/Banner';
import getBillboard from '@/../lib/get-billboard';
import getProducts from '@/../lib/get-products';
import {  Loader2 } from 'lucide-react';
import ProductList from './product-list/product-list';
import { motion } from 'framer-motion';

export default function Home() {
  // State variables
  const [billboard, setBillboard] = useState(null);
  const [products, setProducts] = useState([]);

  // Loading states
  const [loadingBillboard, setLoadingBillboard] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Error states
  const [errorBillboard, setErrorBillboard] = useState(null);
  const [errorProducts, setErrorProducts] = useState(null);
// Animation variants for different components
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Stagger the animation of child components
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 },
  },
};

const bannerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8 },
  },
};
  // Fetch Billboard Data
  useEffect(() => {
    const fetchBillboard = async () => {
      setLoadingBillboard(true);
      setErrorBillboard(null);
      try {
        const billboardData = await getBillboard('cm0feciu50003f6otoaggci5y');
        setBillboard(billboardData);
      } catch (error) {
       
      } finally {
        setLoadingBillboard(false);
      }
    };

    fetchBillboard();
  }, []);

  // Fetch Featured Products Data
  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingProducts(true);
      setErrorProducts(null);
      try {
        const featuredProducts = await getProducts({ isFeatured: true });
        setProducts(featuredProducts);
      } catch (error) {
   
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
   
  <Navbar />


      <div className="my-16">
        {/* Billboard Section */}
        {loadingBillboard ? (
          <div className="flex justify-center items-center h-64">
                      <Loader2 className='w-4 h-4 animate-spin' />

          </div>
        ) : errorBillboard ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-red-500">{errorBillboard}</p>
          </div>
        ) : (
          <Banner billboard={billboard} />
        )}

        {/* Products Section */}
        {loadingProducts ? (
          <div className="flex justify-center items-center h-64">
           <Loader2 className='w-4 h-4 animate-spin' />
          </div>
        ) : errorProducts ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-red-500">{errorProducts}</p>
          </div>
        ) : products.length > 0 ? (
          <ProductList label="Featured" products={products} />
        ) : (
          <div className="flex justify-center items-center h-64">
            <p>No featured products available.</p>
          </div>
        )}
      </div>
    </>
  );
}
