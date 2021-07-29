(function(){
    var delayamount = 500;
    var internal ={
        sprite: new Image(),
        canvas: null,
        ctx: null,
        delayamount: delayamount,
        sprites:{
            "bouncer":{
                x:0,
                rtol: Math.floor(Math.random()*2),
                step: 0,
                increment:{
                    pos: 3,
                    pace: 2
                },
                walkat: 10,
                top: 0,
                width: 84,
                height: 140,
                frames:[
                    {x:0,y:0},
                    {x:84,y:0},
                    {x:84*2,y:0},
                    {x:84*3,y:0}
                ],
                delay: Math.round(Math.random()*delayamount),
                delayCount: 0,
                crop:{
                    x:0,
                    y:0
                },
                frame: 0
            },
            "bird":{
                x:0,
                rtol: Math.floor(Math.random()*2),
                step: 0,
                increment:{
                    pos: 8,
                    pace: 2
                },
                walkat: 10,
                top: 0,
                width: 84,
                height: 140,
                frames:[
                    {x:0,y:140*4},
                    {x:84,y:140*4},
                    {x:84*2,y:140*4},
                    {x:84*3,y:140*4}
                ],
                delay: Math.round(Math.random()*delayamount),
                delayCount: 0,
                crop:{
                    x:0,
                    y:0
                },
                frame: 0
            },
            "woman":{
                x:0,
                rtol: Math.floor(Math.random()*2),
                step: 0,
                increment:{
                    pos: 4,
                    pace: 2
                },
                walkat: 10,
                top: 0,
                width: 84,
                height: 140,
                frames:[
                    {x:0,y:140*1},
                    {x:84,y:140*1},
                    {x:84*2,y:140*1},
                    {x:84*3,y:140*1}
                ],
                delay: Math.round(Math.random()*delayamount),
                delayCount: 0,
                crop:{
                    x:0,
                    y:0
                },
                frame: 0
            },
            "dude":{
                x:0,
                rtol: Math.floor(Math.random()*2),
                step: 0,
                increment:{
                    pos: 4,
                    pace: 2
                },
                walkat: 10,
                top: 0,
                width: 84,
                height: 140,
                frames:[
                    {x:0,y:140*2},
                    {x:84,y:140*2},
                    {x:84*2,y:140*2},
                    {x:84*3,y:140*2}
                ],
                delay: Math.round(Math.random()*delayamount),
                delayCount: 0,
                crop:{
                    x:0,
                    y:0
                },
                frame: 0
            },
            "police":{
                x:0,
                rtol: Math.floor(Math.random()*2),
                step: 0,
                increment:{
                    pos: 4,
                    pace: 2
                },
                walkat: 10,
                top: 0,
                width: 84,
                height: 140,
                frames:[
                    {x:0,y:140*3},
                    {x:84,y:140*3},
                    {x:84*2,y:140*3},
                    {x:84*3,y:140*3}
                ],
                delay: Math.round(Math.random()*delayamount),
                delayCount: 0,
                crop:{
                    x:0,
                    y:0
                },
                frame: 0
            }
        },
    };

    internal.loadSprites = async function(){
        return response = await fetch("/images/sprites.png")
        .then(res=>res.blob())
        .then(this.drawBackground);
    }

    internal.drawBackground = async function(blob){
        this.canvas = document.getElementById('cityscape');
        this.sprite.src  =  URL.createObjectURL(blob);
        this.sprite.onload = await this.setCanvas;
    }

    internal.setCanvas = function(){
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        window.requestAnimationFrame(this.ticker);
    }

    internal.resetCharacter = function(character){
            character.delay = Math.round(Math.random()*this.delayamount);
            character.delayCount=0;
            character.walking = false;
            character.rtol = Math.floor(Math.random()*2);

    }

    internal.animator = function(name){
        if(typeof this.sprites[name] != "undefined"){
            var character = this.sprites[name];

            character.delayCount++;
            
            if(character.delayCount==character.delay){
                character.walking = true;
            }

            if(character.walking){
                //move sprite
                if(character.rtol){
                    character.x -=  character.increment.pos;
                }
                else{
                    character.x +=  character.increment.pos;
                }
                
                //change pace
                character.step += character.increment.pace;

                //if pace equals walk chnage
                if(character.step == character.walkat){
                    character.step = 0;
                    var frames = [];

                    if(character.rtol){
                        frames = [character.frames[0],character.frames[1]];
                    }
                    else{
                        frames = [character.frames[2],character.frames[3]];
                    }

                    //change walk image for character
                    if(character.frame==0){
                        character.frame = 1;
                    }
                    else{
                        character.frame = 0;
                    }
                    character.crop = frames[character.frame];
                }
                
                if(character.rtol && (character.x<= -(character.width))){
                    character.x = -(character.width);
                    character.rtol = false;
                    this.resetCharacter(character);
                }
                else if(!character.rtol && (character.x>= this.canvas.width)){
                    character.x = this.canvas.width;
                    character.rtol = true;
                    this.resetCharacter(character);
                }

                if(character.walking){
                    this.ctx.drawImage(this.sprite, character.crop.x, character.crop.y, character.width, character.height, character.x, character.top, character.width, character.height );
                }
            }
        }
    }

    internal.ticker = function(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.animator("bouncer");
        this.animator("bird");
        this.animator("woman");
        this.animator("dude");
        this.animator("police");
        window.requestAnimationFrame(this.ticker);
    }

    internal.init = function(){
        this.loadSprites();
    }

    internal.loadSprites = internal.loadSprites.bind(internal);
    internal.drawBackground = internal.drawBackground.bind(internal);
    internal.setCanvas = internal.setCanvas.bind(internal);
    internal.ticker = internal.ticker.bind(internal);
    internal.init = internal.init.bind(internal);
    internal.animator = internal.animator.bind(internal);
    internal.resetCharacter = internal.resetCharacter.bind(internal);

    internal.init();

})();