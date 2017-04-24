
 let isFunction = function(obj) {  
        return typeof obj == 'function' ;
    }; 


class EventEmitter {   
   
    constructor() {
        this.listeners = new Map(); //sets up an initially empty map for keeping track of our listeners
    }

    on (label, callback) { // argument label identifies the type of notifications the listener wants to receive
                           // the callback function we should invoke for the listener when we 
                           // emit that event.
        this.listeners.has(label) || this.listeners.set(label, []); //create the label if it isnt there
        this.listeners.get(label).push(callback); //push callback function 
        
    }
    emit (label) {
        let listeners = this.listeners.get(label);

        if (listeners && listeners.length) {

            listeners.forEach((listener) => {
                listener(label);
            });
            return true;

        }
        return false;
    }

   
    off (label, callback) {        
        
        let listeners = this.listeners.get(label),
        index;

        if (listeners && listeners.length) {

            index = listeners.reduce((i, listener, index) => {

                return (isFunction(listener) && listener === callback) ?
                i = index :
                i;

        }, -1);

        if (index > -1) {
            listeners.splice(index, 1);
            this.listeners.set(label, listeners);
            return true;
        }
    }
    return false;
    }

}

module.exports = EventEmitter;
