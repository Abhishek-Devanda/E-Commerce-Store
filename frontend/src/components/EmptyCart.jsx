import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const EmptyCart = () => {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <motion.div
                className='flex flex-col items-center justify-center space-y-4 py-16 max-w-sm sm:max-w-md md:max-w-lg w-full'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <ShoppingCart className='h-16 w-16 text-gray-300 sm:h-20 sm:w-20 md:h-24 md:w-24' />
                <h3 className='text-lg sm:text-xl md:text-2xl font-semibold text-center'>
                    Your cart is empty
                </h3>
                <p className='text-gray-400 text-center text-sm sm:text-base'>
                    Looks like you {"haven't"} added anything to your cart yet.
                </p>
                <Link
                    className='mt-4 rounded-md bg-emerald-500 px-6 py-2 text-white transition-colors hover:bg-emerald-600'
                    to='/'
                >
                    Start Shopping
                </Link>
            </motion.div>
        </div>
    );
};

export default EmptyCart;
