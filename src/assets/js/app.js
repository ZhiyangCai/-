export default {
  install: function (Vue) {
    /** TODO 时间格式转换 */
    Vue.prototype.appDateFormat = function (dataStr, pattern = '') {
      //根据给定的事件字符串，得到特定的时间
      const dt = new Date(dataStr);
      const y = dt.getFullYear();
      const m = (dt.getMonth() + 1).toString().padStart(2, '0');
      const d = dt.getDate().toString().padStart(2, '0');
      if (pattern.toLowerCase() === '.') {
        return `${y}.${m}.${d}`
      } else if (pattern.toLowerCase() === 'yyyy-mm-dd') {
        return `${y}-${m}-${d}`
      } else if (pattern.toLowerCase() === 'yyyy-mm') {
        return `${y}-${m}`
      } else if (pattern.toLowerCase() === 'yyyy/mm/dd') {
        return `${y}/${m}/${d}`
      } else if (pattern.toLowerCase() === 'yyyy/mm') {
        return `${y}/${m}`
      } else if (pattern.toLowerCase() === 'yyyy年mm月dd日') {
        return `${y}年${m}月${d}日`
      } else if (pattern.toLowerCase() === 'yyyy年mm月') {
        return `${y}年${m}月`
      } else {
        const hh = dt.getHours().toString().padStart(2, '0');
        const mm = dt.getMinutes().toString().padStart(2, '0');
        const ss = dt.getSeconds().toString().padStart(2, '0');
        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
      }
    }


  }
}
