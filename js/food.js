class Food {
	constructor(grid) {
    this.grid = grid;
  }

  change() {
     this.position = [Math.floor(Math.random() * (this.grid.height - 0)) + 0, Math.floor(Math.random() * (this.grid.width - 0)) + 0]
  }

  render() {
    this.grid.element.querySelectorAll(".row")[this.position[0]].querySelectorAll(".cell")[this.position[1]].className = "cell food";
  }
}
