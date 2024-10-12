import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '../ui/button';
import { removeAll, removeFromCart } from '@/../redux/featuers/cart/cartSlice';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Navbar from '../navbar/Navbar';
import { Badge } from '../ui/badge';
import { formatter } from '@/lib/utils';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Redux state
  const cart = useSelector((state) => state.cart.value);

  // Local state
  const [isLoadingCheckout, setIsLoadingCheckout] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + Number(item.price), 0);
  const formattedPrice = formatter.format(totalPrice);

  // Handle URL search parameters for payment status
  useEffect(() => {
    const handlePaymentStatus = () => {
      const success = searchParams.get('success');
      const canceled = searchParams.get('canceled');

      if (success) {
        dispatch(removeAll());
        toast.success('Payment successfully completed!');
      }

      if (canceled) {
        toast.error('Payment was canceled.');
      }
    };

    handlePaymentStatus();
  }, [searchParams, dispatch]);

  // Handle Proceed to Checkout
  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }

    try {
      setIsLoadingCheckout(true);
      setCheckoutError(null);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_WEBSITE_API}/checkout`,
        {
          productIds: cart.map((item) => item.id),
        }
      );

      if (response.data.url) {
        window.location.href = response.data.url;
      } else {
        throw new Error('Checkout URL not provided.');
      }
    } catch (error) {
      setCheckoutError('Failed to initiate checkout. Please try again.');
      toast.error('Checkout failed. Please try again.');
      console.error('Checkout Error:', error);
    } finally {
      setIsLoadingCheckout(false);
    }
  };

  // Handle Remove Item from Cart
  const handleRemove = (item) => {
    dispatch(removeFromCart(item));

    if (cart.length > 1) {
      toast.success(`${item.name} removed from cart.`);
    } else if (cart.length === 1) {
      toast.success('Your cart is now empty.');
    }
  };

  return (
    <div className="flex flex-col items-center py-20 w-full h-full">
      <Navbar />

      {!cart.length ? (
        <div className="flex flex-col items-center justify-center space-y-5 pt-[10%] h-full">
          <div className="w-56 h-56 aspect-square overflow-hidden bg-white relative">
            <img
              className="w-full h-full object-cover"
              src="https://firebasestorage.googleapis.com/v0/b/slacknew-e82cd.appspot.com/o/empty.png?alt=media&token=bfb37926-067d-48ed-a880-ed9c68992b1b"
              alt="Empty Cart"
            />
          </div>
          <p className="text-2xl font-semibold text-center">
            It looks like you haven't added anything to buy <span className="underline">yet!</span>
          </p>
          <Button onClick={() => navigate('/')} className="mt-4">
            Browse Products
          </Button>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap w-full justify-center gap-4 px-5">
            {cart.map((item) => (
              <div key={item.id} className="py-1 px-5">
                <Card className="w-[290px] shadow-none">
                  <CardHeader>
                    <CardTitle>{item.name}</CardTitle>
                    <CardDescription>
                      <ul className="flex items-center space-x-2">
                        <Badge variant="outline">{item.category.name}</Badge>
                        <Badge variant="outline">{item.size.value}</Badge>
                        <Badge variant="outline">{item.color.name}</Badge>
                      </ul>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col space-y-4 justify-center">
                    <div className="w-36 h-36 aspect-square overflow-hidden mx-auto relative">
                      <img
                        src={item.images[0]?.url || '/placeholder.png'}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Button
                      variant="destructive"
                      onClick={() => handleRemove(item)}
                      className="w-full"
                    >
                      Remove
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Checkout Section */}
          <div className="flex items-center justify-center w-full mt-8 px-5">
            <div className="flex flex-col items-center gap-4 w-full max-w-md">
              <Badge variant="secondary" className="w-full text-center p-4">
                <span className="font-bold">Total Price:</span> {formattedPrice}
              </Badge>
              <Button
                onClick={handleCheckout}
                disabled={isLoadingCheckout}
                className="w-full"
              >
                {isLoadingCheckout ? 'Processing...' : 'Proceed to Checkout'}
              </Button>
              {checkoutError && (
                <p className="text-red-500 text-center">{checkoutError}</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
