import React from 'react';
import './DrawingArea.css';

import { SquareContainer } from './Square';
import { LinkContainer } from './Link';

export class DrawingArea extends React.PureComponent {
	render() {
		return (
			<svg width="1024" height="768">
				<SquareContainer id={0} />
				<SquareContainer id={1} />
				<LinkContainer fromEdge={0} toSquare={0} />
				<LinkContainer fromEdge={1} toSquare={0} />
				<LinkContainer fromEdge={2} toSquare={0} />
				<LinkContainer fromEdge={3} toSquare={0} />
				<LinkContainer fromEdge={0} toSquare={1} />
				<LinkContainer fromEdge={1} toSquare={1} />
				<LinkContainer fromEdge={2} toSquare={1} />
				<LinkContainer fromEdge={3} toSquare={1} />
			</svg>
		);
	}
}
