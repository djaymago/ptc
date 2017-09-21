<!doctype html>
<html class="no-js" lang="">
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Poten Cee</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

    <link rel="stylesheet" href="css/style.css" media="all"/>
    <link rel="stylesheet" href="js/loader/style.css" media="all"/>
    <link rel="stylesheet" href="js/sticky/sticky.min.css" media="all"/>

    <!--[if lt IE 9]> <script src="js/css3-mediaqueries.js"></script> <![endif]-->
    <script src="js/html5.js"></script>
</head>
<body>
<section id="main-container">
    <div class="popup-wrap" id="video-wrap">
        <div class="popup-content">
            <a href="#" class="close-video"><img src="images/page_template/close.png" alt=""></a>
            <div class="video-holder">

            </div>
        </div>
    </div>

    <div class="popup-wrap default-popup" id="confirmation-submit">
        <div class="popup-content">
            <h2>Are you sure you want to submit this entry?</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
            <div class="text-center p-btn-wrapper">
                <a href="#" class="btn btn-confirm-submit">Submit</a>
                <a href="#" class="btn btn-ghost btn-cancel-modal">Cancel</a>
            </div>
        </div>
    </div>

    <div class="popup-wrap default-popup" id="confirmation-thankyou">
        <div class="popup-content">
            <h2>Thank you for submitting your entry.</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
            <div class="text-center p-btn-wrapper">
                <a href="#" class="btn btn-go-gallery">Go to Gallery</a>
                <a href="#" class="btn btn-ghost btn-cancel-modal">Submit another</a>
            </div>
        </div>
    </div>

    <div class="popup-wrap default-popup" id="confirmation-like">
        <div class="popup-content">
            <h2>Confirm Like</h2>
            <p>Are you sure you want to like this entry? </p>
            <div class="text-center p-btn-wrapper">
                <a href="#" class="btn btn-like-confirm">Confirm Like</a>
                <a href="#" class="btn btn-ghost btn-cancel-modal">Cancel</a>
            </div>
        </div>
    </div>

    <div class="popup-wrap default-popup" id="confirmation-share">
        <div class="popup-content">
            <h2>Confirm Share</h2>
            <p>Are you sure you want to share this entry? </p>
            <div class="text-center p-btn-wrapper">
                <a href="#" class="btn btn-share-confirm">Confirm Share</a>
                <a href="#" class="btn btn-ghost btn-cancel-modal">Cancel</a>
            </div>
        </div>
    </div>

    <header>
        <div class="container">
            <div class="menu text-center">
                <ul>
                    <li class="active"><a href="#step1">Submit Your Entry</a></li>
                    <li><a href="#step2">Video Gallery</a></li>
                </ul>
            </div>
        </div>
    </header>
    <section id="main-wrapper">
        <div id="step1" class="step-wrap"  style="display: block;">
            <div class="container">
                <div class="head-title">
                    <h1 class="text-center">The Gummies Fun Choice Awards</h1>
                    <h3><strong>Prizes For Each of The 12 Winners:</strong></h3>
                    <ul class="prizes">
                        <li>Php 1000 worth of Poten-Cee Vitamin C Gummies (6 Bottles of Poten-Cee Gummies 30’s)</li>
                        <li>Two (2) passes to Kidzania</li>
                    </ul>
                </div>

                <div class="banner"><img src="images/banner.jpg" alt=""></div>

                <div class="join-now-wrap text-center">
                    <a href="#" class="btn btn-large btn-green" data-text="Join Now!">Join Now!</a>
                </div>

                <div class="form-wrapper frm-section" style="display:none;">
                    <h2 class="text-center">Dear Mommies, Please fill out the form below to enter</h2>
                    <hr>
                    <div class="form-content">
                        <form method="post" id="formEntry">
                            <input type="hidden" name="account_id" id="account_id" value="0">
                            <input type="hidden" name="status" id="status" value="1">
                            <div class="input-wrap">
                                <label for="complete-name">Complete Name:</label>
                                <input id="complete-name" type="text" name="fullname" value="" placeholder="">
                            </div>
                            <div class="input-wrap">
                                <label for="contact-num">Contact Number:</label>
                                <input id="contact-num" type="tel" name="contact" value="" placeholder="(09) + 9 digits">
                            </div>
                            <div class="input-wrap">
                                <label for="email-add">Email Address:</label>
                                <input id="email-add" type="email" name="email" value="" placeholder="">
                            </div>
                            <div class="input-wrap">
                                <label for="p-address">Present Address:</label>
                                <div class="present-add">
                                    <div class="input-row">
                                        <div class="input-half">
                                            <label>Regions:</label>
                                            <select id="loc_region" name="region">
                                                <option>Loading...</option>
                                            </select>
                                        </div>
                                        <div class="input-half">
                                            <label>City:</label>
                                            <select id="loc_cities" name="city">
                                                <option>Loading...</option>
                                            </select>
                                        </div>
                                    </div><br>
                                    <label>Address:</label>
                                    <input id="p-address" type="text" name="address" value="" placeholder="">
                                </div>
                            </div>
                            <div class="input-wrap">
                                <label>Upload Video:</label>
                                <div class="file-upload">
                                    <label for="upload-file" class="file-upload__label">Choose File</label>

                                    <input id="upload-file" class="file-upload__input" type="file" name="file_upload">
                                </div>

                                <div class="wavy-loader uploader-loader">
                                    <span></span><span></span><span></span>
                                </div>
                                <span class="required-file">You must upload a video atleast 10sec.</span>
                            </div>
                            <div class="input-wrap no-error">
                                <label>Caption:</label>
                                <div class="textarea-wrap">
                                    <textarea name="description" onKeyDown="limitText(this.form.description,this.form.countdown,100);"  onKeyUp="limitText(this.form.description,this.form.countdown,100);"></textarea>
                                    <p>(Maximum characters: 100) You have <input readonly type="text" name="countdown" size="3" value="100"> characters left.</p>
                                </div>
                            </div>
                            <div class="input-wrap">
                                <label>&nbsp;</label>
                                <div class="custom-checkbox">
                                    <input type="checkbox" id="term-checkbox"/>
                                    <label for="term-checkbox">I accept terms and conditions</label>
                                </div>
                            </div>
                            <div class="input-wrap">
                                <label>&nbsp;</label>
                                <input type="submit" class="btn" name="" value="Submit">
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div id="step2" class="step-wrap" style="display: none;">
            <div class="container">
                <div class="video-gallery">
                    <ul>
                        <li>
                            <div class="vg-wrap active">
                                <div class="vg-item">
                                    <a href="#" class="play-btn" data-html-video="spark.mp4">
                                        <div class="vg-thumg">
                                            <img src="images/page_template/wing-video1.jpg" alt="">
                                        </div>
                                        <div class="vg-caption">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et #samplehastag </p>
                                        </div>
                                    </a>

                                </div>
                                <p class="vg-btn vg-like"><a href="#"><span><img src="images/page_template/like.png" alt=""></span> <strong>100</strong> Likes</a></p>
                                <p class="vg-btn vg-share"><a href="#"><span><img src="images/page_template/share.png" alt=""></span> <strong>2</strong> Share</a></p>
                            </div>
                        </li>
                        <li>
                            <div class="vg-wrap">
                                <div class="vg-item">
                                    <a href="#" class="play-btn" data-html-video="">
                                        <div class="vg-thumg">
                                            <img src="images/page_template/wing-video1.jpg" alt="">
                                        </div>
                                        <div class="vg-caption">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  </p>
                                        </div>
                                    </a>

                                </div>
                                <p class="vg-btn vg-like"><a href="#"><span><img src="images/page_template/like.png" alt=""></span> <strong>100</strong> Likes</a></p>
                                <p class="vg-btn vg-share"><a href="#"><span><img src="images/page_template/share.png" alt=""></span> <strong>2</strong> Share</a></p>
                            </div>
                        </li>
                        <li>
                            <div class="vg-wrap">
                                <div class="vg-item">
                                    <a href="#" class="play-btn" data-html-video="spark.mp4">
                                        <div class="vg-thumg">
                                            <img src="images/page_template/wing-video1.jpg" alt="">
                                        </div>
                                        <div class="vg-caption">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                                        </div>
                                    </a>

                                </div>
                                <p class="vg-btn vg-like"><a href="#"><span><img src="images/page_template/like.png" alt=""></span> <strong>100</strong> Likes</a></p>
                                <p class="vg-btn vg-share"><a href="#"><span><img src="images/page_template/share.png" alt=""></span> <strong>2</strong> Share</a></p>
                            </div>
                        </li>
                        <li>
                            <div class="vg-wrap">
                                <div class="vg-item">
                                    <a href="#" class="play-btn" data-html-video="spark.mp4">
                                        <div class="vg-thumg">
                                            <img src="images/page_template/wing-video1.jpg" alt="">
                                        </div>
                                        <div class="vg-caption">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, </p>
                                        </div>
                                    </a>

                                </div>
                                <p class="vg-btn vg-like"><a href="#"><span><img src="images/page_template/like.png" alt=""></span> <strong>100</strong> Likes</a></p>
                                <p class="vg-btn vg-share"><a href="#"><span><img src="images/page_template/share.png" alt=""></span> <strong>2</strong> Share</a></p>
                            </div>
                        </li>
                        <li>
                            <div class="vg-wrap">
                                <div class="vg-item">
                                    <a href="#" class="play-btn" data-html-video="spark.mp4">
                                        <div class="vg-thumg">
                                            <img src="images/page_template/wing-video1.jpg" alt="">
                                        </div>
                                        <div class="vg-caption">
                                            <p>Lorem ipsum dolor sit amet, consectetur  </p>
                                        </div>
                                    </a>

                                </div>
                                <p class="vg-btn vg-like"><a href="#"><span><img src="images/page_template/like.png" alt=""></span> <strong>100</strong> Likes</a></p>
                                <p class="vg-btn vg-share"><a href="#"><span><img src="images/page_template/share.png" alt=""></span> <strong>2</strong> Share</a></p>
                            </div>
                        </li>
                        <li>
                            <div class="vg-wrap">
                                <div class="vg-item">
                                    <a href="#" class="play-btn" data-html-video="spark.mp4">
                                        <div class="vg-thumg">
                                            <img src="images/page_template/wing-video1.jpg" alt="">
                                        </div>
                                        <div class="vg-caption">
                                            <p>Lorem ipsum dolor sit amet, </p>
                                        </div>
                                    </a>

                                </div>
                                <p class="vg-btn vg-like"><a href="#"><span><img src="images/page_template/like.png" alt=""></span> <strong>100</strong> Likes</a></p>
                                <p class="vg-btn vg-share"><a href="#"><span><img src="images/page_template/share.png" alt=""></span> <strong>2</strong> Share</a></p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</section>
