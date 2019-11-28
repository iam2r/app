import { IResourceMap } from 'app.root/resource/IResource';
import { EventEmitter } from "events";
import { Device } from './Device';
import { Resolution } from "./Resolution";
import config from "./config"
let app: any, appVue: any, resource: IResourceMap;
let emitter = new EventEmitter();
let device = new Device();
let resolution = new Resolution();
export {
    emitter,
    device,
    resolution,
    config
}
export default {
    app,
    appVue,
    resource,
    emitter,
    device,
    resolution,
    config
}