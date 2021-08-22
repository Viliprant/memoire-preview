const Component = require('../../classes/Component')
const TYPES = require('../enums/Types')

class Database extends Component{
    constructor(id, state, name){
        super(id, TYPES.DB, state, name)
    }
}

module.exports = Database;