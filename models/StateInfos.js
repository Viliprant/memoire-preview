class StateInfos{
    static id = 1

    constructor(id, idComponent, type, message, status, priority){
        this.id = id || StateInfos.id
        this.idComponent = idComponent
        this.type = type
        this.status = status
        this.priority = priority
        this.message = message
    }
}

module.exports = StateInfos;