import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useModal } from "@/../hooks/use-modal-store"
import { formatter } from "@/lib/utils"
import { Badge } from "../ui/badge"
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "@/../redux/featuers/cart/cartSlice"
import { toast } from "sonner"

export const ProductModal = () => {
  const {isOpen, type, onClose, data} = useModal()
  const {product} = data
  const isModalOpened = isOpen && type === "showProduct" 
  //TODO: use thie vairables and style the modal of the product to match the figma design or you can design as you like */
 const  title = product?.name
  const colorHex = product?.color?.value
 const  color = product?.color.name
const   category = product?.category.name
 const  size = product?.size.value
  const image = product?.images[0].url
  const price = formatter.format(Number(product?.price))
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart.value)
  return (
    <Dialog open={isModalOpened} onOpenChange={onClose}>
     <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
         <ul className="flex items-center space-x-2">

          <Badge variant={'outline'}>{category}</Badge>
          <Badge variant={'outline'}>{size}</Badge>
          <Badge variant={'outline'}>{color}</Badge>
          <Badge variant={'outline'}>{price}</Badge>
         </ul>
          </DialogDescription>
        </DialogHeader>
       <div className="w-40 h-40 mx-auto aspect-square overflow-hidden relative">
        <img src={image} alt="product image" className="w-full h-full object-cover" />
        </div> 
        <DialogFooter>

          <Button onClick={() => {
            const currentItems = cart.find(current => current.id === product.id)
            if (currentItems) {
              return toast.warning("Already in cart")
            }
           dispatch(addToCart(product)) 
           toast.success("Added to cart ")
          }}>Add to cart </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
