const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');

const createPaymentIntent = async (req, res) => {
    const { cart, shipping_fee, total_amount } = req.body;

    const calculateOrderAmount = () => {
        // Replace this constant with a calculation of the order's amount
        // Calculate the order total on the server to prevent
        // people from directly manipulating the amount on the client
        return (shipping_fee + total_amount) * 10;
    }

    try {
        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: calculateOrderAmount(),
            currency: 'inr',
        })
        return res.status(StatusCodes.OK).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        throw new CustomError.BadRequestError(error.message);
    }
}

module.exports = {
    createPaymentIntent
}