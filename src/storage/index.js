const STORAGE_KEY = 'mall';

function hasOwnProperty(obj, key) {
	return Object.prototype.hasOwnProperty.call(obj, key);
}

export default {
	setItem(key, value, ...module_name) {
		if (value) {
			if (module_name.length) {
				const _module_name = [...module_name];
				const _value = this.getItem(_module_name.shift(0), ..._module_name);
				_value[key] = value;
				this.setItem(module_name.pop(0), _value, ...module_name);
			} else {
				const _storage = this.getStorage();
				_storage[key] = value;
				window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(_storage));
			}
		} else {
			window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(key || {}));
		}

	},
	getItem(key, ...module_name) {
		if (module_name.length) {
			const _value = this.getItem(module_name.shift(0), ...module_name);
			if (_value) {
				return _value[key] || {};
			}
		}
		return this.getStorage()[key] || {};
	},
	getStorage() {
		return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '{}');
	},
	clear(key, ...moudle_name) {
		const _storage = this.getStorage();
		if (key) {
			if (moudle_name.length) {
				let _value = _storage;
				for (let i = 0; i < moudle_name.length; i++) {
					if (hasOwnProperty(_value, moudle_name[i])) {
						if (i == moudle_name.length - 1) {
							delete _value[moudle_name[i]];
						} else {
							_value = _value[moudle_name[i]];
						}
					} else {
						break;
					}
				}
			} else {
				if (hasOwnProperty(_storage, key)) {
					delete _storage[key];
				}
			}
			this.setItem(_storage);
		} else {
			this.setItem({});
		}
	}
}
