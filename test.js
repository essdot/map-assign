var test = require('tape')

var mapAssign = require('./')

var obj = {}

test('accumulates maps', function (t) {
  var mapA = new Map([['a', 'b'], [obj, 'obj'], ['obj', obj]])
  var mapB = new Map([['a', 'c']])
  var mapC = new Map([[obj, 'the obj'], ['d', 'e']])
  var target = new Map()

  mapAssign(target, mapA, mapB, mapC)

  t.equal(target.get('a'), mapB.get('a'))
  t.equal(target.get('obj'), mapA.get('obj'))
  t.equal(target.get(obj), mapC.get(obj))
  t.equal(target.get('d'), mapC.get('d'))
  t.end()
})

test('accumulates objects', function (t) {
  var sourceMap = new Map([['a', 'b'], [obj, 'obj'], ['obj', obj]])
  var sourceObj = {'a': 'c'}
  var target = new Map()

  mapAssign(target, sourceMap, sourceObj)

  t.equal(target.get('a'), sourceObj['a'])
  t.equal(target.get(obj), sourceMap.get(obj))
  t.equal(target.get('obj'), sourceMap.get('obj'))
  t.end()
})

test('skips empty values', function (t) {
  var mapA = new Map([['a', 'b']])
  var mapB = new Map([['c', 'd']])
  var target = new Map()

  mapAssign(target, mapA, void 0, null, [], {}, mapB)

  t.equal(target.get('a'), mapA.get('a'))
  t.equal(target.get('c'), mapB.get('c'))
  t.end()
})

test("doesn't choke if target = source", function (t) {
  var map1 = new Map([['a', 'b']])
  var map2 = new Map([['d', 'e']])

  mapAssign(map1, {}, map1, map2)

  t.equal(map1.get('a'), 'b')
  t.equal(map1.get('d'), 'e')
  t.end()
})
