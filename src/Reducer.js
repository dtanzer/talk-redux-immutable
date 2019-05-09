//@flow
import { Record, List, } from 'immutable';
import type { RecordFactory, RecordOf, } from 'immutable';

type NodeProps = { x: number, y: number };
const NodeFactory : RecordFactory<NodeProps> = Record({ x: 0, y: 0, });
type Node = RecordOf<NodeProps>;

type EdgeProps = { x: number, y: number, squareX: number, squareY: number};
const EdgeFactory : RecordFactory<EdgeProps> = Record({ x: 0, y: 0, squareX: 0, squareY: 0});
type Edge = RecordOf<EdgeProps>;

type LayoutProps = { other: string, nodes: List<Node>, edges: List<Edge> };
const LayoutFactory : RecordFactory<LayoutProps> = Record({ other: '', nodes: List(), edges: List() });
type Layout = RecordOf<LayoutProps>;

type DiagramProps = { title: string, other: string, layout: Layout };
const DiagramFactory : RecordFactory<DiagramProps> = Record({ title: '', layout: LayoutFactory(), other: '' });
type Diagram = RecordOf<DiagramProps>;

type StateProps = {
	diagram: Diagram,
	other: string,
};
const StateFactory : RecordFactory<StateProps> = Record({
	diagram: DiagramFactory({
		title: 'My Diagram',
		layout: LayoutFactory({
			nodes: List([
				NodeFactory({ x: 316, y: 281, }),
				NodeFactory({ x: 632, y: 437, }),
			]),
			edges: List([
				EdgeFactory({ x: 0,    y: 0,   squareX: 0,  squareY: 0,  }),
				EdgeFactory({ x: 1024, y: 0,   squareX: 50, squareY: 0,  }),
				EdgeFactory({ x: 0,    y: 768, squareX: 0,  squareY: 50, }),
				EdgeFactory({ x: 1024, y: 768, squareX: 50, squareY: 50, }),
			]),
			other: 'Lots of other stuff here',
		})
	}),
	other: 'Lots of other stuff here',
});
type State = RecordOf<StateProps>;

const initialState = StateFactory({});

type SquareMovedAction = {
	type: 'SQUARE_MOVED',
	id: number,
	dx: number,
	dy: number,
};
type SquareAction = SquareMovedAction;

export function reducer(state: State = initialState, action : SquareAction) {
	switch(action.type) {
		case 'SQUARE_MOVED':
			const dx = action.dx;
			const dy = action.dy;
			return state
				.updateIn(['diagram', 'layout', 'nodes', action.id, 'x'], x => x+dx)
				.updateIn(['diagram', 'layout', 'nodes', action.id, 'y'], y => y+dy);
		default:
			return state;
	}
}
