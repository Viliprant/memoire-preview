const IComponent = require('./interfaces/IComponent')
const TYPES = require('../enums/Types')

class Server extends IComponent{
    constructor(id, state, name){
        super(id, TYPES.SERVER, state, name)
    }
}

module.exports = Server;