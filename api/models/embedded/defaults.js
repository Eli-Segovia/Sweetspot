const defaults = {
    defaultImage:
        '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'
};

export default defaults;
