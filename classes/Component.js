const Logger = require('../utils/Logger')

class Component{
    constructor(id, type, state, name){
        this.id = id
        this.type = type
        this.state = state
        this.name = name
    }
}

module.exports = Component;