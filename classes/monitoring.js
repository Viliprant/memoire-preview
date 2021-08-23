const fs = require('fs');
const Database = require('../models/components/Database');
const Server = require('../models/components/Server');
const Service = require('../models/components/Service');
const TYPES = require('../models/enums/Types');
const STATES = require('../models/enums/States')
const PRIORITIES = require('../models/enums/Priorities')
const STATUS = require('../models/enums/Status')
const Logger = require('../utils/Logger');
const StateInfos = require('../models/StateInfos');
const { setInterval } = require('timers');

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
                        const db = new Database(component.id, component.state, component.name);
                        Monitoring.components.push(db);
                        db.interval =  Monitoring.ReceiveFakeData(db);
                        break;
                    case TYPES.SERVER:
                        const server = new Server(component.id, component.state, component.name);
                        Monitoring.components.push(server);
                        server.interval =  Monitoring.ReceiveFakeData(server);
                        break;
                    case TYPES.SERVICE:
                        const service = new Service(component.id, component.state, component.name);
                        Monitoring.components.push(service);
                        service.interval =  Monitoring.ReceiveFakeData(service);
                        break;
                
                    default:
                        const stateInfos = new StateInfos(null, component.id, component.name, component.type, 'BEATS', `UNKNOWN TYPE`, STATUS.KO, PRIORITIES.HIGH);
                        Monitoring.SendToListeners(stateInfos);
                        break;
                }
                
                Monitoring.interval = setInterval(Monitoring.AskStatus, 30 * 1000);
            });
        } catch (error) {
            Logger.Error('Impossible de lire le json');
            console.log(error);
        }

        Logger.Info('Monitoring is started !');
    }

    static AskStatus = async () => {
        Monitoring.components.forEach(component => {
            const stateInfos = new StateInfos(null, component.id, component.name, component.type, 'BEATS', '', STATUS.OK, PRIORITIES.LOW);

            switch (component.state) {
                case STATES.RUNNING:
                    stateInfos.message = `${STATES.RUNNING}`;
                    break;
                case STATES.TIMEOUT:
                    stateInfos.message = `${STATES.TIMEOUT}`;
                    stateInfos.priority = PRIORITIES.HIGH;
                    stateInfos.status = STATUS.KO;
                    break;

                default:
                    stateInfos.message = `UNKNOWN STATUS : ${component.state}`;
                    stateInfos.priority = PRIORITIES.MEDIUM;
                    stateInfos.status = STATUS.KO;
                    break;
                }
                
            Monitoring.SendToListeners(stateInfos);
        });
    }

    static SendToListeners(stateInfos){
        if(stateInfos){
            if(stateInfos instanceof StateInfos){
               if(stateInfos.status == STATUS.KO){
                   if(stateInfos.priority == PRIORITIES.HIGH){
                       Logger.Error(stateInfos.toString());
                   }
                   else{
                       Logger.Warning(stateInfos.toString())
                   }
               }
               else{
                    if(stateInfos.priority == PRIORITIES.HIGH){
                        Logger.Success(stateInfos.toString());
                    }
                    else{
                        Logger.Info(stateInfos.toString());
                    }
               }
               // TODO : ENVOYER AUX LISTENERS

            }
            else{
                Logger.Warning('Using [SendToListeners] with wrong type parameter [stateInfos]');
            }
        }
        else{
            Logger.Warning('Using [SendToListeners] with null parameter [stateInfos]');
        }
    }

    static ReceiveFakeData = async (component) => {
        if(component.GenerateFakeLogs){
            setInterval(() => {
                const stateInfos = component.GenerateFakeLogs();
            
                if(stateInfos){
                    Monitoring.SendToListeners(stateInfos);
                }
            }, 10 * 1000);
        }
        else{
            Logger.Warning('Using [ReceiveFakeData] with parameter without [GenerateFakeLogs] function');
        }
    }
    
}

module.exports = Monitoring;