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
 * Last modified: 2018.10.17 at 17:45
 */
export class Breakpoint {

	/**
	 * A counting number for this breakpoint
	 */
	id:number;

	/**
	 * The string name of the breakpoint "sm", "lg",...
	 */
	key: string;

	/**
	 * The minimum window width in pixels for this breakpoint
	 */
	min: number;

	/**
	 * The maximum window width in pixels for this breakpoint
	 */
	max: number;

	constructor(id:number, key: string, min: number, max: number) {
		this.id = id;
		this.key = key;
		this.min = min;
		this.max = max;
	}
}