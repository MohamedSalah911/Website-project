import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { SlideShow } from "./_components/slideshow";
import getProduct from "@/../lib/get-product";
import getProducts from "@/../lib/get-products";
import ProductList from "../product-list/product-list";
import {  Loader2 } from "lucide-react";
import Error from "../error-page/Error";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/../redux/featuers/cart/cartSlice";
import { toast } from "sonner";
import { formatter } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

export const ProductPage = () => {
    const dispatch = useDispatch()
  const { productId } = useParams();

  // State variables
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [error, setError] = useState(null);
    const cart = useSelector((state)=> state.cart.value )

  // Fetch single product
  useEffect(() => {
    const fetchProduct = async () => {
      setLoadingProduct(true);
      setError(null);
      try {
        const data = await getProduct(productId);
        if (data) {
          setProduct(data);
        } else {
          setError("Product not found.");
        }
      } catch (err) {
        setError("An error occurred while fetching the product.");
        console.error(err);
      } finally {
        setLoadingProduct(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  // Fetch related products based on categoryId
  useEffect(() => {
    const fetchProducts = async () => {
      if (!product?.categoryId) return;

      setLoadingProducts(true);
      try {
        const relatedProducts = await getProducts({ categoryId: product.categoryId });
        setProducts(relatedProducts);
      } catch (err) {
        console.error("Error fetching related products:", err);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, [product]);
  const newProducts = products.filter(product => product.id !== productId)

  // Conditional Rendering based on state
  if (loadingProduct) {
    return (
      <>
        <Navbar />
       <div className="flex flex-col space-y-4 md:flex-row py-20 justify-around gap-3 items-center w-full h-full px-4">
          <div>
            <Skeleton className={'w-40 h-40'} />
          </div>
          <div className="h-full flex flex-col w-1/2 items-start">
            <Skeleton className={'w-20 h-4'} />
            <p className="mt-4 space-y-3">
             <Skeleton className={'w-60 h-4'} />
             <Skeleton className={'w-60 h-4'} />
             <Skeleton className={'w-28 h-4'} />

            </p>
            <ul className="flex  space-x-2 py-4">
            <Skeleton className={'w-10 h-4'} />
            <Skeleton className={'w-10 h-4'} />
            <Skeleton className={'w-10 h-4'} />
   

            </ul>
            <ul className="flex space-x-2 items-center">
                
            <p className=" text-xl font-bold">
              <Skeleton className={'w-10 h-4'} />
               
            </p>
            <Skeleton className={'w-24 h-6'} />
           
            </ul>
            {/* Add more product details as needed */}
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
       <Error />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col space-y-2">
        <div className="flex flex-col space-y-4 md:flex-row py-20 justify-around gap-3 items-center w-full h-full px-4">
          <div>
            <SlideShow images={product?.images} />
          </div>
          <div className="h-full flex flex-col w-1/2 items-start">
            <h1 className="text-2xl font-semibold">{product?.name}</h1>
            <p className="mt-4">
              {product?.description ||
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime corporis laboriosam, accusantium asperiores quam voluptas sit perspiciatis sint."}
            </p>
            <ul className="flex  space-x-2 py-2">
            <Badge>{product?.category?.name}</Badge>
            <Badge>{product?.size?.value}</Badge>
            <Badge>{product?.color?.name}</Badge>

            </ul>
            <ul className="flex space-x-2 items-center">
                
            <p className=" text-xl font-bold">
                <Badge className={'px-4 py-2'} variant={'outline'}>
                  {formatter.format(product?.price)}
             
                </Badge>
            </p>
            <Button className="font-semibold" variant={"outline"} onClick={() => {
                  const existingItem = cart?.find(item => item.id === product.id)
            if (existingItem) {
              return  toast.warning("This product is already in your cart")
            }else{
                toast.success("Product added to your cart! ")
            }
          dispatch(addToCart(product))
            }} >Add To cart</Button>
            </ul>
            {/* Add more product details as needed */}
          </div>
        </div>
        {loadingProducts ? (
          <div className="flex justify-center items-center">
            <Loader2 className="w-4 h-4 animate-spin" />
          </div>
        ) : (
          <ProductList label="Related Products" products={newProducts} />
        )}
      </div>
    </>
  );
};
