const response = function() {
    var getResponse = function(inputMessage, objectData) {
        if (!objectData)
            return {
                message: inputMessage
            }
        return {
            message: inputMessage,
            data: objectData
        }
    };
    return {
        getResponse: getResponse
    }
}();
module.exports = response;
