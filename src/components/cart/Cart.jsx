import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { Button } from '../ui/button'
import { removeFromCart } from '@/../redux/featuers/cart/cartSlice'
import { toast } from 'sonner'
export const Cart = () => {
    const cart = useSelector((state) => state.cart.value)
    const dispatch = useDispatch()
  return (
    <div>
        {!cart?.length   && (
            <li>add something!</li>
        )}
        {cart?.length > 0 && cart?.map(item => (
            <li>
                {item?.name}
                <Button onClick={() => {dispatch(removeFromCart(item))
                if (cart.length > 1) {
                    
                    toast.success("Product Remove successfully")
                }
                if (cart.length === 1) {
                    toast.success("Your cart is now empty")
                }
                } }>h</Button>
            </li>
        ))}
    </div>
  )
}
