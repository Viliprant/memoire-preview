const Logger = require('../utils/Logger')
const STATES = require('../models/enums/States')

class Component{
    constructor(id, type, state, name){
        this.id = id
        this.type = type
        this.state = state
        this.name = name
        this.interval = setInterval(this.SendStatus, 5000);
    }

    SendStatus = () => {
        // TODO : Envoyer aux listeners / clients!
        if(this.state == STATES.RUNNING){
            // TODO : utiliser la classe StateInfos
            Logger.Info(`${this.name} [${this.type.toUpperCase()}] is ALIVE`);
        }
        else{
            // TODO : utiliser la classe StateInfos
            Logger.Error(`${this.name} [${this.type.toUpperCase()}] is DEAD`);
        }
    }
}

module.exports = Component;