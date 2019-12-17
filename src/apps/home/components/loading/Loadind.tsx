import { VNode } from 'vue';
import { Component, Vue } from "vue-property-decorator";
import "./Loading.scss";


@Component
export default class Loading extends Vue {
    private cubes: any[] = [
        {
            delay: 0,
            color: '#85a2b6',
        },
        {
            delay: 0.1,
            color: '#bbcedd',
        },
        {
            delay: 0.2,
            color: '#dce4eb',
        },
        {
            delay: 0.1,
            color: '#bbcedd',
        },
        {
            delay: 0.2,
            color: '#dce4eb',
        },
        {
            delay: 0.3,
            color: '#d69293',
        },
        {
            delay: 0.2,
            color: '#dce4eb',
        },
        {
            delay: 0.3,
            color: '#d69293',
        },
        {
            delay: 0.4,
            color: '#be5960',
        },
    ]
    protected render(): VNode {
        return (
            <div id="loading-box">
                <div class="sk-cube-grid">
                    {
                        this.cubes.map((item: any) => <div class="sk-cube" style={{
                            'background-color': item.color,
                            'animation-delay': item.delay + 's',
                        }} ></div>)
                    }
                </div>
                <span class="loading-tip">Loaing...</span>
            </div >
        )
    }

}