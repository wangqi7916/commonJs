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
}

window.$ = new Method()

export default $

