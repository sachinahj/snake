class Game {
	constructor(height = 50, width = 50) {
		this.speed = 1;
		this.gameover = false;
		this.input = null;

		this.grid = new Grid(height, width);

		this.food = new Food(this.grid);
		this.food.position = [this.grid.height / 2, this.grid.width / 2];

		this.snake = new Snake(this.grid, this.food);
		this.snake.position = [[this.grid.height / 2, 4], [this.grid.height / 2, 3], [this.grid.height / 2, 2], [this.grid.height / 2, 1], [this.grid.height / 2, 0]]; // make random
		this.snake.direction = "E"; // make random

		this.grid.render();
		this.food.render();
		this.snake.render();
	}

	start() {
		this._listeners();

		const loop = () => {
			this._frame();

			if (!this.gameover) {
				const speed = this._speed();
				setTimeout(loop, speed);
			} else {
				const gameover = document.createElement('h3');
				gameover.innerText = "Game Over!";
				document.body.prepend(gameover);
			}
		}

		loop();
	}

	_listeners() {
		document.onkeydown = (event) => {
			switch(event.key) {
				case "ArrowUp":
					this.input = "N";
					break;
				case "ArrowRight":
					this.input = "E";
					break;
				case "ArrowDown":
					this.input = "S";
					break;
				case "ArrowLeft":
					this.input = "W";
					break;
				default:
					return;
			}
		};

		document.getElementById('speed').onchange = (event) => {
			this.speed = parseInt(event.target.value);
		}

	}

	_speed() {
		return 60 - this.speed * 10;
	}

	_move() {
		if (this.input && this.input != Snake.opposites[this.snake.direction]) {
			this.snake.direction = this.input;
			this.input = null;
		}

		let step;
		switch(this.snake.direction) {
			case "N":
				step = [-1, 0];
				break;
			case "E":
				step = [0, 1];
				break;
			case "S":
				step = [1, 0];
				break;
			case "W":
				step = [0, -1];
				break;
			default:
				return;
		}

		this.snake.position.unshift([this.snake.position[0][0] + step[0], this.snake.position[0][1] + step[1]]);
		if (this.snake.position[0][0] == this.food.position[0] && this.snake.position[0][1] == this.food.position[1]) {
			this.food.change();
		} else {
			const remove = this.snake.position.pop();
			this.grid.element.querySelectorAll(".row")[remove[0]].querySelectorAll(".cell")[remove[1]].className = "cell";
		}

		this.snake.position = this.snake.position.map(position => {
			if (position[0] == this.grid.height) {
				position[0] = 0;
			}
			if (position[0] == -1) {
				position[0] = this.grid.height - 1;
			}
			if (position[1] == this.grid.width) {
				position[1] = 0;
			}
			if (position[1] == -1) {
				position[1] = this.grid.width - 1;
			}

			return position;
		});
	}

	_frame() {
		this._move();

		this.gameover = this.snake.position.find((position, index) => {
			return index != 0 && this.snake.position[0][0] == position[0] && this.snake.position[0][1] == position[1]
		});

		this.food.render();
		this.snake.render();

		document.getElementById('score').innerHTML = this.snake.position.length - 5;
	}
}