<footer></footer>
<script src="js/lib/jquery.min.js"></script>
<script src="js/lib/jquery-ui.min.js"></script>
<script src="js/plugins.js"></script>
<script src="js/custom.js"></script>
<script src="js/app_script.js"></script>
<script src="js/loader/script.js"></script>
<script src="js/sticky/sticky.min.js"></script>

<script type="text/javascript">
    $('.menu ul li a').click(function(e){
        e.preventDefault();
        $('.menu li').removeClass('active');
        $(this).closest('li').addClass('active');

        var _this = $(this).attr('href');
        $('.step-wrap').css({'display' : 'none'});
        $(_this).css({'display' : 'block'});

    });

    $('.close-video').click(function(e){
        e.preventDefault();

        $('.popup-wrap').removeClass('active');
        $('.video-holder video')[0].pause();
    });

    $('.play-btn').click(function(e){
        e.preventDefault();
        $('#video-wrap').addClass('active');
        $('.video-holder').html('');
    });

    $('.play-btn').click(function(e){
        e.preventDefault();

        var videoUrl = $(this).attr('data-html-video');
        var videoElem = '<video width="100%" height="100%" autoplay="true" preload="none">' +
            '<source src="video/'+videoUrl+'" type="video/mp4">' +
            '<source src="video/'+videoUrl+'" type="video/webm">' +
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

    $('.btn-cancel-modal').click( function(e) {
        $(this).closest('.popup-wrap').removeClass('active');

        e.preventDefault();
    });

    $('.btn-confirm-submit').click( function(e) {
        e.preventDefault();
        submitEntry();
    });

    $('#term-checkbox').change(function(){
        if( $('#terms-checkbox').is(':checked'))
            $('#terms-checkbox').closest('.custom-checkbox').removeClass('error')
        else
            $('#terms-checkbox').closest('.custom-checkbox').addClass('error');
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

        if(!$('#upload-file').val()=='') {
            $('#upload-file').closest('.input-wrap').removeClass('error');
        } else {
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
        }

        return false;
    });

    function limitText(limitField, limitCount, limitNum) {
        if (limitField.value.length > limitNum) {
            limitField.value = limitField.value.substring(0, limitNum);
        } else {
            limitCount.value = limitNum - limitField.value.length;
        }
    }

    function IsEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }
</script>
</body>
</html>