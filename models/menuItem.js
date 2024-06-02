const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    allergens: {
        type: [String],
        required: true
    }
})

const MenuItemModel = mongoose.model("MenuItemModel", menuItemSchema);
module.exports = MenuItemModel;