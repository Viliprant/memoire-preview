class StateInfos{
    static id = 1

    constructor(id, idComponent, name, typeComponent, typeMessage, message, status, priority){
        this.id = id || StateInfos.id
        this.idComponent = idComponent
        this.name = name
        this.typeComponent = typeComponent
        this.typeMessage = typeMessage
        this.status = status
        this.priority = priority
        this.message = message
        this.timestamp = new Date().toLocaleString()

        StateInfos.id ++
    }

    toString = () => {
        return `(${StateInfos.id}) [${this.timestamp}] - ${this.name} [${this.typeComponent.toUpperCase()}] : [${this.status}] - ${this.message}`;
    }
}

module.exports = StateInfos;