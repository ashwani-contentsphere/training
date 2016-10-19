/**
 * Created by CS64 on 17-10-2016.
 */
include ('view/CSButtonView');
include ('view/CSLabelView');
include ('view/CSSelectView');
include ('view/CSPopupButtonView');
include ('view/CSButtonGroupView');
include ('view/CSPopupToolbarView');

function SettingsHeaderPresenter (oView) {

    this.inheritsFrom(new CSGuiViewPresenter(oView));

    this.viewWillAppear = function () {

        this.oView.datasource = this;
    }

    this.viewDidAppear = function () {

        this.renderSettingButtons();
    }

    this.getNumberOfAreas = function () {

        return 15;
    }

    var buttonClicked = function (sButton, oEvent) {

        alert('Button clicked: ' + sButton);
    }
    /**
     * This function Renders the Buttons for Setting Menu
     */
    this.renderSettingButtons=function(){
        var oButton = new CSButtonView();
        oButton.setText("Mail");
        oButton.setState(CSBUTTONVIEW_STATE_INACTIVE);
        oButton.setTextColor(new CSColor(247, 18, 7,1));
        this.oView.addControlToAreaWithIndex(oButton,1);

        var oButton = new CSButtonView();
        oButton.setText("Button");
        oButton.attachEventListener ('click', buttonClicked.bind(null, 'button'));
        this.oView.addControlToAreaWithIndex(oButton,4);

        var oButton = new CSButtonView();
        oButton.setText("More");
        oButton.attachEventListener ('click', buttonClicked.bind(null, 'more'));
        this.oView.addControlToAreaWithIndex(oButton, 6);

        this.renderToolsButtons();
    }

    this.renderToolsButtons=function() {

        var oButton = new CSButtonView();
        oButton.setText(" < ");
        oButton.attachEventListener ('click', buttonClicked.bind(null, '<'));
        this.oView.addControlToAreaWithIndex(oButton, 12);

        var oButton = new CSButtonView();
        oButton.setText(" > ");
        oButton.attachEventListener ('click', buttonClicked.bind(null, '>'));
        this.oView.addControlToAreaWithIndex(oButton, 12);

    }

}