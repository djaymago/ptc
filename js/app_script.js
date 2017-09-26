var $dom = $(document);
var btnJoin  = '.join-now-wrap';
var btnNew = '.btn-submit-new';
var btnLike = '.btn-like-click';
var btnLikeConf = '.btn-like-confirm';
var btnShare = '.btn-share-click';
var btnShareConf = '.btn-share-confirm';
var btnGoGallery = '.btn-go-gallery';
var btnSubmitNew = '.btn-submit-new';
var frmSection = '.frm-section';
var modalThankYou = '#confirmation-thankyou';
var modalSubmit = '#confirmation-submit';
var modalLike = '#confirmation-like';
var modalShare = '#confirmation-share';

var sectComplete = '#upload-complete';
var serverHost = getHost();
var host = serverHost+"listener/poten-cee";
var galleryActiveID = 0;

var hastag;

$.getScript('//connect.facebook.net/en_US/sdk.js', function(){
    FB.init({
        appId: '487951431561097',
        version: 'v2.10'
    });
});

function getHost() {
    console.log(location.href, location.href.indexOf('local.potencee.com'));

    if(location.href.indexOf('local.potencee.com') > -1)
        return 'http://tools.propelrr.net/';
    else if(location.href.indexOf('ptc-campaign.herokuapp.com') > -1 || location.href.indexOf('raw2.statichtmlapp.com') > -1)
        return 'https://tools-dev.propelrr.com/';

    return 'https://tools.propelrr.com/';
}

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
        var entryDiv = $('.video-gallery ul');
        entryDiv.html(data.list);
        if(data.list=='') {
            entryDiv.html('<div style="text-align: center;">There\'s no entry yet.<br><br>Be the first to submit your entry and get a chance to win the prize!</div>');
        }
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

    $dom.on('click', btnSubmitNew, function(e) {
        e.preventDefault();
        $(sectComplete).css({'display':'none'});
        $('#step1').css({'display':'block'});
        $('.required-file').text('');
        $('.required-file').attr('style', 'visibility:hidden;opacity:0;');
    });

    $dom.on('click', btnGoGallery, function(e) {
        e.preventDefault();
        $('.menu').find('li:nth-child(2)').find('a').trigger('click');
        $(sectComplete).css({'display':'none'});
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

            loader(modalShare, 0);
        });
    });

    $dom.on('click', '.btn-gallery-nav', function() {
        getList();
    });

    $('.menu ul li a').click(function(e){
        e.preventDefault();
        $('.menu li').removeClass('active');
        $(this).closest('li').addClass('active');

        var _this = $(this).attr('href');
        $('.step-wrap').css({'display' : 'none'});
        $(_this).css({'display' : 'block'});

    });

    $('.btn-cancel-modal').click( function(e) {
        $(this).closest('.popup-wrap').removeClass('active');

        e.preventDefault();
    });

    $('.btn-confirm-submit').click( function(e) {
        e.preventDefault();
        submitEntry();
    });

    /** Video Player **/
    $dom.on('click', '.close-video', function(e) {
        e.preventDefault();

        $('.popup-wrap').removeClass('active');
        $('.video-holder video')[0].pause();
    });

    $dom.on('click', '.play-btn', function(e) {
        e.preventDefault();
        $('#video-wrap').addClass('active');
        $('.video-holder').html('');

        var videoUrl = $(this).attr('data-html-video');
        var videoElem = '<video width="100%" height="100%" autoplay="true" preload="none" controls muted>' +
            '<source src="'+videoUrl+'" type="video/mp4" >' +
            '<source src="'+videoUrl+'" type="video/webm" >' +
            '</video>';
        $('#video-wrap').addClass('active');

        if($('.video-holder').children('*').size() > 0) {
            $('.video-holder video')[0].play();
        } else {
            $('.video-holder').html(videoElem);
        }


        $(".video-holder video").bind("ended", function() {
            console.log('end');
            $('.video-holder video')[0].autoplay=false
            $('#video-holder').removeClass('active');
        });
    });

}


