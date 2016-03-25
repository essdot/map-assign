module.exports = mapAssign

function mapAssign (target) {
  var sources

  if (arguments.length < 2) {
    return
  }

  if (!(target instanceof Map)) {
    target = new Map()
  }

  sources = [].slice.call(arguments, 1)
  sources.forEach(function (m) {
    if (typeof m !== 'object' || m === null) {
      return
    }

    if (m instanceof Map) {
      accumulateMap(target, m)
    } else {
      accumulateObject(target, m)
    }
  })

  return target
}

function accumulateMap (accumMap, map) {
  map.forEach(function (val, key) {
    accumMap.set(key, val)
  })
}

function accumulateObject (accumMap, obj) {
  Object.getOwnPropertyNames(obj).forEach(function (key) {
    accumMap.set(key, obj[key])
  })
}
