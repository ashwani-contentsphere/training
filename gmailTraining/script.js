$(function () {

    $('#wrapper').append("<div id='first'><button type='button' id='compose'>compose</button>" +
        "<button type='button' id='inbox'>inbox (2)</button><button type='button' id='sentmails'>Sent Mails</button>"
        +"<div id='starred'>Starred</div>"+"<div id='D'>Starred</div>"+"<div id='starred'>Starred</div>"+
        "</div> <div id='second'> <input type='text' name='search' id='find'><button type='button' id='search'>search</button><br></div>" +
        "<div id='third'></div>"+"<div id='dialog'>" +

        "<input type='text' id='to' value='to'>" +
        "<input type='text' id='subject' value='subject'>" +
        "<input type='text' id='msg' >" +
            "<button type='button' id='send'>send</button>"+
        "</div>");


    $("#inbox").click(function(){
        location.reload();
    });
    $("input:text:visible:first").focus();
    $( "#dialog" ).dialog({
        autoOpen: false,
    });
    $("#compose").click(function(){
        $("#dialog").dialog("open");
    });
    $("#send").click(function() {
        var to = document.getElementById("to").value;
        var subject = document.getElementById("subject").value;
        var msg = document.getElementById("msg").value;

        $.post(
            "2.php",
            { to: to,subject:subject,msg:msg },
            function(data) {
                alert(data);
            }
        );
    });
    $("#sentmails").click(function(){

        $("#third").empty();

        $("#third").append(
            $.ajax({

                url: "3.php",
                //force to handle it as text
                dataType: "text",
                success: function (data) {
                    dataSuccess2(JSON.parse(data));

                }
            })
        );

    });
    $("#search").click(function(){
        var x=document.getElementById("find").value;
        alert(x);
        $("#third").empty();
        $("#third").append(
            $.ajax({
                url: "4.php/getData?q="+x,
                dataType: "text",
                success: function (data) {
                    dataSuccess(JSON.parse(data));

                }
            })
        );
    });


    $.ajax({
        url: "data1.json",
        dataType: "text",
        success: function (data) {
            dataSuccess(JSON.parse(data));

        }
    });
});

dataSuccess = function (json) {

    for (var i = 0; i < json.length; i++) {
        $("#third").append("<div class='messages' id='" + i + "' ><h3>" + json[i].firstName + "  " + json[i].message + "</h3></div>");
    }
    $(".messages").hover(
        function(){
            $(this).css("background-color", "#F4FBFC");
        }, function(){
            $(this).css("background-color", "#E7F6FA");
        }
    );

    $(".messages").click(function () {
        var x = this.id;

        $("#third").empty();

        $("#third").append(
            $.ajax({

                //url: "1.php/getData?q="+x,
                url: "GInbox.php",
                dataType: "text",
                success: function (data) {
                    alert(data);
                    var json=JSON.parse(data)
                    $("#third").append(json.firstName);

                }
            })
        );


    });
}
dataSuccess2 = function (json) {

    for (var i = 0; i < json.length; i++) {
        $("#third").append("<div class='messages' id='"+i+"' ><h3>"+"to :"+json[i].to+"  "+"Subject  :" +json[i].subject+" Message  "+json[i].Message+"</h3></div>");
    }
    $(".messages").hover(
        function(){
            $(this).css("background-color", "#F4FBFC");
        }, function(){
            $(this).css("background-color", "#E7F6FA");
        }
    );

    $(".messages").click(function () {
        var x = this.id;

        $("#third").empty();

        $("#third").append(
            $.ajax({

                url: "5.php/getData?q="+x,
                dataType: "text",
                success: function (data) {
                    $("#third").append(data);

                }
            })
        );


    });








}

