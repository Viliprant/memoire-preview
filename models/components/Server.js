const Component = require('../../classes/Component')
const TYPES = require('../enums/Types')

class Server extends Component{
    constructor(id, state, name){
        super(id, TYPES.SERVER, state, name)
    }
}

module.exports = Server;