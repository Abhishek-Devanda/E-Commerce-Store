import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import PrimaryButton from "./PrimaryButton";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
;

const OrderSummary = () => {
	const [loading, setLoading] = useState(false);
	const { total, subtotal, appliedCoupon, isCouponApplied, cart, checkoutSession } = useCartStore();

	const savings = subtotal - total;
	const formattedSubtotal = subtotal.toFixed(2);
	const formattedTotal = total.toFixed(2);
	const formattedSavings = savings.toFixed(2);

	const handleCheckout = async () => {
		setLoading(true);
		if (isCouponApplied) {
			checkoutSession(cart, appliedCoupon.code);
		} else {
			checkoutSession(cart)
		}
	};

	return (
		<motion.div
			className='space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<p className='text-xl font-semibold text-emerald-400'>Order Summary</p>

			<div className='space-y-4'>
				<div className='space-y-2'>
					<dl className='flex items-center justify-between gap-4'>
						<dt className='text-base font-normal text-gray-300'>Original price</dt>
						<dd className='text-base font-medium text-white'>{'₹ ' + formattedSubtotal}</dd>
					</dl>

					{savings > 0 && (
						<dl className='flex items-center justify-between gap-4'>
							<dt className='text-base font-normal text-gray-300'>Savings</dt>
							<dd className='text-base font-medium text-emerald-400'>{'- ₹ ' + formattedSavings}</dd>
						</dl>
					)}

					{appliedCoupon && isCouponApplied && (
						<dl className='flex items-center justify-between gap-4'>
							<dt className='text-base font-normal text-gray-300'>Coupon: ({appliedCoupon.code})</dt>
							<dd className='text-base font-medium text-emerald-400'>-{appliedCoupon.discountPercentage}%</dd>
						</dl>
					)}
					<dl className='flex items-center justify-between gap-4 border-t-2 border-gray-600 pt-2'>
						<dt className='text-base font-bold text-white'>Total</dt>
						<dd className='text-base font-bold text-emerald-400'>{'₹ ' + formattedTotal}</dd>
					</dl>
				</div>
				
				<PrimaryButton onClick={() => handleCheckout()} type="button" loadingText={"Loading..."} loadingState={loading} icon={ShoppingCart} btnName={'Proceed to Checkout'} />

				<div className='flex items-center justify-center gap-2'>
					<span className='text-sm font-normal text-gray-400'>or</span>
					<Link
						to='/'
						className='inline-flex items-center gap-2 text-sm font-medium text-emerald-400 underline hover:text-emerald-300 hover:no-underline'
					>
						Continue Shopping
					</Link>
				</div>
			</div>
		</motion.div>
	);
};
export default OrderSummary;