import orderModel from "../../models/order.model.js";
import mongoose from "mongoose";
import cartModel from "../../models/carts.model.js";

export const createOrder = async (req, res) => {
  try {
    const { total_amount, shipping_address, payment_method, items, paymentId } =
      req.body;
    console.log("req.body", req.body);

    const userId = req.user._id;
    const newOrder = new orderModel({
      userId,
      total_amount,
      shipping_address,
      payment_method,
      items,
      paymentId,
    });
    await newOrder.save();
    await cartModel.findOneAndDelete({ userId });
    // console.log('cart after order', cart);
    res
      .status(201)
      .json({ success: true, message: "Order created successfully", newOrder });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const getOrdersByUserId = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await orderModel
      .find({ userId })
      .populate("userId")
      .populate("items.productId");
    res
      .status(200)
      .json({ success: true, message: "Orders fetched successfully", orders });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

//get order By sellerID
// export const getOrdersBySellerId = async (req, res) => {
//     try {
//         const sellerId = req.user._id;
//         console.log('sellerId', sellerId);
//         const orders = await orderModel.findById({ sellerId });
//         console.log('orders',orders);
//         res.status(200).json({ success: true, message: 'Orders fetched successfully', orders });
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Server error', error: error.message });
//     }
// }

//get order By product ID

export const getOrdersBySellerId = async (req, res) => {
  try {
    const sellerId = req.params.id;

    const sellerObjectId = new mongoose.Types.ObjectId(sellerId);

    const orders = await orderModel
      .find()
      .populate({
        path: "items.productId",
        select: "name price frontImage sellerId",
      })
      .populate("userId", "username email")
      .lean();


    const sellerOrders = orders
      .map((order) => {
        // keep only items from this seller
        const sellerItems = order.items.filter(
          (item) =>
            item.productId?.sellerId?.toString() === sellerObjectId.toString()
        );

        // if the order contains any of this seller’s items, keep it
        if (sellerItems.length > 0) {
          return {
            ...order,
            items: sellerItems, // only include this seller’s items
          };
        }
        return null;
      })
      .filter(Boolean); // remove nulls

    // console.log("✅ All Orders:", orders.length);
    // console.log("✅ Seller Orders:", sellerOrders.length);


    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      orders:sellerOrders,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

//update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;
    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      updatedOrder,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const getSellerOrderStats = async (req, res) => {
  try {
    const sellerId = req.user?._id;

    // Aggregate orders by seller & status
    const stats = await orderModel.aggregate([
      { $unwind: "$items" }, // flatten items array
      {
        $lookup: {
          from: "products",
          localField: "items.productId",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      { $match: { "product.sellerId": new mongoose.Types.ObjectId(sellerId) } },
      {
        $group: {
          _id: {
            status: "$status",
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.status",
          monthly: {
            $push: { month: "$_id.month", count: "$count" },
          },
          total: { $sum: "$count" },
        },
      },
    ]);

    // Format response
    const response = {
      pending: { total: 0, monthly: [] },
      shipped: { total: 0, monthly: [] },
      delivered: { total: 0, monthly: [] },
      cancelled: { total: 0, monthly: [] },
    };

    const products = {
      pending: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0,
    };

    stats.forEach((s) => {
      const status = s._id?.toLowerCase();
      if (products.hasOwnProperty(status)) {
        products[status] = s.total || 0;
      }
    });

    stats.forEach((s) => {
      const status = s._id.toLowerCase();
      if (response[status]) {
        response[status].total = s.total;
        response[status].monthly = s.monthly;
      }
    });

    res.status(200).json({
      success: true,
      message: "Seller order stats fetched successfully",
      data: { response, products },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      errors: error.message,
    });
  }
};

export const getIncomeBySellerId = async (req, res) => {
  try {
    const sellerId = req.user?._id;

    // const stats = await orderModel.aggregate([
    //   { $unwind: "$items" }, // flatten items array
    //   {
    //     $lookup: {
    //       from: "products",
    //       localField: "items.productId",
    //       foreignField: "_id",
    //       as: "product",
    //     },
    //   },
    //   { $unwind: "$product" },
    //   { $match: { "product.sellerId": new mongoose.Types.ObjectId(sellerId) } },
    //   {
    //     $group: {
    //       _id: {
    //         status: "$status",
    //         month: { $month: "$createdAt" },
    //       },
    //       totalAmount: {$sum: { $multiply: ["$items.quantity", "$items.price"] },
    //       }, // calculate total_amount
    //       sales: { $sum: 1 }, // count number of items/orders
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: "$_id.status",
    //       monthly: {
    //         $push: {
    //           month: "$_id.month",
    //           totalAmount: "$totalAmount",
    //           sales: "$sales",
    //         },
    //       },
    //       totalIncome: { $sum: "$totalAmount" }, // total income per status
    //       totalSales: { $sum: "$sales" }, // total sales per status
    //     },
    //   },
    // ]);

    const stats = await orderModel.aggregate([
      { $unwind: "$items" }, // flatten items array
      {
        $lookup: {
          from: "products",
          localField: "items.productId",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      { $match: { "product.sellerId": new mongoose.Types.ObjectId(sellerId) } },
      {
        $group: {
          _id: {
            status: "$status",
            month: { $month: "$createdAt" },
          },
          totalAmount: { $first: "$total_amount" }, // take total_amount from order directly
          sales: { $sum: 1 }, // number of orders
        },
      },
      {
        $group: {
          _id: "$_id.status",
          monthly: {
            $push: {
              month: "$_id.month",
              totalAmount: "$totalAmount",
              sales: "$sales",
            },
          },
          totalIncome: { $sum: "$totalAmount" }, // sum of total_amount for that status
          totalSales: { $sum: "$sales" },
        },
      },
    ]);

    // console.log("orders for income:", stats);

    res.status(200).json({
      success: true,
      message: "Income fetched successfully",
      stats,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
