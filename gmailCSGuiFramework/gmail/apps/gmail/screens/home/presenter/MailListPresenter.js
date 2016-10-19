/**
 * Created by CS64 on 12-10-2016.
 */
function MailListPresenter(oView) {

    this.inheritsFrom(new CSGuiViewPresenter(oView));
    var Array = [];


    /**
     * This method is the main entry point, it is called by the framework while initializing the component
     */
    this.init = function () {
        this.requestDataFromInteractor();
        //Receives the notification When SentMail button is pressed
        CSNotificationCenter.getGlobalCenter().addSubscriber
        (
            this,
            'SentMails',
            this.getSentMails
        );
        //Receives the notification When Inbox button is pressed
        CSNotificationCenter.getGlobalCenter().addSubscriber
        (
            this,
            'InboxMails',
            this.requestDataFromInteractor
        );
    };

    this.viewWillAppear = function () {
        this.oView.datasource = this;
        this.oView.delegate = this;
    };

    this.viewDidAppear = function () {

    };
    this.shouldShowSearchbar = function () {

        return true;
    }

    /**
     this function sends the query text for finding the mails and gets the search results back from the server
     */
    this.didSearchWithText = function (sText) {
        data = {"string": sText};
        var oInteractor = this.getInteractor();
        oInteractor.delegate = this;
        oInteractor.loadDataFromUrl('searchMail', '', data, getAllAppData.bind(this));
    };

    this.getNumberOfItemsInSectionAtIndex:oListView = function (iIndex) {

        return Array.length;
    };
    /**
     this function gets the all sent messages of the user from the server
     */
    this.getSentMails = function () {
        this.oView.show();
        var oInteractor = this.getInteractor();
        oInteractor.delegate = this;
        oInteractor.loadDataFromUrl('getSentMails', '', '', getAllAppData.bind(this));
    };


    this.getItemAtIndexPath:oListView = function (oIndexPath) {
        return new CSListViewItem(
            "<div class='listcontents'><div id='checkboxmsg'>" +
            "<input type='checkbox'></div><div class='listcontents2'>" + '' + Array[oIndexPath.getRow()].firstName +
            '-Message-' + Array[oIndexPath.getRow()].message + "</div></div>"
        );

    };


    this.interactorDidFinishLoadingData = function (oData, sContext, oCallback) {
        oCallback.call(this, oData);
    };

    /**
     the callback function for getting all mails from server and
     when request is completed then it calls the rendering function to render the data
     */
    var getAllAppData = function (data) {
        Array = JSON.parse(data);
        this.oView.enableAnimations();
        this.oView.setSize(new CSSize(1000, 500));
        this.oView.reloadList();
    };

    /**
     this function gets the all inbox messages of the user from the server
     */
    this.requestDataFromInteractor = function () {
        this.oView.show();
        var oInteractor = this.getInteractor();
        oInteractor.delegate = this;
        oInteractor.loadDataFromUrl('getData', '', '', getAllAppData.bind(this));
    };

    /**
     * When User clicks on particuar mail then this function gets the content of mail
     * from the server

     */
    this.didSelectItemAtIndexPath = function (oIndexPath) {
        data = {"index": oIndexPath.getRow()};
        var oInteractor = this.getInteractor();
        oInteractor.delegate = this
        //the if statement Distinguish between the inbox or outbox
        if (Array[oIndexPath.getRow()].subject) {
            oInteractor.loadDataFromUrl('getSingleSentMail', '', data, getSingleMaildata.bind(this));
        }
        else {
            oInteractor.loadDataFromUrl('getSingleMail', '', data, getSingleMaildata.bind(this));
        }
    }

    this.canSelectItemAtIndexPath = function (oIndexPath) {

        return true;
    }

    /**
     this function gets the particular messages of the user from the server
     */
    var getSingleMaildata = function (data) {
        Array = JSON.parse(data);
        //adds the Notification for rendering a Mail
        CSNotificationCenter.getGlobalCenter().postNotification
        (
            this,
            'RenderMail',
            Array
        );
        this.oView.hide();

    };

}
