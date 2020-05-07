"use strict"

// 設定 Canvas 畫布、繪圖物件
var ctx = $("#canvas_area")[0].getContext("2d"),
    drawObj = null

// 測試 Canvas
createTestCanvas()

// 綁定畫筆類型變更設定
$("#pen_type").on("change", function() {
    setupDrawObj()
})

// 設定畫筆顏色設定顏色變換效果
$("#pen_color").on("change", function() {
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
    $("#canvas_area").css("border", "2px solid grey")
    $("#canvas_area").css("margin-top", "4em")
    $("#video_content").css("top", "4em")
    ctx.canvas.width = $(window).width() * 0.8
    ctx.canvas.height = $(window).height() * 0.8
    $("#container").css("position", "inherit")
    $("#select_video_button").hide()
    initDrawUI()
    setupDrawObj()
    bind_key_mouse()
}

// 設定畫筆物件選單
function setupDrawObj() {
    $("[class*='pen_type_id_']").hide()
    $(".pen_type_id_" + $("#pen_type").val()).show()
    switch ($("#pen_type").val()) {
        case "1":
            drawObj = pen.setup()
            break
        case "2":
            drawObj = pathMask.setup()
            break
    }
}

// 初始化畫筆UI
function initDrawUI() {
    // 依照畫筆物件設定，加入畫筆顏色選項，設定畫筆顏色
    $.each(pen.colors, function(colorName, value) {
        var optionElement = document.createElement("option")
        optionElement.setAttribute("value", value)
        optionElement.style.color = value
        optionElement.innerHTML = colorName
        $("#pen_color").append(optionElement)
    })
    $("#pen_color").css("color", $("#pen_color").val())
    $("#control").show()
}