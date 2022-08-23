import mongoose from 'mongoose';
import { imageSchema, locationSchema } from './embedded';
const Schema = mongoose.Schema;

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

    emails: [String],

    image: imageSchema,

    description: {
        type: String,
        required: [true, 'Please provide description'],
        maxlength: [500, 'Description cannot be longer than 500 characters']
    },

    alternateAddress: String,

    location: {
        type: locationSchema,
        required: false
    },

    products: [
        {
            type: Schema.Types.ObjectId,
            refs: 'Product'
        }
    ],
    averageRating: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [10, 'Rating must be no more than 10']
    }
});

export default StoreSchema;
