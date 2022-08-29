import mongoose from 'mongoose';
import defaults from './defaults.js';
const { defaultImage } = defaults;
const { Schema } = mongoose;

const _options = {
    timestamps: true
};

const imageSchema = Schema(
    {
        data: {
            type: Buffer,
            default: Buffer.from(defaultImage, 'base64')
        },
        contentType: {
            type: String,
            default: 'image/png'
        }
    },
    _options
);
export default imageSchema;
