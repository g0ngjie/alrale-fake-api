const { mock, Random } = require("mockjs");

exports.getList = function() {
    
}

exports.getImage = function() {
    const image = Random.image()
    console.log("[debug]image:", image)
}
// exports.getImage()