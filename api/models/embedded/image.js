import mongoose from 'mongoose';
const { Schema } = mongoose;
const _options = {
    timestamps: true
};

const imageSchema = Schema(
    {
        data: Buffer,
        contentType: String
    },
    _options
);

export default imageSchema;
