<template>
    <div id="app">
        <router-view :timer="timer" />
    </div>
</template>

<script>
    import Stoplight from './components/Stoplight.vue';
    export default {
        components: {
            Stoplight
        },
        data() {
            return {
                lightActive: '',
                timer: 0,
                currentState: -1,
                states: [
                    {
                        color: 'red',
                        timer: 10
                    },
                    {
                        color: 'yellow',
                        timer: 3
                    },
                    {
                        color: 'green',
                        timer: 15
                    },
                    {
                        color: 'yellow',
                        timer: 3
                    }
                ]
            }
        },
        methods: {
            init() {
                this.lightActive = this.$route.path.slice(1);

                if (localStorage.getItem('lightActive') !== this.lightActive) {
                    const diffColor = this.states.find((el) => el.color === this.lightActive);

                    if (diffColor) {
                        this.setLight(this.states.findIndex((el) => el === diffColor));
                        return;
                    }
                }

                if (localStorage.getItem('currentState') && localStorage.getItem('timer')) {
                    this.currentState = +localStorage.getItem('currentState');
                    this.timer = +localStorage.getItem('timer');
                    this.lightActive = this.states[this.currentState].color;
                    this.$router.push(`/${this.lightActive}`).catch(()=>{}); 
                    this.startTimer();
                    return;
                }

                for (const state of this.states) {
                    if (this.lightActive === state.color) {
                        this.currentState = this.states.indexOf(state);
                        this.setLight(this.currentState);
                        return;
                    }
                }

                this.setLight(0);
            },
            setLight(newState) {
                this.lightActive = this.states[newState].color;
                this.timer = this.states[newState].timer;
                this.currentState = newState;
                this.$router.push(`/${this.lightActive}`).catch(()=>{}); 

                this.startTimer();
            },
            startTimer() {
                const tick = setInterval(() => {
                    this.timer -= 1;
                    if (this.timer <= 0) {
                        clearInterval(tick);
                        this.changeLight();
                    }
                    this.saveState();
                }, 1000);
            },
            changeLight() {
                this.currentState += 1;
                if (!this.states[this.currentState]) this.currentState = 0;

                localStorage.setItem('currentState', this.currentState);
                localStorage.setItem('lightActive', this.lightActive);
                this.setLight(this.currentState);
            },
            saveState() {
                localStorage.setItem('currentState', this.currentState);
                localStorage.setItem('timer', this.timer);
                localStorage.setItem('lightActive', this.lightActive);
            }
        },
        mounted() {
            this.init();
        }
    }
</script>