parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"epB2":[function(require,module,exports) {
var e=new fabric.Canvas("iAvatar",{preserveObjectStacking:!0});function n(){$(e.getObjects()).each(function(n,t){t.on("mousedblclick",function(n){var t=n.target;console.log(t.type),e.bringToFront(t),e.discardActiveObject(),e.renderAll()})})}function t(){var n=e.getObjects();$(n).each(function(e,n){n.set({cornerSize:15,padding:5,transparentCorners:!0,cornerStyle:"circle",cornerColor:"#CD853F",borderColor:"#CD853F"})})}e.backgroundColor="rgba(255,255,255,1)",fabric.Image.fromURL("./img/avatar.png",function(n){e.insertAt(n,0)}),fabric.Image.fromURL("./img/python.png",function(n){e.insertAt(n,1),n.set("top",91),n.set("left",98),n.set("angle",320),n.set("scaleX",.3),n.set("scaleY",.3),n.set({cornerSize:15,padding:5,transparentCorners:!0,CornerStyle:"circle",cornerColor:"#CD853F",borderColor:"#CD853F"})});var o=new fabric.Text("人生苦短，我用python",{top:182,left:145,angle:321,scaleX:.4,scaleY:.38});function c(){$(e.getObjects()).each(function(e,n){"text"==n.type&&n.on("selected",function(){$("#userText").val(n.text),$("#userText").prop("disabled",!1)})})}o.set("fill","white"),o.set({cornerSize:15,padding:5,transparentCorners:!0,CornerStyle:"circle",cornerColor:"#CD853F",borderColor:"#CD853F"}),e.insertAt(o,2),$("#downloadPic").on("click",function(){download(e.toDataURL("png"),"avatar.png","image/png")}),$("#debug").on("click",function(){var n=e.getActiveObject();console.log("top="+n.top),console.log("left="+n.left),console.log("angle="+n.angle),console.log("scaleX="+n.scaleX),console.log("scaleY="+n.scaleY)}),$(function(){var n=new window.keypress.Listener;n.simple_combo("delete",function(){var n=e.getActiveObject();n&&e.remove(n)}),n.simple_combo("[",function(){var n=e.getActiveObject();n&&e.bringForward(n)}),n.simple_combo("]",function(){var n=e.getActiveObject();n&&e.sendBackwards(n)}),c()}),$("#userText").on("change",function(){var n=$("#userText").val();if(console.log(n),n.length>0){var t=e.getActiveObject();t&&"text"==t.type&&(t.set("text",n),e.renderAll())}}),$("#pic_add").on("click",function(){var n=e.toDataURL("png"),t=$("<li><img  src='"+n+"'></li>");$(".image-list").append(t)}),$("#pic_build").on("click",function(){var e=new GIF({workers:2,quality:10,width:460,height:460});$(".image-list li img").each(function(n,t){e.addFrame(t,{delay:1e3})}),e.on("finished",function(e){download(e)}),e.render()}),$(function(){$(".image-list").on("dblclick","li",function(){$(this).remove()}),$(".bg-list>li img").on("dblclick",function(){fabric.Image.fromURL(this.src,function(o){e.add(o),n(),t()})})});
},{}]},{},["epB2"], null)
//# sourceMappingURL=/main.f1d033b8.map