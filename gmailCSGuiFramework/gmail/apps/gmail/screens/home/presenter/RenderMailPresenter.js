/**
 * Created by CS64 on 17-10-2016.
 */
function RenderMailPresenter (oView)
{
    this.inheritsFrom(new CSGuiViewPresenter(oView));
    this.init = function ()
    {

        this.oView.hide();
        //Receives the notification When Mail to be render
        CSNotificationCenter.getGlobalCenter().addSubscriber
        (
            this,
            'RenderMail',
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
    {
        this.oView.show();
        var array=oNotification.getData();
        this.oView.enableAnimations();
        this.oView.setSize (new CSSize (100, 500));
        this.oView.setText("Name:"+array[0].firstName);

        CSNotificationCenter.getGlobalCenter().postNotification
        (
            null,
            'RenderMail2',
            array
        );
    };

    this.HideMail=function(){

        this.oView.hide();

    };

}