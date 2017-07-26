class Grid {
	constructor(height, width) {
		console.log("grid | constructor");
		this.height = height;
		this.width = width;

		const grid = document.createElement('div');
		grid.id = 'grid';

		for (let i = 0; i < this.height; i++) {
			const row = document.createElement('div');
			row.className = 'row';

			for (let j = 0; j < this.width; j++) {
				const cell = document.createElement('div');
				cell.className = 'cell';
				row.append(cell);
			}

			grid.append(row);
		}
		
		this.element = grid;
	}

	render() {
		document.body.prepend(this.element);
	}
}
