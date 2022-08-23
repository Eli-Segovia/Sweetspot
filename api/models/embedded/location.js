import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true,
            index: '2dsphere'
        }
    },
    formattedAddress: String,
    address: Number,
    street: String,
    state: String,
    city: String,
    zip: Number
});

export default locationSchema;
