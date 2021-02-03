<?php
/**
 *------
 * BGA framework: © Gregory Isabelli <gisabelli@boardgamearena.com> & Emmanuel Colin <ecolin@boardgamearena.com>
 * Divercite implementation : © <Julien Roullé> <ju.roulle@gmail.com>
 *
 * This code has been produced on the BGA studio platform for use on https://boardgamearena.com.
 * See http://en.doc.boardgamearena.com/Studio for more information.
 * -----
 * 
 * divercite.action.php
 *
 * Divercite main action entry point
 *
 *
 * In this file, you are describing all the methods that can be called from your
 * user interface logic (javascript).
 *       
 * If you define a method "myAction" here, then you can call it from your javascript code with:
 * this.ajaxcall( "/divercite/divercite/myAction.html", ...)
 *
 */
  
  
  class action_divercite extends APP_GameAction
  { 
    // Constructor: please do not modify
   	public function __default()
  	{
  	    if( self::isArg( 'notifwindow') )
  	    {
            $this->view = "common_notifwindow";
  	        $this->viewArgs['table'] = self::getArg( "table", AT_posint, true );
  	    }
  	    else
  	    {
            $this->view = "divercite_divercite";
            self::trace( "Complete reinitialization of board game" );
      }
    } 
    
    public function selectPiece() {
  		self::setAjaxMode();
  		$number = self::getArg( "number", AT_posint, true );
  		$result = $this->game->selectPiece( $number );
  		self::ajaxResponse();
  	}
  	
  	public function placePiece() {
  		self::setAjaxMode();
  		$x = self::getArg( "x", AT_posint, true );
  		$y = self::getArg( "y", AT_posint, true );
  		$result = $this->game->placePiece( $x, $y );
  		self::ajaxResponse();
  	}
  	
  	// TODO: defines your action entry points there


    /*
    
    Example:
  	
    public function myAction()
    {
        self::setAjaxMode();     

        // Retrieve arguments
        // Note: these arguments correspond to what has been sent through the javascript "ajaxcall" method
        $arg1 = self::getArg( "myArgument1", AT_posint, true );
        $arg2 = self::getArg( "myArgument2", AT_posint, true );

        // Then, call the appropriate method in your game logic, like "playCard" or "myAction"
        $this->game->myAction( $arg1, $arg2 );

        self::ajaxResponse( );
    }
    
    */

  }
  

