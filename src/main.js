var canvas = new fabric.Canvas("iAvatar", {
  preserveObjectStacking: true
});
canvas.backgroundColor = "rgba(255,255,255,1)";
fabric.Image.fromURL("./img/avatar.png", function(oImg) {
  canvas.insertAt(oImg, 0);
}); //设置外卖头盔图层的位置为最下面


//双击图片显示粘贴
function eventit() {
  $(canvas.getObjects()).each((t, e)=>{
    e.on("mousedblclick", t=>{
      var e = t.target
      console.log(e.type)
      canvas.bringToFront(e)
      canvas.discardActiveObject()
      canvas.renderAll()
    })
  })
}
//图片的颜色改变
function control_init() {
  var t = canvas.getObjects();
  $(t).each((t, e)=>{
    e.set({
      cornerSize: 15,
      padding: 5,
      transparentCorners: !0,
      cornerStyle: "circle",
      cornerColor: "#CD853F",
      borderColor: "#CD853F"
    })
  })
}

//设置头盔上面图片的位置信息
fabric.Image.fromURL("./img/python.png", function(oImg) {
  canvas.insertAt(oImg, 1);
  oImg.set("top", 91);
  oImg.set("left", 98);
  oImg.set("angle", 320);
  oImg.set("scaleX", 0.3);
  oImg.set("scaleY", 0.3);
  oImg.set({
    cornerSize: 15,
    padding: 5,
    transparentCorners: true,
    CornerStyle: "circle",
    cornerColor: "#CD853F",
    borderColor: "#CD853F"
  });
});
//设置文字旋转
var text = new fabric.Text("人生苦短，我用python", {
  top: 182,
  left: 145,
  angle: 321,
  scaleX: 0.4,
  scaleY: 0.38
});
text.set("fill", "white");
text.set({
  cornerSize: 15,
  padding: 5,
  transparentCorners: true,
  CornerStyle: "circle",
  cornerColor: "#CD853F",
  borderColor: "#CD853F"
});
canvas.insertAt(text, 2);

$("#downloadPic").on("click", function() {
  download(canvas.toDataURL("png"), "avatar.png", "image/png");
});

//旋转图片  获取图片得坐标
$("#debug").on("click", function() {
  var obj = canvas.getActiveObject(); //获取选中的素材
  console.log("top=" + obj.top);
  console.log("left=" + obj.left);
  console.log("angle=" + obj.angle);
  console.log("scaleX=" + obj.scaleX);
  console.log("scaleY=" + obj.scaleY);
});
$(() => {
  var listener = new window.keypress.Listener();

  //点击delete按钮实现删除图片
  listener.simple_combo("delete", () => {
    var obj = canvas.getActiveObject();
    if (obj) {
      canvas.remove(obj);
    }
  });
  //点击[ 向左平移图片
  listener.simple_combo("[", () => {
    var obj = canvas.getActiveObject();
    if (obj) {
      canvas.bringForward(obj);
    }
  });
  //点击]向右平移图片
  listener.simple_combo("]", () => {
    var obj = canvas.getActiveObject();
    if (obj) {
      canvas.sendBackwards(obj);
    }
  });
  text_init();
});

//文字打印
function text_init() {
  $(canvas.getObjects()).each((index, item) => {
    if (item.type == "text") {
      item.on("selected", () => {
        $("#userText").val(item.text);
        $("#userText").prop("disabled", false);
      });
    }
  });
}
//修改输入文本，改变头像文字:输入框增加onchange事件
$("#userText").on("change", function() {
  var newText = $("#userText").val();
  console.log(newText);
  if (newText.length > 0) {
    var obj = canvas.getActiveObject();
    if (obj && obj.type == "text") {
      obj.set("text", newText);
      canvas.renderAll();
    }
  }
});

$("#pic_add").on("click", function() {
  var data_url = canvas.toDataURL("png");
  var li = $("<li><img  src='" + data_url + "'></li>");
  $(".image-list").append(li);
});
$("#pic_build").on("click", function() {
  var gif = new GIF({
    workers: 2,
    quality: 10,
    width: 460,
    height: 460
  });
  $(".image-list li img").each((index, item) => {
    gif.addFrame(item, { delay: 1000 });
  });

  gif.on("finished", function(blob) {
    download(blob), "avatar.gif", "image/gif";
  });
  gif.render();
});

//双击图片加入头像制作区
$(function(){
  $(".image-list").on("dblclick", "li",
      function () {
        $(this).remove()
      }),
  $(".bg-list>li img").on("dblclick", function(){
    fabric.Image.fromURL( this.src, function(t){
      canvas.add(t)
      eventit()
      control_init()
    })
  })    
//  clipboard_init()
  //key_init()
})
