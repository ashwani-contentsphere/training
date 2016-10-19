/**
 * Created by CS64 on 17-10-2016.
 */
include ('view/CSButtonView');
include ('view/CSLabelView');
include ('view/CSSelectView');
include ('view/CSPopupButtonView');
include ('view/CSButtonGroupView');
include ('view/CSPopupToolbarView');

function MenuPresenter (oView) {
    this.inheritsFrom(new CSGuiViewPresenter(oView));

    this.viewWillAppear = function () {
        this.oView.datasource = this;
    }


    /**
     this function renders the menu part of the page
     */
    this.viewDidAppear = function () {
        //this.oView.setLayoutMode(CSGUIVIEW_LAYOUTMODE_FIT_HEIGHT);

        var oButton = new CSButtonView();
        oButton.setText("Compose");
        oButton.setStyle(CSCONTROLVIEW_STYLE_DANGER);
        oButton.attachEventListener ('click', this.buttonClicked.bind(this));

        this.oView.addControlToAreaWithIndex(oButton);

        var oButton = new CSButtonView();
        oButton.setText("inbox");
        oButton.setTextColor(new CSColor(247, 18, 7,1));
        oButton.attachEventListener ('click', this.buttonClickedInbox.bind(this));

        this.oView.addControlToAreaWithIndex(oButton);

        var oButton = new CSButtonView();
        oButton.setText("Sentmails");
        oButton.attachEventListener ('click', this.buttonClicked2.bind(this));

        this.oView.addControlToAreaWithIndex(oButton);

        var oButton = new CSButtonView();
        oButton.setText("spam");
        oButton.attachEventListener ('click', buttonClicked.bind(null, 'spam'));

        this.oView.addControlToAreaWithIndex(oButton);

        var oButton = new CSButtonView();
        oButton.setText("More");
        oButton.attachEventListener ('click', buttonClicked.bind(null, 'more'));

        this.oView.addControlToAreaWithIndex(oButton);
    }

    this.getNumberOfAreas = function () {
        return 1;
    }

    this.getToolbarStyle = function () {
        return CSTOOLBARVIEW_STYLE_VERTICAL;
    }

    var buttonClicked = function (sButton, oEvent) {
        alert('Button clicked: ' + sButton);
    }

    /**
     * when user press the  compose button then this dialog will be displayed for compose a mail
     */

    this.buttonClicked = function (oEvent)
    {
        var oDialog = this.presentScreenInDialog(new CSScreen('New_Message'));
    }

    this.buttonClicked2 = function (oEvent)
    {
        this.HideMail();
        CSNotificationCenter.getGlobalCenter().postNotification
        (
            null,
            'SentMails'
        );
    }

    this.buttonClickedInbox = function (oEvent)
    {
        this.HideMail();
        CSNotificationCenter.getGlobalCenter().postNotification
        (
            null,
            'InboxMails'
        );

    }

    this.HideMail=function()
    {

        CSNotificationCenter.getGlobalCenter().postNotification
        (
            null,
            'HideMail'
        );
    }

}
