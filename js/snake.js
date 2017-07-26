class Snake {
	constructor(grid, food) {
		console.log("snake | constructor");
		this.grid = grid;
		this.food = food;
	}

	render() {
		this.position.forEach(position => {
			this.grid.element.querySelectorAll(".row")[position[0]].querySelectorAll(".cell")[position[1]].className = "cell snake";
		});
	}
}

Snake.opposites = {
	"N": "S",
	"S": "N",
	"W": "E",
	"E": "W",
}
