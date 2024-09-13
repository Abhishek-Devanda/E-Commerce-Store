import { motion } from 'framer-motion'
import { useOrderStore } from '../stores/useOrderStore'
import { useEffect } from 'react'
import moment from 'moment'
import { Trash } from 'lucide-react'

const AllOrdersList = () => {
    const { allOrders, fetchAllOrders, deleteOrder, changeOrderStatus } = useOrderStore()

    async function handleChangeOrderStatus(orderId, status) {
        changeOrderStatus(orderId, status)
    }

    async function handleInvoice(orderId) {
        window.open(`/invoice/${orderId}`, '_blank')
    }

    async function handleDeleteOrder(orderId) {
        deleteOrder(orderId)
    }

    useEffect(() => {
        fetchAllOrders()
    }, [fetchAllOrders])

    return (
        <div className='py-6 md:py-10 lg:py-16'>
            <div className='mx-auto max-w-screen-xl px-4 lg:px-6'>
                <div className='md:gap-6 lg:flex lg:items-start xl:gap-8'>
                    <motion.div
                        className='bg-gray-800 shadow-lg rounded-lg overflow-x-auto max-w-full lg:max-w-6xl mx-auto'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {allOrders && allOrders.length === 0 ? (
                            <h2 className='text-2xl md:text-3xl font-semibold text-gray-300 text-center py-4'>
                                No Orders found
                            </h2>
                        ) : (
                            <table className='min-w-full divide-y divide-gray-700'>
                                <thead className='bg-gray-700'>
                                    <tr>
                                        <th
                                            scope='col'
                                            className='px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
                                        >
                                            Order Number
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
                                        >
                                            Products
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
                                        >
                                            Total Amount
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
                                        >
                                            Ordered On
                                        </th>

                                        <th
                                            scope='col'
                                            className='px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
                                        >
                                            Status
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
                                        >
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className='bg-gray-800 divide-y divide-gray-700'>
                                    {allOrders?.map((order) => (
                                        <tr key={order._id} className='hover:bg-gray-700'>
                                            <td className='px-2 md:px-6 py-4 whitespace-nowrap'>
                                                <div className='flex items-center'>
                                                    <div className='text-sm font-medium text-white'>
                                                        {order._id}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='px-2 md:px-6 py-4 whitespace-nowrap'>
                                                <div className='text-sm text-gray-300'>
                                                    {order.products.map((product) => (
                                                        <div key={product.product.name}>
                                                            {product.quantity} x {product.product.name}
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className='px-2 md:px-6 py-4 whitespace-nowrap'>
                                                <div className='text-sm text-gray-300'>
                                                    {'₹ ' + order.totalAmount.toFixed(2)}
                                                </div>
                                            </td>
                                            <td className='px-2 md:px-6 py-4 whitespace-nowrap'>
                                                <div className='text-sm text-gray-300'>
                                                    {moment(order.createdAt).format('DD-MM-YYYY HH:mm')}
                                                </div>
                                            </td>
                                            <td className='px-2 md:px-6 py-4 whitespace-nowrap'>
                                                <div
                                                    className={`px-2 py-1 text-center rounded-full 
                                                        ${
                                                            order.status === 'delivered'
                                                                ? 'bg-green-700 text-gray-300'
                                                                : order.status === 'processing'
                                                                ? 'bg-green-600 text-gray-300'
                                                                : order.status === 'pending'
                                                                ? 'bg-yellow-700 text-gray-300'
                                                                : 'bg-red-700 text-gray-300'
                                                        } uppercase transition-colors duration-200`}
                                                >
                                                    <div className='text-sm'>{order.status}</div>
                                                </div>
                                            </td>
                                            <td className='px-2 md:px-6 py-4 whitespace-nowrap text-sm font-medium'>
                                                {(order.status === 'pending' || order.status === 'processing') && (
                                                    <div>
                                                        <select
                                                            id='orderStatus'
                                                            value={order.status}
                                                            onChange={(e) => {
                                                                handleChangeOrderStatus(
                                                                    order._id,
                                                                    e.target.value
                                                                )
                                                            }}
                                                            className='uppercase py-1 block w-24 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
                                                        >
                                                            <option
                                                                value='pending'
                                                                className='bg-yellow-700 text-gray-300'
                                                            >
                                                                Pending
                                                            </option>
                                                            <option
                                                                value='processing'
                                                                className='bg-green-600 text-gray-300'
                                                            >
                                                                Processing
                                                            </option>
                                                            <option
                                                                value='delivered'
                                                                className='bg-green-700 text-gray-300'
                                                            >
                                                                Delivered
                                                            </option>
                                                        </select>
                                                    </div>
                                                )}
                                                {order.status === 'delivered' && (
                                                    <button
                                                        onClick={() => {
                                                            handleInvoice(order._id)
                                                        }}
                                                        className='text-blue-400 hover:text-red-300 uppercase'
                                                    >
                                                        Invoice
                                                    </button>
                                                )}
                                                {order.status === 'cancelled' && (
                                                    <button
                                                        onClick={() => handleDeleteOrder(order._id)}
                                                        className='text-red-400 hover:text-red-300 uppercase'
                                                    >
                                                        <Trash size={20} />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default AllOrdersList
