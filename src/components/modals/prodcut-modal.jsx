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
  const image = product?.images[0]
  const price = formatter.format(Number(product?.price))
  return (
    <Dialog open={isModalOpened} onOpenChange={onClose}>
     <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
