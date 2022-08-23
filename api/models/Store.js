import mongoose from 'mongoose';
import { imageSchema, locationSchema } from './embedded/index.js';
const { Schema, model } = mongoose;

const StoreSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 characters']
    },

    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    admins: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],

    slug: String,

    url: String,

    emails: [
        {
            type: String,
            required: [true, 'Please provide email']
        }
    ],

    image: {
        type: imageSchema,
        required: false
    },

    description: {
        type: String,
        required: [true, 'Please provide description'],
        maxlength: [500, 'Description cannot be longer than 500 characters']
    },

    alternateAddress: {
        type: String,
        required: false
    },

    location: {
        type: locationSchema,
        required: false
    },

    products: [
        {
            type: Schema.Types.ObjectId,
            refs: 'Product',
            required: false
        }
    ],
    averageRating: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [10, 'Rating must be no more than 10'],
        required: false
    }
});

export default model('Store', StoreSchema);
