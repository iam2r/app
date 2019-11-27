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
    html: {

    },

    base: {
        json: require("../assets/main.json"),
        main: require("../assets/sprites/main/_spritesmith/main.sprites.json"),
        lines: require("../assets/spines/lines/lines.spine.json"),
        maingame: require("../assets/spines/maingame/maingame.spine.json")
    },

    sound: {
        button: require("../assets/sounds/button.mp3"),
    },

    font: {
        roboto: require("../assets/fonts/roboto.woff"),
        arial: require("../assets/fonts/arial.woff"),
        line_num: require("../assets/fonts/line_num.font.xml"),
    }
}
export default resource;
