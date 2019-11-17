<template>
    <div class="about" :class="$style.about">
        <h1>This is an about page</h1>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator';
@Component
export default class About extends Vue {
    mounted() {
     
        console.log((<any>this).$style)
    }

}
</script>

<style lang="scss" scoped>
.about {
    background: $mC;
    background: black;
    @include border();
}
</style>

<style lang="scss" module>
.about {
    background: red;
    color: yellow;
}
</style>