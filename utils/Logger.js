var colors = require('colors');

function Error(message){
    console.log(message.bold.red)
}
function Info(message){
    console.log(message.white)
}
function Success(message){
    console.log(message.bold.green)
}
function Warning(message){
    console.log(message.yellow)
}

module.exports = {
    Error,
    Info,
    Success,
    Warning
}