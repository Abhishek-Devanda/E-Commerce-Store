import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, IndianRupee, Tag, BadgeInfo, Calculator } from "lucide-react";
import InputField from "./InputField";
import PrimaryButton from "./PrimaryButton";
import { useProductStore } from "../stores/useProductStore";

const categories = ["jeans", "t-shirts", "shoes", "glasses", "jackets", "suits", "bags"];

function CreateProductForm() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const [fileName, setFileName] = useState("");
    const [countInStock, setCountInStock] = useState("");

    const { createProduct, loading } = useProductStore();

    const handleImageChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setFileName(file.name);
                setImage(reader.result);
            };
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createProduct({ name, description, price, category, image, countInStock });
            setName("");
            setDescription("");
            setPrice("");
            setCategory("");
            setImage("");
            setCountInStock("");
        } catch (error) {
            console.log("Error Creating a Product", error);
        }
    };

    return (
        <motion.div
            className="bg-gray-800 shadow-lg rounded-lg p-6 sm:p-8 mb-8 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <InputField
                    labelText={"Name*"}
                    id={"name"}
                    type={"text"}
                    placeholder={"Product name"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    icon={Tag}
                />

                <InputField
                    labelText={"Description*"}
                    id={"description"}
                    type={"text"}
                    placeholder={"Product Description"}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    icon={BadgeInfo}
                />

                <InputField
                    labelText={"Price*"}
                    id={"Price"}
                    type={"number"}
                    placeholder={"Product Price"}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    icon={IndianRupee}
                />

                <InputField
                    labelText={"Count in Stock*"}
                    id={"countInStock"}
                    type={"number"}
                    placeholder={"Count in Stock"}
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                    icon={Calculator}
                />

                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-300">
                        Category*
                    </label>
                    <select
                        id="category"
                        name="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mt-1 flex items-center space-x-3">
                    <input type="file" id="image" className="sr-only" accept="image/*" onChange={handleImageChange} />
                    <label
                        htmlFor="image"
                        className="cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                    >
                        <Upload className="h-5 w-5 inline-block mr-2" />
                        Product Image
                    </label>
                    {image && <span className="text-sm text-gray-400 truncate">{fileName}</span>}
                </div>

                <PrimaryButton type="submit" loadingText={"Creating Product..."} loadingState={loading} icon={PlusCircle} btnName="Create Product" />
            </form>
        </motion.div>
    );
}

export default CreateProductForm;
