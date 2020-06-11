const STORAGE_KEY = 'mall';
export default {
	setItem(key, value, module_name) {
		if (value) {
			if (module_name) {
				const _value = this.getItem(module_name);
				_value[key] = value;
				this.setItem(module_name, _value);
			} else {
				const _storage = this.getStorage();
				_storage[key] = value;
				window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(_storage));
			}
		} else {
			window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(key));
		}

	},
	getItem(key, module_name) {
		if (module_name) {
			const _value = this.getItem(module_name);
			if (_value) {
				return _value[key] || {};
			}
		}
		return this.getStorage()[key] || {};
	},
	getStorage() {
		return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '{}');
	},
	clear(key, moudle_name) {
		const _storage = this.getStorage();
		if (key) {
			if (moudle_name) {
				delete _storage[moudle_name][key];
			} else {
				delete _storage[key];
			}
		} else {
			for (let _key in _storage) {
				if (Object.prototype.hasOwnProperty.call(_storage, _key)) {
					delete _storage[_key];
				}
			}
		}
		this.setItem(_storage);
	}
}