import { IResourceMap } from "./IResource";
import { ResourceLoader, pixiLoader } from "./ResourceLoader";
const loader = new ResourceLoader();
const Resources = pixiLoader.resources;
export { loader, IResourceMap, Resources };

const resource: IResourceMap = {
  test: {
    // normal_json: require("@/apps/treasure-hunter/assets/normal.json"),
    // xml_sprites: require("@/apps/treasure-hunter/assets/sprites/fonts/line_num.sprites.xml"),
    // json_sprites: require("@/apps/treasure-hunter/assets/sprites/main/_spritesmith/main.sprites.json"),
    // normal_spines: require("@/apps/treasure-hunter/assets/spines/maingame/maingame.spine.json"),
    // nesting_spines: require("@/apps/treasure-hunter/assets/spines/line/line.spine.json"),
  },
  html: {},

  base: {
    main: require("@/apps/treasure-hunter/assets/sprites/main/_spritesmith/main.sprites.json"),
    scrollerBg: require("@/apps/treasure-hunter/assets/sprites/bg/_spritesmith/bg.sprites.json"),
    fighter: require("@/apps/treasure-hunter/assets/sprites/fighter/fighter.sprites.json"),

    spineboy: require("@/apps/treasure-hunter/assets/spines/boy/spineboy-pro.spine.json"),
  },

  sound: {
    button: require("@/apps/treasure-hunter/assets/sounds/button.mp3"),
  },

  font: {
    roboto: require("@/apps/treasure-hunter/assets/fonts/roboto.woff"),
    arial: require("@/apps/treasure-hunter/assets/fonts/arial.woff"),
  },
};
export default resource;
