<template>
    <div class="root">
        <span>{{ message }}</span>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    data() {
        return {
            message: 'hello world'
        };
    }
});
</script>

<style lang="scss" scoped></style>
