import React from 'react';
import { connect } from 'react-redux';

export class Square extends React.PureComponent {
	constructor(props) {
		super(props);
		this._mousedown_bound = this._mousedown.bind(this);
		this._mousemove_bound = this._mousemove.bind(this);
		this._mouseup_bound   = this._mouseup.bind(this);
	}

	render() {
		return (
			<rect x={this.props.x} y={this.props.y} width={50} height={50} className="square" ref={e => this.rect=e} />
		);
	}

	componentDidMount() {
		this.rect.addEventListener('mousedown', this._mousedown_bound);
	}

	_mousedown(e) {
		e.preventDefault();
		e.stopPropagation();

		document.addEventListener('mousemove', this._mousemove_bound);
		document.addEventListener('mouseup', this._mouseup_bound);
	}

	_mousemove(e) {
		e.preventDefault();
		e.stopPropagation();

		this.props.squareMoved(this.props.id, e.movementX, e.movementY);
	}

	_mouseup(e) {
		e.preventDefault();
		e.stopPropagation();

		document.removeEventListener('mousemove', this._mousemove_bound);
		document.removeEventListener('mouseup', this._mouseup_bound);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		x: state.diagram.layout.nodes[ownProps.id].x,
		y: state.diagram.layout.nodes[ownProps.id].y,
	};
}

function squareMoved(id, dx, dy) {
	return {
		type: 'SQUARE_MOVED',
		id, dx, dy,
	};
}
const actionCreators = {
	squareMoved,
};

export const SquareContainer = connect(mapStateToProps, actionCreators)(Square);
