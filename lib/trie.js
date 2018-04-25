class Trie {
  constructor(items = []) {
    this.head = this._newNode();

    items.forEach(item => this.add(...item));
  }

  _newNode() {
    return {
      items: new Set(),
      childs: new Map(),
    };
  }

  _getChild(childName, node, append=true) {
    let child = node.childs.get(childName);

    if (child !== undefined) {
      return child;
    }

    if (append === false) {
      return null;
    }

    child = this._newNode();
    node.childs.set(childName, child);

    return child;
  }

  add(literal, value) {
    let parts = literal.split(':');
    let node = this.head;

    for (let i=0; i<parts.length; i++) {
      node = this._getChild(parts[i], node);
    }

    node.items.add(value);
  }

  remove(literal, value) {
    let parts = literal.split(':');
    let node = this.head;

    for (let i=0; i<parts.length; i++) {
      node = this._getChild(parts[i], node);
    }

    node.items.delete(value);
  }

  getNode(key) {
    let parts = key.split(':');

    let node = this.head;
    for (let part of parts) {
      node = this._getChild(part, node, false);

      if (node === null) {
        return null;
      }
    }

    return node;
  }

  hasChilds(key) {
    return !!this.getNode(key);
  }

  items(key) {
    let parts = key.split(':');

    let items = new Set();
    let node = this.head;

    for (let i=0; i<parts.length; i++) {
      node = this._getChild(parts[i], node, false);

      if (node === null) {
        break;
      }

      for (let item of node.items) {
        if (item === 'admin') {
          return ['admin'];
        }

        items.add(item);
      }
    }

    return [...items].sort();
  }
}

module.exports = Trie;
