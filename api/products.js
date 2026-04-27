import { connectToDatabase } from './db/connect.js';
import Product from './models/Product.js';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (base64Image) => {
  if (!base64Image) return null;
  if (base64Image.startsWith('http') || base64Image.startsWith('/images')) {
    return base64Image;
  }
  try {
    const result = await cloudinary.uploader.upload(base64Image, {
      folder: 'atelier_products',
    });
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(req, res) {
  try {
    await connectToDatabase();
  } catch (error) {
    return res.status(500).json({ message: "Database connection failed", error: error.message });
  }

  if (req.method === 'GET') {
    try {
      const { id, category } = req.query;
      if (id) {
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        const productObj = product.toObject();
        productObj.id = productObj._id.toString();
        return res.status(200).json(productObj);
      }
      
      const filter = category ? { category } : {};
      const products = await Product.find(filter).sort({ createdAt: -1 });
      
      const mappedProducts = products.map(p => {
        const obj = p.toObject();
        obj.id = obj._id.toString();
        return obj;
      });
      
      return res.status(200).json(mappedProducts);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const { image, ...rest } = req.body;
      const imageUrl = await uploadImage(image);
      
      const newProduct = await Product.create({
        ...rest,
        image: imageUrl || "/images/jacket1.jpeg"
      });
      
      const obj = newProduct.toObject();
      obj.id = obj._id.toString();
      return res.status(201).json(obj);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  if (req.method === 'PUT') {
    try {
      const { id, image, ...rest } = req.body;
      if (!id) return res.status(400).json({ message: "Product ID is required" });
      
      const updateData = { ...rest };
      if (image && !image.startsWith('http') && !image.startsWith('/images')) {
        updateData.image = await uploadImage(image);
      } else if (image) {
        updateData.image = image;
      }

      const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
      
      const obj = updatedProduct.toObject();
      obj.id = obj._id.toString();
      return res.status(200).json(obj);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      if (!id) return res.status(400).json({ message: "Product ID is required" });
      
      const deleted = await Product.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ message: "Product not found" });
      
      return res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  res.status(405).json({ message: "Method not allowed" });
}
