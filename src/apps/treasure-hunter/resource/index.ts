import { IResourceMap } from "./IResource";
import { ResourceLoader, pixiLoader } from "./ResourceLoader";
import { ResourceType } from "./ResourceType";

const loader = new ResourceLoader();

export {
    loader,
    IResourceMap,
    ResourceType,
}

const resource: IResourceMap = {
    test: {
        normal_json: require("app.root/assets/normal.json"),
        xml_sprites: require("app.root/assets/sprites/fonts/line_num.sprites.xml"),
        json_sprites: require("app.root/assets/sprites/main/_spritesmith/main.sprites.json"),

        normal_spines: require("app.root/assets/spines/maingame/maingame.spine.json"),
        nesting_spines: require("app.root/assets/spines/line/line.spine.json"),
    },
    html: {

    },

    base: {
        main: require("app.root/assets/sprites/main/_spritesmith/main.sprites.json"),
    },

    sound: {
        button: require("app.root/assets/sounds/button.mp3"),
    },

    font: {
        roboto: require("app.root/assets/fonts/roboto.woff"),
        arial: require("app.root/assets/fonts/arial.woff"),
    }
}
export default resource;

export const Resources = pixiLoader.resources
