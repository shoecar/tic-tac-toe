(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = TTT.View = function (game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  };

  View.prototype.bindEvents = function () {
    var that = this;
    $(".cell").on("click", function (cell) {
      that.makeMove($(cell.currentTarget));
    });
  };

  View.prototype.makeMove = function ($square) {
    var pos = $square.data("cell");
    if (this.game.board.isEmptyPos(pos)) {
      var currentPlayer = this.game.currentPlayer;
      this.game.playMove(pos);
      $square.addClass("selected " + currentPlayer);
      if(this.game.winner()) {
        $("h1").text(this.game.winner().toUpperCase() + " Wins!");
        $('.cell').addClass("selected").off("click");
      } else if (this.game.isOver()){
        $("h1").text("Draw Game");
        $('.cell').off("click");
      }
    } else {
      alert("invalid move");
    }
  };

  View.prototype.setupBoard = function () {
    this.$el;
    for (var i = 0; i < 3; i++) {
      this.$el.append('<div class="row"></div>');
    }
    for (var i = 0; i < 3; i++) {
      this.$el.children().append('<div class="cell"></div>');
    }
    var cells = $(".cell");
    for (var i = 0; i < cells.length; i++) {
      var col = i % 3;
      var row = Math.floor( i / 3);
      cells.eq(i).data("cell", [row, col]);
    }
  };
})();
