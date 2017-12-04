// File Name: controls.js
// Author's Name: Renato Luiz Carneiro Junior
// Last modified by: Renato Luiz Carneiro Junior
// Date last Modified: 6/14/2017
// Program Description: Methods that manage the controls in the game.
// Revision history: 6/14/2017 Created this file to split the game in modules
    
    const ARROW_KEY_LEFT = 37;
    const ARROW_KEY_UP = 38;
    const ARROW_KEY_RIGHT = 39;
    const ARROW_KEY_DOWN = 40;

    const W_KEY = 87;
    const A_KEY = 65;
    const S_KEY = 83;
    const D_KEY = 68;

    const I_KEY = 73;

    // Function: onDPad
    //
    // Desc: Controls the events when a key is pressed
    function onDPad(e){
        var nextX = player.x;
        var nextY = player.y;

        if(moving || died || won){
            return;
        }

        switch (e.keyCode){
            case ARROW_KEY_LEFT:
            case A_KEY:
                nextX = player.x - squareSize; // Move left
                break;
            case ARROW_KEY_UP:
            case W_KEY:
                nextY = player.y - squareSize; // Move up
                break;
            case ARROW_KEY_RIGHT:
            case D_KEY:
                nextX = player.x + squareSize;  // Move right
                break;
            case ARROW_KEY_DOWN:
            case S_KEY:
                nextY = player.y + squareSize; // Move down
                break;
            case I_KEY:
                console.log(inventory); // Show inventory
                return;
        }

        if(isMovePermited(nextX, nextY)){
            movePlayer(nextX, nextY);
            checkCollisions(nextX, nextY);
        }
    }