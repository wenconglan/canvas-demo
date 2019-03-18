//声明并获取canvas·标签
var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')
var lineWidth = 5

autoSetCanvasSize(canvas)

listenToUser(canvas)

//监听canvas内鼠标事件

//橡皮擦和画笔切换
var eraserEnabled = false
pen.onclick = function(){
  eraserEnabled = false
  pen.classList.add('active')
  eraser.classList.remove('active')
}
eraser.onclick = function(){
  eraserEnabled = true
  eraser.classList.add('active')
  pen.classList.remove('active')
}
//颜色切换

red.onclick = function(){
  context.strokeStyle = 'red'
  red.classList.add('active')
  green.classList.remove('active')
  blue.classList.remove('active')
}
green.onclick = function(){
  context.strokeStyle = 'green'
  red.classList.remove('active')
  green.classList.add('active')
  blue.classList.remove('active')
}
blue.onclick = function(){
  context.strokeStyle = 'blue'
  red.classList.remove('active')
  green.classList.remove('active')
  blue.classList.add('active')
}
//粗细调整
thin.onclick = function(){
  lineWidth = 5
}
thick.onclick = function(){
  lineWidth = 10;
}
//清空画布
clear.onclick = function(){
  context.clearRect(0,0,canvas.width,canvas.height)
}
//下载画图
download.onclick = function(){
  var url = canvas.toDataURL("image/png")
  var a = document.createElement('a')
  document.body.appendChild(a)
  a.href = url
  a.download = '我画的画'
  a.target = '_blank'
  a.click()
}
/******打包函数***/

function autoSetCanvasSize(canvas) {
  //获取屏幕大小
  setCanvasSize()

  //设置全屏函数
  window.onresize = function() {
    setCanvasSize()
  }

  //优化获取屏幕宽度函数
  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}
//设置canvas画圆的函数
function drawCircle(x, y, radius) {
  context.beginPath()
  context.arc(x, y, radius, 0, Math.PI * 2)
  context.fill()
}

//设置画线函数
function drawLine(x1, y1, x2, y2) {
  context.beginPath()
  context.moveTo(x1, y1)
  context.lineWidth = lineWidth
  context.lineTo(x2, y2)
  context.stroke()
  context.closePath()
}

function listenToUser(canvas) {
  var using = false
  var lastPoint = { x: undefined, y: undefined }

  if(document.body.ontouchstart !== undefined){
    //监听为触屏设备
    canvas.ontouchstart = function(a){
      var x = a.touches[0].clientX,y = a.touches[0].clientY
      using = true
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        lastPoint = { x: x, y: y }
      }
    }
    canvas.ontouchmove = function(a){
      var x = a.touches[0].clientX,y = a.touches[0].clientY
      if (!using) {return}
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        var newPoint = { x: x, y: y }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
    canvas.ontouchend = function(a){
      using = false
    }
  }else{
    //监听为非触屏设备
    canvas.onmousedown = function(a) {
      var x = a.clientX,y = a.clientY
      using = true
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        lastPoint = { x: x, y: y }
      }
    }
    canvas.onmousemove = function(a) {
      var x = a.clientX,y = a.clientY
      if (!using) {return}
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        var newPoint = { x: x, y: y }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
    canvas.onmouseup = function(a) {
      using = false
    }
  }
  
}

/*//声明
var div = document.getElementById('canvas')
var painting = false

//监听div内的鼠标事件
div.onmousedown = function(a) {
  painting = true
  var x = a.clientX //获取鼠标点击的坐标
  var y = a.clientY
  var divA = document.createElement('div') //新建一个div
  divA.style =
    'width:6px;height:6px;background: black;border-radius:3px;position:absolute;left:' +
    (x - 3) +
    'px;top:' +
    (y - 3) +
    'px;'
  div.appendChild(divA)
}
document.onmousemove = function(a) {
  if (painting) {
    var x = a.clientX //获取鼠标点击的坐标
    var y = a.clientY
    var divA = document.createElement('div') //新建一个div
    divA.style =
      'width:6px;height:6px;background: black;border-radius:3px;position:absolute;left:' +
      (x - 3) +
      'px;top:' +
      (y - 3) +
      'px;'
    div.appendChild(divA)
  }
  else{}
}
document.onmouseup = function(z) {
  painting = false
}*/