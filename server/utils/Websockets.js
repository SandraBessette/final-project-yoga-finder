class WebSockets {
  
    connection(client) {
        console.log('connect');   
        client.on('join', (data) => {
            client.join(data._id);        
        });    

        client.on('logout', (data) => {             
            client.leave(data._id);
        });

        client.on('disconnect', () => {
            console.log('disconnect');
        }); 
    }  
  }
  
  module.exports = new WebSockets();