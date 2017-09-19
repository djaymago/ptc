var $dom = $(document);
var host = "http://tools.propelrr.net/listener/poten-cee";

$.getScript('//connect.facebook.net/en_US/sdk.js', function(){
    FB.init({
        appId: '487951431561097',
        version: 'v2.10'
    });
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
            saveUserFBId(response.id);
        });
    } else {

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

function submitEntry() {
    var formData = new FormData(document.getElementById('formEntry'));

    var url = host+'/submitEntry';
    $.ajax({
        url: url,
        type: 'POST',
        data: formData,
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


//-------------------------------SELECT CASCADING-------------------------//
//demo:  https://codepen.io/medunes/pen/GWoojz
var currentCities=[];
// This is a demo API key that can only be used for a short period of time, and will be unavailable soon. You should rather request your API key (free)  from http://battuta.medunes.net/
var BATTUTA_KEY="00000000000000000000000000000000";
// This is the country code
var COUNTRY_CODE="ph";
// Populate country select box from battuta API
var URL_REGIONS="https://restcountries.eu/rest/v2/alpha/ph";

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
