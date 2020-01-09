var states = {
    wkingmove: false,
    bkingmove: false,
    wrook1move: false,
    wrook2move: false,
    brook2move: false,
    brook1move: false
}
$("#submitmove").hide();
$("#Rungame").click(function(){

    $("#Rungame").hide();
    $("#submitmove").show();
    $("#submitmove").html('White move');
    window.activeplayer = "white";
});
function verifymoveblack(attackedpiece, position2)
{
    attackedpiece = $("#"+position2).children().attr('id');
    $("#"+attackedpiece).remove();
    console.log(attackedpiece)
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
        $("#"+window.piece).prependTo("#p"+row1+col1)
        $("#"+position2).empty();
        $("#"+window.piece).prependTo("#"+position2);
        window.activeplayer = "white";
        $("#submitmove").html('white move');
    }
};
function verifymovewhite(attackedpiece, position2)
{
    attackedpiece = $("#"+position2).children().attr('id');
    $("#"+attackedpiece).remove();
    console.log(attackedpiece)
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
        $("#"+window.piece).prependTo("#p"+row1+col1)
        $("#"+position2).empty();
        $("#"+window.piece).prependTo("#"+position2);
        window.activeplayer = "black";
        $("#submitmove").html('Black move');
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
        console.log(row1 + col1);
        console.log(row2 + col2);
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
    if((row1 == row2 - 1) && window.activeplayer == "white" && ((col2 ==  col1 - 1) || (col1 == col2 - 1)))
    {
        return true;
    }
    else if(((row2 == row1 - 1)) && window.activeplayer == "black" && ((col2 ==  col1 - 1) || (col1 == col2 - 1)))
    {
        return true;
    }
    else
    {
        console.log("Yeee")
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
                    console.log("da")
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
                    console.log("day")
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
                    console.log("d")
                    bstop = true;
                }
            }
        }
        if(row2 > row1 && col2 < col1)
        {
            j = parseInt(col1)  - 1;
            for(i = (parseInt(row1)+1); i > row2; i++)
            {
                check = checkempty(i , j)
                j--;
                if(!check)
                {
                    console.log("a")
                    bstop = true;
                }
            }
        }
        if(bstop)
        {
            console.log("aye")
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
            console.log("buttfuck");
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
    console.log("ckak")
    console.log(row1+col1);
    console.log(row2+col2);
    rstop = false;
    if(row2 == row1 || col2 == col1)
    {
        if(row2 == row1 && col2 > col1)
        {
            for(d = (parseInt(col1)+1); d < col2; d++)
            {
                check = checkempty(row1 , d)
                console.log("fuckak")
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
                console.log("fuckcak")
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
            console.log("say")
            return true;
        }
    }
    else 
    {
        console.log("hello");
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
                $("#"+attackedpiece).remove();
                console.log(attackedpiece)
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
                    $("#"+window.piece).prependTo("#p"+row1+col1)
                    $("#"+position2).empty();
                    $("#"+window.piece).prependTo("#"+position2);
                    window.activeplayer = "black";
                    $("#submitmove").html('Black move');
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
                    $("#"+window.piece).prependTo("#p"+row1+col1)
                    $("#"+position2).empty();
                    $("#"+window.piece).prependTo("#"+position2);
                    window.activeplayer = "white";
                    $("#submitmove").html('White move');
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
        return false;
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
        console.log(row1 + col1);
        console.log(row2 + col2);
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
            if (($("#p"+(row1-1)+col1).children().length == 0) && ($("#p" + row2 + col2).children().length == 0))
            {
                verifymovewhite($("#"+position2).children().attr('id'), position2)
            }
        }
        else if((row1 ==  row2 - 1) && (col1 == col2) && window.activeplayer == "black")
        {
            console.log("hey");
            if (($("#p"+(row1+1)+col1).children().length == 0) && ($("#p" + row2 + col2).children().length == 0))
            {
                verifymoveblack($("#"+position2).children().attr('id'), position2)
            }
        }
        else if(((row2 == row1 - 1)) && window.activeplayer == "white" && ((col2 ==  col1 - 1) || (col1 == col2 - 1)))
        {
            console.log("hey");
            console.log($("#p"+(row2)+col2).children().attr('id'))
            if (($("#p"+(row2)+col2).children().attr('id').charAt(0) == 'b'))
            {
                verifymovewhite($("#"+position2).children().attr('id'), position2)
            }
        }
        else if(((row2 == row1 - 1)) && window.activeplayer == "white" && ((col2 ==  col1 - 1) || (col1 == col2 - 1)))
        {
            console.log("hey");
            console.log($("#p"+(row2)+col2).children().attr('id'))
            if (($("#p"+(row2)+col2).children().attr('id').charAt(0) == 'b'))
            {
                verifymovewhite($("#"+position2).children().attr('id'), position2)
            }
        }
        else if(((row1 == row2 - 1)) && window.activeplayer == "black" && ((col2 ==  col1 - 1) || (col1 == col2 - 1)))
        {
            console.log("hey");
            console.log($("#p"+(row2)+col2).children().attr('id'))
            if (($("#p"+(row2)+col2).children().attr('id').charAt(0) == 'w'))
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
        console.log(row1 + col1);
        console.log(row2 + col2);
        if((row2 == row1 || row1 == row2 - 1 || row2 == row1 - 1) && (col2 == col1 || col1 == col2 - 1 || col2 == col1- 1) && window.activeplayer == "white")
        {
            attackedpiece = $("#"+position2).children().attr('id');
            attackedpiece = $("#"+position2).children().attr('id');
            $("#"+attackedpiece).remove();
            console.log(attackedpiece)
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
                states.wkingmove = true;
                $("#"+window.piece).prependTo("#p"+row1+col1)
                $("#"+position2).empty();
                $("#"+window.piece).prependTo("#"+position2);
                window.activeplayer = "black";
                $("#submitmove").html('Black move');
            }
        }
        else if((row2 == row1 || row1 == row2 - 1 || row2 == row1 - 1) && (col2 == col1 || col1 == col2 - 1 || col2 == col1- 1) && window.activeplayer == "black")
        {
            attackedpiece = $("#"+position2).children().attr('id');
            $("#"+attackedpiece).remove();
            console.log(attackedpiece)
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
                $("#"+window.piece).prependTo("#p"+row1+col1)
                $("#"+position2).empty();
                $("#"+window.piece).prependTo("#"+position2);
                window.activeplayer = "white";
                $("#submitmove").html('white move');
                states.bkingmove = true;
            }
        }
        else if (window.activeplayer == "white" && row2 == 8 && col2 == 3 && !states.wkingmove && !states.wrook1move)
        {
            stop = false;
            for(i = 2; i < 5; i++)
            {
                if(!checkempty(8, i))
                {
                    stop = true;
                }
            }
            console.log(stop);
            if(!stop)
            {
                attackedpiece = $("#"+position2).children().attr('id');
                $("#"+attackedpiece).remove();
                console.log(attackedpiece)
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
                    $("#"+window.piece).prependTo("#p"+row1+col1)
                    $("#"+position2).empty();
                    $("#"+window.piece).prependTo("#"+position2);
                    window.activeplayer = "black";
                    $("#submitmove").html('black move');
                    $("#whiterook1").prependTo("#p84")
                    states.wkingmove = true;
                }
            }
        }
        else if (window.activeplayer == "white" && row2 == 8 && col2 == 7 && !states.wkingmove && !states.wrook2move)
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
                $("#"+attackedpiece).remove();
                console.log(attackedpiece)
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
                    $("#"+window.piece).prependTo("#p"+row1+col1)
                    $("#"+position2).empty();
                    $("#"+window.piece).prependTo("#"+position2);
                    window.activeplayer = "black";
                    $("#submitmove").html('black move');
                    states.wkingmove = true;
                    $("#whiterook2").prependTo("#p86")
                }
            }
        }
        else if (window.activeplayer == "black" && row2 == 1 && col2 == 7 && !states.bkingmove && !states.brook2move)
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
                $("#"+attackedpiece).remove();
                console.log(attackedpiece)
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
                    $("#"+window.piece).prependTo("#p"+row1+col1)
                    $("#"+position2).empty();
                    $("#"+window.piece).prependTo("#"+position2);
                    window.activeplayer = "white";
                    $("#submitmove").html('white move');
                    states.bkingmove = true;
                    $("#blackrook2").prependTo("#p16")
                }
            }
        }
        else if (window.activeplayer == "black" && row2 == 1 && col2 == 3 && !states.bkingmove && !states.brook1move)
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
                $("#"+attackedpiece).remove();
                console.log(attackedpiece)
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
                    $("#"+window.piece).prependTo("#p"+row1+col1)
                    $("#"+position2).empty();
                    $("#"+window.piece).prependTo("#"+position2);
                    window.activeplayer = "white";
                    $("#submitmove").html('white move');
                    states.bkingmove = true;
                    $("#blackrook1").prependTo("#p14")
                }
            }
        }
    }
};
function checkforcheck(piece, position)
{
    check = false;
    row1 = position.charAt(0);
    col1 = position.charAt(1);
    row2 = kingpos.charAt(1);
    col2 = kingpos.charAt(2);
    if(window.activeplayer == "black")
    {
        kingpos = $("#whiteking").parent().attr('id')
    }
    else if(window.activeplayer == "white")
    {
        kingpos = $("#blackking").parent().attr('id')

    }
    switch(piece)
    {
        case "knight":
        {
            if(knighmovecheck(row1, col1, row2, col2))
            {
                check = true;
            }
        }
        case "bishop":
        {
            if(bishopmovecheck(row1, col1, row2, col2))
            {
                check = true;
            }
        }
        case "queen":
        {
            if(bishopmovecheck(row1, col1, row2, col2) || rookmovecheck(row1, col1, row2, col2))
            {
                check = true;
            }
        }
        case "pawn":
        {
            if(pawnmovecheck(row1, col1, row2, col2))
            {
                check = true;
            }
        }
        case "rook":
        {
            if(rookmovecheck(row1, col1, row2, col2))
            {
                check = true;
            }
        }
    }
    if(check && window.activeplayer == "white")
    {
        states.bcheck = true;
    }
    else if(check && window.activeplayer == "black")
    {
        states.wcheck = true;
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
    delimeter = false;
    for(i = 1; i < 9; i++)
    {
        if($("#"+str+"pawn"+i).length > 0)
        {
            row1 = $("#"+str+"pawn"+i).parent().attr('id').charAt(1)
            col1 = $("#"+str+"pawn"+i).parent().attr('id').charAt(2)
            if(pawnmovecheck(row1, col1, row2, col2))
            {
                delimeter = true;
            };
        }
    }
    for(j = 1; j < 3; j++)
    {
        if($("#"+str+"bishop"+j).length > 0)
        {
            row1 = $("#"+str+"bishop"+j).parent().attr('id').charAt(1)
            col1 = $("#"+str+"bishop"+j).parent().attr('id').charAt(2)
            if(bishopmovecheck(row1, col1, row2, col2))
            {
                console.log("1")
                delimeter = true;
            };
        }
    }
    if($("#"+str+"queen").length > 0)
    {
        row1 = $("#"+str+"queen").parent().attr('id').charAt(1)
        col1 = $("#"+str+"queen").parent().attr('id').charAt(2)
        if(bishopmovecheck(row1, col1, row2, col2) || rookmovecheck(row1, col1, row2, col2))
        {
            console.log("3")
            delimeter = true;
        };
    };
    if($("#"+str+"king").length > 0)
    {
        row1 = $("#"+str+"king").parent().attr('id').charAt(1)
        col1 = $("#"+str+"king").parent().attr('id').charAt(2)
        console.log("fuckboy")
        if(kingmovecheck(row1, col1, row2, col2))
        {
            delimeter = true;
        }
    }
    for(k = 1; k < 3; k++)
    {
        if($("#"+str+"rook"+k).length > 0)
        {
            row1 = $("#"+str+"rook"+k).parent().attr('id').charAt(1)
            col1 = $("#"+str+"rook"+k).parent().attr('id').charAt(2)
            if(rookmovecheck(row1, col1, row2, col2))
            {
                console.log("5")
                delimeter = true;
            };
        }
    }
    for(l = 1; l < 3; l++)
    {
        if($("#"+str+"knight"+l).length > 0)
        {
            row1 = $("#"+str+"knight"+l).parent().attr('id').charAt(1)
            col1 = $("#"+str+"knight"+l).parent().attr('id').charAt(2)
            if(knighmovecheck(row1, col1, row2, col2))
            {
                console.log("4")
                delimeter = true;
            };
        }
    }
    console.log(delimeter);
    if(!delimeter)
    {
        return false;
    }
    else 
    {
        return true;
    };
};
$("div").click(function(event)
{
    event.preventDefault();
    console.log(event.target.id);
    event.stopPropagation();
    //check if player is in check
    if((event.target.id).indexOf("p")==0)
    {
        if((window.piece).indexOf("pawn")==5)
        {
            console.log("yup");
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
            console.log("bruh");
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
    if($("img").parent().css("background-color") != "blue" && (event.target.id).indexOf(window.activeplayer)!=-1)
    {
        $("img").parent().css("background-color","");
        $("#"+event.target.id).parent().css("background-color","blue");
        window.pos1 = $("#"+event.target.id).parent().attr("id"); 
        window.piece = (event.target.id)
    console.log($("#"+window.pos1).css("background-color"))
    console.log((event.target.id).indexOf(window.activeplayer))
    }
    else if((event.target.id).indexOf(window.activeplayer)==-1)
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
});