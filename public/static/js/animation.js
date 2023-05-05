(function(){
    var delayamount = 500;
    var top_adjustment = 40;
    var tops = {
        car: 25 + top_adjustment,
        char: 30 + top_adjustment
    };
    var internal ={
        sprite: new Image(),
        canvas: null,
        buffer: null,
        buffer_ctx: null,
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
                top: tops.char,
                width: 84,
                height: 140,
                animationframes:[],
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
                    pos: 6,
                    pace: 2
                },
                walkat: 10,
                top: tops.char,
                width: 84,
                height: 140,
                resize:{
                    w: 50,
                    h: 84
                },
                animationframes:[],
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
                top: tops.char,
                width: 84,
                height: 140,
                animationframes:[],
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
                    pos: 5,
                    pace: 2
                },
                walkat: 10,
                top: tops.char,
                width: 84,
                height: 140,
                animationframes:[],
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
                top: tops.char,
                width: 84,
                height: 140,
                animationframes:[],
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
            },
            "waiter":{
                x:0,
                rtol: Math.floor(Math.random()*2),
                step: 0,
                increment:{
                    pos: 3,
                    pace: 2
                },
                walkat: 10,
                top: tops.char,
                width: 84,
                height: 140,
                animationframes:[],
                frames:[
                    {x:0,y:140*6},
                    {x:84,y:140*6},
                    {x:84*2,y:140*6},
                    {x:84*3,y:140*6}
                ],
                delay: Math.round(Math.random()*delayamount),
                delayCount: 0,
                crop:{
                    x:0,
                    y:0
                },
                frame: 0
            },
            "handyman":{
                x:100,
                rtol: false,
                step: 0,
                increment:{
                    pos: 4,
                    pace: 1
                },
                playing: true,
                loaded: false,
                walkat: 4,
                top: tops.char,
                width: 168,
                walking: false,
                climbing: false,
                height: 140,
                animationframes:[],
                frames:[
                    {x:0,y:140*5},
                    {x:168,y:140*5},
                    {x:168*2,y:140*5},
                    {x:168*3,y:140*5}
                ],
                framesvertical:[
                    {x:168*3,y:140*4},
                    {x:168*4,y:140*4}
                ],
                framesnoladder:{
                    rtol:[
                        {x:84*4,y:140*6},
                        {x:84*5,y:140*6}
                    ],
                    ltor:[
                        {x:84*6,y:140*6},
                        {x:84*7,y:140*6}
                    ]
                },
                delay: Math.round(Math.random()*delayamount),
                delayCount: 0,
                crop:{
                    x:0,
                    y:0
                },
                frame: 0
            },
            "modelt":{
                x:0,
                rtol: Math.floor(Math.random()*2),
                step: 0,
                increment:{
                    pos: 10,
                    pace: 1
                },
                walkat: 10,
                top: tops.car - 2,
                width: 168,
                height: 140,
                animationframes:[],
                frames:[
                    {x:336,y:140},
                    {x:336,y:140},
                    {x:336 + 168,y:140},
                    {x:336 + 168,y:140}
                ],
                delay: Math.round(Math.random()*delayamount),
                delayCount: 0,
                crop:{
                    x:0,
                    y:0
                },
                frame: 0
            },
            "cadillac":{
                x:0,
                rtol: Math.floor(Math.random()*2),
                step: 0,
                increment:{
                    pos: 12,
                    pace: 1
                },
                walkat: 10,
                top: tops.car,
                width: 336,
                height: 140,
                animationframes:[],
                frames:[
                    {x:336,y:140*3},
                    {x:336,y:140*3},
                    {x:336,y:140*2},
                    {x:336,y:140*2}
                ],
                delay: Math.round(Math.random()*delayamount),
                delayCount: 0,
                crop:{
                    x:0,
                    y:0
                },
                frame: 0
            },
            "ufo":{
                x:0,
                rtol: Math.floor(Math.random()*4),
                step: 0,
                increment:{
                    pos: 5,
                    pace: 1
                },
                walkat: 10,
                top: tops.car - 20,
                width: 84,
                height: 140,
                resize:{
                    w: 50,
                    h: 84
                },
                animationframes:[],
                frames:[
                    {x:84*4,y:140*4},
                    {x:84*4,y:140*4},
                    {x:84*4,y:140*4},
                    {x:84*4,y:140*4}
                ],
                delay: Math.round(Math.random()*delayamount),
                delayCount: 0,
                crop:{
                    x:0,
                    y:0
                },
                frame: 0
            },
            "cityscape":{
                x:0,
                top: top_adjustment,
                width: 672,
                height: 280,
                repeat: 1,
                resize:{
                    w: 432,
                    h: 180
                },
                crop:{
                    x:0,
                    y:140*7
                },
            },
            "ladder":{
                x:0,
                top: tops.char,
                use: false, 
                width: 168,
                height: 140,
                crop:{
                    x:168*4,
                    y:140*5
                }
            }
        }
    };

    internal.loadSprites = async function(){
        return response = await fetch("/images/sprites.png")
        .then(res=>res.blob())
        .then(this.drawBackground);
    }

    internal.drawBackground = async function(blob){
        this.canvas = document.getElementById('cityscape');
        this.buffer = document.createElement('canvas');
        this.sprite.src  =  URL.createObjectURL(blob);
        this.sprite.onload = await this.setCanvas;
    }

    internal.setCanvas = function(){
        this.ctx = this.canvas.getContext('2d');
        this.buffer_ctx = this.buffer.getContext('2d');
        this.canvas.width = this.buffer.width = window.innerWidth;
        this.canvas.height = this.buffer.height = window.innerHeight;
        window.requestAnimationFrame(this.ticker);
    }

    internal.resetCharacter = function(character){
        if(character.playing==null || !character.playing){
            character.delay = Math.round(Math.random()*this.delayamount);
            character.delayCount=0;
            character.walking = false;
            character.rtol = Math.floor(Math.random()*2);
        }

    }

    internal.animator = function(name){
        if(typeof this.sprites[name] != "undefined" && name !="handyman"){
            var character = this.sprites[name];
            
            character.delayCount++;
            
            if(character.delayCount==character.delay){
                character.walking = true;
            }
            
            
            var finalCharacterSize = {
                w: character.width,
                h: character.height
            };

            if(character.resize != null){
                finalCharacterSize.w = character.resize.w;
                finalCharacterSize.h = character.resize.h;
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

                    if(character.rtol){
                        character.animationframes = [character.frames[0],character.frames[1]];
                    }
                    else{
                        character.animationframes = [character.frames[2],character.frames[3]];
                    }

                    //change walk image for character

                    character.frame = this.frameNumber(character.frame);
                    character.crop = character.animationframes[character.frame];
                }
                
                
                if(character.rtol && (character.x <= -(character.width))){
                    character.x = -(character.width);
                    character.rtol = false;
                    this.resetCharacter(character);
                    
                }
                else if(!character.rtol && (character.x>= this.canvas.width)){
                    character.x = this.canvas.width;   
                    this.resetCharacter(character);
                }
                
                
                this.buffer_ctx.drawImage(this.sprite, character.crop.x, character.crop.y, character.width, character.height, character.x, character.top, finalCharacterSize.w, finalCharacterSize.h );

            }        
        }
    }

    internal.animateHandy = function(){
        var character = this.sprites.handyman;

        if(character.top==tops.char){
            if(character.rtol){
                character.animationframes = [character.frames[0],character.frames[1]];
            }
            else{
                character.animationframes = [character.frames[2],character.frames[3]];
            }

            if(character.x < -(character.width)){
                character.rtol = true;
                character.x = this.canvas.width; 
            }
            else if(character.x> this.canvas.width){
                character.rtol = false;
                character.x = -(character.width);
            }
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
            if(character.step >= character.walkat){
                character.step = 0;

                if(character.rtol){
                    character.animationframes = [character.frames[0],character.frames[1]];
                }
                else{
                    character.animationframes = [character.frames[2],character.frames[3]];
                }

                character.frame = this.frameNumber(character.frame);

            }

            character.crop = character.animationframes[character.frame];
        }
        else if(!character.loaded){
            character.animationframes = [character.frames[2],character.frames[3]];
            character.crop = character.animationframes[1];
            character.loaded = true;
        }
        else if(character.top<=tops.char){
            character.animationframes = [character.framesvertical[0],character.framesvertical[1]];
        }

        
        this.buffer_ctx.drawImage(this.sprite, character.crop.x, character.crop.y, character.width, character.height, character.x, character.top, character.width, character.height );

    }
    

    internal.drawCityScape = function(spriteName){
        var cityscape = this.sprites[spriteName];
        this.buffer_ctx.save();
        this.buffer_ctx.globalAlpha = .65;
        for(var i = 0; i<cityscape.repeat; i++){
            this.buffer_ctx.drawImage(this.sprite, cityscape.crop.x, cityscape.crop.y, cityscape.width, cityscape.height, (cityscape.x + (cityscape.resize.w * i )), cityscape.top, cityscape.resize.w, cityscape.resize.h );
        }
        this.buffer_ctx.restore();
    }

    internal.drawLadder = function(){
        var ladder = this.sprites.ladder;
        ladder.x = this.sprites.handyman.x;
        this.buffer_ctx.drawImage(this.sprite, ladder.crop.x, ladder.crop.y, ladder.width, ladder.height, ladder.x, ladder.top, ladder.width, ladder.height );
    }

    internal.resizeWindow = function(entries){
        if(this.canvas != null){
            this.canvas.width = this.buffer.width = window.innerWidth;
            this.canvas.height = this.buffer.height = window.innerHeight;
            this.sprites.cityscape.repeat = Math.ceil(window.innerWidth/this.sprites.cityscape.resize.w);
        }
    }

    internal.resizeObserver = new ResizeObserver(internal.resizeWindow.bind(internal));

    internal.ticker = function(){
        this.buffer_ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawCityScape("cityscape");
        this.animator("ufo");
        this.animator("bird");
        this.animator("modelt");
        this.animator("cadillac");
        
        this.animator("bouncer");
        this.animator("woman");
        this.animator("dude");
        this.animator("police");
        if(this.sprites.handyman.climbing){
            this.drawLadder();
        }
        this.animateHandy();
        this.animator("waiter");
  
        
        this.ctx.drawImage(this.buffer, 0, 0, this.canvas.width, this.canvas.height);
        window.requestAnimationFrame(this.ticker);
    }

    internal.setSpriteStart = function(){
        for(var i in this.sprites ){
            if(typeof this.sprites[i].frames != "undefined" && this.sprites[i].playing==null){
                if(this.sprites[i].rtol){
                    this.sprites[i].x = window.innerWidth; 
                }
                else{
                    this.sprites[i].x = -(this.sprites[i].width); 
                }
            }
            
        }
    }

    internal.keyEvents = function(){
        document.addEventListener("keypress",this.controller);
        document.addEventListener("keyup",this.controller);
    }

    internal.controller = function(e){
        var handy =  this.sprites.handyman;

        if(e.type=="keyup"){
            handy.walking = false;
        }
        else{
            switch(e.charCode){

                case 119: //w
                    handy.top -= 10;
                    handy.frame = this.frameNumber(handy.frame);
                    handy.crop = handy.animationframes[handy.frame];
                    handy.climbing = true;

                    var toplimit = tops.char-(handy.height-10);
                    if(handy.top<=toplimit){
                        handy.top = toplimit;
                    }
                break;

                case 100: //d
                    if(handy.top == tops.char){
                        handy.rtol = false; 
                        handy.walking = true;
                        handy.climbing = false;
                    }
                break;

                case 97: //a
                    if(handy.top == tops.char){
                        handy.rtol = true;
                        handy.walking = true;
                        handy.climbing = false;
                    }
                break;

                case 122: //z
                    handy.top += 10;
                    handy.frame = this.frameNumber(handy.frame);
                    handy.crop = handy.animationframes[handy.frame];

                    if(handy.top >= tops.char){
                        handy.top = tops.char;
                    }
    
                break;

                case 32: //space
                break;
            }
        }
    }

    internal.frameNumber = function(num){
        return num==1?0:1;
    }

    internal.init = function(){
        this.setSpriteStart();
        this.loadSprites();
        this.keyEvents();
        this.resizeObserver.observe(document.body);

        if(window.matchMedia('(max-width: 767px)').matches){
            this.sprites.handyman.x = 0;
        }
    }

    internal.loadSprites = internal.loadSprites.bind(internal);
    internal.drawBackground = internal.drawBackground.bind(internal);
    internal.setCanvas = internal.setCanvas.bind(internal);
    internal.ticker = internal.ticker.bind(internal);
    internal.init = internal.init.bind(internal);
    internal.animator = internal.animator.bind(internal);
    internal.resetCharacter = internal.resetCharacter.bind(internal);
    internal.setSpriteStart = internal.setSpriteStart.bind(internal);
    internal.resizeWindow = internal.resizeWindow.bind(internal);
    internal.drawCityScape = internal.drawCityScape.bind(internal);
    internal.keyEvents = internal.keyEvents.bind(internal);
    internal.controller =  internal.controller.bind(internal);
    internal.animateHandy = internal.animateHandy.bind(internal);

    internal.init();

})();