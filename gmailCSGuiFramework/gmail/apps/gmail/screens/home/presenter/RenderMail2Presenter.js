/**
 * Created by CS64 on 17-10-2016.
 */
function RenderMail2Presenter (oView)
{
    this.inheritsFrom(new CSGuiViewPresenter(oView));
    this.init = function ()
    {

        this.oView.hide();
        //Receives the notification When Mail to be render
        CSNotificationCenter.getGlobalCenter().addSubscriber
        (
            this,
            'RenderMail2',
            this.renderMail
        );

        CSNotificationCenter.getGlobalCenter().addSubscriber
        (
            this,
            'HideMail',
            this.HideMail
        );

        this.inheritsFrom(new CSGuiViewPresenter(oView));
    }
    /**
     * This function renders the Mail
     * @param oNotification
     */
    this.renderMail=function(oNotification)
    {     debugger;
        this.oView.show();
        var message=oNotification.getData();
        this.oView.enableAnimations();
        this.oView.setSize (new CSSize (100, 500));
        this.oView.setText("Messsge :"+message[0].message);

    };

    this.HideMail=function(){

        this.oView.hide();

    };

}