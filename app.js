new Vue({
    el: '#app',
    data: {
        playerLife: 100,
        monsterLife: 100, 
        running: false,
        logs: []
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
        startGame(){
            this.running = true;
            this.playerLife = 100;
            this.monsterLife = 100;
            this.logs = [];
        },
        attack(especial){
            this.hurt('monsterLife',5,10,especial);
            if(!this.hasResult){
                setTimeout(
                    () => this.hurt('playerLife',10,13,false)
               ,200);
            }                
        },
        hurt(prop ,min, max, especial){
            
            const plus = especial?5:0;
            const hurt = this.getRandom(min+plus, max+plus);
            if(prop == 'playerLife'){
                this.registerLog(`Destruidor Atacou e Tirou ${hurt} de Murilo`,'monster');
            } else {
                this.registerLog(`Murilo Atacou e Tirou ${hurt} do Destruidor`,'player');
            }
            this[prop] = Math.max(this[prop] - hurt, 0);
        },
        getRandom(min, max){
            const value = Math.random() * (max - min) + min;
            return Math.round(value);
        },
        healAndHurt(){
            this.heal(20,25);
            setTimeout(
                () => this.hurt('playerLife',10,13,false)
           ,200);
        },
        heal(min,max){
            const heal = this.getRandom(min,max);
            this.registerLog(`Murilo Curou ${heal}`,'player');
            this.playerLife = Math.min(this.playerLife + heal,100);
        },
        registerLog(txt, cls){
            this.logs.unshift({ txt, cls });
            console.log(this.logs[0]);
        }
    },
    watch: {
        hasResult(value){
            if(value){
                this.running = false;
            }
        }
    }
})

