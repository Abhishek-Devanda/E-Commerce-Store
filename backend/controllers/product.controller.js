import Product from '../Models/product.model.js';
import cloudinary from '../lib/cloudinary.js';

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({products});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });

    }

}

export const getFeaturedProduct = async (req, res) => {
    try {
        const featuredProducts = await Product.find({ isFeatured: true });
        if (!featuredProducts) {
            return res.status(404).json({ message: 'Featured Products not found' });
        } 
        return res.status(200).json({featuredProducts});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error', error: error.message });

    }
}

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, countInStock, image, category } = req.body;
        if (!name || !description || !price || !countInStock || !image || !category ) {
            return res.status(400).json({ message: "All Fields are required"});
        }

        let imageURL = null;

        if (image) {
            let cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: 'products' })
            imageURL = cloudinaryResponse.secure_url 
        }
        const product = new Product({
            name,
            description,
            price,
            countInStock,
            image: imageURL || null,
            category,

        });
        await product.save();
        res.status(201).json({ message: 'Product Created Successfully', product });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Server Error", error});
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        if (product.image) {
            let public_id = product.image.split('/').pop().split('.')[0];
            try {
                await cloudinary.uploader.destroy(`products/${public_id}`);
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: 'Cloudnary Error', error: error.message });
            }
        }
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Product Deleted Successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error', error: error.message });

    }
}

export const toggleFeaturedProduct = async (req, res) => {
    const productID = req.params.id;
    try {
        const product = await Product.findById(productID);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        product.isFeatured = !product.isFeatured;
        await product.save();
        res.status(200).json({product});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error', error: error.message });

    }

}

export const getRecommendedProducts = async (req, res) => {
    try {
        const recommendedProducts = await Product.aggregate(
            [{
                $sample: { size: 3 },
            },
            {
                $project: { _id: 1, name: 1, description: 1, price: 1, image: 1, category: 1 }
            }
            ]);
        if (!recommendedProducts) {
            return res.status(404).json({ message: 'Recommended Products not found' });
        }
        res.status(200).json(recommendedProducts);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}

export const getProductsByCategory = async (req, res) => {
    const category = req.params.id;
    try {
        const products = await Product.find({ category });

        if (!products) {
            return res.status(404).json({ message: 'Products not found' });
        }
        res.status(200).json({ products });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error', error: error.message });

    }
}