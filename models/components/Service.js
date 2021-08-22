const IComponent = require('../interfaces/IComponent')
const TYPES = require('../enums/Types')

class Service extends IComponent{
    constructor(id, state, name){
        super(id, TYPES.SERVICE, state, name)
    }
}

module.exports = Service;