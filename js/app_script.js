$(document).ready( function() {
    var $dom = $(document);
    var host = "http://tools.propelrr.net/";

    $.getScript('//connect.facebook.net/en_US/sdk.js', function(){
        //FB.init({
        //    appId: '287026681636328',
        //    version: 'v2.6'
        //});
        FB.init({
            appId: '487951431561097',
            version: 'v2.10'
        });

        $('#first-form').hide();

    });

    $dom.on('click', '.connect-btn', function() {
        FB.login(function (response) {
            checkLoginState();
        });
    });

    function checkLoginState() {
        FB.getLoginStatus(function(response) {
            loginCallback(response);
        });
    }

    function loginCallback(data) {
        if (data.status==='connected') {
            FB.api('/me','GET',{"fields":"id,name,first_name,last_name,picture,locale,timezone,gender,email"},function(response){
                console.log(response.id)
                saveUserFBId(response.id);
            });
        } else {

        }
    }

    function saveUserFBId(fbuid) {
        var formData = new FormData();
        formData.append('fbuid', fbuid);

        var url = host+'listener/poten-cee/saveFacebookUID';
        $.ajax({
            url: url,
            type: 'POST',
            data:formData,
            crossDomain: true,
            processData: false,
            contentType: false,
            success:function(data){
                if(data.id){
                    console.log(data)
                } else {
                    console.log(data)
                }
            }
        });
    }
});
