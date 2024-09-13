import toaster from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import PropTypes from "prop-types";

import PrimaryButton from "./PrimaryButton";

import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

import { useState } from "react";


const ProductCard = ({ product }) => {

	const [loading, setLoading] = useState(false);

	ProductCard.propTypes = {
		product: PropTypes.object.isRequired,
	};

	const { user } = useUserStore();
	const { addToCart } = useCartStore();

	async function handleAddToCart(id) {
		if (!user) {
			toaster.error("Please Login First...", { id: 'login' });
			return;
		} else {
			setLoading(true);
			await addToCart(id);
			setLoading(false);
		}
	};


	return (
		<div className='bg-white bg-opacity-10 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden h-full transition-all duration-300 hover:shadow-xl border border-emerald-500/30'>
			<div className='relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl'>
				<img className='object-cover w-full' src={product.image} alt={product.name + ' image'} />
				<div className='absolute inset-0 bg-black bg-opacity-20' />
			</div>

			<div className='mt-4 px-5 pb-5'>
				<h5 className='text-xl font-semibold tracking-tight text-white'>{product.name}</h5>
				<div className='mt-2 mb-5 flex items-center justify-between'>
					<p>
						<span className='text-3xl font-bold text-emerald-400'>{"₹" + product.price}</span>
					</p>
				</div>
				<PrimaryButton id={product._id} onClick={() => handleAddToCart(product._id)} type="button" loadingText={"Addding to Cart..."} loadingState={loading} icon={ShoppingCart} btnName={'Add to Cart'} />

			</div>
		</div>);
};
export default ProductCard;