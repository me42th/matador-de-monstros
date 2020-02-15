new Vue({
    el: '#app',
    data: {
        playerLife: 100,
        monsterLife: 100
    },
    computed: {
        playerColor(){
            return this.playerLife > 20?'normal':'danger';
        },
        monsterColor(){
            return this.monsterLife > 20?'normal':'danger';
        }
    },
    methods: {

    },
    watch: {

    }
})