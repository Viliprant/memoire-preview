const Component = require('../../classes/Component')
const TYPES = require('../enums/Types')
const PRIORITIES = require('../../models/enums/Priorities')
const STATUS = require('../../models/enums/Status')
const STATES = require('../../models/enums/States')
const StateInfos = require('../StateInfos')

const randomMessages = [
    {
        'message' : 'Processus succeed',
        'priority' : PRIORITIES.INFO,
        'status' : STATUS.OK
    },
    {
        'message' : 'Processus with warnings',
        'priority' : PRIORITIES.INFO,
        'status' : STATUS.KO
    },
    {
        'message' : 'Processus failed',
        'priority' : PRIORITIES.HIGH,
        'status' : STATUS.KO
    },
]

class Server extends Component{
    constructor(id, state, name){
        super(id, TYPES.SERVER, state, name)
        this.interval = null
    }

    GenerateFakeLogs = () => {
        if(randomMessages.length > 0 && this.state == STATES.RUNNING){
            const randInt = Math.trunc(Math.random() * randomMessages.length);
            const randomMessage = randomMessages[randInt];

            const stateInfos = new StateInfos(null, this.id, this.name, this.type, 'APPLICATION', randomMessage.message, randomMessage.status, randomMessage.priority);

            return stateInfos;
        }

       return null
    }
}

module.exports = Server;