function bindEvents() {
    document.getElementById("upload-file").accept = "video/*"

    $('#term-checkbox').change(function(){
        if( $('#terms-checkbox').is(':checked'))
            $('#terms-checkbox').closest('.custom-checkbox').removeClass('error')
        else
            $('#terms-checkbox').closest('.custom-checkbox').addClass('error');
    });

    $('#upload-file').change( function() {
        console.log();
        if(this.files.length) {
            $('.required-file').text(this.files[0].name);
            $('.required-file').attr('style', 'visibility:visible;opacity:1;');
        } else {
            $('.required-file').text('');
        }
    });

    $('.form-content form').submit(function(e){
        e.preventDefault();
        $('.form-content .input-wrap:not(.no-error)').addClass('error');
        isvalidate = true;

        if(!$('#complete-name').val() == '') {
            $('#complete-name').closest('.input-wrap').removeClass('error');
        } else {
            isvalidate = false;
        }

        if(!$('#p-address').val() == '') {
            $('#p-address').closest('.input-wrap').removeClass('error');
        } else {
            isvalidate = false;
        }

        if( IsEmail($('#email-add').val() )) {
            $('#email-add').closest('.input-wrap').removeClass('error');
        } else {
            isvalidate = false;
        }

        if(!$('#contact-num').val() == '' && $('#contact-num').val().length==11) {
            $('#contact-num').closest('.input-wrap').removeClass('error');
        } else {
            isvalidate = false;
        }

        if ($('#captionText').val() != '' && hastag) {
            $('#captionText').closest('.captionfield').removeClass('error');
            $('.captionfield .error-message').css({'display' : 'none'});
        } else {
            isvalidate = false;
            $('.captionfield .error-message').css({'display' : 'block'});
        }

        console.log($('#upload-file').val())
        if($('#upload-file').val()=='') {
            $('.required-file').text('You must upload a video atleast 5sec.');
            $('#upload-file').closest('.input-wrap').removeClass('error');
            $('.required-file').attr('style', 'visibility:visible;opacity:1;');

            isvalidate = false;
        }

        if( $('#term-checkbox').prop('checked')) {
            $('#term-checkbox').closest('.input-wrap').removeClass('error');
        } else {
            $('#term-checkbox').closest('.input-wrap').addClass('error');
            isvalidate = false;
        }

        if(isvalidate) {
            $('.loading-spinner-wrapper').addClass('active');
            $('#confirmation-submit').addClass('active');
        } else {
            $.sticky('Please fill all fields!', {
                'autoclose' : 5000
            });
        }

        return false;
    });
}

getList();
bindClicks();
bindEvents();

function limitText(limitField, limitCount, limitNum) {
    if (limitField.value.length > limitNum) {
        limitField.value = limitField.value.substring(0, limitNum);
    } else {
        limitCount.value = limitNum - limitField.value.length;
    }
}

$(".captionfield textarea").on("change", function(){
    hastag = isSwearWord($(this).val());
});

function isSwearWord(fieldValue) {
    var textArr = fieldValue.split(' ');
    var error = false;

    for(i in textArr) {
        if (textArr[i].toLowerCase()=='#gummiestime') {
            $('.captionfield .error-message').css({'display' : 'none'});
            error = true;
        }
    }

    return error;
}

function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

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
                    (response.code==201 ? 'You already liked this entry!':
                        'Error occurred. Please try again.'), {
                    'autoclose' : 5000
                });
                getList();
            }).always( function() {
                loader(modalLike, 0);
            }).error( function() {
                $.sticky('Something went wrong. Try again!', {
                    'autoclose' : 5000
                });
            });
        }

    });
}

function shareEntry(entryId) {
    FB.api('/me', {fields: 'id,first_name,last_name,birthday,age_range,gender,about,email,education,devices,hometown,location'}, function(response) {
        console.log(response);

        var _fname = response.first_name;
        var _lname = response.last_name;
        var _email = response.email;
        var _gender = response.gender;
        var _fbUid = response.id;
        var _fbBday = response.birthday;
        var _fbLocation = {name: response.location.name, id: response.location.id };

        FB.ui({
            method: 'share',
            href: host+'/view?id='+entryId
        }, function(response) {
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
                }).error( function() {
                    $.sticky('Something went wrong. Try again!', {
                        'autoclose' : 5000
                    });
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
        contentType: false
    }).done( function(data) {
        var message;
        if(data.code==200){
            $(frmSection).find('form').trigger('reset');
            $cmbRegions.trigger('change');

            $(sectComplete).css({'display':'block'});
            $('#step1').css({'display':'none'});
            $(modalSubmit).removeClass('active');
            message = 'Successfully submitted entry!';
        } else if(data.code==303) {
            $(modalSubmit).removeClass('active');
            message = data.message;
        } else {
            message = 'Something went wrong. Try again!';
        }

        $.sticky(message, {
            'autoclose' : 5000
        });
    }).error(function() {
        $.sticky('Something went wrong. Try again!', {
            'autoclose' : 5000
        });
    }).always(function() {
        enableScroll();
        loader(modalSubmit, 0);
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
var URL_REGIONS = host + '/getLocation?scope=province';

$cmbRegions = $("#loc_region");
$cmbCities = $("#loc_cities");

$.getJSON(URL_REGIONS,function(regions)
{
    console.log(regions)
    $("#loc_region option").remove();
    //loop through regions..
    $.each(regions, function(key,region) {
        $("<option></option>")
            .attr("value",region.Id)
            .append(region.Name)
            .appendTo($cmbRegions);
    });
    // trigger "change" to fire the #state section update process
    $cmbRegions.trigger("change");
});

$cmbRegions.on("change",function() {
    var prov = $cmbRegions.val();

    url = host + '/getLocation?scope=city&province='+prov;

    $cmbCities.html("<option>Loading...</option>");

    $.getJSON(url, function(cities) {
        currentCities=cities;
        var i=0;

        $cmbCities.empty();
        //loop through regions..
        $.each(cities, function(key,city) {
            $("<option></option>")
                .attr("value",city.Id)
                .append(city.Name)
                .appendTo($cmbCities);
        });
        // trigger "change" to fire the #state section update process
        $cmbCities.trigger("change");
    });

});
//-------------------------------END OF SELECT CASCADING-------------------------//
