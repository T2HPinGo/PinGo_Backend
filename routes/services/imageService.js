// Import file
var lwip = require('lwip');
var pingoLogger = require('../utils/pingoLogger');
var fs = require('fs');
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
    var postImageWithPath = function(req, res, pathFile, width, heigth, pathContent, typeImage) {
        var fileName = req.file.filename;
        var path = req.file.path;
        pingoLogger.log("Path: " + path);
        fs.readFile(path, function(err, data) {
            lwip.open(data, typeImage, function(err, image) {
                if (err) throw err;
                // lanczos
                var unix = Math.round(+new Date()/1000);
                var newFileName = fileName + "-" + unix + ".jpg";
                pingoLogger.log(newFileName);
                var newPath = pathFile + newFileName;
                image.resize(width, heigth, 'nearest-neighbor', function(err, rzdImg) {
                    rzdImg.writeFile(newPath, function(err) {
                        if (err) throw err;
                        fs.unlink(path);

                        res.json({
                            status: 200,
                            message: "Upload image successfully",
                            url: pathContent + newFileName
                        })
                    });
                });
            });
        });
    }
    return {
        getImageWithPath: getImageWithPath,
        postImageWithPath: postImageWithPath
    }
}();
module.exports = imageService;
