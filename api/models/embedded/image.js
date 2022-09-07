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
            type: mongoose.Mixed,
            default:
                'https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg'
        },
        contentType: {
            type: String,
            default: 'url'
        }
    },
    _options
);
export default imageSchema;
