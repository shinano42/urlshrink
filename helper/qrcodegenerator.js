const QRCode = require('qrcode');
const path = require('path');


function generator(message, filename , type='png', color="#000000ff") {
    let loc = path.dirname(__dirname) + '/static/qrcode/' + filename + '.' + type
    QRCode.toFile(loc, message, {
        color: {
          dark: color,  
          light: '#0000'
        },
        type: type 
      }, function (err) {
        if (err) throw err
        console.log('done')
    });
}


module.exports = {
  generator: generator
}
