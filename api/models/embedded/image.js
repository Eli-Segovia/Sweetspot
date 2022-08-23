const _options = {
    timestamps: true
};

const imageSchema = mongoose.Schema(
    {
        data: Buffer,
        contentType: String
    },
    _options
);

export default imageSchema;
