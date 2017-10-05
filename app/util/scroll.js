export default {
  scrollTo (from, to, duration, cb) {
    /*
  * t: current time（当前时间）；
  * b: beginning value（初始值）；
  * c: change in value（变化量）；
  * d: duration（持续时间）
  */
    function quartEaseOut(t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t*t + b;
      return c / 2*((t -= 2) * t * t + 2) + b;
    }
    function step() {
      time++;
      const val = quartEaseOut(time, from, to - from, during);
      if(time < during) {
        typeof cb === 'function' && cb(val, false);
        setTimeout(step, 17);
      } else {
        typeof cb === 'function' && cb(to, true);
      }
    }
    // 计时
    let time = 0;
    // 计算过程总次数
    const during = Math.ceil(duration / 17);
    step();
  }
}