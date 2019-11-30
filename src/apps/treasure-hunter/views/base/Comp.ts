import { Component, Vue } from "vue-property-decorator";
import { ScreenState } from "app.root/const";
import { IComp } from "./IComp";

@Component
export class Comp extends Vue implements IComp{
    public visible: boolean = false;

    public show(...args: any[]){
        this.visible = true;
    }

    public hide(){
        this.visible = false;
    }

    public get isWeb() {
        return this.$store.state.state === ScreenState.WEB;
    }

    public get isLandscape() {
        return this.$store.state.state === ScreenState.LANDSCAPE;
    }

    public get isPortrait() {
        return this.$store.state.state === ScreenState.PORTRAIT;
    }

    public getChildByRef(ref: string){
        let fn: (node: Vue) => Vue | Vue[] | Element | Element[] = (node: Vue) => {
            let obj = node.$refs[ref];
            if(obj) return obj;

            let children = node.$children;
            for(let i = 0; i < children.length; i++){
                obj = fn(children[i]);
                if(obj) return obj;
            }

            return null;
        };

        return fn(this);
    }

}