"use strict"

// 設定 Canvas 畫布、繪圖物件
var ctx = $("#canvas_area")[0].getContext("2d")
var drawObj = pen

// 測試 Canvas
//createTestCanvas()

// 設定 canvas 大小、筆跡樣式（在 video_control.js 使用）
function initCanvas() {
    $("#canvas_area").show()
    ctx.canvas.width = $("#video_content").width()
    ctx.canvas.height = $("#video_content").height()
    ctx.strokeStyle = $("#pen_color").val()
    ctx.lineJoin = "round"
    ctx.lineCap = "round"
    ctx.lineWidth = 5
}

// 設定畫筆選單
$("[class*='pen_type_id_']").hide()
$(".pen_type_id_" + $("#pen_type").val()).show()


// 綁定畫筆類型變更選單效果
$("#pen_type").on("change", function() {
    $("[class*='pen_type_id_']").hide()
    $(".pen_type_id_" + $("#pen_type").val()).show()
    switch ($("#pen_type").val()) {
        case "1":
            drawObj = pen.init()
            break
        case "2":
            drawObj = mask.init()
            break
    }
})

// 設定畫筆顏色選項
$.each(pen.colors, function(colorName, value) {
    var optionElement = document.createElement("option")
    optionElement.setAttribute("value", value)
    optionElement.style.color = value
    optionElement.innerHTML = colorName
    $("#pen_color").append(optionElement)
})

// 設定畫筆顏色設定顏色變換效果
$("#pen_color").css("color", $("#pen_color").val())
$("#pen_color").change(function() {
    ctx.strokeStyle = $("#pen_color").val()
    $("#pen_color").css("color", $("#pen_color").val())
})

// 綁定滑鼠在 canvas 上按下動作
$("#canvas_area").mousedown(function(e) {
    drawObj.mousedown(e)
})

// 綁定滑鼠在 canvas 上放開動作
$("#canvas_area").mouseup(function(e) {
    drawObj.mouseup(e)
})

// 綁定滑鼠進入 canvas 動作
$("#canvas_area").mouseover(function(e) {
    drawObj.mouseover(e)
})

// 綁定滑鼠移出 canvas 動作
$("#canvas_area").mouseout(function(e) {
    drawObj.mouseout(e)
})

// 綁定滑鼠在 canvas 上移動動作
$("#canvas_area").mousemove(function(e) {
    drawObj.mousemove(e)
})

// 清空畫布
function clearCanvas(isShowOsd = true) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    if (isShowOsd) {
        showOsd("清除筆跡", "center", "increase")
    }
}

// 建立測試 canvas
function createTestCanvas() {
    $("#canvas_area").show()
    ctx.canvas.width = 1200
    ctx.canvas.height = 800
    ctx.strokeStyle = "#f542a7"
    ctx.lineJoin = "round"
    ctx.lineCap = "round"
    ctx.lineWidth = 5
    $("#container").css("position", "inherit")
}