export const easing = {
  linear: (t) => t,
  easeInQuad: (t) => t * t,
  easeOutQuad: (t) => t * (2 - t),
  easeInOutQuad: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  easeInCubic: (t) => t * t * t,
  easeOutCubic: (t) => (--t) * t * t + 1,
  easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeInQuart: (t) => t * t * t * t,
  easeOutQuart: (t) => 1 - (--t) * t * t * t,
  easeInOutQuart: (t) => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t,
  easeInQuint: (t) => t * t * t * t * t,
  easeOutQuint: (t) => 1 + (--t) * t * t * t * t,
  easeInOutQuint: (t) => t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t,
  easeInBack: (t) => {
    let s = 1.70158
    return t * t * ((s + 1) * t - s)
  },
  easeOutBack: (t) => {
    let s = 1.70158
    return (t = t - 1) * t * ((s + 1) * t + s) + 1
  },
  easeInOutBack: (t) => {
    let s = 1.70158
    if ((t /= 0.5) < 1) return 0.5 * (t * t * (((s *= (1.525)) + 1) * t - s))
    return 0.5 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2)
  },
  elastic: (t) => {
    return -1 * Math.pow(4, -8 * t) * Math.sin((t * 6 - 1) * (2 * Math.PI) / 2) + 1
  },
  bounce: (t) => {
    if (t < (1 / 2.75)) {
      return (7.5625 * t * t)
    } else if (t < (2 / 2.75)) {
      return (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75)
    } else if (t < (2.5 / 2.75)) {
      return (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375)
    } else {
      return (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375)
    }
  },
  bouncePast: (t) => {
    if (t < (1 / 2.75)) {
      return (7.5625 * t * t)
    } else if (t < (2 / 2.75)) {
      return 2 - (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75)
    } else if (t < (2.5 / 2.75)) {
      return 2 - (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375)
    } else {
      return 2 - (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375)
    }
  }
}

const defaultEasing = easing.easeOutQuad

const tweenProp = (obj, prop, from, to, duration, ease) => {
  let start = window.performance.now()
  let canceled = false
  let onUpdates = []
  let onCompletes = []

  let update = (timestamp) => {
    if (canceled) return

    let timePassed = timestamp - start
    let percentage = Math.min(1, timePassed / duration)

    obj[prop] = from + (to - from) * ease(percentage)

    onUpdates.forEach(cb => cb(percentage))

    if (percentage < 1) {
      window.requestAnimationFrame(update)
    } else {
      onCompletes.forEach(cb => cb())
    }
  }

  window.requestAnimationFrame(update)

  let self = {
    stop: () => {
      canceled = true
      return self
    },
    onUpdate: (cb) => {
      onUpdates.push(cb)
      return self
    },
    onComplete: (cb) => {
      onCompletes.push(cb)
      return self
    }
  }

  return self
}

export const tween = (obj, prop, from, to, duration, ease = defaultEasing) => {
  if (from instanceof Object) {
    if (!obj[prop]) obj[prop] = {}

    let tweens = Object.keys(from).map(key =>
      tweenProp(obj[prop], key, from[key], to[key], duration, ease))

    let self = {
      stop: () => {
        tweens.forEach(t => t.stop())
        return self
      },
      onUpdate: (cb) => {
        tweens.forEach(t => t.onUpdate(cb))
        return self
      },
      onComplete: (cb) => {
        tweens.forEach(t => t.onComplete(cb))
        return self
      }
    }

    return self
  }

  return tweenProp(obj, prop, from, to, duration, ease)
}
