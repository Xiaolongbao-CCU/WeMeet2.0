const fs = require('fs');
const { PeerServer } = require('peer').PeerServer;

const server = PeerServer({
  port: 9000,
  ssl: {
    key: fs.readFileSync('./public/certificate/privatekey.pem'),
    cert: fs.readFileSync('./public/certificate/certificate.pem'),
  },
});

server.on('connection', (id) => {
  console.log(id);
});
