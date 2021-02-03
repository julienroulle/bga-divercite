{OVERALL_GAME_HEADER}

<div id="board">
    <!-- BEGIN square -->
        <div id="square_{X}_{Y}" class="square" style="left: {LEFT}px; top: {TOP}px;"></div>
    <!-- END square -->
</div>

<div id="opponent_wrap" class="whiteblock piecebox">
    <h3>OPPONENT_HAND</h3>
    <div id="opponent_cities" align="center"></div>
    <div id="opponent_ressources" align="center"></div>
</div>

<div id="myhand_wrap" class="whiteblock piecebox">
    <h3>MY_HAND</h3>
    <div id="my_cities" align="center"></div>
    <div id="my_ressources" align="center"></div>
</div>

<script type="text/javascript">

var jstpl_piece = '<div class="piece" id="piece_${player_id}" style="background-image:ulr(\'img/pieces/${type}_${player_color}_{color}\')"></div>';
</script>  

{OVERALL_GAME_FOOTER}
