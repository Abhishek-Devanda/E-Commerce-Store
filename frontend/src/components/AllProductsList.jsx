import { motion } from "framer-motion";
import { Trash, Star } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import CreateProductForm from "./CreateProductForm";

const AllProductsList = () => {
	const { deleteProduct, toggleFeatured, products } = useProductStore();

	return (
		<div className='py-8 md:py-16'>
			<div className='mx-auto max-w-screen-xl px-4 lg:px-6'>
				<div className='md:gap-6 lg:flex lg:items-start xl:gap-8'>
					{/* Product Form */}
					<motion.div
						className='mx-auto mt-6 max-w-5xl w-full lg:flex-1 lg:mt-0 lg:w-full space-y-6'
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.4 }}
					>
						<CreateProductForm />
					</motion.div>

					{/* Product Table */}
					<motion.div
						className='bg-gray-800 shadow-lg rounded-lg overflow-x-auto w-full max-w-4xl mx-auto mt-8 lg:mt-0 lg:w-full'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
					>
						<table className='min-w-full divide-y divide-gray-700'>
							<thead className='bg-gray-700'>
								<tr>
									<th
										scope='col'
										className='px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
									>
										Product
									</th>
									<th
										scope='col'
										className='px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
									>
										Price
									</th>
									<th
										scope='col'
										className='px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
									>
										Category
									</th>
									<th
										scope='col'
										className='px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
									>
										Count in Stock
									</th>
									<th
										scope='col'
										className='px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
									>
										Featured
									</th>
									<th
										scope='col'
										className='px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
									>
										Actions
									</th>
								</tr>
							</thead>

							<tbody className='bg-gray-800 divide-y divide-gray-700'>
								{products?.map((product) => (
									<tr key={product._id} className='hover:bg-gray-700'>
										<td className='px-4 md:px-6 py-4 whitespace-nowrap'>
											<div className='flex items-center'>
												<div className='flex-shrink-0 h-10 w-10'>
													<img
														className='h-10 w-12 rounded-md object-cover'
														src={product.image}
														alt={product.name}
													/>
												</div>
												<div className='ml-4 capitalize'>
													<div className='text-sm font-medium text-white'>{product.name}</div>
												</div>
											</div>
										</td>
										<td className='px-4 md:px-6 py-4 whitespace-nowrap'>
											<div className='text-sm text-gray-300'>{'₹ ' + product.price.toFixed(2)}</div>
										</td>
										<td className='px-4 md:px-6 py-4 whitespace-nowrap capitalize text-center'>
											<div className='text-sm text-gray-300'>{product.category}</div>
										</td>
										<td className='px-4 md:px-6 py-4 whitespace-nowrap text-center'>
											<div className='text-sm text-gray-300'>{product.countInStock}</div>
										</td>
										<td className='px-4 md:px-6 py-4 whitespace-nowrap text-center'>
											<button
												onClick={() => toggleFeatured(product._id)}
												className={`p-1 rounded-full ${product.isFeatured ? "bg-yellow-400 text-gray-900" : "bg-gray-600 text-gray-300"
													} hover:bg-yellow-500 transition-colors duration-200`}
											>
												<Star className='h-5 w-5' />
											</button>
										</td>
										<td className='px-4 md:px-6 py-4 text-center whitespace-nowrap text-sm font-medium'>
											<button
												onClick={() => deleteProduct(product._id)}
												className='text-red-400 hover:text-red-300'
											>
												<Trash className='h-5 w-5' />
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default AllProductsList;
