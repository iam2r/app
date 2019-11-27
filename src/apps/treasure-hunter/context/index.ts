import { IResourceMap } from './../resource/IResource';
import { EventEmitter } from "events";
import { Device } from './Device';
import { Resolution } from "./Resolution";
let app: any, appVue: any,resource: IResourceMap;;
let emitter = new EventEmitter();
let device = new Device();
let resolution = new Resolution();
export {
    emitter,
    device,
    resolution
}
export default {
    emitter: new EventEmitter(),
    device: new Device(),
    resolution: new Resolution(),
    app,
    appVue,
    resource
}