module.exports = {
    successResponse(status, data, message) {
        return {
            status,
            data,
            message
        }
    },
    
    errorResponse(err, errorCode) {
        const errors = new Error(err);
        const { name, message, stack } = errors;
        return {
            name,
            errorMessage: message,
            stack,
            errorCode
        }
    }
};
