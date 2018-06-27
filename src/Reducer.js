const initialState = {
	diagram: {
		title: "My Diagram",
		layout: {
			nodes: [
				{ x: 316, y: 281, },
				{ x: 632, y: 437, },
			],
			edges: [
				{ x: 0,    y: 0,   squareX: 0,  squareY: 0,  },
				{ x: 1024, y: 0,   squareX: 50, squareY: 0,  },
				{ x: 0,    y: 768, squareX: 0,  squareY: 50, },
				{ x: 1024, y: 768, squareX: 50, squareY: 50, },
			],
			other: 'Lots of other stuff here',
		},
		other: 'Lots of other stuff here',
	},
	other: 'Lots of other stuff here',
}

export function reducer(state = initialState, action) {
	switch(action.type) {
		case 'SQUARE_MOVED':
			state.diagram.layout.nodes[action.id].x = state.diagram.layout.nodes[action.id].x + action.dx;
			state.diagram.layout.nodes[action.id].y = state.diagram.layout.nodes[action.id].y + action.dy;
			return state;
		default:
			return state;
	}
}
