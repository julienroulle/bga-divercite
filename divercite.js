/**
 *------
 * BGA framework: © Gregory Isabelli <gisabelli@boardgamearena.com> & Emmanuel Colin <ecolin@boardgamearena.com>
 * Divercite implementation : © <Julien Roullé> <ju.roulle@gmail.com>
 *
 * This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
 * See http://en.boardgamearena.com/#!doc/Studio for more information.
 * -----
 *
 * divercite.js
 *
 * Divercite user interface script
 * 
 * In this file, you are describing the logic of your user interface, in Javascript language.
 *
 */

define([
    "dojo","dojo/_base/declare",
    "ebg/core/gamegui",
    "ebg/counter",
    "ebg/stock"
],
function (dojo, declare) {
    return declare("bgagame.divercite", ebg.core.gamegui, {
        constructor: function(){
            console.log('divercite constructor');
              
            this.piece_width = 96;
            this.piece_height = 96;
        },
        
        setup: function( gamedatas )
        {
            console.log( "Starting game setup" );

            this.playerCities = new ebg.stock();
            this.playerRessources = new ebg.stock();
            this.playerCities.create(this, $('mycities'), this.piece_width, this.piece_height);
            this.playerRessources.create(this, $('myressources'), this.piece_width, this.piece_height);
            this.playerCities.image_items_per_row = 4;
            this.playerRessources.image_items_per_row = 4;

            // dojo.connect( this.playerHand, 'onChangeSelection', this, 'onPlayerHandSelectionChanged' );
            for (var value = 1; value <= 4; value++) {
                // Build card type id
                var card_type_id = this.getCardUniqueId(1, value);
                var player_color = 'city_black_';
                var result = ["blue", "red", "green", "yellow"][value - 1];
                this.playerCities.addItemType(card_type_id, card_type_id, g_gamethemeurl + 'img/pieces/' + player_color + result + '.png', card_type_id);
                this.playerCities.addToStockWithId( card_type_id, card_type_id );
            }
            for (var value = 1; value <= 4; value++) {
                // Build card type id
                var card_type_id = this.getCardUniqueId(2, value);
                var player_color = 'ressource_';
                var result = ["blue", "red", "green", "yellow"][value - 1];
                this.playerRessources.addItemType(card_type_id, card_type_id, g_gamethemeurl + 'img/pieces/' + player_color + result + '.png', card_type_id);
                this.playerRessources.addToStockWithId( card_type_id, card_type_id );
            }
            
            // Setting up player boards
            for( var player_id in gamedatas.players )
            {
                var player = gamedatas.players[player_id];
                         
                // TODO: Setting up players boards if needed
            }

            // // TODO: Set up your game interface here, according to "gamedatas"
            // // Cards in player's hand
            // for ( var i in this.gamedatas.hand) {
            //     var card = this.gamedatas.hand[i];
            //     var color = card.type;
            //     var value = card.type_arg;
            //     this.playerHand.addToStockWithId(this.getCardUniqueId(color, value), card.id);
            // }

            // // Cards played on table
            // for (i in this.gamedatas.cardsontable) {
            //     var card = this.gamedatas.cardsontable[i];
            //     var color = card.type;
            //     var value = card.type_arg;
            //     var player_id = card.location_arg;
            //     this.playCardOnTable(player_id, color, value, card.id);
            // }
 
            // Setup game notifications to handle (see "setupNotifications" method below)
            this.setupNotifications();

            console.log( "Ending game setup" );
        },
       

        ///////////////////////////////////////////////////
        //// Game & client states
        
        // onEnteringState: this method is called each time we are entering into a new game state.
        //                  You can use this method to perform some user interface changes at this moment.
        //
        onEnteringState: function( stateName, args )
        {
            console.log( 'Entering state: '+stateName );
            
            switch( stateName )
            {
            
            /* Example:
            
            case 'myGameState':
            
                // Show some HTML block at this game state
                dojo.style( 'my_html_block_id', 'display', 'block' );
                
                break;
           */
           
           
            case 'dummmy':
                break;
            }
        },

        // onLeavingState: this method is called each time we are leaving a game state.
        //                 You can use this method to perform some user interface changes at this moment.
        //
        onLeavingState: function( stateName )
        {
            console.log( 'Leaving state: '+stateName );
            
            switch( stateName )
            {
            
            /* Example:
            
            case 'myGameState':
            
                // Hide the HTML block we are displaying only during this game state
                dojo.style( 'my_html_block_id', 'display', 'none' );
                
                break;
           */
           
           
            case 'dummmy':
                break;
            }               
        }, 

        // onUpdateActionButtons: in this method you can manage "action buttons" that are displayed in the
        //                        action status bar (ie: the HTML links in the status bar).
        //        
        onUpdateActionButtons: function( stateName, args )
        {
            console.log( 'onUpdateActionButtons: '+stateName );
                      
            if( this.isCurrentPlayerActive() )
            {            
                switch( stateName )
                {
/*               
                 Example:
 
                 case 'myGameState':
                    
                    // Add 3 action buttons in the action status bar:
                    
                    this.addActionButton( 'button_1_id', _('Button 1 label'), 'onMyMethodToCall1' ); 
                    this.addActionButton( 'button_2_id', _('Button 2 label'), 'onMyMethodToCall2' ); 
                    this.addActionButton( 'button_3_id', _('Button 3 label'), 'onMyMethodToCall3' ); 
                    break;
*/
                }
            }
        },        

        ///////////////////////////////////////////////////
        //// Utility methods

        getCardUniqueId : function(color, value) {
            return (color - 1) * 4 + (value - 1);
        },

        // playCardOnTable : function(player_id, color, value, card_id) {
        //     // player_id => direction
        //     dojo.place(this.format_block('jstpl_piece', {
        //         x : this.piece_width * (value - 2),
        //         y : this.piece_height * (color - 1),
        //         player_id : player_id
        //     }), 'playertablecard_' + player_id);

        //     if (player_id != this.player_id) {
        //         // Some opponent played a card
        //         // Move card from player panel
        //         this.placeOnObject('cardontable_' + player_id, 'overall_player_board_' + player_id);
        //     } else {
        //         // You played a card. If it exists in your hand, move card from there and remove
        //         // corresponding item

        //         if ($('myhand_item_' + card_id)) {
        //             this.placeOnObject('cardontable_' + player_id, 'myhand_item_' + card_id);
        //             this.playerHand.removeFromStockById(card_id);
        //         }
        //     }

        //     // In any case: move it to its final destination
        //     this.slideToObject('cardontable_' + player_id, 'playertablecard_' + player_id).play();
        // },
        
        /*
        
            Here, you can defines some utility methods that you can use everywhere in your javascript
            script.
        
        */
    //    addTokenOnBoard: function( x, y, player )
    //    {
    //        dojo.place( this.format_block( 'jstpl_token', {
    //            x_y: x+'_'+y,
    //            color: this.gamedatas.players[ player ].color
    //        } ) , 'tokens' );
           
    //        this.placeOnObject( 'token_'+x+'_'+y, 'overall_player_board_'+player );
    //        this.slideToObject( 'token_'+x+'_'+y, 'square_'+x+'_'+y ).play();
    //    },

        ///////////////////////////////////////////////////
        //// Player's action
        
        /*
        
            Here, you are defining methods to handle player's action (ex: results of mouse click on 
            game objects).
            
            Most of the time, these methods:
            _ check the action is possible at this game state.
            _ make a call to the game server
        
        */
        
        /* Example:
        
        onMyMethodToCall1: function( evt )
        {
            console.log( 'onMyMethodToCall1' );
            
            // Preventing default browser reaction
            dojo.stopEvent( evt );

            // Check that this action is possible (see "possibleactions" in states.inc.php)
            if( ! this.checkAction( 'myAction' ) )
            {   return; }

            this.ajaxcall( "/divercite/divercite/myAction.html", { 
                                                                    lock: true, 
                                                                    myArgument1: arg1, 
                                                                    myArgument2: arg2,
                                                                    ...
                                                                 }, 
                         this, function( result ) {
                            
                            // What to do after the server call if it succeeded
                            // (most of the time: nothing)
                            
                         }, function( is_error) {

                            // What to do after the server call in anyway (success or failure)
                            // (most of the time: nothing)

                         } );        
        },        
        
        */

        
        ///////////////////////////////////////////////////
        //// Reaction to cometD notifications

        /*
            setupNotifications:
            
            In this method, you associate each of your game notifications with your local method to handle it.
            
            Note: game notification names correspond to "notifyAllPlayers" and "notifyPlayer" calls in
                  your divercite.game.php file.
        
        */
        setupNotifications: function()
        {
            console.log( 'notifications subscriptions setup' );
            
            // TODO: here, associate your game notifications with local methods
            
            // Example 1: standard notification handling
            // dojo.subscribe( 'cardPlayed', this, "notif_cardPlayed" );
            
            // Example 2: standard notification handling + tell the user interface to wait
            //            during 3 seconds after calling the method in order to let the players
            //            see what is happening in the game.
            // dojo.subscribe( 'cardPlayed', this, "notif_cardPlayed" );
            // this.notifqueue.setSynchronous( 'cardPlayed', 3000 );
            // 
        },  
        
        // TODO: from this point and below, you can write your game notifications handling methods
        
        /*
        Example:
        
        notif_cardPlayed: function( notif )
        {
            console.log( 'notif_cardPlayed' );
            console.log( notif );
            
            // Note: notif.args contains the arguments specified during you "notifyAllPlayers" / "notifyPlayer" PHP call
            
            // TODO: play the card in the user interface.
        },    
        
        */
   });             
});
