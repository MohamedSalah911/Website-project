import React from 'react'
import Product from './product'

const ProductList = ({label, products}) => {
  return (
    <div className='flex flex-col space-y-3 items-start px-4 my-8'>
        <h2 className='font-semibold text-2xl'>{label}</h2>
        <ul className='flex flex-wrap px-2 w-full gap-2'>
            {products.map(product =>(
                <Product product={product} />
            ))}
        </ul>

    </div>
  )
}

export default ProductList