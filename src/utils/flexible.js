(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      docEl.style.fontSize = 75 * (clientWidth / 750) + 'px';
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);


//  375/750 = x/75 可得到在真机375屏幕下根字体的大小x值；然后同理在750设计图上所量尺寸均除以75即可得到真实屏幕上的rem值；这样根字体和所取尺寸的rem值即行成对应关系；
//  75为一个自己定义换算的值 定义为75，则750设计图上所得的所有尺寸转换成rem时均除以75即可得到在375真实屏幕上的真实尺寸rem值；也可定为100，那750设计图上所得的所有尺寸转换成rem时均除以100即可得到在375真实屏幕上的真实尺寸rem值