import { useEffect } from "react";
import { motion } from "framer-motion";

import EmptyCart from "../components/EmptyCart";
import CartItem from "../components/CartItem";
import LoadingSpinner from "../components/LoadingSpinner";
import OrderSummary from "../components/OrderSummary";
import ApplyCouponCard from "../components/ApplyCouponCard";
import PageHeading from "../components/PageHeading";

import { useCartStore } from "../stores/useCartStore";

const CartPage = () => {
  const { cart, getCart, getMyCoupon, loading } = useCartStore();
  
  useEffect(() => {
    getCart();
    if (cart.length > 0) {
      getMyCoupon();      
    }
  }, [getCart, getMyCoupon, cart.length]);

  if (loading) {
    return (<LoadingSpinner />)
  }

  return (
    <div className='py-8 md:py-16'>
      <div className='mx-auto max-w-screen-xl px-4 2xl:px-0'>
      <PageHeading textSize={"text-5xl sm:text-4xl"} mainHeading={"My Cart"} />
      <div className='mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8'>
          <motion.div
            className='mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl'
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {cart.length === 0 ? (
							<EmptyCart />
						) : (
							<div className='space-y-6'>
								{cart.map((item, _id) => (
									<CartItem key={_id} item={item} />
								))}
							</div>
						)}
          </motion.div>

          {cart.length > 0 && (
            <motion.div
              className='mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full'
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <OrderSummary />
              <ApplyCouponCard/>


            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
export default CartPage;

