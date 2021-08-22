const fs = require('fs');

class Monitoring {
    static components = {}
    constructor(){

    }

    static Init(){
        try {
            const rawdata = fs.readFileSync('data/ComponentList.json');
            Monitoring.components = JSON.parse(rawdata);
        } catch (error) {
            console.log('Impossible de lire le json');
            console.log(error);
        }
    }
}

module.exports = Monitoring;