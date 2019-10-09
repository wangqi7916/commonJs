// export default function dateFormat(fmt, date) {
//   let ret;
//   let opt = {
//     "Y+": date.getFullYear().toString(), // 年
//     "m+": (date.getMonth() + 1).toString(), // 月
//     "d+": date.getDate().toString(), // 日
//     "H+": date.getHours().toString(), // 时
//     "M+": date.getMinutes().toString(), // 分
//     "S+": date.getSeconds().toString() // 秒
//   }

//   for (let k in opt) {
//     ret = new RegExp("(" + k + ")").exec(fmt);
//     console.log(ret)
//     if (ret) {
//       fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
//     }
//   }
//   return fmt
// }

class Method {
  // fmt格式
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
      console.log(ret)
      if (ret) {
        fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0"))) // 用0补全
      }
    }
    return fmt
  }
}
window.$ = new Method()
export default $