import { toast } from "sonner";
import { create } from "zustand";

import {persist, createJSONStorage} from 'zustand/middleware'

export const useCart = create(
    persist((get, set) => ({
        items:[],
        addToCart: (item) => {
            const currentItems = get().items
           const existingItem = currentItems(current => current.id === item?.id)
           if (existingItem) {
          return toast.warning("Already exist in cart")
           }
           set({
            items: [...get().items, item]
           })
           toast.success("Added to cart")
        },

        removeFromCart: (item) => {
            set({
                items:[...get().items.filter(current => current.id !== item.id)]
            })
            toast.success("Removed from cart")
        },
        removeAll: () => {
            set({   items: []})
            toast.success("Removed all")
        }
        
    }),{
        name: "storage-cart",
        storage: createJSONStorage(() => localStorage)
    }
    
    )
)