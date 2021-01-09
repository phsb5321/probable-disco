let io;

module.exports = {
    init: (httpServer, options) => {
        require('socket.io')(httpServer,options)
        return io;
    },
    getIO: () =>{
        if(!io){
            throw new Error('Socket.IO not initialize')
        }
        return io;
    }
}