// 自定义Promise函数模块
(function(window) {
  const PENDING = 'pending'
  const RESOLVED = 'resolved'
  const REJECTED = 'rejected'
  // Promise构造函数
  // excutor执行器
  function Promise(excutor) {
    const _that = this
    this.status = PENDING // status属性
    this.data = undefined // 给promise对象指定一个用于存储结果数据的属性
    this.callbacks = [] // 每个元素的结构：{onResolved(){}, onRejected(){} }

    // 立即同步执行
    function resolve(value) {
      // 如果当前状态不是pending
      if (_that.status !== PENDING) {
        return
      }
      // 将状态改变
      _that.status = RESOLVED
      // 保存value
      _that.data = value
      // 如果有待执行callback函数，立即异步执行回调函数
      if (_that.callbacks.length > 0) {
        setTimeout(() => {
          _that.callbacks.forEach(callbacksObj => {
            callbacksObj.onResolved(value)
          })
        })
      }
    }

    function reject(reason) {
      // 如果当前状态不是pending
      if (_that.status !== PENDING) {
        return
      }
      // 将状态改变
      _that.status = REJECTED
      // 保存value
      _that.data = reason
      // 如果有待执行callback函数，立即异步执行回调函数
      if (_that.callbacks.length > 0) {
        setTimeout(() => {
          _that.callbacks.forEach(callbacksObj => {
            callbacksObj.onRejected(reason)
          })
        })
      }
    }

    // 捕获异常
    try {
      excutor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  // 成功和失败的回调
  Promise.prototype.then = function (onResolved, onRejected) {
    // 指定默认值失败的回调，将异常抛出（实现错误/异常传透的关键点）
    onResolved = typeof onResolved === 'function' ? onResolved : value => value // 向后传递成功的value
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason} // 向后传递失败的reason

    const _that = this
    
    // 返回一个新的promise对象
    return new Promise((resolve, reject) => {
      // 调用指定的回调处理
      function handle(callback) {
        try {
          const result = callback(_that.data)
          if (result instanceof Promise) {
            // result.then(
            //   value => { // 当result成功时， 让return的promise也成功
            //     resolve(value)
            //   },
            //   reason => { // 当result失败时， 让return的promise也失败
            //     reject(reason)
            //   }
            // )
            result.then(resolve, reject)
          } else {
            resolve(result)
          }
        } catch (error) {
          reject(error)
        }
      }

      if (_that.status === PENDING) {
        // 假设当前还是pending状态
        _that.callbacks.push({
          onResolved () {
            handle(onResolved)
          },
          onRejected () {
            handle(onRejected)
          }
        })
      } else if(_that.status === RESOLVED) { // 如果当前是resolved, 异步执行onResolved并改变return的promise状态
        // 异步处理
        setTimeout(() => {
          handle(onResolved)
        })
      } else { // 如果当前是reject, 异步执行onRejected并改变return的promise状态
        setTimeout(() => {
          handle(onRejected)
        })
      }
    })
  }

  // 函数对象的resolve方法，返回成功的promise
  Promise.resolve = function (value) {
    // 返回一个promise
    return new Promise((resolve, reject) => {
      // value是promise
      // value不是
      if(value instanceof Promise) {
        value.then(resolve, reject)
      } else { // 成功
        resolve(value)
      }
    })
  }

  // 函数对象的reject方法，返回失败的promise
  Promise.reject = function (reason) {
    // 返回一个promise
    return new Promise((resolve, reject) => {
      reject(reason)
    })
  }

  // 函数对象的all方法，只有所有的promise成功时才会成功
  Promise.all = function (promises) {
    const values = new Array(promises.length) // 保存成功的数组
    let resolveCount = 0
    return new Promise((resolve, reject) => {
      promises.forEach((p, index) => {
        Promise.resolve(p).then(
          value => {
            resolveCount++
            values[index] = value
            if(resolveCount === promises.length) {
              resolve(values)
            }
          },
          reason => { // 只要一个失败了，return的promise就失败
            reject(reason)
          })
      })
    })
  }

  // 函数对象的race方法，其结果由第一个完成的promise决定
  Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
      promises.forEach(p => {
        Promise.resolve(p).then(
          value => {
            resolve(value)
          },
          reason => { // 只要一个失败了，return的promise就失败
            reject(reason)
          })
      })
    })
  }

  // catch
  Promise.prototype.catch = function (onRejected) {
    return this.then(undefined, onRejected)
  }

  // 函数对象的resolveDelay方法，返回成功的promise
  Promise.resolveDelay = function (value, time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // value是promise
        // value不是
        if(value instanceof Promise) {
          value.then(resolve, reject)
        } else { // 成功
          resolve(value)
        }
      }, time)
    })
  }

  // 函数对象的rejectDelay方法，返回成功的promise
  Promise.rejectDelay = function (reason, time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(reason)
      }, time)
    })
  }

  // 向外暴露
  window.Promise = Promise
})(window)