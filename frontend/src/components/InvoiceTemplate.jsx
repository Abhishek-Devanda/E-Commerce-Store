import { CheckCircle, Truck, CreditCard } from 'lucide-react';
import moment from 'moment';
import PropTypes from 'prop-types';

function InvoiceTemplate({ order }) {
  InvoiceTemplate.propTypes = {
    order: PropTypes.object.isRequired,
  };

  const grandTotal = order.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const savings = grandTotal - order.totalAmount;
  const savingsPercentage = ((savings / grandTotal) * 100).toFixed(2);

  return (
    <div className="min-h-screen text-gray-300 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl p-6 sm:p-8 md:p-10 max-w-4xl w-full">
      <div className="flex justify-end">
          <button
            onClick={() => window.print()}
            className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Print
          </button>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Invoice</h1>
            <p className="text-lg sm:text-xl">Order ID: {order._id}</p>
          </div>
          
          <div className="mt-4 md:mt-0 text-right">
            <p className="font-semibold">Order Date: {moment(order.createdAt).format('DD-MM-YYYY')}</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Customer Information</h2>
          <p><span className="font-semibold">Name:</span> {order.user.name}</p>
          <p><span className="font-semibold">Email:</span> {order.user.email}</p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Ordered Products</h2>
          <div className="bg-gray-700 rounded-lg overflow-x-auto">
            <table className="w-full min-w-full">
              <thead>
                <tr className="bg-blue-900">
                  <th className="p-3 text-left">Product</th>
                  <th className="p-3 text-left">Quantity</th>
                  <th className="p-3 text-left">Price</th>
                  <th className="p-3 text-left">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.products.map((product, index) => (
                  <tr key={index} className="border-b border-blue-800">
                    <td className="p-3">{product.product.name}</td>
                    <td className="p-3">{product.quantity}</td>
                    <td className="p-3">₹{product.price.toFixed(2)}</td>
                    <td className="p-3">₹{(product.quantity * product.price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Order Summary</h2>
          <div className="bg-blue-900 rounded-lg p-4">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
              <span className="text-lg sm:text-xl">Grand Total:</span>
              <span className="text-xl sm:text-2xl font-bold">₹{grandTotal.toFixed(2)}</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
              <span className="text-lg sm:text-xl">Savings: {savingsPercentage}%</span>
              <span className="text-xl sm:text-2xl font-bold">- ₹{savings.toFixed(2)}</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <span className="text-lg sm:text-xl">Total Amount:</span>
              <span className="text-xl sm:text-2xl font-bold">₹{order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Payment Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-green-900 rounded-lg p-4 flex items-center">
              <CheckCircle className="text-2xl mr-3 text-green-400" />
              <div>
                <p className="font-semibold">Payment Status</p>
                <p>PAID</p>
              </div>
            </div>
            <div className="bg-green-900 rounded-lg p-4 flex items-center">
              <CreditCard className="text-2xl mr-3 text-green-400" />
              <div>
                <p className="font-semibold">Payment Mode</p>
                <p>CARD</p>
              </div>
            </div>
            <div className="bg-green-900 rounded-lg p-4 flex items-center">
              <Truck className="text-2xl mr-3 text-green-400" />
              <div>
                <p className="font-semibold">Delivery Status</p>
                <p>{order.status.toUpperCase()}</p>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
}

export default InvoiceTemplate;
