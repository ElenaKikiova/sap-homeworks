var ChessTable = $("#ChessTable");

var size = 8;
var figures = ["&#9820;", "&#9822;", "&#9821;", "&#9819;", "&#9818;", "&#9821;", "&#9822;", "&#9820;"];

var pawn = { white: "&#9817;", black: "&#9823;"};

for(var row = 0; row < size; row++){
  ChessTable.append("<div class='row' data-row-num='" + row + "'></div>");

  var currentRow = $(".row[data-row-num='" + row + "']");

  var figureColor = "black";
  if(row == 0 || row == 1) figureColor = "white";

  for(var col = 0; col < size; col++){

    var color, html = "";
    if(row % 2){
      color = "black";
      if(col % 2) color = "white";
    }
    else{
      color = "white";
      if(col % 2) color = "black";
    }

    if(row == 0) {
      html = figures[col];
    }
    else if(row == 7){
      html = figures[size - col - 1];
    }
    else if(row == 1 || row == 6) {
      html = pawn[figureColor];
    }

    currentRow.append("<div class='col " + color + "' data-col-num='" + col + "'>" + html + "</div>");
  }

}
