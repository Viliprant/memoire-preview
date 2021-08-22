const fs = require('fs');
const Database = require('../models/components/Database');
const Server = require('../models/components/Server');
const Service = require('../models/components/Service');
const TYPES = require('../models/enums/Types');
const Logger = require('../utils/Logger');


class Monitoring {
    static components = []
    constructor(){

    }

    static Init(){
        Logger.Info('Monitoring starting...');

        try {
            const rawdata = fs.readFileSync('data/ComponentList.json');
            const components = JSON.parse(rawdata).Components;

            components.forEach(component => {
                switch (component.type) {
                    case TYPES.DB:
                        Monitoring.components.push(new Database(component.id, component.state, component.name));
                        Logger.Success(`${component.name} [${component.type.toUpperCase()}] added to the monitoring`);
                        break;
                    case TYPES.SERVER:
                        Monitoring.components.push(new Server(component.id, component.state, component.name));
                        Logger.Success(`${component.name} [${component.type.toUpperCase()}] added to the monitoring`);
                        break;
                    case TYPES.SERVICE:
                        Monitoring.components.push(new Service(component.id, component.state, component.name));
                        Logger.Success(`${component.name} [${component.type.toUpperCase()}] added to the monitoring`);
                        break;
                
                    default:
                        Logger.Error(`${component.name} [${component.type.toUpperCase()}] : type is unknown`);
                        break;
                }
                
            });
        } catch (error) {
            Logger.Error('Impossible de lire le json');
            Logger.Error(error);
        }

        Logger.Info('Monitoring is started !');
    }
}

module.exports = Monitoring;