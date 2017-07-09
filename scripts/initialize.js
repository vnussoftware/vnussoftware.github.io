//    The MIT License (MIT)
//
//    Copyright (c) 2014 YIOM
//
//    Permission is hereby granted, free of charge, to any person obtaining a copy
//    of this software and associated documentation files (the "Software"), to deal
//    in the Software without restriction, including without limitation the rights
//    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//    copies of the Software, and to permit persons to whom the Software is
//    furnished to do so, subject to the following conditions:
//
//    The above copyright notice and this permission notice shall be included in
//    all copies or substantial portions of the Software.
//
//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
//    THE SOFTWARE.

// Sketchpad as a global variable, so it becomes browser accessible
var sketchpad = null;
var JsonValue = "";
var sketchpad = null;

function GetJSonValue() {
    JsonValue = sketchpad.toJSON();
    return JsonValue;
}

function SetJSonValue(setJSon) {
    JsonValue = setJSon;
    var settings = JSON.parse(JsonValue);
    settings.element = '#sketchpad'
    sketchpad = new Sketchpad(settings);
}

$(document).ready(function () {

    var bkColor = "white";
    var SheetNum = location.search.split('SheetNum=')[1];
    var fileName = "url('images/sheet" + SheetNum + bkColor + ".png')";

    $('#editor').css("background-image", fileName);

  sketchpad = new Sketchpad({
    element: '#sketchpad',
    width: 477,
    height: 625,
  });

  sketchpad.color = "#ff0000";
  sketchpad.penSize = 2;

  $("#undo").click(function () {
      sketchpad.undo();
  });
  $("#redo").click(function () {
      sketchpad.redo();
  });
  $("#clear").click(function () {
      sketchpad.clear();
  });
  $("#invert").click(function () {
      var othercol;
      if (bkColor == "white") {
          bkColor = "black";
          othercol = "white";
      }
      else if (bkColor == "black") {
          bkColor = "white";
          othercol = "black";
      }
      var fileName = "url('images/sheet" + SheetNum + bkColor + ".png')";
      $('#editor').css("background-image", fileName);
      $("body").css({ "background-color": bkColor });
      $('#sellabel').css("color", othercol);
  });

  $('#sel1').change(function () {
      var valThick = $(this).val();
      sketchpad.penSize = valThick;
  });
  $('#colorpicker').colorPicker();

  $("#colorpicker").change(function () {
      sketchpad.color = $(this).val();
  });

  function update_actions() {
      JsonValue = sketchpad.toJSON();
      window.external.JsonDataUpdate(JsonValue);
  }


});

$(window).on('resize', function() {
  sketchpad.reset();
});

$('#expandbutton').click(function()  {
	 $(this)
		.closest('[class^="col-md"]')
			.toggleClass('col-md-8 col-md-12')
	//$('#collapseimage').click();
});



