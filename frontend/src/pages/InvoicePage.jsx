import InvoiceTemplate from '../components/InvoiceTemplate';
import { useOrderStore } from '../stores/useOrderStore';
import LoadingSpinner from '../components/LoadingSpinner';

import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const InvoicePage = () => {
  const { order, fetchOrderDetails, loading } = useOrderStore()
  const { orderId } = useParams()

  useEffect(() => {
    if (!order && orderId) {
      fetchOrderDetails(orderId);
    }
  }, [order, orderId, fetchOrderDetails]);

  if (loading || !order) {
    return <LoadingSpinner />
  }


  return (
    <InvoiceTemplate order={order} />
  )


}
export default InvoicePage