// Import file
var pingoLogger = require('../utils/pingoLogger');
var fs = require('fs');
var easyimg = require('easyimage');
var imageService = function() {
    var getImageWithPath = function(res, pathFile) {

        var img = fs.readFileSync(pathFile);
        res.writeHead(200, {
            'Content-Type': 'image/jpg'
        });
        res.end(img, 'binary');
    };
    /**
     * pathContent : /image/category or /image/product
     */
    var postImageWithPath = function(req, res, pathFile, width, height, pathContent, typeImage) {
        console.log(req.file);
        var fileName = req.file.filename;
        var path = req.file.path;
        pingoLogger.log("Path: " + path);
        fs.readFile(path, function(err, data) {
            let unix = Math.round(+new Date() / 1000);
            let newFileName = fileName + "-" + unix + ".jpg";
            pingoLogger.log(newFileName);
            let newPath = pathFile + newFileName;
            easyimg.rescrop({
                src: path,
                dst: newPath,
                width: width,
                height: height
            }).then(
                function(image) {
                    console.log('Resized and cropped: ' + image.width + ' x ' + image.height);
                    fs.unlink(path);
                    res.writeHead(200, {'Content-Type': 'image/jpg' });
                    res.json({
                        status: 200,
                        message: "Upload image successfully",
                        url: pathContent + newFileName
                    })
                },
                function(err) {
                    console.log(err);
                }
            );
        });
    }
    return {
        getImageWithPath: getImageWithPath,
        postImageWithPath: postImageWithPath
    }
}();
module.exports = imageService;
