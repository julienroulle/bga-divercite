<?php
/**
 *------
 * BGA framework: © Gregory Isabelli <gisabelli@boardgamearena.com> & Emmanuel Colin <ecolin@boardgamearena.com>
 * Divercite implementation : © <Julien Roullé> <ju.roulle@gmail.com>
 *
 * This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
 * See http://en.boardgamearena.com/#!doc/Studio for more information.
 * -----
 *
 * divercite.view.php
 *
 * This is your "view" file.
 *
 * The method "build_page" below is called each time the game interface is displayed to a player, ie:
 * _ when the game starts
 * _ when a player refreshes the game page (F5)
 *
 * "build_page" method allows you to dynamically modify the HTML generated for the game interface. In
 * particular, you can set here the values of variables elements defined in divercite_divercite.tpl (elements
 * like {MY_VARIABLE_ELEMENT}), and insert HTML block elements (also defined in your HTML template file)
 *
 * Note: if the HTML of your game interface is always the same, you don't have to place anything here.
 *
 */
  
  require_once( APP_BASE_PATH."view/common/game.view.php" );
  
  class view_divercite_divercite extends game_view {
    function getGameName() {
        return "divercite";
    }    
  	function build_page( $viewArgs ) {		
  	    // Get players & players number
        $players = $this->game->loadPlayersBasicInfos();
        $players_nbr = count( $players );

        /*********** Place your code below:  ************/
        $this->page->begin_block( "divercite_divercite", "square" );
        
        $hor_scale = 64;
        $ver_scale = 64;
        for( $x=1; $x<=9; $x++ ) {
            if ($x % 2 != 0) {
                $clm = 5;
                $pad = 200;
            } else {
                $clm = 4;
                $pad = 258;
            }
            for( $y=1; $y<=$clm; $y++ ) {
                $this->page->insert_block( "square", array(
                    'X' => $x,
                    'Y' => $y,
                    'TOP' => round( ($x)*($hor_scale+25) + ($x - 1)*(-31) ),
                    'LEFT' => round( ($y)*($ver_scale+25) + ($y - 1)*(26) + $pad )
                ) );
            }        
        }
  	}
  }
  

