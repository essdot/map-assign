# map-assign: Object.assign for Maps

Assigns key/values to target map, from any number of source maps.

```
function mapAssign(target, [...sources]) -> Map
```

arguments:

* target (Map): the map to assign key/values to
* sources: any number of Maps or objects to assign key/values from

The key/values are copied from sources, last source wins. The target map
is also returned.

```javascript
var sourceA = new Map([['a', 'b'], ['c', 'd']])
var sourceB = new Map([['c', '123'], ['e', 'f']])
var sourceC = new Map([['g', 'h'], ['c', '456']])

var target = new Map()

mapAssign(target, sourceA, sourceB, sourceC)

target.get('a')         // returns 'b'
target.get('e')         // returns 'f'
target.get('g')         // returns 'h'
target.get('c')         // returns '456'
```

You can also pass regular objects as sources and their properties will be
copied.

```javascript
var sourceObj = {'a': 'b', 'c': 'd'}

var target = new Map()

mapAssign(target, sourceObj)

target.get('a')         // returns 'b'
target.get('c')         // returns 'd'
```