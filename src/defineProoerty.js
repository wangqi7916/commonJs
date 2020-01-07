/**
 *   definePropety(obj,prop,descript)
 *   obj:定一个对象
 *   prop:定义对象属性
 *   descript:设置属性值值  // 数据绑定，数据监听
 */

class Watch {
  constructor(opts) {
    this.$data = opts.data
    this.$watch = opts.watch
    for (let key in opts.data) {
      this.setData(key, opts.data[key])
    }
  }

  setData(_key) {
    Object.defineProperty(this, _key, {
      get: () => {
        return this.$data[_key]
      },
      set: (val) => {
        const oldVal = this.$data[_key]
        if (oldVal === val) return val
        this.$data[_key] = val
        this.$watch[_key] && typeof this.$watch[_key] === 'function' && (this.$watch[_key].call(this, oldVal, val))
        return val
      } 
    })
  }
}