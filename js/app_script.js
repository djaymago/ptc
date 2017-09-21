var $dom = $(document);
var btnJoin  = '.join-now-wrap';
var btnNew = '.btn-submit-new';
var btnLike = '.btn-like-click';
var btnLikeConf = '.btn-like-confirm';
var btnShare = '.btn-share-click';
var btnShareConf = '.btn-share-confirm';
var btnGoGallery = '.btn-go-gallery';
var frmSection = '.frm-section';
var modalThankYou = '#confirmation-thankyou';
var modalSubmit = '#confirmation-submit';
var modalLike = '#confirmation-like';
var modalShare = '#confirmation-share';
var serverHost = 'http://tools.propelrr.net/';
var host = serverHost+"listener/poten-cee";
var galleryActiveID = 0;

$.getScript('//connect.facebook.net/en_US/sdk.js', function(){
    FB.init({
        appId: '487951431561097',
        version: 'v2.10'
    });
});

function getList() {
    var url = host+'/getList';

    $.ajax({
        url: url,
        type: 'POST',
        data: {},
        crossDomain: true,
        processData: false,
        contentType: false
    }).done( function(data) {
        $('.video-gallery ul').html(data.list);
    }).always( function(data) {
    });
}

function bindClicks() {
    $dom.on('click', btnJoin, function(e) {
        e.preventDefault();
        FB.login(function (response) {
            checkLoginState();
        });
    });

    $dom.on('click', btnNew, function(e) {
        e.preventDefault();
        $(modalThankYou).removeClass('active');
    });

    $dom.on('click', btnGoGallery, function(e) {
        e.preventDefault();
        $('.menu').find('li:nth-child(2)').find('a').trigger('click');
    });

    $dom.on('click', btnLike, function(e) {
        e.preventDefault();
        galleryActiveID = $(this).closest('li').data('id');
        $(modalLike).addClass('active');
    });

    $dom.on('click', btnLikeConf, function(e) {
        var targetE = $('li[data-id="'+galleryActiveID+'"]');

        loader(modalLike, 1, true);
        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                likeEntry(galleryActiveID, targetE);
            } else {
                FB.login(function(response){
                    likeEntry(galleryActiveID, targetE);
                }, {scope: 'publish_actions, email, public_profile, user_birthday, user_location'});
            }
        });
    });

    $dom.on('click', btnShare, function(e) {
        e.preventDefault();
        galleryActiveID = $(this).closest('li').data('id');
        $(modalShare).addClass('active');
    });

    $dom.on('click', btnShareConf, function(e) {
        var targetE = $('li[data-id="'+galleryActiveID+'"]');

        loader(modalShare, 1, true);
        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                shareEntry(galleryActiveID, targetE);
            } else {
                FB.login(function(response){
                    shareEntry(galleryActiveID, targetE);
                }, {scope: 'publish_actions, email, public_profile, user_birthday, user_location'});
            }
        });
    });
}

getList();
bindClicks();

function likeEntry(entryId) {
    FB.api('/me', {fields: 'id,first_name,last_name,birthday,age_range,gender,about,email,education,devices,hometown,location'}, function(response) {
        var _fname = response.first_name;
        var _lname = response.last_name;
        var _email = response.email;
        var _gender = response.gender;
        var _fbUid = response.id;
        var _fbBday = response.birthday;
        var _fbLocation = {name: response.location.name, id: response.location.id };

        console.log(response);

        if(response.error===undefined) {
            var url = host + '/like';

            $.ajax({
                url: url,
                type: "POST",
                data: {
                    first_name: _fname,
                    last_name: _lname,
                    email: _email,
                    gender: _gender,
                    fbuid: _fbUid,
                    entryId: entryId,
                    birthday: _fbBday,
                    location_id: _fbLocation.id,
                    location: _fbLocation.name
                },
                crossDomain: true
            }).done( function(response) {
                $(modalLike).removeClass('active');
                $.sticky(response.code==200 ? 'You have liked an entry!' :
                    (response.code==201 ? 'You have already liked this entry!':
                        'Error occurred. Please try again.'), {
                    'autoclose' : 5000
                });
                getList();
            }).always( function() {
                loader(modalLike, 0);
            });
        }

    });
}

