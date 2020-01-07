class Method {
  // fmt "YYYY-mm-dd HH:MM"
  dateFormat(fmt, date) { // 时间格式化
    let ret;
    let opt = {
      "Y+": date.getFullYear().toString(), // 年
      "m+": (date.getMonth() + 1).toString(), // 月
      "d+": date.getDate().toString(), // 日
      "H+": date.getHours().toString(), // 时
      "M+": date.getMinutes().toString(), // 分
      "S+": date.getSeconds().toString() // 秒
    }
  
    for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt); // 返回匹配的
      if (ret) {
        fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0"))) // 用0补全
      }
    }
    return fmt
  }

  // 检测电话号码 182-5690-7916
  checkPhone(phoneNum) {
    return (/^1[3456789]\d{9}$/).test(phoneNum) ? true : false
  }

  // 检测邮箱 1191923306@qq.com
  checkMail(mailNum) {
    return (/^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/).test(mailNum) ? true : false
  }

  // cookie
  setCookie(name, value, days) {
    let d = new Date();
    d.setTime(d.getTime() + (days*24*60*60*1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = name + "=" + value + "; " + expires;
  }

  getCookie(name) {
    let cName = name + '=';
    let arrName = document.cookie.split(';');
    for(let i = 0; i < arrName.length; i++) {
      let c = arrName[i]
      while (c.charAt(0) == ' ') c = c.substring(1)
      if (c.indexOf(name) != -1) return c.substring(name.length, c.length)
    }
    return ""
  }

  clearCookie(name) {
    this.setCookie(name, "", -1)
  }

  /**
  * 去除字符串空格
  * @param str 要处理的字符串
  * @param type 1：所有空格 2：前后空格 3：前空格 4：后空格
  */
  strTrim(str,type) {
    switch (type){
      case 1: return str.replace(/\s+/g,"");
      case 2: return str.replace(/(^\s*)|(\s*$)/g, "");
      case 3: return str.replace(/(^\s*)/g, "");
      case 4: return str.replace(/(\s*$)/g, "");
      default: return str;
    }
  }

  /**
  * 获取URL参数
  * @param url 地址
  * @returns 例：getUrl("http://www.baidu.com?id=1&name=张三&uid=12345654321&type=1,2,3")，结果{id: "1", nam: "张三", uid: "12345654321", type: "1,2,3"}
  */
  getUrl(urlParams) {
    let url = urlParams ? urlParams : window.location.href
    let obj = {}
    let paramsArr = url.substring(url.indexOf('?') + 1).split('&')
    for (let i in paramsArr) {
      let pos = paramsArr[i].indexOf('=')
      if (pos === -1) {
        continue
      }
      let key = paramsArr[i].substring(0, pos)
      let value = window.decodeURIComponent(paramsArr[i].substring(pos + 1))
      obj[key] = value
    }

    return obj
  }

  /**
  * 检测密码强度
  * @param str 字符串
  * @returns 1：密码弱 2：密码中等 3：密码强 4：密码很强
  */
  checkPwd(str) {
    let nowLv = 0;
    if (str.length < 6) {
      return nowLv
    }
    if (/[0-9]/.test(str)) {
      nowLv++
    }
    if (/[a-z]/.test(str)) {
      nowLv++
    }
    if (/[A-Z]/.test(str)) {
      nowLv++
    }
    if (/^\S/.test(str)) {
      nowLv++
    }
    return nowLv
  }

  /**
   * 防抖函数，返回函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行
   *
   * @param  {function} func        回调函数
   * @param  {number}   wait        表示时间窗口的间隔
   * @param  {boolean}  immediate   设置为ture时，是否立即调用函数
   * @return {function}             返回客户调用函数
  */
  // debounce(func, wait = 500, immediate = true) {
  //   let timer, context, args

  //   // 延迟执行函数
  //   const later = () => setTimeout(() => {
  //     timer = null
  //     if (!immediate) {
  //       func.apply(context, args)
  //       context = args = null
  //     }
  //   }, wait)

  //   // 返回实际调用的函数
  //   return function(...params) {
  //     if (!timer) {
  //       timer = later()
  //       if (immediate) {
  //         func.apply(this, params)
  //       } else {
  //         context = this
  //         args = params
  //       }
  //     } else {
  //       clearTimeout(timer)
  //       timer = later()
  //     }
  //   }
  // }

  /**
   * underscore 节流函数，返回函数连续调用时，func 执行频率限定为 次 / wait
   *
   * @param  {function}   func      回调函数
   * @param  {number}     wait      表示时间窗口的间隔
   * @param  {object}     options   如果想忽略开始函数的的调用，传入{leading: false}。
   *                                如果想忽略结尾函数的调用，传入{trailing: false}
   *                                两者不能共存，否则函数不能执行
   * @return {function}             返回客户调用函数
  */
  // throttle (func, wait, options) {
  //   var context, args, result;
  //   var timeout = null;
  //   // 之前的时间戳
  //   var previous = 0;
  //   // 如果 options 没传则设为空对象
  //   if (!options) options = {};
  //   // 定时器回调函数
  //   var later = function() {
  //     // 如果设置了 leading，就将 previous 设为 0
  //     // 用于下面函数的第一个 if 判断
  //     previous = options.leading === false ? 0 : new Date().now();
  //     // 置空一是为了防止内存泄漏，二是为了下面的定时器判断
  //     timeout = null;
  //     result = func.apply(context, args);
  //     if (!timeout) context = args = null;
  //   };

  //   return function() {
  //     // 获得当前时间戳
  //     var now = new Date().now();
  //     // 首次进入前者肯定为 true
  //     // 如果需要第一次不执行函数
  //     // 就将上次时间戳设为当前的
  //     // 这样在接下来计算 remaining 的值时会大于0
  //     if (!previous && options.leading === false) previous = now;
  //     // 计算剩余时间
  //     var remaining = wait - (now - previous);
  //     context = this;
  //     args = arguments;
  //     // 如果当前调用已经大于上次调用时间 + wait
  //     // 或者用户手动调了时间
  //     // 如果设置了 trailing，只会进入这个条件
  //     // 如果没有设置 leading，那么第一次会进入这个条件
  //     // 还有一点，你可能会觉得开启了定时器那么应该不会进入这个 if 条件了
  //     // 其实还是会进入的，因为定时器的延时
  //     // 并不是准确的时间，很可能你设置了2秒
  //     // 但是他需要2.2秒才触发，这时候就会进入这个条件
  //     if (remaining <= 0 || remaining > wait) {
  //       // 如果存在定时器就清理掉否则会调用二次回调
  //       if (timeout) {
  //         clearTimeout(timeout);
  //         timeout = null;
  //       }
  //       previous = now;
  //       result = func.apply(context, args);
  //       if (!timeout) context = args = null;
  //     } else if (!timeout && options.trailing !== false) {
  //       // 判断是否设置了定时器和 trailing
  //       // 没有的话就开启一个定时器
  //       // 并且不能不能同时设置 leading 和 trailing
  //       timeout = setTimeout(later, remaining);
  //     }
  //     return result;
  //   };
  // }

  // 多维数组降维
  flattenDeep (arr) {
    return Array.isArray(arr) ? arr.reduce( (a, b) => [...a, ...this.flattenDeep(b)] , []) : [arr]
  }
  

  // debounceNew(fn, wait = 500, immediate = true) {
  //   let timer, result, debounced;
  //   debounced = function(...args) {
  //     if (timer) {
  //       clearTimeout(timer)
  //     }
  //     if (immediate) {
  //       if (!timer) {
  //         result = fn.apply(this, args)
  //       }
  //       timer = setTimeout(() => {
  //         timer = null
  //       }, wait)
  //     } else {
  //       timer = setTimeout(() => {
  //         fn.apply(this, args)
  //       }, wait)
  //     }
  //     return result;
  //   }

  //   debounced.cancel = function() {
  //     clearTimeout(timer)
  //   }
  //   return debounced;
  // }
  
  // 防抖 防止在规定时间内重复执行
  // debounceNew (fn, wait = 500, immediate = true) {
  //   let timer;
  //   return function(...args) {
  //     if (timer) {
  //       clearTimeout(timer)
  //     }
  //     if (immediate) {
  //       if (!timer) {
  //         fn.apply(this, args)
  //       }
  //       timer = setTimeout(() => {
  //         timer = null
  //       }, wait)
  //     } else {
  //       timer = setTimeout(() => {
  //         fn.apply(this, args)
  //       }, wait)
  //     }
  //   }
  // }
  // throttleNew (fn, wait = 1000) {
  //   let prev = Date.now()
  //   return function(...args) {
  //     let now = Date.now()
  //     if (now - prev >= wait) {
  //       fn.apply(this, args)
  //       prev = Date.now()
  //     }
  //   }
  // }
  
  // 判断数据类型
  // 
  getType (obj) {
    const str = Object.prototype.toString.call(obj)
    const map = {
      '[object Boolean]': 'boolean',
      '[object Number]': 'number',
      '[object String]': 'string',
      '[object Function]': 'function',
      '[object Array]': 'array',
      '[object Date]': 'date',
      '[object RegExp]': 'regExp',
      '[object Undefined]': 'undefined',
      '[object Null]': 'null',
      '[object Object]': 'object'
    }

    if (obj instanceof Element) {
      return 'element'
    }

    return map[str]
  }
  // 深拷贝
  deepCopy (newObj, oldObj) {
    let _that = this
    for(let k in oldObj) {
      let item = oldObj[k]
      let type = _that.getType(item) 
      if (type == 'array') {
        newObj[k] = []
        _that.deepCopy(newObj[k], item)
      } else if (type == 'object') {
        newObj[k] = {}
        _that.deepCopy(newObj[k], item)
      } if (type === 'function') {
        newObj[k] = () => {}
        newObj[k].prototype = item
      } else {
        newObj[k] = item
      }
    }
    return newObj
  }

  // 数据劫持
  setDefineProperty(obj = {}, property) {
    let temperature = null;
    Object.defineProperty(obj, property, {
      get: function () {
        return temperature
      },
      set: function (newValue) {
        temperature = newValue
      }
      // emumerable: true,
      // writable: true,
      // configurable: true
    })
  }

  // Proxy 代理
  setProxy(target = {}) {
    let proxy = new Proxy(target, {
      get: function(target, property) {
        if (property in target) {
          return target[property]
        } else {
          throw new ReferenceError("Property \"" + property + "\" does not exist.");
        }
      },
      set: function(target, property, value) {
        target[property] = value
      }
    })
    return proxy
  }
}

window.$ = new Method()

export default $

