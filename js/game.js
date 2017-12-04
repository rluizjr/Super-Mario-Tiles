// File Name: game.js
// Author's Name: Renato Luiz Carneiro Junior
// Last modified by: Renato Luiz Carneiro Junior
// Date last Modified: 6/14/2017
// Program Description: Game methods that round the UI, like to show messages or movements on the screen.
// Revision history: 6/14/2017 Created this file to split the game in modules
    
    var message;

    var won = false;
    var died = false;
    var moving = false;

    var inventory=Array();
    
    // Function: showInstructions
    //
    // Desc: Method to show the instructions on the screen.
    function showInstructions(){
        var de = new createjs.DOMElement(instructions);
        de.alpha = 0;
        de.regX = 200;
        de.x = stage.canvas.width / 2;
        de.y = 0;
        stage.addChild(de);
        createjs.Tween.get(de).wait(1000).to({y:40, alpha:1}, 2000, createjs.Ease.quadOut);

        var btnStart = createBitmap(stage.canvas.width / 2 - 25, stage.canvas.height / 2, 50, BRICK);
        stage.addChild(btnStart);

        btnStart.addEventListener('click', function (e) {
            de.htmlElement.parentNode.removeChild(de.htmlElement);
            stage.removeChild(btnStart);
            showWorld();
        });
    }

    // Function: createMessage
    //
    // Desc: Method to create a new DOM Element to show messages to user
    function createMessage(){
        message = new createjs.DOMElement(messagediv);
        message.alpha = 0;
        message.regX = 200;
        message.x = stage.canvas.width / 2;
        message.y = 0;
        stage.addChild(message);
        message.visible=false;
    }

    // Function: showMessage
    //
    // Desc: Show a message sent by paramter to the user
    function showMessage(messageText){
        message.visible = true;
        document.getElementById("messageText").innerHTML = messageText;
        createjs.Tween.get(message).wait(10).to({y:40, alpha:1}, 1000, createjs.Ease.quadOut).call(function t(){message.visible=false}).to({y:0, alpha:1});
    }

    // Function: showLastMessage
    //
    // Desc: Show the last message of the game (You won, You lost)
    function showLastMessage(messageText){
        message.visible = true;
        document.getElementById("messageText").innerHTML = messageText;
        createjs.Tween.get(message).wait(10).to({y:40, alpha:1}, 1000, createjs.Ease.quadOut);
    }

    // Function: win
    //
    // Desc: Method to finish the game when the player win
    function win(){
        createjs.Sound.stop("ambient");
        createjs.Sound.play("princess");

        createjs.Tween.get(player).to({x:player.x-2, alpha:1}, 1000, createjs.Ease.quadOut);

        createjs.Tween.get(player).to({y:player.y + 5}, 15).to({y:player.y - 5}, 5).wait(1000)
        .to({y:player.y + 15}, 15).to({y:player.y - 15}, 5).wait(150)
        .to({y:player.y + 15}, 15).to({y:player.y - 15}, 5).wait(150)
        .to({y:player.y + 15}, 15).to({y:player.y - 15}, 5).wait(150)
        .to({y:player.y + 15}, 15).to({y:player.y - 15}, 5).wait(150)
        .to({y:player.y + 15}, 15).to({y:player.y - 15}, 5).wait(5000).call(endGame);
    }

    // Function: die
    //
    // Desc: Method to finish the game when the player lose
    function die(){
        createjs.Sound.stop("ambient");
        createjs.Sound.play("died");
        createjs.Tween.get(player).to({y:player.y-squareSize, alpha:1}, 1000, createjs.Ease.quadOut).to({y:player.y + world.length * squareSize, alpha:1}, 1000, createjs.Ease.quadOut).call(function t(){player.visible=false}).wait(1500).call(endGame);
    }

    // Function: endGame
    //
    // Desc: Shows the last image and finish the game
    function endGame(){
        while(stage.children.length > 0)
            stage.removeChildAt(0);
        
        createMessage();

        if(won){
            var ending = createBitmap(stage.canvas.width / 2 - 200, stage.canvas.height / 2 - 200, 400, HAPPY_END);
            stage.addChild(ending);

            showLastMessage("You Won");
        }else{
            var ending = createBitmap(stage.canvas.width / 2 - 200, stage.canvas.height / 2 - 200, 400, BOWSER);
            stage.addChild(ending);
            
            createjs.Sound.play("gameover");
            showLastMessage("You Lost");
        }
    }

    // Function: movePlayer
    //
    // Desc: Runs the animation to move the player
    function movePlayer(NextX , NextY){
        moving = true;
        createjs.Tween.get(player).to({x:NextX,y:NextY},150, createjs.Ease.backIn).call(function allowMovement(){moving = false;});
    }

    // Function: getItem
    //
    // Desc: Runs the animation to get an item and includes in the inventory
    function getItem(item, description){
        if(item.visible){
            createjs.Sound.play('chime');
            createjs.Tween.get(item).wait(10).to({y:item.y-squareSize, alpha:1}, 1000, createjs.Ease.quadOut).call(function t(){item.visible=false});
            inventory.push(description);
        }
    }