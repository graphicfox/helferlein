/**
 * Created by Martin Neundorfer on 24.09.2018.
 * For LABOR.digital
 */

import Event = JQuery.Event;

export interface JQueryEvent extends Event<HTMLElement> {}

export interface GenericObject {[key: string]: any}
