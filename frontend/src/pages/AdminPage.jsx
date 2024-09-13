import { BaggageClaim, Gift, ShoppingBasket } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import AllProductsList from "../components/AllProductsList";
import PageHeading from "../components/PageHeading";
import CouponsList from "../components/CouponsList";
import AllOrdersList from "../components/AllOrdersList";

import { useProductStore } from "../stores/useProductStore";
import { useCartStore } from "../stores/useCartStore";

const tabs = [
  { id: "orders", label: "Orders", icon: BaggageClaim },
  { id: "products", label: "Products", icon: ShoppingBasket },
  { id: "coupons", label: "Coupons", icon: Gift },
];

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const { fetchAllProducts } = useProductStore();
  const { fetchCoupons } = useCartStore();

  useEffect(() => {
    fetchAllProducts();
    fetchCoupons();
  }, [fetchAllProducts, fetchCoupons]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 py-10 sm:py-16">
        <motion.h1
          className="text-4xl font-bold mb-6 sm:mb-8 text-emerald-400 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <PageHeading
            textSize="text-4xl sm:text-5xl"
            mainHeading="Admin Dashboard"
          />
        </motion.h1>

        <div className="flex justify-center mb-6 sm:mb-8 flex-wrap gap-2 sm:gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-3 py-2 sm:px-4 sm:py-2 rounded-md transition-colors duration-200 ${
                activeTab === tab.id
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <tab.icon className="mr-2 h-5 w-5" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative z-10">
          {activeTab === "products" && <AllProductsList />}
          {activeTab === "orders" && <AllOrdersList />}
          {activeTab === "coupons" && <CouponsList />}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
