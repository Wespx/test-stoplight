<template>
    <div class="stoplight">
        <div class="stoplight__light stoplight__light_red" :class="{ 'light-active': $route.path === '/red', 'light-changing': timer <= 3 }"></div>
        <div class="stoplight__light stoplight__light_yellow" :class="{ 'light-active': $route.path === '/yellow', 'light-changing': timer <= 3 }"></div>
        <div class="stoplight__light stoplight__light_green" :class="{ 'light-active': $route.path === '/green', 'light-changing': timer <= 3 }"></div>
        <div class="stoplight__timer">{{ timer }}</div>
    </div>
</template>

<script>
    export default {
        props: {
            timer: {
                type: Number,
                required: true
            }
        }
    }
</script>

<style lang="scss" src="./stoplight.scss"></style>