function shareEntry(entryId) {
    FB.api('/me', {fields: 'id,first_name,last_name,birthday,age_range,gender,about,email,education,devices,hometown,location'}, function(response) {
        var _fname = response.first_name;
        var _lname = response.last_name;
        var _email = response.email;
        var _gender = response.gender;
        var _fbUid = response.id;
        var _fbBday = response.birthday;
        var _fbLocation = {name: response.location.name, id: response.location.id };

        FB.ui({
            method: 'share',
            href: 'https://ptc-campaign.herokuapp.com/fb-share-tags.html'
        }, function(response) {
            console.log(response)
            if (response && !response.error_code) {
                var url = host + '/share';

                $.ajax({
                    url: url,
                    type: "POST",
                    data: {
                        first_name: _fname,
                        last_name: _lname,
                        email: _email,
                        gender: _gender,
                        fbuid: _fbUid,
                        entryId: entryId,
                        birthday: _fbBday,
                        location_id: _fbLocation.id,
                        location: _fbLocation.name
                    },
                    crossDomain: true
                }).done( function(response) {
                    $(modalShare).removeClass('active');
                    $.sticky(response.code==200 ? 'Successfully shared entry!' :
                        (response.code==201 ? 'You already shared this entry!':
                            'Error occurred. Please try again.'), {
                        'autoclose' : 5000
                    });
                    getList();
                }).always( function() {
                    loader(modalShare, 0);
                });
            } else if(response.error_code && response.error_code==4201) {
                loader(modalShare, 0);
            }
        });

    });
}

function checkLoginState() {
    FB.getLoginStatus(function(response) {
        loginCallback(response);
    });
}

function loginCallback(data) {
    if (data.status==='connected') {
        loader('#main-wrapper', 1, false);
        FB.api('/me','GET',{"fields":"id,name,first_name,last_name,picture,locale,timezone,gender,email"},function(response){
            saveUserFBId(response.id);
            $(btnJoin).hide();
            $(frmSection).show();
            $dom.scrollTop(window.outerHeight);
        });
    }
}

function saveUserFBId(fbuid) {
    var formData = new FormData();
    formData.append('fbuid', fbuid);

    var url = host+'/saveFacebookUID';
    $.ajax({
        url: url,
        type: 'POST',
        data:formData,
        crossDomain: true,
        processData: false,
        contentType: false
    }).done( function(data) {
        if(data.id)
            $('#account_id').val(data.id);
    }).always( function(data) {
        loader('#main-wrapper', 0);
    });
}

function submitEntry() {
    var formData = new FormData(document.getElementById('formEntry'));

    var url = host+'/submitEntry';

    loader(modalSubmit, 1, true);
    disableScroll();

    $.ajax({
        url: url,
        type: 'POST',
        data: formData,
        crossDomain: true,
        processData: false,
        contentType: false,
        success:function(data){
            if(data.code==200){
                enableScroll();
                loader(modalSubmit, 0);
                $(frmSection).find('form').trigger('reset');


                $(modalThankYou).addClass('active');
                $(modalSubmit).removeClass('active');
            } else {

            }
        }
    });
}

/** Loader */
function loader(el, stat, overlay) {
    if(stat)
        $(el)
            .addClass('loading')
            .loader('show', {
                overlay: overlay
            });
    else
        $(el)
            .removeClass('loading')
            .loader('hide');
}
/** Scrolling */
var keys = {37: 1, 38: 1, 39: 1, 40: 1};
function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
    if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove  = preventDefault; // mobile
    document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
}

//-------------------------------SELECT CASCADING-------------------------//
//demo:  https://codepen.io/medunes/pen/GWoojz
var currentCities=[];
// This is a demo API key that can only be used for a short period of time, and will be unavailable soon. You should rather request your API key (free)  from http://battuta.medunes.net/
var BATTUTA_KEY="00000000000000000000000000000000";
// This is the country code
var COUNTRY_CODE="ph";
// Populate country select box from battuta API
var URL_REGIONS="https://battuta.medunes.net/api/region/"
    +COUNTRY_CODE
    +"/search/"
    +"?key="
    +BATTUTA_KEY
    +"&callback=?";

$cmbRegions = $("#loc_region");
$cmbCities = $("#loc_cities");

$.getJSON(URL_REGIONS,function(regions)
{
    console.log(regions)
    $("#loc_region option").remove();
    //loop through regions..
    $.each(regions, function(key,region) {
        $("<option></option>")
            .attr("value",region.region)
            .append(region.region)
            .appendTo($cmbRegions);
    });
    // trigger "change" to fire the #state section update process
    $cmbRegions.trigger("change");
});

$cmbRegions.on("change",function() {
    var region=$cmbRegions.val();

    url="https://battuta.medunes.net/api/city/"
    +COUNTRY_CODE
    +"/search/?region="
    +region
    +"&key="
    +BATTUTA_KEY
    +"&callback=?";

    $cmbCities.html("<option>Loading...</option>");

    $.getJSON(url, function(cities) {
        currentCities=cities;
        var i=0;

        $cmbCities.empty();
        //loop through regions..
        $.each(cities, function(key,city) {
            $("<option></option>")
                .attr("value",i++)
                .append(city.city)
                .appendTo($cmbCities);
        });
        // trigger "change" to fire the #state section update process
        $cmbCities.trigger("change");
    });

});
//-------------------------------END OF SELECT CASCADING-------------------------//
