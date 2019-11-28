import { IResourceMap } from "./IResource";
import { ResourceLoader } from "./ResourceLoader";
import { ResourceType } from "./ResourceType";

const loader = new ResourceLoader();

export {
    IResourceMap,
    ResourceType,
    loader
}

const resource: IResourceMap = {
    test: {
        normal_json: require("../assets/normal.json"),
        xml_sprites: require("../assets/sprites/fonts/line_num.sprites.xml"),
        json_sprites: require("../assets/sprites/main/_spritesmith/main.sprites.json"),

        // normal_spines: require("../assets/spines/maingame/maingame.spine.json"),
        nesting_spines: require("../assets/spines/line/line.spine.json"),
    },
    html: {

    },

    base: {
        main: require("../assets/sprites/main/_spritesmith/main.sprites.json"),
    },

    sound: {
        button: require("../assets/sounds/button.mp3"),
    },

    font: {
        roboto: require("../assets/fonts/roboto.woff"),
        arial: require("../assets/fonts/arial.woff"),
    }
}
export default resource;
