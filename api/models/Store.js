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
        /* Below should be used for prod
        type: Schema.Types.ObjectId,
        required: [true, 'Stores need an owner to be created'],
        ref: 'User' 
        */

        /* Below is used for testing purposes for creating a Store */
        type: String,
        required: [true, 'Stores need an owner to be created'],
        immutable: true
    },

    admins: [
        {
            /* Uncomment during prod
            type: Schema.Types.ObjectId,
            */
            /* use for testing */
            type: String,
            required: [true, 'You are trying to do something invalid'],
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
        default: () => ({})
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
