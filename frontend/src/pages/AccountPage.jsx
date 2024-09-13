import { BaggageClaim, User } from "lucide-react";
import PageHeading from "../components/PageHeading"
import { motion } from "framer-motion"
import { useState } from "react";
import MyOrdersList from "../components/MyOrdersList";
import UserProfile from "../components/UserProfile";

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("orders");

  const tabs = [
    { id: "orders", label: "Orders", icon: BaggageClaim },
    { id: "profile", label: "Profile", icon: User },
  ];
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
            mainHeading="My Account"
          />
        </motion.h1>

        <div className="flex justify-center mb-6 sm:mb-8 flex-wrap gap-2 sm:gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-3 py-2 sm:px-4 sm:py-2 rounded-md transition-colors duration-200 ${activeTab === tab.id
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
          {activeTab === "orders" && <MyOrdersList />}
          {activeTab === "profile" && <UserProfile />}
        </div>
      </div>

    </div>
  );
};
export default AccountPage;