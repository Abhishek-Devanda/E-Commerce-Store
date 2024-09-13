import { create } from 'zustand';
import axios from '../lib/axios';
import toaster from 'react-hot-toast';
import { loadStripe } from "@stripe/stripe-js";

export const useCartStore = create((set, get) => ({
    cart: [],
    total: 0,
    subtotal: 0,

    coupons:[],
    myCoupon: null,
    appliedCoupon:null,
    isCouponApplied: false,

    loading: false,
    checkingAuth: true,


    // Coupon Functions
    getMyCoupon: async () => {
        set({ loading: true });
        try {
            const res = await axios.get('/coupons');
            set({ myCoupon: res.data.coupon, loading: false });            

        } catch (error) {
            set({myCoupon: null, loading: false });
            console.log(error.response.data.message || 'No response from Server');
        }
    },

    applyCoupon: async (couponCode) => {
        set({ loading: false });
        try {
            const res = await axios.post('/coupons/validate', { couponCode });
            toaster.success(res.data.message, { id: 'applyCoupon' });

            set({ loading: false });
            set({ appliedCoupon: res.data.coupon, isCouponApplied: true });

            get().calculateTotals()


        } catch (error) {
            set({ loading: false });
            console.log(error);
            toaster.error(error.response.data.message || 'No response from Server', { id: 'applyCoupon' });

        }
    },

    removeCoupon: async () => {
        set({isCouponApplied: false });
        get().calculateTotals()
    },

    createCoupon: async (couponData) => {
        set({ loading: false }); //false prenvent the loading spinner from showing up
        try {
            const res = await axios.post('/coupons', couponData);
            set({ loading: false });
            toaster.success(res.data.message, { id: 'createCoupon' });
    
            set({ coupons: [...get().coupons, couponData] });
            console.log(get().coupons)

        } catch (error) {
            set({ loading: false });
            toaster.error(error.response.data.message || 'No response from Server', { id: 'createCoupon' });
            
        }
    },

    fetchCoupons: async () => {
        set({ loading: true });
        try {
            const res = await axios.get('/coupons/admin');
            set({ coupons: res.data.coupons, loading: false });

        } catch (error) {
            set({ loading: false });
            console.log(error.response.data.message || 'No response from Server');
        }
    },

    deleteCoupon: async (couponId) => {
        set({ loading: true });
        try {
            const res = await axios.delete(`/coupons/${couponId}`);
            toaster.success(res.data.message, { id: 'deleteCoupon' });

            const newCoupons = get().coupons.filter((coupon) => coupon._id !== couponId);
            set({ coupons: newCoupons, loading: false });

        } catch (error) {
            set({ loading: false });
            toaster.error(error.response.data.message || 'No response from Server', { id: 'deleteCoupon' });

        }
     },

    //Cart Functions
    
    getCart: async () => {
        set({ loading: true });
        try {
            const res = await axios.get('/cart');
            set({ cart: res.data.cart, loading: false });
            get().calculateTotals()

        } catch (error) {
            set({ loading: false });
            toaster.error(error.response.data.message || 'No response from Server', { id: 'getCartItems' });

        }
    },

    addToCart: async (productId) => {
        set({ loading: true });
        try {
            const res = await axios.post('/cart', { productId });
            if (!res) {
                throw new Error
            }
            set({ loading: false });
            toaster.success(res.data.message, { id: 'addToCart' });
            set({ cart: res.data.cartItems });

            get().calculateTotals()

        } catch (error) {
            set({ loading: false });
            console.log(error);
            toaster.error(error.response.data.message || 'No response from Server', { id: 'addToCart' });

        }
    },

    removeFromCart: async (productId) => {
        set({ loading: false }); //false prevent the loading spinner from showing up
        try {
            const res = await axios.delete(`/cart/${productId}`);
            toaster.success(res.data.message, { id: 'removeFromCart' });

            const newCart = get().cart.filter((item) => item._id !== productId);
            set({ cart: newCart, loading: false });
            get().calculateTotals()

        } catch (error) {
            set({ loading: false });
            toaster.error(error.response.data.message || 'No response from Server', { id: 'removeFromCart' });
        }
    },

    emptyCart: async () => {
        set({ loading: true });
        try {
            const res = await axios.delete('/cart');

            set({ cart: res.data.cart }); 
            set({ loading: false });
            get().calculateTotals()

        } catch (error) {
            set({ loading: false });
            toaster.error(error.response.data.message || 'No response from Server', { id: 'emptyCart' });

        }
    },
   
    updateQuantity: async (productId, quantity) => {
        try {
            await axios.put(`/cart/${productId}`, { quantity });
            
            const newCart = get().cart.map((item) => {
                if (item._id === productId) {
                    return { ...item, quantity };
                } else {
                    return item;
                }
            });
            set({ cart: newCart });
            set({ loading: false });
            get().calculateTotals()

        } catch (error) {
            set({ loading: false });
            toaster.error(error.response.data.message || 'No response from Server', { id: 'updateQunatity' });

        }
    },

    checkoutSession: async (cart, coupon) => {
        try {
            const res = await axios.post('/payments/create-checkout-session', { couponCode: coupon ? coupon : null, products: cart });

            toaster.success(res.data.message, { id: 'orderCheckout' });

            const stripe = await loadStripe(res.data.stripePublishableKey);
            const result = await stripe.redirectToCheckout({
                sessionId: res.data.id,
            });
            if (result.error) {
                toaster.error(result.error.message, { id: 'orderCheckout' });
            }

        } catch (error) {
            toaster.error(error.response.data.message || 'No response from Server', { id: 'orderCheckout' });

        }
    },

    //For Order Summary
    calculateTotals: () => {
        const { cart, appliedCoupon, isCouponApplied } = get();
        const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        let total = subtotal;

        if (appliedCoupon && isCouponApplied) {
            const discount = subtotal * (appliedCoupon.discountPercentage / 100);
            total = subtotal - discount;
        }

        set({ subtotal, total });
    },


}))