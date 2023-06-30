const BandList = require("./band-list");


class Sockets {

    constructor( io ) {

        this.io = io;
        this.bandList = new BandList();
        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {

            console.log('Cliente conectado!');
            
            // Emitir al cliente conectado, todas las bandas actuales
            socket.emit('current-bands', this.bandList.getBands());

            // Votar por la banda
            socket.on('vote-band', (id) => {
                this.bandList.increaseVotes(id);
                this.io.emit('current-bands', this.bandList.getBands());
            });

            // Borrar una banda
            socket.on('delete-band', (id) => {
                this.bandList.removeBand(id);
                this.io.emit('current-bands', this.bandList.getBands());
            });

            // Cambiar nombre de una banda
            socket.on('change-name', ({ id, name }) => {
                this.bandList.changeName(id, name);
                this.io.emit('current-bands', this.bandList.getBands());
            });

            // Agregar nueva banda
            socket.on('add-band', ( bandName ) => {
                this.bandList.addBand( bandName );
                this.io.emit('current-bands', this.bandList.getBands());
            });
        
        });
    }


}


module.exports = Sockets;