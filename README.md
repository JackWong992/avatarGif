# 自定义头像
## 项目前期准备
* 使用到得库
  * BootStrap
  * jQuery
  * fabric.js
  * download.js
  * keypress.js
  * 打包工具： Parcel

### 尝试使用fabric.js
```javascript
  var canvas = new fabric.Canvas('iAvatar');

    // create a rectangle object
    var rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'red',
      width: 20,
      height: 20
    });

    // "add" rectangle onto canvas
    canvas.add(rect);
```
使用CRM模式把代码先跑起来，实现canvas得任意拖拽。<br>
将头像的图片信息以base64位输出
```javascript
function downloadPic(){
  console.log( iAvatar )
}
// DataURL: Base64: balabala
```
好的是在farbic.js中可以将图片信息输出为base64
### 尝试使用download.js
在download.js中说明很多种给图片信息编译成图片的方式，包含有：
* text string
* text dataURL
* text blob
* text url
* text UInt8 Array<br>
...等等
```javascript
download(document.documentElement.outerHTML, "dlHTML.html", "text/html");
```
以上述方法为例：
第一个参数为你要编译得信息，第二个参数为你保存图片的名称，第三个信息为保存成什么类型得文件,所以fabric.js给我们提供了dataURL，所以使用起来很方便
### keypress.js 负责监听用户键盘事件