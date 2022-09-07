import mongoose from 'mongoose';
import { imageSchema } from './embedded/index.js';

const { Schema, model } = mongoose;

const Image = model('Image', imageSchema);

const ProductSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Product name is required']
    },

    description: {
        type: String,
        required: [true, 'Product description is required']
    },

    price: {
        type: Number,
        required: [true, 'Product price is required']
    },

    images: {
        type: [Image.schema],
        validate: [
            (imgArr) => imgArr.length <= 5,
            '{PATH} exceeds the limit of 5'
        ],
        required: false,
        default: [() => ({})]
    }
});

const ProductsSchema = new Schema({
    products: {
        type: [ProductSchema]
    }
});

export default model('Products', ProductSchema);
