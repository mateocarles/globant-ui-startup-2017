import EventEmitter from './EventEmitter';
import Social from './Social';


class Movie extends EventEmitter {


    constructor(title,year,duration) {
        super();
        this.title = title;
        this.year = year;
        this.duration = duration;
        Object.assign(this,Social);
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

module.exports = Movie;