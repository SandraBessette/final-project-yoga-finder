class WebSockets {
    connection(client) {
        console.log("connect");
        client.on("join", (data) => {
            console.log("join", data);
            client.join(data._id);
        });

        client.on("logout", (data) => {
            console.log("leave", data);
            client.leave(data._id);
        });

        client.on("disconnect", () => {
            console.log("disconnect");
        });
    }
}

module.exports = new WebSockets();
