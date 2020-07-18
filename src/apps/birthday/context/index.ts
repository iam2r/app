import EventEmitter from "@/common/EventEmitter";
const emitter = new EventEmitter();

const context = {
  emitter,
};
export { emitter };

export default context;
