import mongoose from 'mongoose';
import { imageSchema, locationSchema } from './embedded/index.js';
import slugify from 'slugify';
import geocoder from '../utils/geocoder.js';

const { Schema, model } = mongoose;

const StoreSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 characters']
    },

    alternateName: {
        type: String,
        required: false
    },

    fullName: {
        type: String,
        unique: true
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

// Hooks/Middleware
StoreSchema.pre('save', function (next) {
    if (!this.alternateName) {
        this.alternateName = this.owner;
    }
    this.fullName = `${this.name}-${this.owner}`;

    // create slug
    this.slug = slugify(this.fullName, { lower: true });

    next();
});

// Geocode and create location
/* TODO: finish implementing this properly
// StoreSchema.pre('save', async function (next) {
//     const loc = await geocoder.geocode(this.address);
// });
*/

export default model('Store', StoreSchema);
