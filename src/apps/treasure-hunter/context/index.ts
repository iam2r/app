import Vue from "Vue";
import { Application } from "pixi.js";
import Scence from "@/apps/treasure-hunter/main/Scence";
import { IResourceMap } from "@/apps/treasure-hunter/resource/IResource";
import { EventEmitter } from "events";
import { Device } from "./Device";
import { Resolution } from "./Resolution";
import config from "./config";

let app: Application, appVue: Vue, scence: Scence, resource: IResourceMap;
const emitter = new EventEmitter();
const device = new Device();
const resolution = new Resolution();
export { emitter, device, resolution, config };
export default {
  app,
  appVue,
  scence,
  resource,
  emitter,
  device,
  resolution,
  config,
};
