var states = {
    wkingmove: false,
    bkingmove: false,
    wrook1move: false,
    wrook2move: false,
    brook2move: false,
    brook1move: false
}
var game = {
    activeuser: [],
    moves: []
}
function updateratings(team, result)
{
    $.ajax(
        {
            url: '../includes/updaterating.php',
            type: 'POST',
            data: ({team: team, result:result}),
            success: function(response)
            {
                responses = response.split(" ");
                console.log(response);
                console.log(responses[5]);
                if(responses[2] != "draw" && game.activeuser[0] == "w")
                {
                    alert("The winner of this match was" + responses[2] + ". Your new rating is "+ responses[0]);
                }
                else if(responses[2] != "draw" && game.activeuser[0] == "b")
                {
                    alert("The winner of this match was" + responses[2] + ". Your new rating is "+ responses[1]);
                }
                else if(responses[2] == "draw" && game.activeuser[0] == "b")
                {
                    alert("The match ended in a draw. Your new rating is "+ responses[1]);
                }
                else if(responses[2] == "draw" && game.activeuser[0] == "w")
                {
                    alert("The match ended in a draw. Your new rating is "+ responses[0])
                }
            }
        }
    )
}
function logmove(move)
{
    console.log(move)
    $.ajax(
        {
            url: '../includes/logmove.php',
            type: 'POST',
            data: ({name:move}),
            success: function(response)
            {
                console.log(response);
            }
        }
    )

}
function getnames()
{
    $.ajax(
        {
            url: '../includes/getnames.php',
            type: 'get',
            success : function(beta)
            {
                console.log(beta);
                ajaxin = 0;
                while(beta[ajaxin] != ' ')
                {
                    ajaxin++;
                }
                blackplayername = beta.substr(0, ajaxin);
                ajaxind = ajaxin + 1;
                while(beta[ajaxind] != ' ')
                {
                    ajaxind++;
                }
                blackplayerrating = beta.substr(ajaxin + 1, (ajaxind - ajaxin));
                ajaxinde = ajaxind + 1;
                while(beta[ajaxinde] != ' ')
                {
                    ajaxinde++;
                }
                whiteplayername = beta.substr(ajaxind + 1, (ajaxinde - ajaxind));
                whiteplayerrating = beta.substr(ajaxinde + 1, beta.length - (ajaxinde+1));
                console.log(whiteplayerrating)
                $("#blackplayer").text("Playing as black:"+blackplayername+" Rating:"+blackplayerrating)
                $("#whiteplayer").text("Playing as white:"+whiteplayername+" Rating:"+whiteplayerrating)
            }
        }
    )
}
getnames();
function readmoves()
{
    $.ajax(
        {
            url: '../includes/loadmoves.php',
            type: 'get',
            success : function(data)
            {
                ajaxj = 0;
                while(data[ajaxj] != ' ')
                {
                    ajaxj++;
                }
            datas = data.split(" ");
            game.moves = datas[0];
            game.activeuser = datas[1];
            start = datas[2];
            console.log(data);
            console.log(game.moves.length);
            count = 1;
            if(game.moves.length > 0)
            {
                piece = $("#p"+game.moves[1]+game.moves[2]).children().attr('id');
                console.log("#p"+game.moves[1]+game.moves[2])
                if(piece[0] == 'b')
                {
                    start = 2;
                }
                else
                {
                    start = 1;
                }
                for(index = 0; index < (game.moves.length); index = index + 8)
                {
                    console.log("BUR")
                    move = (game.moves).substr(index, index+8);
                    if(move[3] != "W" && move[3] != "E" && move[3] != "C")
                    {
                        console.log("YUP")
                        piece = $("#p"+move[1]+move[2]).children().attr('id');
                        console.log(piece)
                        $("#p"+move[4]+move[5]).empty();
                        console.log(move)
                        console.log("#p"+move[4]+move[5])
                        $("#"+piece).prependTo("#p"+move[4]+move[5]);
                    }
                    else if (move[3] == "C")
                    {
                        if(move[5]+move[6] == "83")
                        {
                            $("#whiterook1").prependTo("#p84");
                            piece = $("#p"+move[1]+move[2]).children().attr('id');
                            $("#p"+move[5]+move[6]).empty();
                            $("#"+piece).prependTo("#p"+move[5]+move[6]);
                        }
                        else if(move[5]+move[6] == "87")
                        {
                            $("#whiterook2").prependTo("#p86");
                            piece = $("#p"+move[1]+move[2]).children().attr('id');
                            $("#p"+move[5]+move[6]).empty();
                            $("#"+piece).prependTo("#p"+move[5]+move[6]);
                        }
                        else if(move[5]+move[6] == "17")
                        {
                            $("#blackrook2").prependTo("#p16");
                            piece = $("#p"+move[1]+move[2]).children().attr('id');
                            $("#p"+move[5]+move[6]).empty();
                            $("#"+piece).prependTo("#p"+move[5]+move[6]);
                        }
                        else if(move[5]+move[6] == "13")
                        {
                            $("#blackrook1").prependTo("#p14");
                            piece = $("#p"+move[1]+move[2]).children().attr('id');
                            $("#p"+move[5]+move[6]).empty();
                            $("#"+piece).prependTo("#p"+move[5]+move[6]);
                        }
                    }
                    else if(move[3] == "W")
                    {
                        $("#p"+move[6]+move[7]).empty();
                        $("#p"+move[1]+move[2]).empty();
                        if(move[4] == "q")
                        {
                            $("#p"+move[4]+move[5]).append($("#whitequeen"+move[5]));
                        }
                        else if(move[4] == "b")
                        {
                            $("#p"+move[4]+move[5]).append($("#whitebishop"+move[5]));
                        }
                        else if(move[4] == "n")
                        {
                            $("#p"+move[4]+move[5]).append($("#whiteknight"+move[5]));
                        }
                        else if(move[4] == "r")
                        {
                            $("#p"+move[4]+move[5]).append($("#whiterook"+move[5]));
                        }
                    }
                    else if (move[3] == "E")
                    {
                        $("#p"+move[6]+move[7]).empty();
                        $("#p"+move[1]+move[2]).empty();
                        if(move[4] == "q")
                        {
                            $("#p"+move[4]+move[5]).append($("#blackqueen"+move[5]));
                        }
                        else if(move[4] == "b")
                        {
                            $("#p"+move[4]+move[5]).append($("#blackbishop"+move[5]));
                        }
                        else if(move[4] == "n")
                        {
                            $("#p"+move[4]+move[5]).append($("#blackknight"+move[5]));
                        }
                        else if(move[4] == "r")
                        {
                            $("#p"+move[4]+move[5]).append($("#blackrook"+move[5]));
                        }
                    }
                    count++;
                }
            }
            if (count % 2 == 0)
            {
                window.activeplayer = "black";
                $("#submitmove").show();
                $("#submitmove").html('Black move');
            }
            else
            {
                window.activeplayer = "white";
                $("#submitmove").show();
                $("#submitmove").html('White move');
            }
            }
        }
    )
}
readmoves();
for(f = 3; f<11; f++)
{
    $("#blackrook"+f).hide();
    $("#whiterook"+f).hide();
    $("#blackbishop"+f).hide();
    $("#whitebishop"+f).hide();
    $("#blackknight"+f).hide();
    $("#whiteknight"+f).hide();
    $("#blackqueen"+(f-1)).hide();
    $("#whitequeen"+(f-1)).hide();
}
function whitequeenmove(attackedpiece, position2, pawnid)
{
    attackedpiece = $("#"+position2).children().attr('id');
    $("#"+attackedpiece).prependTo("#yeet")
    $("#"+position2).empty();
    $("img").parent().css("background-color","");
    $("#"+window.piece).prependTo("#"+position2);
    if(checkifplayerisincheck($("#"+window.activeplayer+"king").parent().attr('id')))
    {
        $("#"+attackedpiece).prependTo("#"+position2);
        $("#"+window.piece).prependTo("#"+window.pos1);
        window.activeplayer = "white";
        $("#submitmove").html('white move');
    }
    else
    {
        var piece = prompt("Please enter the piece", "rook, queen, knight, bishop");
        $("#"+pawnid).remove();
        i = 1;
        while($("#white"+piece+i).parent().attr('id') != undefined){
                i++;
        }
        $("#white"+piece+i).show();
        $("#"+position2).append($("#white"+piece+i));
        checkforcheck(position2);
        window.activeplayer = "black";
        $("#submitmove").html('black move');
        logmove("p"+window.pos1.substr(1,2)+"W"+piece[0]+position2.substr(1,2));
        if(states.wcheck || states.bcheck)
        {
            if(checkformate())
            {
                updateratings("w", 1);
                window.activeplayer = [];
                $("#submitmove").html('white wins');
            }
            if (stalemate())
            {
                updateratings("b", 0.5);
                window.activeplayer = [];
                $("#submitmove").html('Stalemate');
            }
        }
    }
}
function blackqueenmove(attackedpiece, position2, pawnid)
{
    attackedpiece = $("#"+position2).children().attr('id');
    $("#"+attackedpiece).prependTo("#yeet")
    $("#"+position2).empty();
    $("img").parent().css("background-color","");
    $("#"+window.piece).prependTo("#"+position2);
    if(checkifplayerisincheck($("#"+window.activeplayer+"king").parent().attr('id')))
    {
        $("#"+attackedpiece).prependTo("#"+position2);
        $("#"+window.piece).prependTo("#"+window.pos1);
        window.activeplayer = "black";
        $("#submitmove").html('black move');
    }
    else
    {
        var piece = prompt("Please enter the piece", "rook, queen, knight, bishop");
        $("#"+pawnid).remove();
        i = 1;
        while($("#black"+piece+i).parent().attr('id') != undefined){
                i++;
        }
        $("#black"+piece+i).show();
        $("#"+position2).append($("#black"+piece+i));
        checkforcheck(position2);
        window.activeplayer = "white";
        $("#submitmove").html('white move');
        logmove("p"+window.pos1.substr(1,2)+"E"+piece[0]+position2.substr(1,2));
        if(states.wcheck || states.bcheck)
        {
            if(checkformate())
            {
                updateratings("b", 1);
                window.activeplayer = [];
                $("#submitmove").html('Black wins');
            }
            if (stalemate())
            {
                updateratings("b", 0.5);
                window.activeplayer = [];
                $("#submitmove").html('Stalemate');
            }
        }
    }

}
//if check for blocks is true returns mate
function kingstale(rowk, colk)
{
    if (window.activeplayer == "white")
    {
        nonactive = "black"
    }
    else
    {
        nonactive = "white"
    }
    for (cou = -1;cou < 2; cou++)
    {
        console.log(cou)
        if($("#p"+(parseInt(rowk)+cou)+((parseInt(colk)+1)).toString()).children().length == 0)
        {
            if(parseInt(rowk)+cou < 9 && parseInt(rowk)+cou > 0 && parseInt(colk)+ 1 < 9 && parseInt(colk)+1 > 0)
            {
                if(!scanthroughchecks(nonactive, (parseInt(rowk)+cou), (parseInt(colk)+1).toString(), true))
                {
                    console.log(rowk+colk)
                    return false;
                }
            }
        }
        if($("#p"+(parseInt(rowk)+cou)+colk).children().length == 0)
        {
            if(parseInt(rowk)+cou < 9 && parseInt(rowk)+cou > 0 && parseInt(colk) < 9 && parseInt(colk) > 0)
            {
                if(!scanthroughchecks(nonactive, parseInt(rowk)+cou, colk, true))
                {
                    console.log(rowk+colk)
                    return false;
                }
            }
        }
        if($("#p"+(parseInt(rowk)+cou)+((parseInt(colk)-1)).toString()).children().length == 0)
        {
            if(parseInt(rowk)+cou < 9 && parseInt(rowk)+cou > 0 && parseInt(colk)- 1 < 9 && parseInt(colk)-1 > 0)
            {
                if(!scanthroughchecks(nonactive, (parseInt(rowk)+cou).toString(), (parseInt(colk)-1), true))
                {
                    console.log(rowk+colk)
                    return false;
                }
            }
        }
    }
    return true;
};
function checkformate()
{
    mate = true;
    kingposition = $("#"+window.activeplayer+"king").parent().attr('id');
    rowk = kingposition.charAt(1);
    colk = kingposition.charAt(2);
    mate = kingstale(rowk, colk)
    if (mate)
    {
        //check to kill
        //nonactive because checking to see if nonactive are checking active
        if(checkforblocks(nonactive, rowk, colk))
        {
            return mate;
        }
        else
        {
            mate = false;
            return mate;
        }
    }
    else 
    {
        return mate;
    }
};
function pawnstale()
{
    for(i = 1; i < 9; i++)
    {
        if($("#"+window.activeplayer+"pawn"+i).length > 0 && $("#"+window.activeplayer+"pawn"+i).parent().attr('id') != 'yeet')
        {
            row1 = $("#"+window.activeplayer+"pawn"+i).parent().attr('id').charAt(1);
            col1 = $("#"+window.activeplayer+"pawn"+i).parent().attr('id').charAt(2);
            str = "#p"+(parseInt(row1)+1)+col1;
            str2 = "#p"+(parseInt(row1)+1)+(parseInt(col1)+1).toString();
            str3 = "#p"+(parseInt(row1)+1)+(parseInt(col1)-1).toString();
            str4 =  "#p"+(parseInt(row1)-1)+col1;
            str5 = "#p"+(parseInt(row1)-1)+(parseInt(col1)+1).toString();
            str6 = "#p"+(parseInt(row1)-1)+(parseInt(col1)-1).toString();
            if(window.activeplayer == "black" && $(str).children().length == 0)
            {
                return false;
            }
            if($(str2).children() > 0)
            {
                if (window.activeplayer == "black" && ($(str2).children().attr('id').charAt(0) == 'w'))
                {
                return false;
                }
            }
            if($(str3).children() > 0)
            {
                if (window.activeplayer == "black" && ($(str3).children().attr('id').charAt(0) == 'w'))
                {
                return false;
                }
            }
            else if (window.activeplayer == "white" && $(str4).children().length == 0)
            {
                return false;
            }
            if($(str5).children() > 0)
            {
                if (window.activeplayer == "white" && $(str5).children().attr('id').charAt(0) == 'w')
                {
                return false;
                }
            }
            if($(str6).children() > 0)
            {
                if (window.activeplayer == "white" && $(str6).children().attr('id').charAt(0) == 'w')
                {
                return false;
                }
            }
        }
    }
    return true;
};
function bishopstale()
{
    for(j = 1; j < 11; j++)
    {
        if($("#"+window.activeplayer+"bishop"+j).parent().attr('id') != undefined && $("#"+window.activeplayer+"bishop"+j).parent().attr('id') != 'yeet')
        {
            row1 = $("#"+window.activeplayer+"bishop"+j).parent().attr('id').charAt(1);
            col1 = $("#"+window.activeplayer+"bishop"+j).parent().attr('id').charAt(2);
            if($("#p"+(parseInt(row1)+1)+(parseInt(col1)+1).toString()).length > 0)
            {
                if($("#p"+(parseInt(row1)+1)+(parseInt(col1)+1).toString()).children().length == 0)
                {
                    return false;
                }
                else if($("#p"+(parseInt(row1)+1)+(parseInt(col1)+1).toString()).children().attr('id').charAt(0) != window.activeplayer.charAt(0))
                {
                return false;
                };
            }
            if($("#p"+(parseInt(row1)-1)+(parseInt(col1)+1).toString()).length > 0)
            {
                if($("#p"+(parseInt(row1)-1)+(parseInt(col1)+1).toString()).children().length == 0)
                {
                    return false;
                }
                else if($("#p"+(parseInt(row1)-1)+(parseInt(col1)+1).toString()).children().attr('id').charAt(0) != window.activeplayer.charAt(0))
                {
                    return false;
                }
            }
            if($("#p"+(parseInt(row1)-1)+(parseInt(col1)-1).toString()).length > 0)
            {
                if($("#p"+(parseInt(row1)-1)+(parseInt(col1)-1).toString()).children().length == 0)
                {
                    return false;
                }
                else if($("#p"+(parseInt(row1)-1)+(parseInt(col1)-1).toString()).children().attr('id').charAt(0) != window.activeplayer.charAt(0))
                {
                return false;
                }
            }
            if($("#p"+(parseInt(row1)+1)+(parseInt(col1)-1).toString()).length > 0)
            {
                if($("#p"+(parseInt(row1)+1)+(parseInt(col1)-1).toString()).children().length == 0)
                {
                    return false;
                }
                else if($("#p"+(parseInt(row1)+1)+(parseInt(col1)-1).toString()).children().attr('id').charAt(0) != window.activeplayer.charAt(0))
                {
                    return false;
                }
            }
        }
    }
    return true;
};
function rookstale()
{
    for(k = 1; k < 11; k++)
    {
        if($("#"+window.activeplayer+"rook"+k).parent().attr('id') != undefined && $("#"+window.activeplayer+"rook"+k).parent().attr('id') != 'yeet')
        {
            row1 = $("#"+window.activeplayer+"rook"+k).parent().attr('id').charAt(1)
            col1 = $("#"+window.activeplayer+"rook"+k).parent().attr('id').charAt(2)
            if($("#p"+(parseInt(row1))+(parseInt(col1)+1).toString()).length > 0)
            {
                if($("#p"+(parseInt(row1))+(parseInt(col1)+1).toString()).children().length == 0)
                {
                    return false;
                }
                else if($("#p"+(parseInt(row1))+(parseInt(col1)+1).toString()).children().attr('id').charAt(0) != window.activeplayer.charAt(0))
                {
                    return false;
                }
            }
            if($("#p"+(parseInt(row1))+(parseInt(col1)-1).toString()).length > 0)
            {
                if($("#p"+(parseInt(row1))+(parseInt(col1)-1).toString()).children().length == 0)
                {
                    return false;
                }
                else if($("#p"+(parseInt(row1))+(parseInt(col1)-1).toString()).children().attr('id').charAt(0) != window.activeplayer.charAt(0))
                {
                    return false;
                }
            }
            if($("#p"+(parseInt(row1)+1)+col1).length > 0)
            {
                if($("#p"+(parseInt(row1)+1)+col1).children().length == 0)
                {
                    return false;
                }
                else if($("#p"+(parseInt(row1)+1)+col1).children().attr('id').charAt(0) != window.activeplayer.charAt(0))
                {
                return false;
                }
            }
            if($("#p"+(parseInt(row1)-1)+col1).length > 0)
            {
                if($("#p"+(parseInt(row1)-1)+col1).children().length == 0)
                {
                    return false;
                }
                else if($("#p"+(parseInt(row1)-1)+col1).children().attr('id').charAt(0) != window.activeplayer.charAt(0))
                {
                    return false;
                }
            }
        }
    }
    return true;
};
function queenstale()
{
    for(q = 1; q<11; q++)
    {
        if($("#"+window.activeplayer+"queen"+q).parent().attr('id') != undefined && $("#"+window.activeplayer+"queen"+q).parent().attr('id') != 'yeet')
        {
            row1 = $("#"+window.activeplayer+"queen"+q).parent().attr('id').charAt(1)
            col1 = $("#"+window.activeplayer+"queen"+q).parent().attr('id').charAt(2)
            if($("#p"+(parseInt(row1))+(parseInt(col1)+1).toString()).length > 0)
            {
                if($("#p"+(parseInt(row1))+(parseInt(col1)+1).toString()).children().length == 0)
                {
                    return false;
                }
                else if($("#p"+(parseInt(row1))+(parseInt(col1)+1).toString()).children().attr('id').charAt(0) != window.activeplayer.charAt(0))
                {
                    return false;
                }
            }
            if($("#p"+(parseInt(row1))+(parseInt(col1)-1).toString()).length > 0)
            {
                if($("#p"+(parseInt(row1))+(parseInt(col1)-1).toString()).children().length == 0)
                {
                    return false;
                }
                else if($("#p"+(parseInt(row1))+(parseInt(col1)-1).toString()).children().attr('id').charAt(0) != window.activeplayer.charAt(0))
                {
                    return false;
                }
            }
            if($("#p"+(parseInt(row1)+1)+col1).length > 0)
            {
                if($("#p"+(parseInt(row1)+1)+col1).children().length == 0)
                {
                    return false;
                }
                else if($("#p"+(parseInt(row1)+1)+col1).children().attr('id').charAt(0) != window.activeplayer.charAt(0))
                {
                return false;
                }
            }
            if($("#p"+(parseInt(row1)-1)+col1).length > 0)
            {
                if($("#p"+(parseInt(row1)-1)+col1).children().length == 0)
                {
                    return false;
                }
                else if($("#p"+(parseInt(row1)-1)+col1).children().attr('id').charAt(0) != window.activeplayer.charAt(0))
                {
                    return false;
                }
            }
            if($("#p"+(parseInt(row1)+1)+(parseInt(col1)+1).toString()).length > 0)
            {
                if($("#p"+(parseInt(row1)+1)+(parseInt(col1)+1).toString()).children().length == 0)
                {
                    return false;
                }
                else if($("#p"+(parseInt(row1)+1)+(parseInt(col1)+1).toString()).children().attr('id').charAt(0) != window.activeplayer.charAt(0))
                {
                return false;
                };
            }
            if($("#p"+(parseInt(row1)-1)+(parseInt(col1)+1).toString()).length > 0)
            {
                if($("#p"+(parseInt(row1)-1)+(parseInt(col1)+1).toString()).children().length == 0)
                {
                    return false;
                }
                else if($("#p"+(parseInt(row1)-1)+(parseInt(col1)+1).toString()).children().attr('id').charAt(0) != window.activeplayer.charAt(0))
                {
                    return false;
                }
            }
            if($("#p"+(parseInt(row1)-1)+(parseInt(col1)-1).toString()).length > 0)
            {
                if($("#p"+(parseInt(row1)-1)+(parseInt(col1)-1).toString()).children().length == 0)
                {
                    return false;
                }
                else if($("#p"+(parseInt(row1)-1)+(parseInt(col1)-1).toString()).children().attr('id').charAt(0) != window.activeplayer.charAt(0))
                {
                return false;
                }
            }
            if($("#p"+(parseInt(row1)+1)+(parseInt(col1)-1).toString()).length > 0)
            {
                if($("#p"+(parseInt(row1)+1)+(parseInt(col1)-1).toString()).children().length == 0)
                {
                    return false;
                }
                else if($("#p"+(parseInt(row1)+1)+(parseInt(col1)-1).toString()).children().attr('id').charAt(0) != window.activeplayer.charAt(0))
                {
                    return false;
                }
            }
        }
    }
    return true;
};
function knightstale()
{
    for(l = 1; l < 11; l++)
    {
        if($("#"+window.activeplayer+"knight"+l).length > 0 && $("#"+window.activeplayer+"knight"+l).parent().attr('id') != undefined)
        {
            row1 = $("#"+window.activeplayer+"knight"+l).parent().attr('id').charAt(1)
            col1 = $("#"+window.activeplayer+"knight"+l).parent().attr('id').charAt(2)
            if ($("#p"+((parseInt(row1)+2).toString()+(parseInt(col1)-1))).length > 0)
            {
                if($("#p"+((parseInt(row1)+2).toString()+(parseInt(col1)-1))).children().length == 0 ||$("#p"+((parseInt(row1)+2).toString()+(parseInt(col1)-1))).children().attr('id').charAt(0)!=window.activeplayer.charAt(0))
                {
                    return false;
                }
            }
            if ($("#p"+((parseInt(row1)+2).toString()+(parseInt(col1)+1))).length > 0)
            {
                if($("#p"+((parseInt(row1)+2).toString()+(parseInt(col1)+1))).children().length == 0 ||$("#p"+((parseInt(row1)+2).toString()+(parseInt(col1)+1))).children().attr('id').charAt(0)!=window.activeplayer.charAt(0))
                {
                    return false;
                }
            }
            if ($("#p"+((parseInt(row1)-2).toString()+(parseInt(col1)+1))).length > 0)
            {
                if($("#p"+((parseInt(row1)-2).toString()+(parseInt(col1)+1))).children().length == 0 ||$("#p"+((parseInt(row1)-2).toString()+(parseInt(col1)+1))).children().attr('id').charAt(0)!=window.activeplayer.charAt(0))
                {
                    return false;
                }
            }
            if ($("#p"+((parseInt(row1)-2).toString()+(parseInt(col1)-1))).length > 0)
            {
                if($("#p"+((parseInt(row1)-2).toString()+(parseInt(col1)-1))).children().length == 0 ||$("#p"+((parseInt(row1)-2).toString()+(parseInt(col1)-1))).children().attr('id').charAt(0)!=window.activeplayer.charAt(0))
                {
                    return false;
                }
            }
            if ($("#p"+((parseInt(row1)-1).toString()+(parseInt(col1)+2))).length > 0)
            {
                if($("#p"+((parseInt(row1)-1).toString()+(parseInt(col1)+2))).children().length == 0 ||$("#p"+((parseInt(row1)-1).toString()+(parseInt(col1)+2))).children().attr('id').charAt(0)!=window.activeplayer.charAt(0))
                {
                    return false;
                }
            }
            if ($("#p"+((parseInt(row1)+1).toString()+(parseInt(col1)+2))).length > 0)
            {
                if($("#p"+((parseInt(row1)+1).toString()+(parseInt(col1)+2))).children().length == 0 ||$("#p"+((parseInt(row1)+1).toString()+(parseInt(col1)+2))).children().attr('id').charAt(0)!=window.activeplayer.charAt(0))
                {
                    return false;
                }
            }
            if ($("#p"+((parseInt(row1)-1).toString()+(parseInt(col1)-2))).length > 0)
            {
                if($("#p"+((parseInt(row1)-1).toString()+(parseInt(col1)-2))).children().length == 0 ||$("#p"+((parseInt(row1)-1).toString()+(parseInt(col1)-2))).children().attr('id').charAt(0)!=window.activeplayer.charAt(0))
                {
                    return false;
                }
            }
            if ($("#p"+((parseInt(row1)-1).toString()+(parseInt(col1)+2))).length > 0)
            {
                if($("#p"+((parseInt(row1)-1).toString()+(parseInt(col1)+2))).children().length == 0 ||$("#p"+((parseInt(row1)-1).toString()+(parseInt(col1)+2))).children().attr('id').charAt(0)!=window.activeplayer.charAt(0))
                {
                    return false;
                }
            }
        }
    }
    return true;
};
function stalemate()
{
    if(pawnstale())
    {
        if(bishopstale())
        {
            if(rookstale())
            {
                if(queenstale())
                {
                    if(knightstale())
                    {
                        console.log("king")
                        kingposition = $("#"+window.activeplayer+"king").parent().attr('id');
                        rowk = kingposition.charAt(1);
                        colk = kingposition.charAt(2);
                        if(kingstale(rowk, colk))
                        {
                            return true;
                        }
                    }
                }
            }
        }
    }
    return false;
};
function verifymoveblack(attackedpiece, position2)
{
    attackedpiece = $("#"+position2).children().attr('id');
    $("#"+attackedpiece).prependTo("#yeet");
    $("#"+position2).empty();
    $("img").parent().css("background-color","");
    $("#"+window.piece).prependTo("#"+position2);
    if(checkifplayerisincheck($("#"+window.activeplayer+"king").parent().attr('id')))
    {
        $("#"+attackedpiece).prependTo("#"+position2);
        $("#"+window.piece).prependTo("#"+window.pos1);
        window.activeplayer = "black";
        $("#submitmove").html('black move');
    }
    else
    {
        checkforcheck(position2);
        window.activeplayer = "white";
        $("#submitmove").html('white move');
        logmove(window.piece[5]+window.pos1.substr(1,2)+window.piece[5]+position2.substr(1,2)+"XX")
        if(states.wcheck || states.bcheck)
        {
            if(checkformate())
            {
                updateratings("b", 1);
                window.activeplayer = [];
                $("#submitmove").html('Black wins');
            }
        }
        if (stalemate())
        {
            updateratings("b", 0.5);
            window.activeplayer = [];
            $("#submitmove").html('Stalemate');
        }
    }
};
function verifymovewhite(attackedpiece, position2)
{
    attackedpiece = $("#"+position2).children().attr('id');
    $("#"+attackedpiece).prependTo("#yeet")
    $("#"+position2).empty();
    $("img").parent().css("background-color","");
    $("#"+window.piece).prependTo("#"+position2);
    if(checkifplayerisincheck($("#"+window.activeplayer+"king").parent().attr('id')))
    {
        $("#"+attackedpiece).prependTo("#"+position2);
        $("#"+window.piece).prependTo("#"+window.pos1);
        window.activeplayer = "white";
        $("#submitmove").html('White move');
    }
    else
    {
        checkforcheck(position2);
        window.activeplayer = "black";
        $("#submitmove").html('Black move');
        logmove(window.piece[5]+window.pos1.substr(1,2)+window.piece[5]+position2.substr(1,2)+"XX")
        if(states.wcheck || states.bcheck)
        {
            if(checkformate())
            {
                updateratings("w", 1);
                window.activeplayer = [];
                $("#submitmove").html('White wins');
            }
        }
        if (stalemate())
        {
            updateratings("w", 0.5);
            window.activeplayer = [];
            $("#submitmove").html('Stalemate');
        }
    }
}
function moveknight(position2)
{
    if(position2 != undefined)
    {
        row1 = window.pos1.charAt(1);
        col1 = window.pos1.charAt(2);
        row2 = position2.charAt(1);
        col2 = position2.charAt(2);
        if(((row2 == row1 - 2)||(row1 == row2 - 2)) && ((col1 == col2 - 1) || (col2 == col1 - 1)) && window.activeplayer == "black")
        {
            verifymoveblack($("#"+position2).children().attr('id'), position2);
        }
        else if(((row2 == row1 - 2)||(row1 == row2 - 2)) && ((col1 == col2 - 1) || (col2 == col1 - 1)) && window.activeplayer == "white")
        {
            verifymovewhite($("#"+position2).children().attr('id'), position2)
        }
        else if(((row2 == row1 - 1)||(row1 == row2 - 1)) && ((col1 == col2 - 2) || (col2 == col1 - 2)) && window.activeplayer == "white")
        {
            verifymovewhite($("#"+position2).children().attr('id'), position2)
        }
        else if(((row2 == row1 - 1)||(row1 == row2 - 1)) && ((col1 == col2 - 2) || (col2 == col1 - 2)) && window.activeplayer == "black")
        {
           verifymoveblack($("#"+position2).children().attr('id'), position2)
        };
    };
};
function pawnmovecheck(row1, col1, row2, col2)
{
    if($("#p"+row2+col2).children().length > 0 && $("#p"+row2+col2).children().attr('id') != undefined)
    {
        if((row1 == row2 - 1) && window.activeplayer == "white" && ((col2 ==  col1 - 1) || (col1 == col2 - 1)) && $("#p"+row2+col2).children().attr('id').charAt(0) == "w")
        {
            return true;
        }
        else if((row2 == row1 - 1) && window.activeplayer == "black" && ((col2 ==  col1 - 1) || (col1 == col2 - 1)) && $("#p"+row2+col2).children().attr('id').charAt(0) == "b")
        {
            return true;
        }
        else
        {
        return false;
        }
    }
    else
    {
    return false;
    }
};
function knighmovecheck(row1, col1, row2, col2)
{
    if(((row2 == row1 - 2)||(row1 == row2 - 2)) && ((col1 == col2 - 1) || (col2 == col1 - 1)))
    {
        return true;
    }
    else if(((row2 == row1 - 1)||(row1 == row2 - 1)) && ((col1 == col2 - 2) || (col2 == col1 - 2)))
    {
        return true;
    }
    else
    {
    return false;
    }
};
function bishopmovecheck(row1, col1, row2, col2)
{
    bstop = false;
    if(Math.abs(row2 - row1) == Math.abs(col2 - col1))
    {
        if(row2 > row1 && col2 > col1)
        {
            j = parseInt(col1)  + 1;
            for(i = (parseInt(row1)+1); i < row2; i++)
            {
                check = checkempty(i , j)
                j++;
                if(!check)
                {
                    bstop = true;
                }
            }
        }
        if(row2 < row1 && col2 > col1)
        {
            j = parseInt(col1)  + 1;
            for(i = (parseInt(row1)-1); i > row2; i--)
            {
                check = checkempty(i , j)
                j++;
                if(!check)
                {
                    bstop = true;
                }
            }
        }
        if(row2 < row1 && col2 < col1)
        {
            j = parseInt(col1)  - 1;
            for(i = (parseInt(row1)-1); i > row2; i--)
            {
                check = checkempty(i , j)
                j--;
                if(!check)
                {
                    bstop = true;
                }
            }
        }
        if(row2 > row1 && col2 < col1)
        {
            j = parseInt(col1)  - 1;
            for(i = (parseInt(row1)+1); i < row2; i++)
            {
                check = checkempty(i , j)
                j--;
                if(!check)
                {
                    bstop = true;
                }
            }
        }
        if(bstop)
        {
        return false;
        }
        else
        {
            return true;
        }
    }
    else
    {
    return false;
    }
};
function movebishop(position2)
{
    if(position2 != undefined)
    {
        row1 = window.pos1.charAt(1);
        col1 = window.pos1.charAt(2);
        row2 = position2.charAt(1);
        col2 = position2.charAt(2);
        if(bishopmovecheck(row1, col1, row2, col2))
        {
            if(Math.abs(row2 - row1) == Math.abs(col2 - col1) && window.activeplayer == "white") 
            {
                verifymovewhite($("#"+position2).children().attr('id'), position2)
            }       
            else if (Math.abs(row2 - row1) == Math.abs(col2 - col1) && window.activeplayer == "black") 
            {
                verifymoveblack($("#"+position2).children().attr('id'), position2);
            }
        }
    }
};
function rookmovecheck(row1, col1, row2, col2)
{
    rstop = false;
    if(row2 == row1 || col2 == col1)
    {
        if(row2 == row1 && col2 > col1)
        {
            for(d = (parseInt(col1)+1); d < col2; d++)
            {
                check = checkempty(row1 , d)
                if(!check)
                {
                    rstop = true;
                }
            }
        }
        if(row2 == row1 && col2 < col1)
        {
            for(a = (parseInt(col2)+1); a < col1; a++)
            {
                check = checkempty(row1 , a)
                if(!check)
                {
                    rstop = true;
                }
            }
        }
        if(row2 < row1 && col2 == col1)
        {
            for(b = (parseInt(row2)+1); b < row1; b++)
            {
                check = checkempty(b , col1)
                if(!check)
                {
                    rstop = true;
                }
            }
        }
        if(row2 > row1 && col2 == col1)
        {
            for(c = (parseInt(row1)+1); c < row2; c++)
            {
                check = checkempty(c , col1)
                if(!check)
                {
                    rstop = true;
                }
            }
        }
        if(rstop)
        {
        return false;
        }
        else
        {
            return true;
        }
    }
    else 
    {
    return false;
    }
};
function moverook(position2)
{
    if(position2 != undefined)
    {
        row1 = window.pos1.charAt(1);
        col1 = window.pos1.charAt(2);
        row2 = position2.charAt(1);
        col2 = position2.charAt(2);
        if(rookmovecheck(row1, col1, row2, col2))
        {
            if((row2 == row1 || col2 == col1) && window.activeplayer == "white") 
            {
                attackedpiece = $("#"+position2).children().attr('id');
                $("#"+attackedpiece).prependTo('#yeet');
                $("#"+position2).empty();
                $("img").parent().css("background-color","");
                $("#"+window.piece).prependTo("#"+position2);
                if(checkifplayerisincheck($("#"+window.activeplayer+"king").parent().attr('id')))
                {
                    $("#"+attackedpiece).prependTo("#"+position2);
                    $("#"+window.piece).prependTo("#"+window.pos1);
                    window.activeplayer = "white";
                    $("#submitmove").html('White move');
                }
                else
                {
                    checkforcheck(position2);
                    window.activeplayer = "black";
                    $("#submitmove").html('Black move');
                    if(states.wcheck || states.bcheck)
                    {
                        if(checkformate())
                        {
                            updateratings("w", 1);
                            window.activeplayer = [];
                            $("#submitmove").html('White wins');
                        }
                    }
                    if (stalemate())
                    {
                        updateratings("b", 0.5);
                        window.activeplayer = [];
                        $("#submitmove").html('Stalemate');
                    }
                    if(row1 == 8 && col1 == 1)
                    {
                        states.wrook1move = true;
                    }
                    if(row1 == 8 && col1 == 8)
                    {
                        states.wrook2move = true;
                    }
                }
            }       
            else if ((row2 == row1 || col2 == col1) && window.activeplayer == "black") 
            {
                attackedpiece = $("#"+position2).children().attr('id');
                $("#"+attackedpiece).prependTo('#yeet');
                $("#"+position2).empty();
                $("img").parent().css("background-color","");
                $("#"+window.piece).prependTo("#"+position2);
                if(checkifplayerisincheck($("#"+window.activeplayer+"king").parent().attr('id')))
                {
                    $("#"+attackedpiece).prependTo("#"+position2);
                    $("#"+window.piece).prependTo("#"+window.pos1);
                    window.activeplayer = "black";
                    $("#submitmove").html('Black move');
                }
                else
                {
                    checkforcheck(position2);
                    window.activeplayer = "white";
                    $("#submitmove").html('White move');
                    logmove(window.piece[5]+window.pos1.substr(1,2)+window.piece[5]+position2.substr(1,2)+"XX")
                    if(states.wcheck || states.bcheck)
                    {
                        if(checkformate())
                        {
                            updateratings("b", 1);
                            window.activeplayer = [];
                            $("#submitmove").html('Black wins');
                        }
                    }
                    if (stalemate())
                    {
                        updateratings("b", 0.5);
                        window.activeplayer = [];
                        $("#submitmove").html('Stalemate');
                    }
                    if(row1 == 1 && col1 == 1)
                    {
                        states.brook1move = true;
                    }
                    if(row1 == 1 && col1 == 8)
                    {
                        states.brook2move = true;
                    }
                }
            }
        }
    }
};
// returns false if not empty 
function checkempty(x, y)
{
    if($("#p"+x+y).children().length > 0)
    {
        if($("#p"+x+y).children().attr('id').indexOf("king") != -1 && window.piece.charAt(0) != $("#p"+x+y).children().attr('id').charAt(0))
        {
            return true;
        }
        else
        {
        return false;
        }
    }
    else
    {
        return true;
    }
};
function movepawn(position2)
{
    if(position2 != undefined)
    {
        row1 = window.pos1.charAt(1);
        col1 = window.pos1.charAt(2);
        row2 = position2.charAt(1);
        col2 = position2.charAt(2);
        if(((row2 == row1 - 2) && (col1 == col2) && row1 == 7 && window.activeplayer == "white") || ((row1 == row2 - 2) && (col1 == col2) && row1 == 2 && window.activeplayer == "black"))
        {
            if (($("#p"+(row1-1)+col1).children().length == 0) && ($("#p" + row2 + col2).children().length == 0) && window.activeplayer == "white")
            {
                verifymovewhite($("#"+position2).children().attr('id'), position2)
            }
            else if (($("#p"+(row1+1)+col1).children().length == 0) && ($("#p" + row2 + col2).children().length == 0) && window.activeplayer == "black")
            {
                verifymoveblack($("#"+position2).children().attr('id'), position2)
            }
        }
        else if((row2 == row1 - 1) && (col1 == col2) && window.activeplayer == "white")
        {
            if (($("#p"+(row1+1)+col1).children().length == 0) && ($("#p" + row2 + col2).children().length == 0) && row2 != 1)
            {
                verifymovewhite($("#"+position2).children().attr('id'), position2)
            }
            else if(($("#p"+(row1+1)+col1).children().length == 0) && ($("#p" + row2 + col2).children().length == 0) && row2 == 1)
            {
                whitequeenmove($("#"+position2).children().attr('id'), position2, $("#p"+(row1)+col1).children().attr('id'));
            }
        }
        else if((row1 ==  row2 - 1) && (col1 == col2) && window.activeplayer == "black")
        {
            if (($("#p"+(row1+1)+col1).children().length == 0) && ($("#p" + row2 + col2).children().length == 0) && row2 != 8)
            {
                verifymoveblack($("#"+position2).children().attr('id'), position2)
            }
            else if(($("#p"+(row1+1)+col1).children().length == 0) && ($("#p" + row2 + col2).children().length == 0) && row2 == 8)
            {
                blackqueenmove($("#"+position2).children().attr('id'), position2, $("#p"+(row1)+col1).children().attr('id'));
            }
        }
        else if(((row2 == row1 - 1)) && window.activeplayer == "white" && ((col2 ==  col1 - 1) || (col1 == col2 - 1)))
        {
            if (($("#p"+(row2)+col2).children().attr('id').charAt(0) == 'b') && row2 == 1)
            {
                whitequeenmove($("#"+position2).children().attr('id'), position2, $("#p"+(row1)+col1).children().attr('id'))
            }
            else if (($("#p"+(row2)+col2).children().attr('id').charAt(0) == 'b'))
            {
                verifymovewhite($("#"+position2).children().attr('id'), position2)
            }
        }
        else if(((row1 == row2 - 1)) && window.activeplayer == "black" && ((col2 ==  col1 - 1) || (col1 == col2 - 1)))
        {
            if (($("#p"+(row2)+col2).children().attr('id').charAt(0) == 'w') && row2 == 8)
            {
                blackqueenmove($("#"+position2).children().attr('id'), position2, $("#p"+(row1)+col1).children().attr('id'))
            }
            else if (($("#p"+(row2)+col2).children().attr('id').charAt(0) == 'w'))
            {
                verifymoveblack($("#"+position2).children().attr('id'), position2)
            }
        };
    }
};
function kingmovecheck(row1, col1, row2, col2)
{
    if((row2 == row1 || row1 == row2 - 1 || row2 == row1 - 1) && (col2 == col1 || col1 == col2 - 1 || col2 == col1- 1))
    {
        return true;
    }
    else
    {
    return false;
    }
};
function moveking(position2)
{
    if(position2 != undefined)
    {
        row1 = window.pos1.charAt(1);
        col1 = window.pos1.charAt(2);
        row2 = position2.charAt(1);
        col2 = position2.charAt(2);
        if((row2 == row1 || row1 == row2 - 1 || row2 == row1 - 1) && (col2 == col1 || col1 == col2 - 1 || col2 == col1- 1) && window.activeplayer == "white")
        {
            attackedpiece = $("#"+position2).children().attr('id');
            attackedpiece = $("#"+position2).children().attr('id');
            $("#"+attackedpiece).prependTo('#yeet');
            $("img").parent().css("background-color","");
            $("#"+position2).empty();
            $("#"+window.piece).prependTo("#"+position2);
            if(checkifplayerisincheck($("#"+window.activeplayer+"king").parent().attr('id')))
            {
                $("#"+attackedpiece).prependTo("#"+position2);
                $("#"+window.piece).prependTo("#"+window.pos1);
                window.activeplayer = "white";
                $("#submitmove").html('White move');
            }
            else
            {
                states.wkingmove = true;
                window.activeplayer = "black";
                $("#submitmove").html('Black move');
                logmove(window.piece[5]+window.pos1.substr(1,2)+window.piece[5]+position2.substr(1,2)+"XX")
            }
        }
        else if((row2 == row1 || row1 == row2 - 1 || row2 == row1 - 1) && (col2 == col1 || col1 == col2 - 1 || col2 == col1- 1) && window.activeplayer == "black")
        {
            attackedpiece = $("#"+position2).children().attr('id');
            $("#"+attackedpiece).prependTo('#yeet');
            $("#"+position2).empty();
            $("img").parent().css("background-color","");
            $("#"+window.piece).prependTo("#"+position2);
            if(checkifplayerisincheck($("#"+window.activeplayer+"king").parent().attr('id')))
            {
                $("#"+attackedpiece).prependTo("#"+position2);
                $("#"+window.piece).prependTo("#"+window.pos1);
                window.activeplayer = "black";
                $("#submitmove").html('black move');
            }
            else
            {
                window.activeplayer = "white";
                $("#submitmove").html('white move');
                states.bkingmove = true;
                logmove(window.piece[5]+window.pos1.substr(1,2)+window.piece[5]+position2.substr(1,2)+"XX")
            }
        }
        else if (window.activeplayer == "white" && row2 == 8 && col2 == 3 && !states.wkingmove && !states.wrook1move && !states.wcheck)
        {
            stop = false;
            for(i = 2; i < 5; i++)
            {
                if(!checkempty(8, i))
                {
                    stop = true;
                }
            }
            if(!stop)
            {
                attackedpiece = $("#"+position2).children().attr('id');
                $("#"+attackedpiece).prependTo('#yeet');
                $("#"+position2).empty();
                $("img").parent().css("background-color","");
                $("#"+window.piece).prependTo("#"+position2);
                if(checkifplayerisincheck($("#"+window.activeplayer+"king").parent().attr('id')))
                {
                    $("#"+attackedpiece).prependTo("#"+position2);
                    $("#"+window.piece).prependTo("#"+window.pos1);
                    window.activeplayer = "white";
                    $("#submitmove").html('white move');
                }
                else
                {
                    window.activeplayer = "black";
                    $("#submitmove").html('black move');
                    $("#whiterook1").prependTo("#p84")
                    logmove(window.piece[5]+window.pos1.substr(1,2)+"C"+window.piece[5]+position2.substr(1,2)+"X")
                    states.wkingmove = true;
                }
            }
        }
        else if (window.activeplayer == "white" && row2 == 8 && col2 == 7 && !states.wkingmove && !states.wrook2move && !states.wcheck)
        {
            stop = false;
            for(i = 6; i < 8; i++)
            {
                if(!checkempty(8, i))
                {
                    stop = true;
                }
            }
            if(!stop)
            {
                attackedpiece = $("#"+position2).children().attr('id');
                $("#"+attackedpiece).prependTo('#yeet');
                $("#"+position2).empty();
                $("img").parent().css("background-color","");
                $("#"+window.piece).prependTo("#"+position2);
                if(checkifplayerisincheck($("#"+window.activeplayer+"king").parent().attr('id')))
                {
                    $("#"+attackedpiece).prependTo("#"+position2);
                    $("#"+window.piece).prependTo("#"+window.pos1);
                    window.activeplayer = "white";
                    $("#submitmove").html('white move');
                }
                else
                {
                    window.activeplayer = "black";
                    $("#submitmove").html('black move');
                    states.wkingmove = true;
                    logmove(window.piece[5]+window.pos1.substr(1,2)+"C"+window.piece[5]+position2.substr(1,2)+"X")
                    $("#whiterook2").prependTo("#p86")
                }
            }
        }
        else if (window.activeplayer == "black" && row2 == 1 && col2 == 7 && !states.bkingmove && !states.brook2move && !states.bcheck)
        {
            stop = false;
            for(i = 6; i < 8; i++)
            {
                if(!checkempty(1, i))
                {
                    stop = true;
                }
            }
            if(!stop)
            {
                attackedpiece = $("#"+position2).children().attr('id');
                $("#"+attackedpiece).prependTo('#yeet');
                $("#"+position2).empty();
                $("img").parent().css("background-color","");
                $("#"+window.piece).prependTo("#"+position2);
                if(checkifplayerisincheck($("#"+window.activeplayer+"king").parent().attr('id')))
                {
                    $("#"+attackedpiece).prependTo("#"+position2);
                    $("#"+window.piece).prependTo("#"+window.pos1);
                    window.activeplayer = "black";
                    $("#submitmove").html('black move');
                }
                else
                {
                    window.activeplayer = "white";
                    $("#submitmove").html('white move');
                    states.bkingmove = true;
                    logmove(window.piece[5]+window.pos1.substr(1,2)+"C"+window.piece[5]+position2.substr(1,2)+"X")
                    $("#blackrook2").prependTo("#p16")
                }
            }
        }
        else if (window.activeplayer == "black" && row2 == 1 && col2 == 3 && !states.bkingmove && !states.brook1move && !states.bcheck)
        {
            stop = false;
            for(i = 2; i < 5; i++)
            {
                if(!checkempty(1, i))
                {
                    stop = true;
                }
            }
            if(!stop)
            {
                attackedpiece = $("#"+position2).children().attr('id');
                $("#"+attackedpiece).prependTo('#yeet');
                $("#"+position2).empty();
                $("img").parent().css("background-color","");
                $("#"+window.piece).prependTo("#"+position2);
                if(checkifplayerisincheck($("#"+window.activeplayer+"king").parent().attr('id')))
                {
                    $("#"+attackedpiece).prependTo("#"+position2);
                    $("#"+window.piece).prependTo("#"+window.pos1);
                    window.activeplayer = "black";
                    $("#submitmove").html('black move');
                }
                else
                {
                    window.activeplayer = "white";
                    $("#submitmove").html('white move');
                    states.bkingmove = true;
                    logmove(window.piece[5]+window.pos1.substr(1,2)+"C"+window.piece[5]+position2.substr(1,2)+"X")
                    $("#blackrook1").prependTo("#p14")
                }
            }
        }
    }
};
function checkforcheck(position)
{
    check = false;
    if(window.activeplayer == "black")
    {
        kingpos = $("#whiteking").parent().attr('id')
    }
    else if(window.activeplayer == "white")
    {
        kingpos = $("#blackking").parent().attr('id')

    }
    row1 = position.charAt(1);
    col1 = position.charAt(2);
    row2 = kingpos.charAt(1);
    col2 = kingpos.charAt(2);
    if(window.piece.indexOf("knight")!= -1)
    {
        if(knighmovecheck(row1, col1, row2, col2))
        {
            check = true;
        }
    }
    else if (window.piece.indexOf("bishop")!= -1)
    {
        if(bishopmovecheck(row1, col1, row2, col2))
        {
            check = true;
        }
    }
    else if (window.piece.indexOf("queen")!= -1)
    {
        if(bishopmovecheck(row1, col1, row2, col2) || rookmovecheck(row1, col1, row2, col2))
        {
            check = true;
        }
    }
    else if (window.piece.indexOf("pawn")!= -1)
    {
        if(pawnmovecheck(row1, col1, row2, col2))
        {
            check = true;
        }
    }
    else if (window.piece.indexOf("rook")!= -1)
    {
        if(rookmovecheck(row1, col1, row2, col2))
        {
            check = true;
        }
    };
    if(check && window.activeplayer == "white")
    {
        states.bcheck = true;
    }
    else if(check && window.activeplayer == "black")
    {
        states.wcheck = true;
    }
    else
    {
        states.bcheck = false;
        states.wcheck = false;
    }
};
function checkifplayerisincheck(kingpos)
{
    if(window.activeplayer == "white")
    {
        str = "black";
    }
    else
    {
        str = "white";
    }
    row2 = kingpos.charAt(1);
    col2 = kingpos.charAt(2);
    stopper = false;
    for(i = 1; i < 9; i++)
    {
        if($("#"+str+"pawn"+i).length > 0)
        {
            row1 = $("#"+str+"pawn"+i).parent().attr('id').charAt(1)
            col1 = $("#"+str+"pawn"+i).parent().attr('id').charAt(2)
            if(pawnmovecheck(row1, col1, row2, col2))
            {
                stopper = true;
            };
        }
    }
    for(j = 1; j < 11; j++)
    {
        if($("#"+str+"bishop"+j).length > 0 && $("#"+str+"bishop"+j).parent().attr('id')!= undefined)
        {
            row1 = $("#"+str+"bishop"+j).parent().attr('id').charAt(1)
            col1 = $("#"+str+"bishop"+j).parent().attr('id').charAt(2)
            if(bishopmovecheck(row1, col1, row2, col2))
            {
                stopper = true;
            };
        }
    }
    for(q = 1; q < 11; q++)
    {
        if($("#"+str+"queen"+q).length > 0 && $("#"+str+"queen"+q).parent().attr('id') != undefined)
        {
            row1 = $("#"+str+"queen"+q).parent().attr('id').charAt(1)
            col1 = $("#"+str+"queen"+q).parent().attr('id').charAt(2)
            if(bishopmovecheck(row1, col1, row2, col2) || rookmovecheck(row1, col1, row2, col2))
            {
                stopper = true;
            };
        };
    }
    if($("#"+str+"king").length > 0)
    {
        row1 = $("#"+str+"king").parent().attr('id').charAt(1)
        col1 = $("#"+str+"king").parent().attr('id').charAt(2)
        if(kingmovecheck(row1, col1, row2, col2))
        {
            stopper = true;
        }
    }
    for(k = 1; k < 11; k++)
    {
        if($("#"+str+"rook"+k).length > 0 && $("#"+str+"rook"+k).parent().attr('id') != undefined)
        {
            row1 = $("#"+str+"rook"+k).parent().attr('id').charAt(1)
            col1 = $("#"+str+"rook"+k).parent().attr('id').charAt(2)
            if(rookmovecheck(row1, col1, row2, col2))
            {
                stopper = true;
            };
        }
    }
    for(l = 1; l < 11; l++)
    {
        if($("#"+str+"knight"+l).length > 0 && $("#"+str+"knight"+l).parent().attr('id') != undefined)
        {
            row1 = $("#"+str+"knight"+l).parent().attr('id').charAt(1)
            col1 = $("#"+str+"knight"+l).parent().attr('id').charAt(2)
            if(knighmovecheck(row1, col1, row2, col2))
            {
                stopper = true;
            };
        }
    }
    if(!stopper)
    {
    return false;
    }
    else 
    {
        return true;
    };
};
// returns true if in check
function scanthroughchecks(str, row2, col2, bool)
{
    stopit = false;
    for(i = 1; i < 9; i++)
    {
        if($("#"+str+"pawn"+i).length > 0 && $("#"+str+"pawn"+i).parent().attr('id') != 'yeet')
        {
            row1 = $("#"+str+"pawn"+i).parent().attr('id').charAt(1)
            col1 = $("#"+str+"pawn"+i).parent().attr('id').charAt(2)
            if(pawnmovecheck(row1, col1, row2, col2))
            {
                stopit = true;
            };
        }
    }
    for(z = 1; z < 11; z++)
    {
        if($("#"+str+"bishop"+z).parent().attr('id') != undefined && $("#"+str+"bishop"+j).parent().attr('id') != 'yeet')
        {
            row1 = $("#"+str+"bishop"+z).parent().attr('id').charAt(1)
            col1 = $("#"+str+"bishop"+z).parent().attr('id').charAt(2)
            if(bishopmovecheck(row1, col1, row2, col2))
            {
                stopit = true;
            };
        }
    }
    for(x = 1; x<11; x++)
    {
        if($("#"+str+"queen"+x).parent().attr('id') != undefined && $("#"+str+"queen"+x).parent().attr('id') != 'yeet')
        {
            row1 = $("#"+str+"queen"+x).parent().attr('id').charAt(1)
            col1 = $("#"+str+"queen"+x).parent().attr('id').charAt(2)
            if(bishopmovecheck(row1, col1, row2, col2) || rookmovecheck(row1, col1, row2, col2))
            {
                stopit = true;
            };
        };
    };
    if(bool)
    {
        if($("#"+str+"king").length > 0)
        {
            row1 = $("#"+str+"king").parent().attr('id').charAt(1)
            col1 = $("#"+str+"king").parent().attr('id').charAt(2)
            if(kingmovecheck(row1, col1, row2, col2))
            {
                stopit = true;
            }
        }
    }
    for(k = 1; k < 11; k++)
    {
        if($("#"+str+"rook"+k).parent().attr('id') != undefined && $("#"+str+"rook"+k).parent().attr('id') != 'yeet')
        {
            row1 = $("#"+str+"rook"+k).parent().attr('id').charAt(1)
            col1 = $("#"+str+"rook"+k).parent().attr('id').charAt(2)
            if(rookmovecheck(row1, col1, row2, col2))
            {
                stopit = true;
            };
        }
    }
    for(l = 1; l < 11; l++)
    {
        if($("#"+str+"knight"+l).parent().attr('id') != undefined && $("#"+str+"knight"+l).parent().attr('id') != 'yeet')
        {
            row1 = $("#"+str+"knight"+l).parent().attr('id').charAt(1)
            col1 = $("#"+str+"knight"+l).parent().attr('id').charAt(2)
            if(knighmovecheck(row1, col1, row2, col2))
            {
                stopit = true;
            };
        }
    }
    return stopit;
}
function checkforblocks(str, row2, col2)
{
    delimeter = false;
    for(i = 1; i < 9; i++)
    {
        if($("#"+str+"pawn"+i).length > 0)
        {
            row1 = $("#"+str+"pawn"+i).parent().attr('id').charAt(1)
            col1 = $("#"+str+"pawn"+i).parent().attr('id').charAt(2)
            if(pawnmovecheck(row1, col1, row2, col2) && !delimeter)
            {
                delimeter = true;
                if(scanthroughchecks(window.activeplayer, row1, col1, false))
                {
                    delimeter = false;
                }
            };
        };
    };
    for(x = 1; x < 11; x++)
    {
        if($("#"+str+"bishop"+x).parent().attr('id') != undefined)
        {
            row1 = $("#"+str+"bishop"+x).parent().attr('id').charAt(1)
            col1 = $("#"+str+"bishop"+x).parent().attr('id').charAt(2)

            if(bishopmovecheck(row1, col1, row2, col2) && !delimeter)
            {
                if(row2 > row1 && col2 > col1)
                {
                    delimeter = true;
                    j = parseInt(col1);
                    for(bi = (parseInt(row1)); bi < row2; bi++)
                    {
                        if(scanthroughchecks(window.activeplayer, bi, j, false))
                        {
                            delimeter = false;
                        }
                        j++;
                    }
                }
                else if(row2 < row1 && col2 > col1)
                {
                    je = parseInt(col1);
                    delimeter = true;
                    for(bis = (parseInt(row1)); bis > row2; bis--)
                    {
                        if(scanthroughchecks(window.activeplayer, bis, je, false))
                        {
                            delimeter = false;
                        }
                        je = parseInt(je)+1;
                    }
                }
                if(row2 < row1 && col2 < col1)
                {
                    j = parseInt(col1);
                    delimeter = true;
                    for(bish = (parseInt(row1)); bish > row2; bish--)
                    {
                        if(scanthroughchecks(window.activeplayer, bish, j, false))
                        {
                            delimeter = false;
                        }
                        j--;
                    }
                }
                else if(row2 > row1 && col2 < col1)
                {
                    j = parseInt(col1);
                    delimeter = true;
                    for(bisho = (parseInt(row1)); bisho > row2; bisho++)
                    {
                        if(scanthroughchecks(window.activeplayer, bisho, j, false))
                        {
                            delimeter = false;
                        }
                        j--;
                    }
                }
            };
        }
    }
    for(q1 = 1; q1< 11; q1++)
        if($("#"+str+"queen"+q1).parent().attr('id') != undefined)
        {
            row1 = $("#"+str+"queen"+q1).parent().attr('id').charAt(1)
            col1 = $("#"+str+"queen"+q1).parent().attr('id').charAt(2)
            if(bishopmovecheck(row1, col1, row2, col2) && !delimeter)
            {
                if(row2 > row1 && col2 > col1)
                {
                    delimeter = true;
                    qc = parseInt(col1);
                    for(q = (parseInt(row1)); q < row2; q++)
                    {
                        if(scanthroughchecks(window.activeplayer, q, qc, false))
                        {
                            delimeter = false;
                        }
                        qc++;
                    }
                }
                else if(row2 < row1 && col2 > col1)
                {
                    qc1 = parseInt(col1);
                    delimeter = true;
                    for(q2 = (parseInt(row1)); q2 > row2; q2--)
                    {
                        if(scanthroughchecks(window.activeplayer, q2, qc1, false))
                        {
                            delimeter = false;
                        }
                        qc1++;
                    }
                }
                else if(row2 < row1 && col2 < col1)
                {
                    qc2 = parseInt(col1);
                    delimeter = true;
                    for(q3 = (parseInt(row1)); q3 > row2; q3--)
                    {
                        if(scanthroughchecks(window.activeplayer, q3, qc2, false))
                        {
                            delimeter = false;
                        }
                        qc2--;
                    }
                }
                else if(row2 > row1 && col2 < col1)
                {
                    qc4 = parseInt(col1);
                    delimeter = true;
                    for(q5 = (parseInt(row1)); q5 > row2; q5++)
                    {
                        if(scanthroughchecks(window.activeplayer, q5, qc4, false))
                        {
                            delimeter = false;
                        }
                        qc4--;
                    }
                }
            };
            if(rookmovecheck(row1, col1, row2, col2))
            {
                delimeter = true;
                if(row2 == row1 && col2 > col1)
                {
                    for(d = (parseInt(col1)); d < col2; d++)
                    {
                        if(scanthroughchecks(window.activeplayer, row1, d, false))
                        {

                            delimeter = false;
                        }
                    }
                }
                else if (row2 == row1 && col2 < col1)
                {
                    for(u = (parseInt(col1)); u > col2; u--)
                    {
                        if(scanthroughchecks(window.activeplayer, row1, u, false))
                        {
                            delimeter = false;
                        }
                    }
                }
                else if (row2 < row1 && col2 == col1)
                {
                    for(b = (parseInt(row2)); b < row1; b++)
                    {
                        if(scanthroughchecks(window.activeplayer, b, col1, false))
                        {
                            delimeter = false;
                        }
                    }
                }
                else if(row2 > row1 && col2 == col1)
                {
                    for(c = (parseInt(row1)); c < row2; c++)
                    {
                        if(scanthroughchecks(window.activeplayer, c, col1, false))
                        {
                            delimeter = false;
                        }
                    }
                }   
            }
        };
    for(k = 1; k < 11; k++)
    {
        if($("#"+str+"rook"+k).parent().attr('id') != undefined)
        {
            row1 = $("#"+str+"rook"+k).parent().attr('id').charAt(1)
            col1 = $("#"+str+"rook"+k).parent().attr('id').charAt(2)
            if(rookmovecheck(row1, col1, row2, col2) && !delimeter)
            {
                delimeter = true;
                if(row2 == row1 && col2 > col1)
                {
                    for(r = (parseInt(col1)); r < col2; r++)
                    {
                        if(scanthroughchecks(window.activeplayer, row1, r, false))
                        {
                            delimeter = false;
                        }
                    }
                }
                else if(row2 == row1 && col2 < col1)
                {
                    for(a = (parseInt(col2)); a < col1; a++)
                    {
                        if(scanthroughchecks(window.activeplayer, row1, a, false))
                        {
                            delimeter = false;
                        }
                    }
                }
                else if(row2 < row1 && col2 == col1)
                {
                    for(b = (parseInt(row2)); b < row1; b++)
                    {
                        if(scanthroughchecks(window.activeplayer, b, col1, false))
                        {
                            delimeter = false;
                        }
                    }
                }
                else if(row2 > row1 && col2 == col1)
                {
                    for(c = (parseInt(row1)); c < row2; c++)
                    {
                        if(scanthroughchecks(window.activeplayer, c, col1, false))
                        {
                            delimeter = false;
                        }
                    }
                }   
            }
        };
    }
    for(l = 1; l < 11; l++)
    {
        if($("#"+str+"knight"+l).parent().attr('id') != undefined)
        {
            row1 = $("#"+str+"knight"+l).parent().attr('id').charAt(1)
            col1 = $("#"+str+"knight"+l).parent().attr('id').charAt(2)
            if(knighmovecheck(row1, col1, row2, col2))
            {
                delimeter = true;
                if(scanthroughchecks(window.activeplayer, row1, col1, false))
                {
                    delimeter = false;
                }
            };
        }
    }
    return delimeter;
}
$("div").click(function(event)
{
    console.log(game.activeuser);
    console.log(game.moves);
    event.preventDefault();
    event.stopPropagation();
    //check if player is in check
    if((event.target.id).indexOf("p")==0)
    {
        if((window.piece).indexOf("pawn")==5)
        {
            movepawn(event.target.id);
        }
        if((window.piece).indexOf("bishop")==5)
        {
            movebishop(event.target.id);
        }
        if((window.piece).indexOf("queen")==5)
        {
            movebishop(event.target.id)
            moverook(event.target.id)
        }
        if((window.piece).indexOf("king")==5)
        {
            moveking(event.target.id)
        }
        if((window.piece).indexOf("rook")==5)
        {
            moverook(event.target.id)
        }
        if((window.piece).indexOf("knight")==5)
        {
            moveknight(event.target.id);
        }
    }
});
 $("img").click(function(event)
{
    event.stopPropagation();
    if($("img").parent().css("background-color") != "blue" && (event.target.id).indexOf(window.activeplayer)!=-1 && (event.target.id)[0] == game.activeuser[0])
    {
        $("img").parent().css("background-color","");
        $("#"+event.target.id).parent().css("background-color","blue");
        window.pos1 = $("#"+event.target.id).parent().attr("id"); 
        window.piece = (event.target.id)
    }
    else if((event.target.id).indexOf(window.activeplayer)==-1)
    {
    cancel = true;
        for(row = 1; row < 9; row++)
        {
            for(col = 1; col < 9; col++)
            {
                if($("#p"+row+col).css("background-color") == "rgb(0, 0, 255)")
                {
                    cancel = false;
                }
            }
        }
        if(!cancel)
        {
            if((window.piece).indexOf("pawn")==5)
            {
                movepawn($("#"+event.target.id).parent().attr('id'));
            }
            if((window.piece).indexOf("bishop")==5)
            {
                if((event.target.id).indexOf(window.activeplayer)==-1)
                {
                movebishop($("#"+event.target.id).parent().attr('id'))
                }
            }
            if((window.piece).indexOf("queen")==5)
            {
                if((event.target.id).indexOf(window.activeplayer)==-1)
                {
                movebishop($("#"+event.target.id).parent().attr('id'))
                moverook($("#"+event.target.id).parent().attr('id'))
                }
            }
            if((window.piece).indexOf("king")==5)
            {
                moveking($("#"+event.target.id).parent().attr('id'))
            }
            if((window.piece).indexOf("rook")==5)
            {
                if((event.target.id).indexOf(window.activeplayer)==-1)
                {
                moverook($("#"+event.target.id).parent().attr('id'))
                }
            }
            if((window.piece).indexOf("knight")==5)
            {
                if((event.target.id).indexOf(window.activeplayer)==-1)
                {
                    moveknight($("#"+event.target.id).parent().attr('id'))

                }
            }
        }
    }
});