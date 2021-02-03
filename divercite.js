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
            console.log( "Starting game setup", gamedatas );

            this.playerCities = new ebg.stock();
            this.playerRessources = new ebg.stock();
            this.playerCities.create(this, $('my_cities'), this.piece_width, this.piece_height);
            this.playerRessources.create(this, $('my_ressources'), this.piece_width, this.piece_height);
            this.playerCities.image_items_per_row = 4;
            this.playerRessources.image_items_per_row = 4;

            for (var value = 1; value <= 4; value++) {
                // Build card type id
                var card_type_id = this.getCardUniqueId(1, value);
                var player_color = 'city_white_';
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

            dojo.connect( this.playerCities, 'onChangeSelection', this, 'onPlayerHandSelectionChanged' );

            this.opponentCities = new ebg.stock();
            this.opponentRessources = new ebg.stock();
            this.opponentCities.create(this, $('opponent_cities'), this.piece_width, this.piece_height);
            this.opponentRessources.create(this, $('opponent_ressources'), this.piece_width, this.piece_height);
            this.opponentCities.image_items_per_row = 4;
            this.opponentRessources.image_items_per_row = 4;

            // dojo.connect( this.opponentHand, 'onChangeSelection', this, 'onopponentHandSelectionChanged' );
            for (var value = 1; value <= 4; value++) {
                // Build card type id
                var card_type_id = this.getCardUniqueId(1, value);
                var opponent_color = 'city_black_';
                var result = ["blue", "red", "green", "yellow"][value - 1];
                this.opponentCities.addItemType(card_type_id, card_type_id, g_gamethemeurl + 'img/pieces/' + opponent_color + result + '.png', card_type_id);
                this.opponentCities.addToStockWithId( card_type_id, card_type_id );
            }
            for (var value = 1; value <= 4; value++) {
                // Build card type id
                var card_type_id = this.getCardUniqueId(2, value);
                var opponent_color = 'ressource_';
                var result = ["blue", "red", "green", "yellow"][value - 1];
                this.opponentRessources.addItemType(card_type_id, card_type_id, g_gamethemeurl + 'img/pieces/' + opponent_color + result + '.png', card_type_id);
                this.opponentRessources.addToStockWithId( card_type_id, card_type_id );
            }
            
            // Setting up player boards
            for( var player_id in gamedatas.players )
            {
                var player = gamedatas.players[player_id];
                         
                // TODO: Setting up players boards if needed
            }

            dojo.query('.piece').connect('onclick', this, 'onSelectPiece');

            dojo.query('.square').connect('onclick', this, 'onPlacePiece');
            this.setupNotifications();

            console.log( "Ending game setup" );
        },

        onPlayerHandSelectionChanged : function() {
            var items = this.playerCities.getSelectedItems();
            console.log(items)

            if (items.length > 0) {
                if (this.checkAction('placeCity', true)) {
                    // Can play a card

                    var card_id = items[0].id;
                    console.log("on placeCity "+card_id);

                    this.playerCities.unselectAll();
                } else {
                    this.playerCities.unselectAll();
                }
            }
        },

        onSelectPiece : function(evt) {
            dojo.stopEvent(evt);
            // var pieceNumber = evt.currentTarget.id;
            console.log('onSelectPiece')

            // if (this.checkAction('selectPiece')) {
            //     this.ajaxcall("/divercite/divercite/selectPiece.html", {
            //         number : pieceNumber
            //     }, this, function(result) {
            //     });

            // }

        },

        onPlacePiece : function(evt) {
            dojo.stopEvent(evt);
            // var coords = evt.currentTarget.id.split('_');
            // var x = coords[1];
            // var y = coords[2];
            console.log('onPlacePiece')
            // if (this.checkAction('placePiece')) {
            //     this.ajaxcall("/divercite/divercite/placePiece.html", {
            //         x : x,
            //         y : y
            //     }, this, function(result) {
            //     });
            // }

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
        setupNotifications: function()
        {
            console.log( 'notifications subscriptions setup' );

            dojo.subscribe('selectPiece', this, "notif_selectPiece");
            this.notifqueue.setSynchronous('selectPiece', 500);
            dojo.subscribe('placePiece', this, "notif_placePiece");
            this.notifqueue.setSynchronous('placePiece', 1500);
        },  
		
        notif_selectPiece : function(notif) {
            //dojo.fadeOut({node: 'unplayedpiece_' + notif.args.number});
            dojo.destroy('unplayedpiece_' + notif.args.number);
            this.setSelectedPiece(notif.args.number, notif.args.properties);
        },

        notif_placePiece : function(notif) {
            dojo.empty('selected_box');
            this.setSelectedPiece(null);
            this.addPieceOnPosition(notif.args.number, notif.args.x, notif.args.y, notif.args.properties);
        },
   });             
});
