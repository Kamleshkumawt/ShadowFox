import paymentModel from '../../models/payments.model.js';

export const createPayment = async (req, res) => {
    try {
        const {amount, payment_method, orderId } = req.body;
        const userId = req.user.id;

        const generateRandomCode = (length = 16) => {
            const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            return Array.from({ length }, () => characters[Math.floor(Math.random() * characters.length)]).join("");
        };

        const transactionId = generateRandomCode();

        const payment = await paymentModel.create({
            userId,
            orderId,
            amount,
            payment_method,
            transactionId,
        });

        res.status(201).json(payment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const callbackPayment = async (req, res) => {
    try {
        const { transactionId, amount, payment_method } = req.body;
        const payment = await paymentModel.findOne({ transactionId });
        if (!payment) {
            return res.status(404).json({ error: "Payment not found" });
        }
        payment.payment_method = payment_method;
        payment.amount = amount;
        payment.payment_status = "completed";
        payment.paid_at = new Date();
        payment.isCompleted = true;
        await payment.save();

        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}