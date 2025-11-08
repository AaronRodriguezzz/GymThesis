import Products from "../models/Products.js";
import Product from "../models/Products.js";
import ProductSales from "../models/Sales.js";
import { deleteImage, uploadImage } from "../services/cloudinary.service.js";

export const createProduct = async (req, res) => {

    try{
        const productExist = await Product.findOne({ name: req.body.name, sku: req.body.sku });

        if(productExist){
            return res.status(409).json({ success: false, message: 'Product already exists'});
        }

        const image = await uploadImage(req.body.image)
        const product = new Product({ ...req.body, image });
        await product.save();

        res.status(201).json({ success: true, product });
    }catch(err){
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
}

export const soldProduct = async (req, res) => {

    const { 
        products, 
        totalPrice,
        modeOfPayment, 
        paymentAmount, 
        change 
    } = req.body;

    if(!req.body){
        return res.status(409).json({ success: false, message: 'Payload did not receive'});
    }

    try{

        await Promise.all(
            products.map(product => 
                Product.findByIdAndUpdate(
                    product.id,
                    { stock: product.stock - product.quantity},
                    { new: true }
                ),
            )
        )

        const sales = new ProductSales ({ 
            products: products.map(p => ({ 
                product: p.id,
                quantity: p.quantity
            })),
            totalPrice,
            modeOfPayment,
            paymentAmount,
            change
        })

        await sales.save();

        res.status(200).json({ success: true})
        
    }catch(err){
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
}

export const updateProduct = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        
        if(!product){
            return res.status(404).json({ success: false, message: 'product not found' })
        }

        let image;

        if(typeof req.body.image === 'string'){
            await deleteImage(product.image.imagePublicId);
            image = await uploadImage(req.body.image)
        }

        product.set({ ...req.body, image })
        await product.save();

        res.status(200).json({ success: true, message: 'Equipment successfully updated' })

    }catch(err){
        res.status(500).json({ success: false, message: err.message });
    }
}

export const getProductById = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id)

        if(!product){
            return res.status(404).json({ success: false, message: 'product not found' })
        }

        res.status(200).json({ success: true, product })

    }catch(err){
        res.status(500).json({ success: false, message: err.message });
    }
}

export const getProducts = async (req, res) => {
    try{
        const page = req.query.page || 1;
        const limit = req.query.limit || 20;
        const skip = (page - 1) * limit;
        const searchTerm = req.query.searchTerm || '';
        const category = req.query.category || '';

        let query = {};

        if(searchTerm){
            query.$or = [
                { name: { $regex: searchTerm, $options: "i" } },
                { sku: { $regex: searchTerm, $options: "i" } },
            ]
        }

        if(category && category !== 'All'){
            query.category = category
        }

        const products = await Product.find(query).skip(skip).limit(limit)
        
        const totalProducts = await Product.countDocuments(query);

        res.status(200).json({
            success: true,
            totalPages: Math.ceil(totalProducts / limit),
            page,
            products,
            totalProducts
        })
        
    }catch(err){
        res.status(500).json({ success: false, message: err.message });
    }
}

export const getProductSales = async (req, res) => {
    try{
        const page = req.query.page || 1;
        const limit = req.query.limit || 20;
        const skip = (page - 1) * limit;
        const searchTerm = req.query.searchTerm || '';
        const category = req.query.category || '';

        let query = {};

        if(searchTerm){
            query.$or = [
                { name: { $regex: searchTerm, $options: "i" } },
                { sku: { $regex: searchTerm, $options: "i" } },
            ]
        }

        if(category && category !== 'All'){
            query.category = category
        }

        const sales = await ProductSales.find(query)
        .skip(skip)
        .limit(limit)
        .populate('products.product');      

        const totalSalesCount = await ProductSales.countDocuments(query);

        res.status(200).json({
            success: true,
            totalPages: Math.ceil(totalSalesCount / limit),
            page,
            sales,
            totalSalesCount
        })
        
    }catch(err){
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
}