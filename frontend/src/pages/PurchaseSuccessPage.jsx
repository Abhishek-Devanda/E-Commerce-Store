import { ArrowRight, CheckCircle, ShoppingBag } from 'lucide-react';
import Confetti from 'react-confetti';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import toaster from 'react-hot-toast';
import axios from '../lib/axios';
import { useCartStore } from '../stores/useCartStore';

const PurchaseSuccessPage = () => {
  const [processing, setProcessing] = useState(true);
  const [orderNumber, setOrderNumber] = useState(null);

  const { emptyCart } = useCartStore();

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get('session_id');
    const handleCheckoutSuccess = async (sessionId) => {
      try {
        const res = await axios.post('/payments/checkout-success', { session_id: sessionId });
        setOrderNumber(res.data.orderId);
        emptyCart();
      } catch (error) {
        console.error('Error fetching checkout session:', error);
        toaster.error('Invalid Checkout Session Id', { id: 'fetch-order-details' });
      } finally {
        setProcessing(false);
      }
    };

    if (sessionId) {
      handleCheckoutSuccess(sessionId);
    } else {
      setProcessing(false);
      toaster.error('No Order ID Found', { id: 'No-order-id' });
    }
  }, [emptyCart]);

  if (processing) {
    return <LoadingSpinner />;
  }

  return (
    <div className='relative h-screen flex items-center justify-center px-4 py-8'>
      {orderNumber && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          gravity={0.1}
          style={{ zIndex: 99 }}
          numberOfPieces={700}
          recycle={false}
        />
      )}
      <div className='relative max-w-md w-full bg-gray-800 rounded-lg shadow-xl overflow-hidden'>
        <div className='p-4 sm:p-6 md:p-8'>
          <div className='flex justify-center mb-4'>
            <CheckCircle className='text-emerald-400 w-12 h-12 sm:w-16 sm:h-16' />
          </div>
          <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-center text-emerald-400 mb-2'>
            Purchase Successful!
          </h1>
          <p className='text-gray-300 text-center mb-2'>
            Thank you for your order. We&apos;re processing it now.
          </p>
          <p className='text-emerald-400 text-center text-sm mb-4'>
            Check your Email for order details and updates.
          </p>
          <div className='bg-gray-700 rounded-lg p-4 mb-6'>
            <div className='flex items-center justify-between mb-2'>
              <span className='text-sm text-gray-400'>Order Number</span>
              <span className='text-sm font-semibold text-emerald-400'>{orderNumber}</span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-gray-400'>Estimated Delivery</span>
              <span className='text-sm font-semibold text-emerald-400'>Thanks for Money</span>
            </div>
          </div>
          <div className='space-y-4'>
            <Link
              to='/account'
              className=' bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center'
            >
              <ShoppingBag className='mr-2' size={18} />
              My Orders
            </Link>
            <Link
              to='/'
              className=' bg-gray-700 hover:bg-gray-600 text-emerald-400 font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center'
            >
              Continue Shopping
              <ArrowRight className='ml-2' size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSuccessPage;
