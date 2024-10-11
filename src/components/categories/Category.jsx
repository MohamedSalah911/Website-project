import React, { useEffect, useState } from 'react'
import Navbar from '../navbar/Navbar'
import getCategory from '@/../lib/get-category';
import { useParams } from 'react-router-dom';
import ProductList from '../product-list/product-list';
import getProducts from '@/../lib/get-products';
import { useSearchParams } from 'react-router-dom';
import { Filters } from '../filters/Filters';
const Category = () => {
  const [category,setCategory ] = useState()
  const {categoryId} = useParams()
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams()
  const colorId = searchParams.get("colorId")
  const sizeId = searchParams.get("sizeId")
  useEffect(() => {
   const getData = async() =>{ 
    const category = await getCategory(categoryId) 
   setCategory(category)
     
  }
  getData()

  }, []);
  useEffect(() => {
  const getData = async() =>{ 
    const products = await getProducts({categoryId, sizeId, colorId}) 
  setProducts(products)
  }
  getData()
  }, [categoryId, sizeId, colorId, getProducts, setProducts]);

  return (
    
   <div className='flex flex-col w-full h-full'>
   <Navbar />
   <div className='w-full h-full flex gap-2  '>
   <Filters />
   <ProductList label={"Find your mood"} products={products} />
   </div>
   </div>
  )
}

export default Category