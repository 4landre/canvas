var canvas = document.getElementById('canvas');//获取canvas
//设置canvas全屏
autosetwindow()

window.onresize = function () {
    autosetwindow()
}

var context = canvas.getContext('2d');//获取二次元上下文

var using = false
var lastXY = { x: undefined, y: undefined }

document.onmousedown = function (xy) { //点击鼠标api可获得相关参数
    var x = xy.clientX
    var y = xy.clientY
    lastXY = { x: x, y: y }
    using = true
    if (enableEraser) {
        context.clearRect(x - 5, y - 5, 10, 10);
    }
    else {
        drawCircle(x, y, 1);
    }

}

document.onmousemove = function (xy) {
    var x = xy.clientX
    var y = xy.clientY
    if (using) {
        if (enableEraser) {
            context.clearRect(x - 5, y - 5, 10, 10)
        } else {
            var newXY = { x: x, y: y }
            drawLine(lastXY.x, lastXY.y, newXY.x, newXY.y)
            lastXY = newXY
        }
    }

}


document.onmouseup = function (xy) {
    using = false
}

//工具

//全屏化canvas
function autosetwindow() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight

    canvas.width = pageWidth
    canvas.height = pageHeight
}

//画圆
function drawCircle(x, y, radious) {
    context.beginPath();
    context.fillStyle = 'black';
    context.arc(x, y, 1, 0, Math.PI * 2);
    context.fi
    ll();
}
//2点连线
function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.strokeStyle = 'black';
    context.moveTo(x1, y1);
    context.lineWidth = 1;
    context.lineTo(x2, y2);
    context.stroke();
}

//橡皮擦
var enableEraser = false
eraser.onclick = function () {
    enableEraser = true
    action.className = "eraser"
}
brush.onclick = function () {
    enableEraser = false
    action.className = "brush"
}