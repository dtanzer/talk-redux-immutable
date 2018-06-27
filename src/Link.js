import React from 'react';
import { connect } from 'react-redux';

export class Link extends React.PureComponent {
	render() {
		const fromX = this.props.edge.get('x');
		const fromY = this.props.edge.get('y');

		const toX = this.props.square.get('x') + this.props.edge.get('squareX');
		const toY = this.props.square.get('y') + this.props.edge.get('squareY');

		return (
			<path d={'M '+fromX+' '+fromY+' L '+toX+' '+toY+' z'} className="link" />
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		square: state.getIn(['diagram', 'layout', 'nodes', ownProps.toSquare]),
		edge:   state.getIn(['diagram', 'layout', 'edges', ownProps.fromEdge]),
	}
}

export const LinkContainer = connect(mapStateToProps)(Link);
