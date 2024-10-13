import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import {Filters} from '../filters/Filters';
import {Banner} from '../billboards/Banner';
import getCategory from '@/../lib/get-category';
import getProducts from '@/../lib/get-products';
import getBillboard from '@/../lib/get-billboard';
import { Loader2 } from 'lucide-react';
import {Skeleton} from '../ui/Skeleton';
import ProductList from '../product-list/product-list';

/**
 * Category Component
 * 
 * This component is responsible for displaying a specific category of products.
 * It fetches category details, associated billboard, and the list of products based on filters.
 */
const Category = () => {
  // Extract categoryId from URL parameters
  const { categoryId } = useParams();
  
  // Extract query parameters for filtering
  const [searchParams] = useSearchParams();
  const colorId = searchParams.get('colorId');
  const sizeId = searchParams.get('sizeId');

  // State variables for storing fetched data
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

  /**
   * Fetch Category Data
   */
  useEffect(() => {
    const fetchCategory = async () => {
      setLoadingCategory(true);
      setErrorCategory(null);
      try {
        const data = await getCategory(categoryId);
        if (data) {
          setCategory(data);
        } else {
          setErrorCategory('Category not found.');
        }
      } catch (error) {
        console.error('Error fetching category:', error);
        setErrorCategory('Failed to fetch category.');
      } finally {
        setLoadingCategory(false);
      }
    };

    if (categoryId) {
      fetchCategory();
    }
  }, [categoryId]);

  /**
   * Fetch Billboard Data
   */
  useEffect(() => {
    const fetchBillboard = async () => {
      // If no billboardId is associated with the category, skip fetching
      if (!category?.billboardId) {
        setBillboard(null);
        setLoadingBillboard(false);
        return;
      }

      setLoadingBillboard(true);
      setErrorBillboard(null);
      try {
        const data = await getBillboard(category.billboardId);
        if (data) {
          setBillboard(data);
        } else {
          setErrorBillboard('Billboard not found.');
        }
      } catch (error) {
        console.error('Error fetching billboard:', error);
        setErrorBillboard('Failed to fetch billboard.');
      } finally {
        setLoadingBillboard(false);
      }
    };

    if (category) {
      fetchBillboard();
    }
  }, [category]);

  /**
   * Fetch Products Data based on filters
   */
  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingProducts(true);
      setErrorProducts(null);
      try {
        const data = await getProducts({ categoryId, sizeId, colorId });
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setErrorProducts('Failed to fetch products.');
      } finally {
        setLoadingProducts(false);
      }
    };

    if (categoryId) {
      fetchProducts();
    }
  }, [categoryId, sizeId, colorId]);

  /**
   * Render Loading State for Category
   */
  if (loadingCategory) {
    return (
      <div className="flex flex-col w-full h-full">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
        </div>
      </div>
    );
  }

  /**
   * Render Error State for Category
   */
  if (errorCategory) {
    return (
      <div className="flex flex-col w-full h-full">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <p className="text-red-500 text-lg">{errorCategory}</p>
        </div>
      </div>
    );
  }

  /**
   * Main Render
   */
  return (
    <div className="flex flex-col w-full h-full py-20">
      <Navbar />

      {/* Billboard Section */}
      <section className="my-8">
        {loadingBillboard ? (
          <div className="flex justify-center items-center h-64">
            <Skeleton className="w-11/12 h-52 lg:h-60 rounded-md" />
          </div>
        ) : errorBillboard ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-red-500 text-lg">{errorBillboard}</p>
          </div>
        ) : billboard ? (
          <Banner billboard={billboard} />
        ) : null}
      </section>

      <div className="flex flex-1 w-full gap-4 p-4">
        {/* Filters Sidebar */}
        <aside className="w-1/4">
          <Filters />
        </aside>

        {/* Products Display */}
        <main className="flex-1">
          {loadingProducts ? (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
            </div>
          ) : errorProducts ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-red-500 text-lg">{errorProducts}</p>
            </div>
          ) : products.length > 0 ? (
            <ProductList label="Find your mood" products={products} />
          ) : (
            <div className="flex justify-center items-center h-full">
              <p className="text-gray-700 text-lg">No products found.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Category;
