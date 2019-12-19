import { IResourceMap } from "./IResource";
import { ResourceLoader, pixiLoader } from "./ResourceLoader";
const loader = new ResourceLoader();
const Resources = pixiLoader.resources;
export { loader, IResourceMap, Resources };

const resource: IResourceMap = {
  test: {
    // normal_json: require("app.root/assets/normal.json"),
    // xml_sprites: require("app.root/assets/sprites/fonts/line_num.sprites.xml"),
    // json_sprites: require("app.root/assets/sprites/main/_spritesmith/main.sprites.json"),
    // normal_spines: require("app.root/assets/spines/maingame/maingame.spine.json"),
    // nesting_spines: require("app.root/assets/spines/line/line.spine.json"),
  },
  html: {},

  base: {
    main: require("app.root/assets/sprites/main/_spritesmith/main.sprites.json"),
    scrollerBg: require("app.root/assets/sprites/bg/_spritesmith/bg.sprites.json"),
    fighter: require("app.root/assets/sprites/fighter/fighter.sprites.json"),

    spineboy: require("app.root/assets/spines/boy/spineboy-pro.spine.json")
  },

  sound: {
    button: require("app.root/assets/sounds/button.mp3")
  },

  font: {
    roboto: require("app.root/assets/fonts/roboto.woff"),
    arial: require("app.root/assets/fonts/arial.woff")
  }
};
export default resource;
