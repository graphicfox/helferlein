/*
 * Copyright 2019 LABOR.digital
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Last modified: 2019.01.10 at 10:02
 */
import {List} from "../Interfaces/List";
import {isSet} from "../Types/isSet";

export interface ForEachCallbackType extends Function {
	/**
	 * Is called for every element of the iterated object
	 * @param $value The current value as a jquery object
	 * @param value The current value
	 * @param key The current key
	 * @param iteratedObject The iterated object
	 */
	($value?: any, key?, value?, iteratedObject?): boolean | any
}

export interface ForEachCallbackType extends Function {
	/**
	 * Is called for every element of the iterated object
	 * @param value The current value
	 * @param key The current key
	 * @param iteratedObject The iterated object
	 */
	(value?: any, key?: string | number, iteratedObject?): boolean | any
}

interface BreakErrorType {
	breaker?: boolean;
}

const breaker = new Error() as BreakErrorType;
breaker.breaker = true;

/**
 * Loops over arrays or objects and applies a given callback
 *
 * Will work with Arrays, Objects, Map, Set and jQuery objects.
 * If jQuery is used the callback params are: ($jQueryValue, key, value, iteratedObject)
 *
 * @param object The array or object to iterate
 * @param callback The callback to apply. Params are: (value, key, iteratedObject)
 */
export function forEach(object: List, callback: ForEachCallbackType): void {
	if (object === null || typeof object === "undefined") return;
	if (typeof object.forEach === "function") {
		const objectIsSet = isSet(object);
		try {
			let c = 0;
			object.forEach((v, k) => {
				if (callback(v, objectIsSet ? c : k, object) === false)
					throw breaker;
				++c;
			});
		} catch (e) {
			if (e.breaker === true) return;
			throw e;
		}
		return;
	} else if (typeof object === "object" || typeof object === "function") {
		for (let k in object) {
			if (!object.hasOwnProperty(k)) continue;
			let kReal: string | number = k;
			if (parseInt(k) + "" === k) kReal = parseInt(k);
			if (callback(object[k], kReal, object) === false) break;
		}
		return;
	}

	throw Error("Could not iterate given object!");
}