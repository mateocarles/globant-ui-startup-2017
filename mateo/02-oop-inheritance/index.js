import Actor from './Actor';
import Movie from './Movie';
import Logger from './Logger';

function showCast(actors) {

   for (var i = 0; i < actors.length; i++) {

      console.log(actors[i].name);
   }
}
///////TESTS/////
let terminator = new Movie('TERMINATOR',1985,"1h22m");
let logger = new Logger();

terminator.on("play",logger.log);
terminator.play();
terminator.share("Thomas");
terminator.like("Matthew");

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
