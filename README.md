Lightweight tween util with 0 dependencies (677bytes gzipped)

## Usage
#### `tween(obj, prop, from, to, duration, ease = defaultEasing)`

```javascript
import { tween, easing } from 'viktortween'

let obj = {
  pos: { x: 0, y: 0 }
}

// Tween single property
tween(obj.pos, 'x', 0, 10, 1000)
.onUpdate((percentage) => {})
.onComplete(() => {})
.stop()

// Tween multiple props
tween(obj, 'pos', { x: 0, y: 0 }, { x: 10, y: 10 }, 1000)
.onUpdate((percentage) => {})
.onComplete(() => {})
.stop()

// Tween with other easing effect (default is easing.easeOutQuad)
tween(obj.pos, 'x', 0, 10, 1000, easing.easeInOutQuint)
```
