##### 1、ViewPort
- 几个重要的概念：
    - `visual viewport`可见视口：屏幕宽度`window.innerWidth/Height`
    - `layout viewport`布局视口：DOM宽`document.documentElement.clientWidth/Height`
    - `ideal viewport` 理想视口 ：使布局视口就是可见视口
    
- `viewport`:`<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">`
    - `width=device-width` ：表示宽度是设备屏幕的宽度
    - `initial-scale` ：表示初始的缩放比例
    - `minimum-scale` ：表示最小的缩放比例
    - `maximum-scale` ：表示最大的缩放比例
    - `user-scalable` ：表示用户是否可以调整缩放比例

##### [2、适配方案](https://juejin.im/post/5d21a9bd5188255360190e7e#heading-27)
- [PC：圣杯布局](./demo/屏幕适配.html)
