// File Name: images.js
// Author's Name: Renato Luiz Carneiro Junior
// Last modified by: Renato Luiz Carneiro Junior
// Date last Modified: 6/14/2017
// Program Description: Constants and methods to create the bitmaps in the game.
// Revision history: 6/14/2017 Created this file to split the game in modules

    const BRICK = "brick";
    const GRASS = "grass";
    const MARIO = "mario";
    const PEACH = "peach";
    const ENEMY = "enemy";
    const BLOCK = "block";
    const PIPE = "pipe";
    const COIN = "coin";
    const STAR = "star";
    const HAPPY_END = "happyend";
    const BOWSER = "bowser";

    // Function: getBitmapPath
    //
    // Desc: Get the specific bitmap path, according with the square value
    function getBitmapPath(squareValue){
        var imgPath = BRICK // Wall

        switch(squareValue){
            case A: // Allowed
                imgPath = GRASS;
                break;
            case P: // Player
                imgPath = MARIO;
                break;
            case G: // Goal
                imgPath = PEACH; 
                break;
            case E: // Enemy
                imgPath = ENEMY; 
                break;
            case T: // Pipe
                imgPath = PIPE; 
                break;
            case C: // Coin
                imgPath = COIN; 
                break;
            case S: // Star
                imgPath = STAR; 
                break;
        }
        
        return imgPath;
    }

    // Function: createBitmap
    //
    // Desc: Create a new bitmap
    function createBitmap(x, y, size, imgPath){
        var img = queue.getResult(imgPath);
        var rectangle = new createjs.Bitmap(img);

        rectangle.setTransform(0, 0, size / img.width, size / img.height);

        rectangle.x = x;
        rectangle.y = y;
        
        return rectangle;
    }