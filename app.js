new Vue({
    el: '#app',
    data: {
        playerLife: 100,
        ticketLife: 100, 
        running: false,
        logs: [],
        acoes: [ 'O Cliente Acordou de Mau Humor e Você Se Fuuu','Não Teve Café Hoje e Você Se Fuuu'],
        ticketNumber: '???',
        relaxar: ['Tomar Uma Cerveja','Ir na Praia','Fazer Sexo','Comer Besteira','Tocar Guitarra','Ir na Casa de Massagem'],
        rlxAtual: 'Relaxar Um Pouco'
    },
    computed: {
        playerColor(){
            return this.playerLife > 20?'normal':'danger';
        },
        ticketColor(){
            return this.ticketLife > 20?'normal':'danger';
        },
        hasResult(){
            return this.playerLife == 0 || this.ticketLife == 0;
        }
    },
    methods: {
        startGame(){
            this.running = true;
            this.playerLife = 100;
            this.ticketLife = 100;
            this.logs = [];
            this.ticketNumber = Math.round(Math.random() * 2000);
        },
        attack(especial){
            this.hurt('ticketLife',5,10,especial);
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
                this.registerLog(`O Ticket não Foi Homologado, o Dev Perde ${hurt} de Vida`,'ticket');
            } else {
                this.registerLog(`O Dev Codificou e resolveu ${hurt}% do Ticket`,'player');
            }
            this[prop] = Math.max(this[prop] - hurt, 0);
        },
        getRandom(min, max){
            const value = Math.random() * (max - min) + min;
            return Math.round(value);
        },
        healAndHurt(){
            this.rlxAtual = this.relaxar[(Math.round(Math.random() * (this.relaxar.lenght -1 )))];
            this.heal(20,25);
            setTimeout(
                () => this.hurt('playerLife',10,13,false)
           ,200);
        },
        heal(min,max){
            const heal = this.getRandom(min,max);
            this.registerLog(`O Dev Relaxou um Pouco e Curou ${heal}% de Vida`,'player');
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

