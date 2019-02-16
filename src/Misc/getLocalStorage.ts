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
 * Last modified: 2019.01.11 at 18:53
 */
import {isUndefined} from "../Types/isUndefined";
import {GenericStorage} from "../Entities/GenericStorage";
import {isString} from "../Types/isString";
import {getPageStorage} from "./getPageStorage";

/**
 * Adapter to connect a GenericStorage object to the window.localStorage API.
 * You may create multiple localStorage links using different namespaces.
 *
 * Keep in mind that everything you store in the GenericStorage object will be put into
 * a JSON object when it is stored in the browser's localStorage; so you can not store object instances in it.
 *
 * @param namespace
 */
export function getLocalStorage(namespace?:string): GenericStorage{
	if(isUndefined(window.localStorage)){
		console.error("Your browser does not support the localStorage API!");
		return new GenericStorage();
	}
	if(!isString(namespace)) namespace = "general";
	namespace = "helferlein." + namespace;

	// Check if there is already a connected instance on the page
	const localStorageRegistry = getPageStorage("@localStorage");
	if(localStorageRegistry.has(namespace)) return localStorageRegistry.get(namespace);

	// Read storage from window storage
	const s = window.localStorage.getItem(namespace);
	const storage = isString(s) ? JSON.parse(s) : {};

	// Create storage object
	const lc = new GenericStorage(storage, (k,v,s) => {
		// Update local storage as soon as we detect a change
		window.localStorage.setItem(namespace, JSON.stringify(s));
	});
	localStorageRegistry.set(namespace, lc);
	return lc;
}