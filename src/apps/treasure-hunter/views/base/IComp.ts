import { Vue } from "vue-property-decorator";

export interface IComp extends Vue{
    visible: boolean;
    show(...args: any[]): void;
    hide(): void;
    getChildByRef(ref: string): Vue | Vue[] | Element | Element[];
}