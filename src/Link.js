import React from 'react';
import { connect } from 'react-redux';

export class Link extends React.PureComponent {
	render() {
		const fromX = this.props.edge.x;
		const fromY = this.props.edge.y;

		const toX = this.props.square.x + this.props.edge.squareX;
		const toY = this.props.square.y + this.props.edge.squareY;

		return (
			<path d={'M '+fromX+' '+fromY+' L '+toX+' '+toY+' z'} className="link" />
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		square: state.diagram.layout.nodes[ownProps.toSquare],
		edge:   state.diagram.layout.edges[ownProps.fromEdge],
	}
}

export const LinkContainer = connect(mapStateToProps)(Link);
