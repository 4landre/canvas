var canvas = document.getElementById('canvas');//获取canvas
//设置canvas全屏
setwindowsize()
window.onresize = function () {
    setwindowsize()
}

var context = canvas.getContext('2d');//获取二次元上下文
var lineWidth = 5
listenToUesr()

//工具

//全屏化canvas

function setwindowsize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight

    canvas.width = pageWidth
    canvas.height = pageHeight
}




//监听鼠标
function listenToUesr() {
    var using = false
    var lastXY = { x: undefined, y: undefined }
    black.onclick = function () { //选择颜色
        black.classList.add('active')
        red.classList.remove('active')
        blue.classList.remove('active')
        context.fillStyle = 'black'
        context.strokeStyle = 'black'
    }
    red.onclick = function () {
        black.classList.remove('active')
        red.classList.add('active')
        blue.classList.remove('active')
        context.fillStyle = 'red'
        context.strokeStyle = 'red'
    }
    blue.onclick = function () {
        black.classList.remove('active')
        red.classList.remove('active')
        blue.classList.add('active')
        context.fillStyle = 'blue'
        context.strokeStyle = 'blue'
    }


    thin.onclick = function () {
        lineWidth = 5
        thin.classList.add('active')
        thick.classList.remove('active')
    }
    thick.onclick = function () {
        lineWidth = 10
        thin.classList.remove('active')
        thick.classList.add('active')
    }

    if (document.ontouchstart !== undefined) { //特性检测（用户是在什么客户端上）
        canvas.ontouchstart = function (xy) { //用触摸屏画
            var x = xy.touches[0].clientX
            var y = xy.touches[0].clientY
            lastXY = { x: x, y: y }
            using = true
            if (enableEraser) {
                context.clearRect(x - 5, y - 5, 10, 10);
            }
            else {
                drawCircle(x, y, 1);
            }
        }
        canvas.ontouchmove = function (xy) {
            var x = xy.touches[0].clientX
            var y = xy.touches[0].clientY
            if (using) {
                if (enableEraser) {
                    context.clearRect(x - 5, y - 5, 10, 10)
                } else {
                    var newXY = { x: x, y: y }
                    drawCircle(x, y, 1);
                    drawLine(lastXY.x, lastXY.y, newXY.x, newXY.y)
                    lastXY = newXY
                }
            }
        }
        canvas.ontouchend = function () {
            using = false
        }
    } else {
        document.onmousedown = function (xy) { //用鼠标画
            var x = xy.clientX
            var y = xy.clientY
            lastXY = { x: x, y: y }
            using = true
            if (enableEraser) {
                context.clearRect(x - 10, y - 10, 20, 20);
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
                    drawCircle(x, y, 1);
                    drawLine(lastXY.x, lastXY.y, newXY.x, newXY.y)
                    lastXY = newXY
                }
            }

        }
        document.onmouseup = function (xy) {
            using = false
        }
    }

}

//画圆
function drawCircle(x, y, radious) {
    context.beginPath();
    context.arc(x, y, lineWidth * 0.5, 0, Math.PI * 2);
    context.fill();
}
//2点连线
function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineWidth = lineWidth;
    context.lineTo(x2, y2);
    context.stroke();
}

//橡皮擦
var enableEraser = false
eraser.onclick = function () {
    enableEraser = true
    eraser.classList.add('active')
    pencil.classList.remove('active')
}
pencil.onclick = function () {
    enableEraser = false
    eraser.classList.remove('active')
    pencil.classList.add('active')
}
clear.onclick = function () {
    context.clearRect(0, 0, canvas.width, canvas.height)
}