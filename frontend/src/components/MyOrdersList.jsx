import { motion } from 'framer-motion';
import { useOrderStore } from '../stores/useOrderStore';
import { useEffect } from 'react';
import moment from 'moment';

const MyOrdersList = () => {
    const { myOrders, fetchMyOrders, changeOrderStatus } = useOrderStore();

    async function handleChangeOrderStatus(orderId, status) {
        await changeOrderStatus(orderId, status);
    }

    async function handleInvoice(orderId) {
        window.open(`/invoice/${orderId}`, '_blank');
    }

    useEffect(() => {
        fetchMyOrders();
    }, [fetchMyOrders]);

    return (
        <div className='py-8 md:py-16'>
            <div className='mx-auto max-w-4xl px-4 2xl:px-0'>
                <motion.div
                    className='bg-gray-800 shadow-lg rounded-lg overflow-hidden'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {myOrders && myOrders.length === 0 ? (
                        <h2 className='text-3xl font-semibold text-gray-300 text-center py-8'>
                            No Orders found
                        </h2>
                    ) : (
                        <div className='overflow-x-auto'>
                            <table className='min-w-full divide-y divide-gray-700'>
                                <thead className='bg-gray-700'>
                                    <tr>
                                        <th className='px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>Order Number</th>
                                        <th className='px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>Products</th>
                                        <th className='px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>Total Amount</th>
                                        <th className='px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>Ordered On</th>
                                        <th className='px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>Status</th>
                                        <th className='px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-gray-800 divide-y divide-gray-700'>
                                    {myOrders?.map((order) => (
                                        <tr key={order._id} className='hover:bg-gray-700'>
                                            <td className='px-4 py-4 whitespace-nowrap'>
                                                <div className='text-sm font-medium text-white'>{order._id}</div>
                                            </td>
                                            <td className='px-4 py-4 whitespace-nowrap'>
                                                <div className='text-sm text-gray-300'>
                                                    {order.products.map((product) => (
                                                        <div key={product.product.name}>{product.quantity} x {product.product.name}</div>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className='px-4 py-4 whitespace-nowrap'>
                                                <div className='text-sm text-gray-300'>{'₹ ' + order.totalAmount.toFixed(2)}</div>
                                            </td>
                                            <td className='px-4 py-4 whitespace-nowrap'>
                                                <div className='text-sm text-gray-300'>{moment(order.createdAt).format('DD-MM-YYYY HH:mm')}</div>
                                            </td>
                                            <td className='px-4 py-4 whitespace-nowrap'>
                                                <div className={`px-2 py-1 w-22 text-center rounded-full
                                                    ${order.status === "delivered" ? "bg-green-700 text-gray-300 uppercase"
                                                        : order.status === "pending" ? "bg-yellow-700 text-gray-300 uppercase"
                                                            : order.status === "processing" ? "bg-green-600 text-gray-300 uppercase"
                                                                : "bg-red-700 text-gray-300 uppercase"
                                                    } transition-colors duration-200`}
                                                >
                                                    <div className='text-sm'>{order.status}</div>
                                                </div>
                                            </td>
                                            <td className='px-4 py-4 whitespace-nowrap text-sm font-medium'>
                                                {order.status === 'pending' && (
                                                    <button
                                                        onClick={() => handleChangeOrderStatus(order._id, "cancelled")}
                                                        className='text-red-400 hover:text-red-300 uppercase'
                                                    >
                                                        Cancel
                                                    </button>
                                                )}
                                                {order.status === 'delivered' && (
                                                    <button
                                                        onClick={() => handleInvoice(order._id)}
                                                        className='text-blue-400 hover:text-blue-300 uppercase'
                                                    >
                                                        Invoice
                                                    </button>
                                                )}
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
    );
};

export default MyOrdersList;
