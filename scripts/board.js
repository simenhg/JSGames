function Board(width, height) {
    this.width = width;
    this.height = height;
    this.show = function() {
        var canvas = document.getElementById("board");
        var context = canvas.getContext("2d");
    };
}