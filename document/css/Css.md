##### 1、`block`，`inline` 和 `inline-block` 概念和区别
- `display:block`
    - `block` 元素会独占一行，多个block元素会各自新起一行。默认情况下，block元素宽度自动填满其父元素宽度。
    - `block` 元素可以设置 `width`,`height` 属性。块级元素即使设置了宽度,仍然是独占一行。
    - `block` 元素可以设置 `margin` 和 `padding` 属性。
- `display:inline`
    - `inline` 元素不会独占一行，多个相邻的行内元素会排列在同一行里，直到一行排列不下，才会新换一行，其宽度随元素的内容而变化。
    - `inline` 元素设置 `width`,`height` 属性无效。
    - `inline` 元素的 `margin` 和 `padding` 属性，水平方向的 `padding-left`, `padding-right`, `margin-left`, `margin-right` 都产生边距效果；
    但竖直方向的`padding-top`, `padding-bottom`, `margin-top`, `margin-bottom`不会产生边距效果。
- `display:inline-block`
    - 简单来说就是将对象呈现为 `inline` 对象，但是对象的内容作为 `block` 对象呈现。之后的内联对象会被排列在同一行内。
    比如我们可以给一个 `link`（a元素）`inline-block`属性值，使其既具有 `block` 的宽度高度特性又具有 `inline` 的同行特性。


##### 2、`inherit`、`initial`、`unset`、`revert`妙用
- `inherit`：是否继承父元素设置的值
- `initial`：用于设置 CSS 属性为它的默认值，可作用于任何 CSS 样式。（IE 不支持该关键字）
- `unset`：不设置属性的值：
    - 如果该属性是默认继承属性，该值等同于 `inherit`
    - 如果该属性是非继承属性，该值等同于 `initial`

##### 3、`width` 和 `height` 设置 `auto`、100% 和 固定值有什么不同
- 固定值：`width`、`height` 使用固定值是一定会显示的，最好不要使用，不利于响应式开发
- `auto` ：不设置 `width`、`height` 时默认为 `auto`，当 `position` 不同时显示效果不同，浮动可能会导致其不显示，需要清除浮动。
    - `width:auto` 表示宽度是可变动的，这个 div 的所有部分（content+margin+padding+border）相加为父元素的width大小。
    - `height:auto` 表示高度可变动的，如果div设置了 `auto` 但是却没有显示有三种可能：
        - content里没有能将其height支撑的子元素
        - 由于定位和浮动导致其不显示，清除浮动或修改定位
- `100%` ：width、height强制将子元素充满父元素的content。
    - `width:100%` 子元素的 `width` 值为父元素的 `width` 值，加 `margin` 时不改变子元素 `width` 值大小，而是溢出父元素。
    - `height:100%` 不显示的原因可能为没有设置父元素的 `height`，可以通过将父元素的 `height` 设为固定值或是将父元素及父元素
    的父元素设置 `height:100%` 显示。

##### [4、`padding`和`margin`常见问题](https://juejin.im/post/6844903894452027405#heading-7)
- `inline`元素可以设置左右边距(`padding-left`、`padding-right`、`margin-left`、`margin-right`)，但是上下边距(`padding-top`、`padding-bottom`、`margin-top`、`margin-bottom`)无效。
- `padding`、`margin`可以设置百分比：`padding: 10%;margin: 10%`(表示设置为父元素宽度`width`的10%，**注意：这里都是相对于`width`，与`height`无关**)。
  ```
  CSS权威指南中的解释：
    我们认为，正常流中的大多数元素都会足够高以包含其后代元素（包括外边距），如果一个元素的上下外边距时父元素的height的百分数，
    就可能导致一个无限循环，父元素的height会增加，以适应后代元素上下外边距的增加，而相应的，上下外边距因为父元素height的增加
    也会增加，如是循环。
  ```
- 相邻块元素(`block`)垂直外边距合并(外边距塌陷)：当两个相邻块元素的垂直外边距(`margin-top`、`margin-bottom`)相遇时，`margin-bottom`会和`margin-top`合并，取其中较大的值。
- 嵌套块元素(`block`)垂直外边距合并：对于两个嵌套关系的块元素，如果父元素没有上内边距及边框，则父元素的上外边距会与子元素的上外边距发生合并，合并后的外边距为两者中的较大者，即使父元素的上外边距为0，也会发生合并。
  - 解决：
    - 可以为父元素定义1像素的上边框或上内边距
    - 可以为父元素添加`overflow:hidden`
    - 可以为父元素或子元素设置`float`
    - 可以为父元素或子元素设置`position:absolute`
- `margin: 0 auto`居中问题：
  - 必须是`block`，并且有一个宽度
  - 该元素不能浮动或绝对定位

##### 5、`overflow`
- 如果`overflow-x`与`overflow-y`值不同，其中一个是`visible`，另外一个是`auto`,`scroll`,`hidden其中一个`，则`visible`会被重置为`auto`
  - 无论什么浏览器，默认滚动条均来自`<html>`标签，而不是`<body>`标签，
  - `body`标签默认有`.5em`的`margin`值，大约`8px`
  - `chrome`浏览器滚动条宽度为`17px`
- `overflow: hidden`作用：
  - 可以清除浮动：`.container{ background-color: black; overflow:hidden;}`
  - 可以解决嵌套块元素垂直`margin`坍塌问题
  - [引起页面晃动及解决办法](https://juejin.im/post/6844903605774843912)：在处理弹出框弹出之后，屏幕依然可以滚动的问题是，使用`overflow: hidden`会导致页面晃动，这是scrollbar的宽度导致的。可以给根元素右边添加透明的`border-right`。

##### 6、盒子产生溢出的条件：W3C标准中指明： 通常一个盒子的内容是被限制在盒子边界之内的。但有时也会产生溢出，即部分或全部内容跑到盒子边界之外。
- 一个不换行的行元素宽度超出了容器盒子宽度。
- 一个宽度固定的块元素放在了比它窄的容器盒子内。
- 一个元素的高度超出了容器盒子的高度。
- 一个子孙元素，由负边距值引起的部分内容在盒子外部。
- text-indent属性引起的行内元素在盒子的左右边界外。
- 一个绝对定位的子孙元素，部分内容在盒子外。但超出的部分不是总会被剪裁。子孙元素的内容就不会被子孙元素和其包含块之间的祖先元素的overflow的设置所剪裁。





