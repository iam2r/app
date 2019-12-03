import Vue from 'Vue';
import { Application } from 'pixi.js';
import Scence from 'app.root/main/Scence';
import { IResourceMap } from 'app.root/resource/IResource';
import { EventEmitter } from "events";
import { Device } from './Device';
import { Resolution } from "./Resolution";
import config from "./config"

let app: Application, appVue: Vue, scence:Scence,resource: IResourceMap;
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
    scence,
    resource,
    emitter,
    device,
    resolution,
    config
}