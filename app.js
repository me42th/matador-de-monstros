new Vue({
    el: '#app',
    data: {
        playerLife: 10,
        monsterLife: 0
    },
    computed: {
        playerColor(){
            return this.playerLife > 20?'normal':'danger';
        },
        monsterColor(){
            return this.monsterLife > 20?'normal':'danger';
        },
        hasResult(){
            return this.playerLife == 0 || this.monsterLife == 0;
        }
    },
    methods: {

    },
    watch: {

    }
})