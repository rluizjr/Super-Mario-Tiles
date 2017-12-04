// File Name: world.js
// Author's Name: Renato Luiz Carneiro Junior
// Last modified by: Renato Luiz Carneiro Junior
// Date last Modified: 6/14/2017
// Program Description: Game methods related with the world of the game.
// Revision history: 6/14/2017 Created this file to split the game in modules
    
    const W=0; //Wall
    const A=1; //Allowed
    const P=2; //Player
    const G=3; //Goal
    const E=4; //Enemy
    const T=5; //Pipe
    const C=6; //Coin
    const S=7; //Star

    var player;
    var star; // Reward
    var coin; // Reward

    var blocks=[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]; //(FOG)
    var squareSize;
    var world=
        [
            [1,3,0,0,0,1,1,1,1,1,1,1,1,0,4],
            [1,0,0,0,0,1,0,0,0,0,0,0,1,0,1],
            [1,1,1,1,1,1,1,1,1,1,0,0,1,0,1],
            [0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
            [1,1,1,0,1,0,0,1,1,1,1,1,1,0,1],
            [1,0,1,1,1,1,1,1,0,0,0,0,5,0,1],
            [1,1,1,0,0,0,0,1,0,1,1,1,1,0,1],
            [0,1,0,0,1,1,1,0,1,1,0,0,1,0,1],
            [0,1,1,1,1,0,1,1,1,0,0,0,1,1,1],
            [0,0,0,0,0,0,0,0,0,1,1,1,1,0,0],
            [0,7,0,1,1,1,1,0,1,4,0,0,1,0,0],
            [0,1,0,1,0,0,1,0,1,0,0,0,1,0,0],
            [0,1,0,1,1,1,1,0,1,1,1,1,1,0,0],
            [1,1,1,1,0,0,1,0,1,0,0,0,1,0,0],
            [2,0,0,1,1,1,1,1,1,0,6,1,1,1,1]
        ];

    // Function: getSquareSize
    //
    // Desc: Method to calculate the size of the squares according with the size of the canvas
    function getSquareSize(){
        var canvas = document.getElementById('canvas');
        var width = canvas.width;

        return width / world.length;
    }

    // Function: createWorld
    //
    // Desc: Create all the objects that is going to be used
    function createWorld(){
        squareSize = getSquareSize();

        var x = 0;
        var y = 0;

        // Run all the items of the world
         for(i = 0; i < world.length; i++){
            for(j = 0; j < world[i].length; j++){
                // Get and create the bitmap for each square
                var square = createBitmap(y * squareSize, x * squareSize, squareSize, getBitmapPath(world[x][y]));
                var background = createBitmap(y * squareSize, x * squareSize, squareSize, GRASS);

                background.visible = false;
                square.visible = false;
                stage.addChild(background);

                switch(world[x][y]){
                    case P: // Create the player object
                        player = square;
                        break;
                    case S: // Create Star(Reward) object
                        star = square;
                        break;
                    case C: // Create Coin(Reward) object
                        coin = square;
                        break;
                    //case E:
                        //break;
                    default:
                        stage.addChild(square);
                        break;
                }

                x += 1;
            }
            x=0;
            y += 1;
         }

         createjs.Sound.play('ambient', {loop: -1});

         mountStage();
    }

    // Function: mountStage
    //
    // Desc: Add all objects in the stage and cover with question blocks (FOG)
    function mountStage(){
        for(x = 0; x < world.length; x++){
            for(y = 0; y < world[x].length; y++){
                switch(world[x][y]){
                    case S: // Create Star(Reward) object
                        stage.addChild(star);
                        break;
                    case C: // Create Coin(Reward) object
                        stage.addChild(coin);
                        break;
                }

                //Cover all the squares with question blocks (FOG)
                var block = createBitmap(y * squareSize, x * squareSize, squareSize, BLOCK);
                block.visible = false;
                blocks[x][y] = block;
                stage.addChild(blocks[x][y]);
            }
        }

        var pipe = createBitmap(0, 14 * squareSize, squareSize, PIPE);
        pipe.visible = false;
        stage.addChild(pipe);

        stage.addChild(player);
        stage.removeChild(blocks[14][0]);
    }

    // Function: showWorld
    //
    // Desc: Show all the invisible blocks
    function showWorld(){
        for(i = 0; i < stage.children.length; i++){
            stage.children[i].visible = true;
        }
    }

    // Function: checkCollisions
    //
    // Desc: Check if in the next position there is a special item (goal, enemy, reward)
    function checkCollisions(x , y){
        var row = Math.round(y / squareSize);
        var column = Math.round(x / squareSize);

        switch(world[row][column]){
            case G: // Case player reached the goal
                won = true;
                win();
                break;
            case E: // Case player reached the enemy
                died = true;
                die();
                break;
            case T: // Case player reached the pipe
                createjs.Sound.play('woosh');
                setTimeout(function resetGame(){
                        for(i = 0; i < blocks.length; i++){
                            for(j = 0; j < blocks[i].length; j++){
                                if(blocks[i][j].visible == false){
                                    blocks[i][j].x = column * squareSize;
                                    blocks[i][j].y = row * squareSize;

                                    blocks[i][j].visible = true;

                                    createjs.Tween.get(blocks[i][j]).wait(15).to({x:j*squareSize,y:i*squareSize},1000, createjs.Ease.bounceOut);
                                }
                            }
                        }

                        movePlayer(0, (world.length - 1) * squareSize);
                    }, 300);
                break;
            case S: // Case player reached the star
                getItem(star, "Star");
                break;
            case C: // Case player reached the coin
                getItem(coin, "Coin");
                break;
        }
    }

    // Function: isMovePermited
    //
    // Desc: Check if the next movement is allowed or not
    function isMovePermited(x, y){
        //Calculate row and column according to the position
        var row = Math.round(y / squareSize); 
        var column = Math.round(x / squareSize);

        //if out of bounds
        if(row < 0 || column < 0 || row > world.length - 1 || column > world[0].length - 1){
            showMessage("You cannot move this way.");
            return false;
        }

        //remove question blocks (FOG)
        blocks[row][column].visible = false;

        // if a wall
        if(world[row][column] == W){
            showMessage("There is a wall here, you cannot go this way.");
            return false;
        }
        
        return true;
    }