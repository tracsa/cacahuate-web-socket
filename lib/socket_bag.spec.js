const SocketBag = require('./socket_bag.js');

test('add and delete functions', function () {
  let sb = new SocketBag();
  let s1 = {id:'1', name:'uno'};
  let s2 = {id:'2', name:'dos'};
  let s3 = {id:'3', name:'tres'};

  // register the first one
  sb.register(s1, ['a:b:*', 'a:c:d']);

  expect(sb.trie.items('a:c:d')).toMatchObject(['1']);
  expect(sb.trie.items('a:b:e')).toMatchObject(['1']);

  expect(sb.map.get('1')).toMatchObject(['a:b', 'a:c:d']);

  expect(sb.sockets.get('1')).toMatchObject(s1);

  // register the second one
  sb.register(s2, ['a:b:e', 'a:c:*']);

  expect(sb.trie.items('a:c:d')).toMatchObject(['1', '2']);
  expect(sb.trie.items('a:b:e')).toMatchObject(['1', '2']);

  expect(sb.map.get('2')).toMatchObject(['a:b:e', 'a:c']);

  expect(sb.sockets.get('1')).toMatchObject(s1);
  expect(sb.sockets.get('2')).toMatchObject(s2);

  // add the third one
  sb.register(s3, ['a:b:*']);

  expect(sb.trie.items('a:c:d')).toMatchObject(['1', '2']);
  expect(sb.trie.items('a:b:f')).toMatchObject(['1', '3']);

  expect(sb.map.get('3')).toMatchObject(['a:b']);

  expect(sb.sockets.get('1')).toMatchObject(s1);
  expect(sb.sockets.get('2')).toMatchObject(s2);
  expect(sb.sockets.get('3')).toMatchObject(s3);

  // remove the third one
  sb.remove(s3);

  expect(sb.trie.items('a:c:d')).toMatchObject(['1', '2']);
  expect(sb.trie.items('a:b:e')).toMatchObject(['1', '2']);

  expect(sb.map.get('3')).toBeUndefined();
  expect(sb.map.get('2')).toMatchObject(['a:b:e', 'a:c']);
  expect(sb.map.get('1')).toMatchObject(['a:b', 'a:c:d']);

  expect(sb.sockets.get('1')).toMatchObject(s1);
  expect(sb.sockets.get('2')).toMatchObject(s2);
  expect(sb.sockets.get('3')).toBeUndefined();

  // remove the second one
  sb.remove(s2);

  expect(sb.trie.items('a:c:d')).toMatchObject(['1']);
  expect(sb.trie.items('a:b:e')).toMatchObject(['1']);

  expect(sb.map.get('3')).toBeUndefined();
  expect(sb.map.get('2')).toBeUndefined();
  expect(sb.map.get('1')).toMatchObject(['a:b', 'a:c:d']);

  expect(sb.sockets.get('1')).toMatchObject(s1);
  expect(sb.sockets.get('2')).toBeUndefined();

  // remove the last element
  sb.remove(s1);

  expect(sb.trie.items('a:c:d')).toMatchObject([]);
  expect(sb.trie.items('a:b:e')).toMatchObject([]);

  expect(sb.map.get('3')).toBeUndefined();
  expect(sb.map.get('2')).toBeUndefined();
  expect(sb.map.get('1')).toBeUndefined();

  expect(sb.sockets.get('1')).toBeUndefined();
});

test('can get subscribers', function () {
  let sb = new SocketBag();
  let s1 = {id:'1', name:'uno'};
  let s2 = {id:'2', name:'dos'};
  let s3 = {id:'3', name:'tres'};

  // first one
  sb.register(s1, ['a:b:*']);

  expect(sb.subscribers('a:b:c')).toMatchObject([s1]);

  // second one
  sb.register(s2, ['a:b:c', 'a:e:f']);

  expect(sb.subscribers('a:b:c')).toMatchObject([s1, s2]);
  expect(sb.subscribers('a:b:d')).toMatchObject([s1]);
  expect(sb.subscribers('a:e:f')).toMatchObject([s2]);
  expect(sb.subscribers('a:e:g')).toMatchObject([]);
});
