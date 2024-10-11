import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '../ui/button'
import { removeAll, removeFromCart } from '@/../redux/featuers/cart/cartSlice'
import { toast } from 'sonner'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Navbar from '../navbar/Navbar'
import { Badge } from '../ui/badge'
import { formatter } from '@/lib/utils'
import { useNavigate,useSearchParams } from 'react-router-dom'

export const Cart = () => {
    const cart = useSelector((state) => state.cart.value)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [searchParams] = useSearchParams()
 
    const totalPrice = cart?.reduce((total, item) => {
        return (total += Number(item.price))
    },0)
    useEffect(() => {
        if (searchParams.get("success")) {
            dispatch(removeAll())
            toast.success("Payment successfully completed!")
        }
        if (searchParams.get("canceled")) {
            toast.error("Payment canceled")
        }
      
    }, [searchParams, removeAll])
    const formattedPrice = formatter.format(totalPrice)
    const onClick = async() => {
        try {
            setIsLoading(true) 
           const response = await axios.post(`${import.meta.env.VITE_BACKEND_WEBSITE_API}/checkout`, {productIds: cart.map((item) => item.id)})
            window.location = response.data.url
        } catch (error) {
            
        }finally{
            setIsLoading(false)
        }
    }
  return (
    <div className='py-20'>
        <Navbar />
        {!cart?.length   && (
            <div className='w-full flex-col space-y-5 pt-[10%] h-full flex items-center justify-center'>
                <div className='w-56 h-56 aspect-square overflow-hidden bg-white  relative'>
                    <img  className='w-full h-full object-cover' src="https://firebasestorage.googleapis.com/v0/b/slacknew-e82cd.appspot.com/o/empty.png?alt=media&token=bfb37926-067d-48ed-a880-ed9c68992b1b" alt="" srcset="" />
                </div>
                    <p className='text-2xl font-semibold'>It looks like you do not add something to buy <span className='underline'>Yet!</span></p>
            </div>
        )}
        {cart?.length > 0 && cart?.map(item => (
            <div className='flex flex-col py-1  px-5'>
             <Card className="w-full shadow-none">
      <CardHeader>
        <CardTitle>{item.name}</CardTitle>
        <CardDescription>
          { /* <ul>
                <Badge variant={'default'}>{item.category.name}</Badge>
                <Badge variant={'default'}>{item.color.name}</Badge>
                <Badge variant={'default'}>{item.size.name}</Badge>
              
        </ul>*/}
        </CardDescription>
      </CardHeader>
      <CardContent>
  
      </CardContent>
      <CardFooter className="flex justify-end">
        
           <Button onClick={() => {dispatch(removeFromCart(item))
                if (cart.length > 1) {
                    
                    toast.success("Product Remove successfully")
                }
                if (cart.length === 1) {
                    toast.success("Your cart is now empty")
                }
                } }>Remove</Button>
      </CardFooter>
    </Card> 
          
            </div>
        ))}
        <div className='flex justify-start gap-x-4 px-5 py-4'>
            <Badge variant={"outline"}>

               <span className='font-bold '>Total Price:</span> {formattedPrice}
            </Badge>
            <Button diabled={isLoading} onClick={onClick}>Proceed to checkout</Button>
        </div>
    </div>
  )
}
