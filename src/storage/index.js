//声明所用的sessionStorage的库名
const STORAGE_KEY = 'mall';

/**
 * 封装Eslint可用的hasOwnProperty方法
 * @param {Object} obj - 需要查询的对象
 * @param {string} key - 需要查询的key
 * @returns {boolean} - 返回是否含有此键
 */
function hasOwnProperty(obj, key) {
	return Object.prototype.hasOwnProperty.call(obj, key);
}

export default {
	/**
	 * 设置sessionStorage的方法.
	 * @param {JSON/string} key - sessionStorage的key
	 * @param {string/number/Object} value - sessionStorage的key对应的值
	 * @param {$Rest} module_name - 如果有更多层key嵌套，按照嵌套顺序传入key值
	 * @example
	 * storage.setItem(key,value,module_name1,module_name2,module_name3,module_name4...)
	 */
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
		} else {//直接穿JSON的情况
			window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(key || {}));
		}

	},
	/**
	 * 获取sessionStorage的方法
	 * @param {string} key - sessionStorage的key
	 * @param {$Rest} module_name - 如果有更多层key嵌套，按照嵌套顺序传入key值
	 * @returns {*|{}} - 获取到的sessionStorage值或空{}
	 * @example
	 * storage.getItem(key,module_name1,module_name2,module_name3,module_name4...)
	 */
	getItem(key, ...module_name) {
		if (module_name.length) {
			const _value = this.getItem(module_name.shift(0), ...module_name);
			if (_value) {
				return _value[key] || {};
			}
		}
		return this.getStorage()[key] || {};
	},
	/**
	 *
	 * @returns {JSON} - 返回当前窗口的sessionStorage
	 */
	getStorage() {
		return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '{}');
	},
	/**
	 * 清除sessionStorage的方法
	 * @param {string} key - 需要清除值的sessionStorage的key
	 * @param {$Rest} moudle_name - 如果有更多层key嵌套，按照嵌套顺序传入key值
	 * @example
	 * storage.clear(key,module_name1,module_name2,module_name3,module_name4...)
	 */
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
			this.setItem();
		}
	}
}