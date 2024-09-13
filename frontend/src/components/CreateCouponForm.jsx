import { Gift, NotepadText, Percent, PlusCircle } from "lucide-react";
import PrimaryButton from "./PrimaryButton";
import InputField from "./InputField";
import { useState } from "react";
import { useCartStore } from "../stores/useCartStore";
import toaster from "react-hot-toast";
import { motion } from "framer-motion";

const CreateCouponForm = () => {
    const [code, setCode] = useState("");
    const [discountPercentage, setDiscountPercentage] = useState("");
    const [category, setCategory] = useState("");

    const { loading, createCoupon } = useCartStore();
    const couponData = { 
        code, 
        discountPercentage, 
        category, 
        expiry: Date.now() + (30 * 24 * 60 * 60 * 1000), 
        isActive: true 
    };

    async function handleCreateCoupon(e) {
        e.preventDefault();
        try {
            await createCoupon(couponData);
            setCode("");
            setDiscountPercentage("");
            setCategory("");
        } catch (error) {
            console.log(error);
            toaster.error("Error creating coupon", { id: 'createCoupon' });
        }
    }

    return (
        <motion.div
            className='bg-gray-800 shadow-lg rounded-lg p-6 md:p-8 mb-8 max-w-md mx-auto'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <form onSubmit={handleCreateCoupon} className='space-y-4'>
                
                <InputField 
                    labelText={"Code*"} 
                    id={"code"} 
                    type={"text"} 
                    placeholder={"Enter Coupon Code"} 
                    value={code} 
                    onChange={(e) => setCode(e.target.value.toUpperCase())} 
                    icon={Gift} 
                />

                <InputField 
                    labelText={"Discount*"} 
                    id={"discount"} 
                    type={"number"} 
                    placeholder={"Enter Discount Percentage"} 
                    value={discountPercentage} 
                    onChange={(e) => setDiscountPercentage(e.target.value)} 
                    icon={Percent} 
                />

                <InputField 
                    labelText={"Category*"} 
                    id={"category"} 
                    type={"text"} 
                    placeholder={"Enter Category"} 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)} 
                    icon={NotepadText} 
                />

                <PrimaryButton 
                    type='submit' 
                    loadingText={'Creating Coupon...'} 
                    loadingState={loading} 
                    icon={PlusCircle} 
                    btnName='Create Coupon' 
                />

            </form>
        </motion.div>
    );
}

export default CreateCouponForm;
