export class Map {
	constructor(backingObject = {}) {
		this._backingObject = backingObject;
	}
	set(prop, value) {
		const newBackingObject = {...this._backingObject};
		newBackingObject[prop] = value;
		return new Map(newBackingObject);
	}
	update(prop, updater) {
		const newBackingObject = {...this._backingObject};
		newBackingObject[prop] = updater(this._backingObject[prop]);
		return new Map(newBackingObject);
	}
	updateIn(props, updater) {
		if(props.length === 1) {
			return this.update(props[0], updater);
		}
		const prop = props.shift();
		
		const newBackingObject = {...this._backingObject};
		newBackingObject[prop] = this._backingObject[prop].updateIn(props, updater);
		return new Map(newBackingObject);
	}
	get(prop) {
		return this._backingObject[prop];
	}
	getIn(props) {
		if(props.length === 1) {
			return this.get(props[0]);
		}
		const prop = props.shift();
		return this._backingObject[prop].getIn(props);
	}
}

export class List {
	constructor(backingArray = []) {
		this._backingArray = backingArray;
	}
	push(value) {
		const newBackingArray = [...this._backingArray];
		newBackingArray.push(value);
		return new List(newBackingArray);
	}
	update(index, updater) {
		const newBackingArray = [...this._backingArray];
		newBackingArray[index] = updater(this._backingArray[index]);
		return new List(newBackingArray);
	}
	updateIn(props, updater) {
		if(props.length === 1) {
			return this.update(props[0], updater);
		}
		const index = props.shift();

		const newBackingArray = [...this._backingArray];
		newBackingArray[index] = this._backingArray[index].updateIn(props, updater);
		return new List(newBackingArray);
	}
	get(index) {
		return this._backingArray[index];
	}
	getIn(props) {
		if(props.length === 1) {
			return this.get(props[0]);
		}
		const index = props.shift();
		return this._backingArray[index].getIn(props);
	}
}

export function fromJS(o) {
	if(Array.isArray(o)) {
		return o.reduce((res, cur) => res.push(fromJS(cur)), new List());
	} else if(typeof o === 'object') {
		return Object.keys(o).reduce((res, key) => res.set(key, fromJS(o[key])), new Map());
	}
	return o;
}
