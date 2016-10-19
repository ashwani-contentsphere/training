/**
 * Created by CS64 on 14-10-2016.
 */
include ('view/CSSwitchGroupView');
include ('view/CSColorPickerView');
include ('view/CSNumberFieldView');
include ('view/CSIconChooserView');


function SendMailPresenter (oView) {

    this.inheritsFrom(new CSGuiViewPresenter(oView));

    this.viewDidAppear = function () {

        this.oView.delegate = this;
        this.renderForm();

    }

    this.getNumberOfOptions = function () {

        return 3;
    }

    this.getTextForValue = function (sValue) {

        return sValue;
    }

    this.getValueForIndex = function(iIndex) {

        return 'Value ' + iIndex;
    }

    this.didSubmitFormWithValues = function (oValues) {
        var aNames = oValues.getNames();
        var to='"'+oValues.getValueForName(aNames[0])+'"';
        var subject='"'+oValues.getValueForName(aNames[1])+'"';
        var msg='"'+oValues.getValueForName(aNames[2])+'"';
        var data=","+"{"+'"firstName":'+to+',"subject":'+subject+',"message":'+msg+"}";

        var oInteractor = this.getInteractor();
        oInteractor.delegate = this;
        data={"string":data};
        oInteractor.loadDataFromUrl('sendMail', '', data, getAllAppData.bind(this));

    }

    var getAllAppData=function(data)
    {
        if(data) {
            CSApplication.showNotificationWithTextAndType(
                this.getApplication().translate('Mail Sucessfully Sent'),
                CSAPPLICATION_NOTIFICATION_TYPE_SUCCESS
            );
        }
        else{
            CSApplication.showNotificationWithTextAndType(
                this.getApplication().translate('Mail Sending Failed'),
                CSAPPLICATION_NOTIFICATION_TYPE_ERROR
            );
        }
    };

    this.interactorDidFinishLoadingData = function(oData, sContext, oCallback){
        oCallback.call(this, oData);
    }
    this.renderForm=function(){
        var oTextField = new CSTextFieldView();
        oTextField.setName('to');
        var oFormGroup = new CSFormGroupView();
        oFormGroup.setControl(oTextField);
        this.oView.addFormGroup(oFormGroup);

        var oTextField = new CSTextFieldView();
        oTextField.setName('subject');
        var oFormGroup = new CSFormGroupView();
        oFormGroup.setControl(oTextField);
        this.oView.addFormGroup(oFormGroup);

        var oTextView = new CSTextView();
        oTextView.setName('message');
        oTextView.setRowNumber(12);
        oFormGroup = new CSFormGroupView();
        oFormGroup.setControl(oTextView);
        this.oView.addFormGroup(oFormGroup);

        this.renderSubmitButton();
    }

    this.renderSubmitButton=function(){
        var oButton = new CSButtonView();
        oButton.setText('Send');
        oButton.setTextColor(new CSColor(7, 7, 7 ,1));
        this.oView.addSubmitButton(oButton);
    }

}
