import { motion } from "framer-motion";
import { Gift } from 'lucide-react'
import { useEffect, useState } from "react";
import { useCartStore } from "../stores/useCartStore";
import InputField from "./InputField";
import PrimaryButton from "./PrimaryButton";

const ApplyCouponCard = () => {

	const [loading, setLoading] = useState(false);

	const [userInputCode, setUserInputCode] = useState("");
	const { myCoupon, appliedCoupon, isCouponApplied, applyCoupon, removeCoupon } = useCartStore();

	const handleApplyCoupon = async () => {
		if (!userInputCode) return;
		setLoading(true);
		await applyCoupon(userInputCode);
		setLoading(false);
		setUserInputCode("");
	};

	const handleRemoveCoupon = async () => {
		await removeCoupon();
	};

	useEffect(() => {
		if (myCoupon) {
			setUserInputCode(myCoupon.code);
		}
	}, [myCoupon]);

	return (
		<motion.div
			className='space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.2 }}
		>
			<div className='space-y-4'>
				<div>
					<InputField required id={'voucher'} value={userInputCode.toUpperCase()} labelText={'Do you have a Coupon?'} type={'text'} placeholder={'Apply Coupon'} onChange={(e) => setUserInputCode(e.target.value)} icon={Gift} />
				</div>

				<PrimaryButton id={"applyCoupon"} onClick={() => handleApplyCoupon()} loadingText={"Validating..."} type="button" btnName={'Apply Coupon'} loadingState={loading} />

			</div>



			{isCouponApplied && appliedCoupon ? (
				<div className='mt-4'>
					<h3 className='text-lg font-medium text-gray-300'>Applied Coupon:</h3>

					<p className='mt-2 text-sm text-gray-400'>
						{appliedCoupon.code} = {appliedCoupon.discountPercentage}% off
					</p>

					<motion.button
						type='button'
						className='mt-2 flex w-full items-center justify-center rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300'
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={handleRemoveCoupon}
					>
						Remove Coupon
					</motion.button>
				</div>
			) : myCoupon ? (
				<div className='mt-4'>
					<h3 className='text-lg font-medium text-gray-300'>Your Available Coupon:</h3>
					<p className='mt-2 text-sm text-gray-400'>
						{myCoupon?.code} = {myCoupon?.discountPercentage}% off
					</p>
				</div>
			) : null}

		</motion.div>
	);
};
export default ApplyCouponCard;