const IComponent = require('./interfaces/IComponent')
const TYPES = require('../enums/Types')

class Database extends IComponent{
    constructor(id, state, name){
        super(id, TYPES.DB, state, name)
    }
}

module.exports = Database;