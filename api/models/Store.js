import mongoose from 'mongoose';

const StoreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 characters']
    },
    slug: String,
    url: String,
    description: {
        type: String,
        required: [true, 'Please provide description'],
        maxlength: [500, 'Description cannot be longer than 500 characters']
    },
    alternateAddress: String
});
