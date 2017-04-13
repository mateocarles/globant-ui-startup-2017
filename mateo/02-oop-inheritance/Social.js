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

module.exports = Social;