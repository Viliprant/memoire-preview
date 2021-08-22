const Component = require('../../classes/Component')
const TYPES = require('../enums/Types')

class Service extends Component{
    constructor(id, state, name){
        super(id, TYPES.SERVICE, state, name)
    }
}

module.exports = Service;