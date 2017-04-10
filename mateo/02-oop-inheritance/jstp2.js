'use strict'

 let isFunction = function(obj) {  
        return typeof obj == 'function' || false;
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
class Movie extends EventEmitter {


    constructor(title,year,duration) {
        super();
        this.title = title;
        this.year = year;
        this.duration = duration;
        this.actors = new Array(); 
    }

   play() {
        this.emit("play");
        
    }

   pause() {
        this.emit("pause");
        
    }

   resume() {
        this.emit("resume");     
    }
    
    addCast(actors) {
        if(Array.isArray(actors)) {
            actors.forEach((actor) => {
                this.actors.push(actor);
            });
        }
        else {
            this.actors.push(actors);
        }

    }
}

class Logger {
    
    log(info) {
        console.log("the " + info + " event has been emitted");
    }
}

let Social = {
    
    share(friendName) {
        let msj = friendName + " shared " + this.title;
        console.log(msj);
    },

    like(friendName) {
        let msj = friendName + " likes " + this.title;
        console.log(msj);
    }
}

class Actor {

    constructor(name,age) {
        this.name = name;
        this.age = age;
    }
}

function showCast(actors) {    
    
    for( var i = 0 ; i < actors.length ; i++ ) {
     
      console.log(actors[i].name);

    }
    

}



///////TESTS/////



let terminator = new Movie('TERMINATOR',1985,"1h22m");
let logger = new Logger();

terminator.on("play",logger.log);
terminator.play();

var t = Object.assign(Social,terminator);
t.share("Thomas");
t.like("Matthew");

let actor1 = new Actor("Arnold",65);
console.log(actor1.name + " is an actor");

let actor2 = new Actor("Phil",60);
let otherCast = [
   new Actor('Paul Winfield', 50),
   new Actor('Michael Biehn', 50),
   new Actor('Linda Hamilton', 50)
];


terminator.addCast(actor1);
terminator.addCast(actor2);
terminator.addCast(otherCast);

showCast(terminator.actors);









//////////////////////////////////






