$(function () {
    view = new View();
    view.renderComponents();
});


/**
 * this class interacts with the server
 */
function interactor() {

    this.ajax = function (url, type, dataSuccesss) {
        $.ajax({
            url: url,
            type: type,
            dataType: "text",
            success: function (data) {
                dataSuccesss(JSON.parse(data));
            }
        });
    };

    this.post=function(url,data,view){
        $.post(
            url,
            {data:data,view:view},
            function (data) {
                alert(data);
            }
        );

    };
}
/**
 * this class controls the functionality
 */
function presenter() {
    var interact = new interactor();
    var v = new View();

    /**
    this function gets the all inbox messages of the user from the server
     */
    
    this.getAllmails = function () {
        interact.ajax("../../rest/Controller.php/getData?view=all", "get", this.dataSuccessAllMailsCallback);
    };
    
    /**
     this function gets the particular messages of the user from the server
     */
    this.getSingleMail = function (id) {
        interact.ajax("../../rest/Controller.php/getData?view=single&id="+id, "get", this.dataSuccessSingleMailCallback);
    };
    
    /**
     this function gets the all mails data from the server which is sent by the user
     */
    this.getAllSentMails = function () {
        interact.ajax("../../rest/Controller.php/getData?view=sentmails", "get", this.dataSuccessAllSentMailsCallback);
    };
    
    /**
     this function gets the particular mail data from the server which is sent by the user
     */
    this.getSentMail = function (id) {

        interact.ajax("../../rest/Controller.php/getData?view=sentmail&id=" + id, "get", this.dataSuccessSentMail);
    };

    /**
     this function sends the query text for finding the mails and gets the search results back from the server
     */
    this.searchMail = function (string) {
        interact.ajax("../../rest/Controller.php/getData?view=search&q=" + string, "get", this.dataSuccessAllMailsCallback);
    };

    this.sendMail=function(data){
        debugger;
        interact.post("../../rest/Controller.php",data,"savesent");
    };

    /**
    the callback function for getting all mails from server and
    when request is completed then it calls the rendering function to render the data
     */
    this.dataSuccessAllMailsCallback = function (json) {
        for (var i = 0; i < json.length; i++)
            v.renderAllMails(json[i], i);


    };
    /**
     * When request is for single mail this function is called
     * @param json gets the data of Mail
     */

    this.dataSuccessSingleMailCallback = function (json) {
        v.renderSingleMail(json);
    };

    /**
     * When request is for all Sent mails this function is called
     * @param json gets the data of Mails
     */
    this.dataSuccessAllSentMailsCallback = function (json) {
        for (var i = json.length - 1; i >= 0; i--)
            v.renderAllSentMails(json[i], i);

    };

    /**
     * When request is for single sent mail this function is called
     * @param json gets the data of Mail
     */
    this.dataSuccessSentMail = function (json) {
        v.renderSentMail(json);
    }
}



/**
 * this function renders the whole page
 * it contains all event listners
 * @example appendleft() renders the left part of the page
 * @exapmle bindsEventsOnButton()  attach the particular event on components
 **/

