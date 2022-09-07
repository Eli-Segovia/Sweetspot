import mongoose from 'mongoose';
import slugify from 'slugify';
import countrycitystate from 'countrycitystatejson';
import { imageSchema } from './embedded/index.js';
import geocoder from '../utils/geocoder.js';
import { states, findSortedCities } from '../utils/locations.js';

const { Schema, model } = mongoose;

/* ------ start Children Schemas ----- */
const locationSchema = new Schema({
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: [
                function () {
                    return this.location.coordinates ? true : false;
                },
                'Type must be specified to use location'
            ]
        },
        coordinates: {
            type: [Number],
            required: [
                function () {
                    return this.location.type ? true : false;
                },
                'Coordinates must be specified to use location'
            ],
            index: '2dsphere'
        }
    },
    formattedAddress: String,
    address: {
        type: Number,
        required: [
            function () {
                return this.street ? true : false;
            },
            'Address is required if street is provided'
        ]
    },
    street: {
        type: String,
        required: [
            function () {
                return this.address ? true : false;
            },
            'Street is required if address is provided'
        ]
    },
    state: {
        type: String,
        required: true,
        enum: states
    },
    city: {
        type: String,
        required: true,
        validate: {
            validator: async function (city) {
                const cities = await countrycitystate.getCities(
                    'US',
                    this.state
                );
                return findSortedCities(cities, city) >= 0;
            }
        }
    },
    zip: String
});

locationSchema.pre('save', async function (next) {
    // Address that geocoder will encode
    const tempAddress = `${this.address || ''} ${this.street || ''} ${
        this.city
    }, ${this.state} ${this.zip || ''}`.trim();

    // Get geocode data
    const loc = await geocoder.geocode(tempAddress);

    // Set formatted Address
    this.formattedAddress = loc[0].formattedAddress;

    // Set Zip Code
    this.zip = loc[0].zipcode;

    // Set location
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude]
    };

    next();
});
/* --------- End Children Schemas ------------ */

const Image = model('Image', imageSchema);

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
        type: Image.schema,
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
            refs: 'Products',
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
// StoreSchema.pre('save', async function (next) {
//     const loc = await geocoder.geocode(this.address);
// });

export default model('Store', StoreSchema);
