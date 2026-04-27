import { connectToDatabase } from './db/connect.js';
import Order from './models/Order.js';

export default async function handler(req, res) {
  try {
    await connectToDatabase();
  } catch (error) {
    return res.status(500).json({ message: "Database connection failed", error: error.message });
  }

  if (req.method === 'GET') {
    try {
      const orders = await Order.find({}).sort({ createdAt: -1 });
      const mappedOrders = orders.map(o => {
        const obj = o.toObject();
        obj.id = obj._id.toString();
        return obj;
      });
      return res.status(200).json(mappedOrders);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const { customer, items, financials } = req.body;
      
      const newOrder = await Order.create({
        customer,
        items,
        financials,
        status: 'Pending'
      });
      
      const obj = newOrder.toObject();
      obj.id = obj._id.toString();
      return res.status(201).json(obj);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  if (req.method === 'PUT') {
    try {
      const { id, status } = req.body;
      if (!id || !status) return res.status(400).json({ message: "Order ID and status are required" });
      
      const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });
      if (!updatedOrder) return res.status(404).json({ message: "Order not found" });
      
      const obj = updatedOrder.toObject();
      obj.id = obj._id.toString();
      return res.status(200).json(obj);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  res.status(405).json({ message: "Method not allowed" });
}
