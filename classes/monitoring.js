const fs = require('fs');
const Database = require('../models/components/Database');
const Server = require('../models/components/Server');
const Service = require('../models/components/Service');
const TYPES = require('../models/enums/Types');
const STATES = require('../models/enums/States')
const Logger = require('../utils/Logger');



class Monitoring {
    static components = []
    static interval

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
                
                Monitoring.interval = setInterval(Monitoring.AskStatus, 5000);
            });
        } catch (error) {
            Logger.Error('Impossible de lire le json');
            Logger.Error(error);
        }

        Logger.Info('Monitoring is started !');
    }

    static AskStatus = () => {
        Monitoring.components.forEach(component => {
            // TODO : Envoyer aux listeners / clients!
            switch (component.state) {
                case STATES.RUNNING:
                    // TODO : utiliser la classe StateInfos
                    Logger.Info(`${component.name} [${component.type.toUpperCase()}] : ${STATES.RUNNING}`);
                    break;
                case STATES.TIMEOUT:
                    // TODO : utiliser la classe StateInfos
                    Logger.Error(`${component.name} [${component.type.toUpperCase()}] : ${STATES.TIMEOUT}`);
                    break;

                default:
                    Logger.Warning(`${component.name} [${component.type.toUpperCase()}] unknown status : ${component.state}`);
                    break;
            }
        });
    }
}

module.exports = Monitoring;