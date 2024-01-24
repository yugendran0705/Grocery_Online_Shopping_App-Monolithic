const { CustomerService } = require('../services/customer-service');
const service = new CustomerService();
const { DefinedError } = require('../utils/error-handler');

const signup = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body
        if (!email || !password || !phone || !name) {
            res.status(400).json({ message: "Email ,name ,password and phone are required" });
            return
        }
        const customer = await service.signUp(req.body);
        res.status(200).json({ customer });
    }
    catch (err) {
        if (err instanceof DefinedError) {
            res.status(err.statusCode).json({ message: err.message });
            return
        }
        res.status(500).json({ message: "Error signing up" });
    }
}

const signin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required" });
            return
        }
        const customer = await service.signIn(email, password);
        res.status(200).json({ customer });
    }
    catch (err) {
        if (err instanceof DefinedError) {
            res.status(err.statusCode).json({ message: err.message });
            return
        }
        res.status(500).json({ message: "Error signing in" });
    }
}

const addNewAddress = async (req, res) => {
    try {
        const { _id } = req.user
        const { street, postalcode, city, country } = req.body
        if (!_id || !street || !postalcode || !city || !country) {
            res.status(400).json({ message: "Customer id, street, postalcode, city and country are required" });
            return
        }
        const address = await service.addNewAddress(req.body);
        res.status(200).json({ address });
    }
    catch (err) {
        if (err instanceof DefinedError) {
            res.status(err.statusCode).json({ message: err.message });
            return
        }
        res.status(500).json({ message: "Error adding address" });
    }
}

const getCustomer = async (req, res) => {
    try {
        const { _id } = req.user
        if (!_id) {
            res.status(400).json({ message: "Customer id is required" });
            return
        }
        const customer = await service.getCustomer(_id);
        res.status(200).json({ customer });
    }
    catch (err) {
        if (err instanceof DefinedError) {
            res.status(err.statusCode).json({ message: err.message });
            return
        }
        res.status(500).json({ data: err, message: "error getting customer" })
    }
}

const getCustomerOrders = async (req, res) => {
    try {
        const { _id } = req.user
        if (!_id) {
            res.status(400).json({ message: "Customer id is required" });
            return
        }
        const customer = await service.getCustomer(_id);
        const orders = customer.orders
        res.status(200).json({ orders });
    }
    catch (err) {
        if (err instanceof DefinedError) {
            res.status(err.statusCode).json({ message: err.message });
            return
        }
        res.status(500).json({ message: "error getting customer orders" })
    }
}

const getCustomerWishlist = async (req, res) => {
    try {
        const { _id } = req.user
        if (!_id) {
            res.status(400).json({ message: "Customer id is required" });
            return
        }
        const customer = await service.getWishlist(_id);
        const wishlist = customer.wishlist
        res.status(200).json({ wishlist });
    }
    catch (err) {
        if (err instanceof DefinedError) {
            res.status(err.statusCode).json({ message: err.message });
            return
        }
        res.status(500).json({ message: "error getting customer wishlist" })
    }
}

module.exports = {
    signup,
    signin,
    addNewAddress,
    getCustomer,
    getCustomerOrders,
    getCustomerWishlist
}