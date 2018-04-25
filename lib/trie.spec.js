const Trie = require('./trie.js');

test('can be progressively built', function () {
  let instance = new Trie();

  instance.add('a:b:c', '1');
  instance.add('a', '2');
  instance.add('d:f', '3');

  expect(instance.items('a:b:c')).toMatchObject(['1', '2']);

  instance.add('a:b', '4');
  
  expect(instance.items('a:b')).toMatchObject(['2', '4']);
  expect(instance.items('a')).toMatchObject(['2']);
});

test('it should answer queries by common prefix', function() {
  const instance = new Trie();

  instance.add('a', '1');

  expect(instance.items('a:b:c:d:e:f:g:h:i:j')).toMatchObject(['1']);
});

test('it is possible to remove elements', function () {
  const instance = new Trie();

  instance.add('a:b', '1');
  instance.add('a:b:c', '2');

  expect(instance.items('a:b:c')).toMatchObject(['1', '2']);

  instance.remove('a:b:c', '2');

  expect(instance.items('a:b:c')).toMatchObject(['1']);
});
