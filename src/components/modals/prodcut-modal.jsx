import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useModal } from "@/../hooks/use-modal-store";
import { formatter } from "@/lib/utils";

export const ProductModal = () => {
  const { isOpen, type, onClose, data } = useModal();
  const { product } = data;
  const isModalOpened = isOpen && type === "showProduct";

  // Extract product details
  const title = product?.name;
  const colorHex = product?.color?.value;
  const colors = product?.availableColors; // Assuming there is a list of available colors
  const category = product?.category.name;
  const price = formatter.format(Number(product?.price));
  const image = product?.images[0]; // Main product image

  return (
    <Dialog open={isModalOpened} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] flex flex-row space-x-6 p-6">
        {/* Left side: Images */}
        <div className="flex flex-col space-y-4">
          <img src={image} alt={title} className="w-64 h-64 object-cover" />
          <div className="flex space-x-2">
            {/* Thumbnails - assuming you have multiple images */}
            {product?.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx}`}
                className="w-16 h-16 object-cover border"
              />
            ))}
          </div>
        </div>

        {/* Right side: Product details */}
        <div className="flex flex-col space-y-4">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
          </DialogHeader>
          
          <div className="text-lg">
            <span className="font-semibold">Category: </span>
            {category}
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="font-semibold">Colors: </span>
            <div className="flex space-x-2">
              {colors?.map((color, idx) => (
                <div
                  key={idx}
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: color.hexValue }} // Color hex value for background
                ></div>
              ))}
            </div>
          </div>
          
          <div className="text-lg">
            <span className="font-semibold">Price: </span>
            {price}
          </div>

          <Button className="bg-black text-white p-3 rounded-md">Add to Cart</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
