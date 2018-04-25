let Trie = require('./trie.js');

class SocketBag {
  constructor() {
    // setup storage of connections
    this.trie = new Trie();
    this.map = new Map();
    this.sockets = new Map();
  }

  register(socket, channels) {
    channels = channels.map(channel => channel.split(':').filter(e => e!='*').join(':'));

    for (let channel of channels) {
      this.trie.add(channel, socket.id);
      this.sockets.set(socket.id, socket);
    }

    this.map.set(socket.id, channels);
  }

  remove(socket) {
    for (let channel of this.map.get(socket.id)) {
      this.trie.remove(channel, socket.id);
    }

    this.map.delete(socket.id);
    this.sockets.delete(socket.id);
  }

  subscribers(channel) {
    return this.trie.items(channel).map(s_id => this.sockets.get(s_id));
  }
}

module.exports = SocketBag;