function View() {
    /**
    this function renders the left part of the page
    */
    
    this.appendLeftMenu = function () {
        $('#wrapper').append("<div id='first'><button type='button' id='compose'>compose</button>" +
            "<button type='button' id='inbox'>inbox (2)</button>" +
            "<button type='button' id='sentmails'>Sent Mails</button>"
            + "<div id='D'>Starred</div>" + "<div id='D'>Drafts</div>" +
            "<div id='D'>Spam</div>");


        this.inboxButtonEvent();
        this.sentMailsButtonEvent();

        //this part of function the more elements div
        $('#first').append(
            "<div id='more'>More ></div>" +
            "<div id='less'>Less ></div><div id='moreitems'>" +
            "<div id='moreitems1'>Important</div><div id='moreitems1'>chat</div>" +
            "<div id='moreitems1'>All mails" +
            "</div><div id='moreitems1'>Spam</div><div id='moreitems1'>Trash</div>" +
            "<div id='moreitems1'>Categories</div></div>");

        this.moreButtonEvents();
    };
    
    /**
     * this function renders the header of page
     */
    this.appendSearchHeaderContainer = function () {
        $('#wrapper').append(" <div id='second'>" +
            "<img src='../resources/gmail.jpg'  width='42' height='42' id='logo'>" +
            " <input type='text' name='search' id='find'>" +
            "<button type='button' id='search'>search</button><br></div>");

       this.searchMailsEvent();

    };
    
    /**
     * this function renders the second header of the page
     */
    this.appendSettingsHeaderContainer = function () {
        $('#wrapper').append("<div id='middle'><div id='middle1'>Mail </div>" +
            "<div id='middle20'><div id='middle2'>" +
            "<input type='checkbox'></div><div id='middle2'></div><div id='middle2'>More</div>" +
            "</div><div id='middle3'></div>" +
            "<div id='middle4'></div><div id='middle5'></div></div>")
    };
    
    /**
     * this funciton renders the body of the page
     * and renders the dialog for sending a mail
     */
       this.appendBody = function () {
           $('#wrapper').append("<div id='third'></div>" + "<div id='dialog'>" +
            "<input type='text' id='to' value='To'>" +
            "<input type='text' id='subject' value='Subject'>" +
            "<input type='text' id='msg' >" +
            "<button type='button' id='send'>send</button>" +
            "</div>");

           this.sendMailEvent();
           this.composeButtonEvent();

       };
    
    /**
     * this function renders all the mails of the users and it receives two parameters
     * @param json  it is main user (containing mail information) data to be render on body
     */
         this.renderAllMails = function (json,id) {
            $("#third").append(" <div class='messages' id=" + json.id + "><div class='messages0'>" +
            "<div id='checkboxmsg'><input type='checkbox'></div>" +
            "<h3>" + json.firstName + "</h3></div><div " +
            " id='" + json.id + "' ><h3>  " + json.message + "</h3></div></div>");
             this.bindEventsOnInbox(id);
    };
    
    /**
     * this function renders the complete mail on the body
     * @param jsonit is main user (containing mail information) data to be render on body
     */
             this.renderSingleMail = function (json) {
            $("#third").append("<h1>Name :" + json.firstName + "</h1><br><h2>" + "Message : " + json.message + "</h2>" +
            "<textarea rows='6' cols='80'>Click here to reply or Forward</textarea>" +
            "<div id='reply'></div><div id='replyButton'>send</div>");
    }
    
    /**
     * this function renders all the mails sent by the user and its receives two parameters
     * @param json  it is main user (containing mail information) data to be render on body
     */
    this.renderAllSentMails = function (json, id) {

        $("#third").append("<div class='messages' id='" + id + "' ><div id='checkboxmsg'><input type='checkbox'></div>" +
            "<div class='messages0'><h3>" + "to :" + json.to + "</h3></div>  <div><h3> " + " Subject  :" + json.subject +
            "</h3></div><div><h3> "+"-"
            + json.Message + "</h3></div></div>");
        this.bindEventsOnSentMails(id);
    };
    
    /**
     * this function binds the events on inbox messages
     * @example when clicks on the inbox message users gets  its contents of its  inbox messege
     */
    this.bindEventsOnInbox = function (id) {
        $("#"+id+"").hover(
            function () {
                $(this).css("background-color", "#F4FBFC");
            }, function () {
                $(this).css("background-color", "rgb(236, 238, 239)");
            }
        );
        $("#"+id+"").click(function () {
            var x = this.id;
            $("#third").empty();
            var p = new presenter();
            p.getSingleMail(x);
        });
    };
    
    /**
     * this function binds the events on sent messages
     * @example when clicks on the sent message users gets  its contents of its  sent messege
     */
    this.bindEventsOnSentMails = function (id) {
        $("#"+id+"").hover(
            function () {
                $(this).css("background-color", "#F4FBFC");
            }, function () {
                $(this).css("background-color", "rgb(236, 238, 239)");
            }
        );
        $("#"+id+"").click(function () {
            var x = this.id;
            $("#third").empty();
            var p = new presenter();
            p.getSentMail(x);

        });
    };
    
    /**
     * this function renders whole body of the  mail which is sent by the user
     * @param json
     */
    this.renderSentMail = function (json) {
        $("#third").append("<div id='singleMail'></div><h1>Name :" + json.to + "</h1><br>" +
            "<h1>Subject :" + json.subject + "</h1><br>" +
            "<h2>" + "Message : " + json.Message + "</h2>" +
            "<textarea rows='6' cols='80'>Click here to reply or Forward</textarea>" +
            "<div id='reply'></div><div id='replyButton'>send</div>");
    };
    
    /**
     * this function adds the functionality to more  and less button
     * @example when user clicks on more button then menu will be expanded
     */
    this.moreButtonEvents = function () {
        $("#less").hide();
        $("#moreitems").hide();
        $("#more").click(function () {
            $("#moreitems").show();
            $("#less").show();
            $("#more").hide();

        });
        $("#less").click(function () {
            $("#moreitems").hide();
            $("#more").show();
            $("#less").hide();
        });
    };

    /**
     * when user press the on the compose button then this dialog will be displayed for compose a mail
     */
    this.composeButtonEvent = function () {
        $("#dialog").dialog({
            autoOpen: false,
        });
        $("#compose").click(function () {
            $("#dialog").dialog("open");
        });
    };
    
    /**
     * this function attachs the event to inbox button
     * on click the page will refreshed
     */
    
    this.inboxButtonEvent = function () {
        $("#inbox").click(function () {
            location.reload();
        });
        $('#to,#subject').one('click', function(){
            this.value = '';
        });

    };
    
    /**
     * this function registers a event on send button
     * @example on click the contents of composed mail is post to the server
     */
    this.sendMailEvent = function () {
        $("#send").click(function () {
            $('#to,#subject').one('click', function(){
                this.value = '';
            });
            var to = '"'+document.getElementById("to").value+'"';
            var subject = '"'+document.getElementById("subject").value+'"';
            var msg = '"'+document.getElementById("msg").value+'"';
             var data="{"+'"to":'+to+',"subject":'+subject+',"Message":'+msg+"}";
            var p = new presenter();
            p.sendMail(data);
        });
    };
    
    /**
     * this function attachs a event on sentmails button
     * on click user gets mails which is sent by him/her
     */
    this.sentMailsButtonEvent = function () {
        $("#sentmails").click(function () {
            $("#inbox").css("color","black");
            $("#sentmails").css({"color":"#e05f5f","font-weight":"bold"});
            var p = new presenter();
            $("#third").empty();
            p.getAllSentMails();
        });
    };
    
    /**
     * this function adds the functionality for searching mail
     * @param string it recieves the text to be search  from searchBar
     */
    this.searchMailsEvent = function () {
        $("#search").click(function () {
            var string = document.getElementById("find").value;
            var p = new presenter();
            $("#third").empty();
            p.searchMail(string);
        });
        $("#find").keypress(function(e) {
            if(e.which == 13) {
                var string = document.getElementById("find").value;
                var p = new presenter();
                $("#third").empty();
                p.searchMail(string);
            }
        });
    };

    /**
     * this is the main function for rendering the all components of the page
     */
    this.renderComponents = function () {
        this.appendSearchHeaderContainer();
        this.appendSettingsHeaderContainer();
        this.appendLeftMenu();
        this.appendBody();
        var oPresenter = new presenter();
        oPresenter.getAllmails();

    };
}




