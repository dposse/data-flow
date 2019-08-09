const SOCKET_PORT = 5000;

const io = require('socket.io-client');
const socket = io(`http://localhost:${SOCKET_PORT}`);

export default socket;