
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useCart } from "@/../hooks/use-cart-store"
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '@/../redux/featuers/cart/cartSlice'
import { toast } from "sonner"
import { useModal } from "@/../hooks/use-modal-store"
import { Link } from "react-router-dom"
 
export const Cards = ({product}) => {
    const cart = useSelector((state)=> state.cart.value )
    const dispatch = useDispatch()
    const {onOpen} = useModal()
console.log(cart)
    return(
      <Link to={`/products/${product.id}`}>
         <Card className="">
      <CardHeader>
        <CardTitle>{product?.name}</CardTitle>
        <CardDescription>Check our other amazing products!</CardDescription>
      </CardHeader>
      <CardContent>
     <img loading="lazy" src={product?.images[0].url} className="w-32 aspect-square mx-auto" />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onOpen("showProduct",{product})}} variant="outline">Explore</Button>
        <Button onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
            const existingItem = cart?.find(item => item.id === product.id)
            if (existingItem) {
              return  toast.warning("Product already exist")
            }
          dispatch(addToCart(product))
            toast.success("Added to cart")
        }} >Add to cart</Button>
      </CardFooter>
    </Card>
    </Link> 
    );
}

export default Cards;