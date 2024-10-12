import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import { Filters } from '../filters/Filters';
import { Banner } from '../billboards/Banner';
import getCategory from '@/../lib/get-category';
import getProducts from '@/../lib/get-products';
import getBillboard from '@/../lib/get-billboard';
import { Loader2 } from 'lucide-react';
import ProductList from '../product-list/product-list';

const Category = () => {
  const { categoryId } = useParams();
  const [searchParams] = useSearchParams();
  const colorId = searchParams.get('colorId');
  const sizeId = searchParams.get('sizeId');

  // State variables
  const [category, setCategory] = useState(null);
  const [billboard, setBillboard] = useState(null);
  const [products, setProducts] = useState([]);

  // Loading states
  const [loadingCategory, setLoadingCategory] = useState(true);
  const [loadingBillboard, setLoadingBillboard] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Error states
  const [errorCategory, setErrorCategory] = useState(null);
  const [errorBillboard, setErrorBillboard] = useState(null);
  const [errorProducts, setErrorProducts] = useState(null);
  // Fetch Category Data
  useEffect(() => {
    const fetchCategory = async () => {
      setLoadingCategory(true);
      setErrorCategory(null);
      try {
        const data = await getCategory(`${categoryId}`);
        if (data) {
          setCategory(data);
        } else {
          setErrorCategory('Category not found.');
        }
      } catch (error) {
    
      } finally {
        setLoadingCategory(false);
      }
    };

    if (categoryId) {
      fetchCategory();
    }
  }, [categoryId]);
console.log(categoryId)
  // Fetch Billboard Data
  useEffect(() => {
    const fetchBillboard = async () => {
      if (!category?.billboardId) {
        setBillboard(null);
        setLoadingBillboard(false);
        return;
      }

      setLoadingBillboard(true);
      setErrorBillboard(null);
      try {
        const data = await getBillboard(`${category.billboardId}`);
        if (data) {
          setBillboard(data);
        } else {
          setErrorBillboard('Billboard not found.');
        }
      } catch (error) {
       
      } finally {
        setLoadingBillboard(false);
      }
    };

    fetchBillboard();
  }, [category, categoryId]);
  // Fetch Products Data
  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingProducts(true);
      setErrorProducts(null);
      try {
        const data = await getProducts({ categoryId, sizeId, colorId });
        setProducts(data);
      } catch (error) {
        setErrorProducts('Failed to fetch products.');
        console.error('Error fetching products:', error);
      } finally {
        setLoadingProducts(false);
      }
    };

    if (categoryId) {
      fetchProducts();
    }
  }, [categoryId, sizeId, colorId]);

  // Conditional Rendering based on loading and error states
  if (loadingCategory) {
    return (
      <div className="flex flex-col w-full h-full">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
                    <Loader2 className='w-4 h-4 animate-spin' />

        </div>
      </div>
    );
  }

  if (errorCategory) {
    return (
      <div className="flex flex-col w-full h-full">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <p className="text-red-500">{errorCategory}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full">
      <Navbar />

      {/* Billboard Section */}
      {loadingBillboard ? (
        <div className="flex justify-center items-center h-64">
                   <Loader2 className='w-4 h-4 animate-spin' />

        </div>
      ) : errorBillboard ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-red-500">{errorBillboard}</p>
        </div>
      ) : billboard ? (
        <Banner billboard={billboard} />
      ) : null}

      <div className="w-full h-full flex gap-2 p-4">
        {/* Filters Section */}
        <Filters />

        {/* Products Section */}
        {loadingProducts ? (
          <div className="flex-1 flex justify-center items-center">
           <Loader2 className='w-4 h-4 animate-spin' />
          </div>
        ) : errorProducts ? (
          <div className="flex-1 flex justify-center items-center">
            <p className="text-red-500">{errorProducts}</p>
          </div>
        ) : products.length > 0 ? (
          <ProductList label="Find your mood" products={products} />
        ) : (
          <div className="flex-1 flex justify-center items-center">
            <p>No products found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
