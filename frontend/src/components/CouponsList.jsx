import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import CreateCouponForm from "./CreateCouponForm";
import { Trash } from "lucide-react";
import moment from 'moment';

const CouponsList = () => {
    const { coupons, deleteCoupon } = useCartStore();

    async function handleDeleteCoupon(couponId) {
        deleteCoupon(couponId);
    }

    async function toggleStatus(couponId) {
        console.log(couponId);
    }

    return (
        <div className='py-8 md:py-16'>
            <div className='mx-auto max-w-screen-xl px-4 2xl:px-0'>
                <div className='flex flex-col lg:flex-row lg:gap-6 lg:items-start lg:justify-between'>

                    <motion.div
                        className='mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full'
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <CreateCouponForm />
                    </motion.div>

                    <motion.div
                        className='mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl'
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {coupons.length === 0 ? (
                            <h2 className='text-3xl font-semibold text-gray-300 text-center'>
                                No Coupons found
                            </h2>
                        ) : (
                            <div className='overflow-x-auto'>
                                <table className='min-w-full divide-y divide-gray-700'>
                                    <thead className='bg-gray-700'>
                                        <tr>
                                            <th
                                                scope='col'
                                                className='px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
                                            >
                                                Coupon
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
                                            >
                                                Discount
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
                                            >
                                                Category
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
                                            >
                                                Status
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
                                            >
                                                Expires-In
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
                                            >
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className='bg-gray-800 divide-y divide-gray-700'>
                                        {coupons?.map((coupon) => (
                                            <tr key={coupon.code} className='hover:bg-gray-700'>
                                                <td className='px-4 py-4 whitespace-nowrap'>
                                                    <div className='text-sm font-medium text-white'>{coupon.code}</div>
                                                </td>
                                                <td className='px-4 py-4 whitespace-nowrap'>
                                                    <div className='text-sm text-gray-300'>{coupon.discountPercentage + "%"}</div>
                                                </td>
                                                <td className='px-4 py-4 whitespace-nowrap'>
                                                    <div className='text-sm text-gray-300'>{coupon.category}</div>
                                                </td>
                                                <td className='px-4 py-4 whitespace-nowrap'>
                                                    <button
                                                        onClick={() => toggleStatus(coupon._id)}
                                                        className={`px-2 py-1 rounded-full ${coupon.isActive ? "bg-green-700 text-gray-300 hover:bg-red-700" : "bg-red-700 text-gray-300 hover:bg-green-700"} transition-colors duration-200`}
                                                    >
                                                        <div className='text-sm text-gray-300'>{coupon.isActive ? "Active" : "Inactive"}</div>
                                                    </button>
                                                </td>
                                                <td className='px-4 py-4 whitespace-nowrap'>
                                                    <div className='text-sm text-gray-300'>{moment(coupon.expiry).format('DD-MM-YYYY HH:mm')}</div>
                                                </td>
                                                <td className='px-4 py-4 whitespace-nowrap text-sm font-medium'>
                                                    <button
                                                        onClick={() => handleDeleteCoupon(coupon._id)}
                                                        className='text-red-400 hover:text-red-300'
                                                    >
                                                        <Trash className='h-5 w-5' />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default CouponsList;
