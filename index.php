<!doctype html>
<html class="no-js" lang="">
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Poten Cee</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

    <link rel="stylesheet" href="https://ptc-campaign.herokuapp.com/css/style.css" media="all"/>
    <link rel="stylesheet" href="https://ptc-campaign.herokuapp.com/js/loader/style.css" media="all"/>
    <link rel="stylesheet" href="https://ptc-campaign.herokuapp.com/js/sticky/sticky.min.css" media="all"/>

<!--    <link rel="stylesheet" href="css/style.css" media="all"/>-->
<!--    <link rel="stylesheet" href="js/loader/style.css" media="all"/>-->
<!--    <link rel="stylesheet" href="js/sticky/sticky.min.css" media="all"/>-->

    <!--[if lt IE 9]> <script src="https://ptc-campaign.herokuapp.com/js/css3-mediaqueries.js"></script> <![endif]-->
    <script src="https://ptc-campaign.herokuapp.com/js/html5.js"></script>

    <style>
        .separator-header { width: 70%; border: 1px solid #eee; margin-bottom: 20px; }
    </style>
</head>
<body>
<section id="main-container">
    <div class="popup-wrap" id="video-wrap">
        <div class="popup-content">
            <a href="#" class="close-video"><img src="https://ptc-campaign.herokuapp.com/images/page_template/close.png" alt=""></a>
            <div class="video-holder">
            </div>
        </div>
    </div>

    <div class="popup-wrap default-popup" id="confirmation-submit">
        <div class="popup-content">
            <h2>Are you sure you want to submit this entry?</h2>
            <p>NOTE: We recomment you upload *.mp4 file for faster submission, otherwise it will take a minutes due to conversion.</p>
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
                    <li><a class="btn-gallery-nav" href="#step2">Video Gallery</a></li>
                </ul>
            </div>
        </div>
    </header>
    <hr class="separator-header">
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

                <div class="banner"><img src="https://ptc-campaign.herokuapp.com/images/banner.jpg" alt=""></div>

                <div class="join-now-wrap text-center">
                    <a href="#" class="btn btn-large btn-green" data-text="Join Now!">Submit Entry Now!</a>
                </div>

                <div class="form-wrapper frm-section" style="display:none;">
                    <h2 class="text-center">Dear Mommies, Please fill out the form below to enter</h2>
                    <hr>
                    <div class="form-content">
                        <form method="post" id="formEntry">
                            <input type="hidden" name="account_id" id="account_id" value="0">
                            <input type="hidden" name="status" id="status" value="-1">
                            <input type="hidden" name="week" id="week_id" value="1">
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
                                            <label>Province:</label>
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

                                    <input id="upload-file" class="file-upload__input" type="file" accept="video/*" name="file_upload">
                                </div>
                                <span class="required-file">You must upload a video atleast 10sec.</span>
                            </div>
                            <div class="input-wrap captionfield">
                                <label>Caption:</label>
                                <div class="textarea-wrap">
                                    <textarea name="description" id="captionText" onKeyDown="limitText(this.form.description,this.form.countdown,160);"  onKeyUp="limitText(this.form.description,this.form.countdown,160);"></textarea>
                                    <p class="error-message " style="display: none;"> This field is required*</p>
                                    <p class="hastag-info">Must include <span>#GummiesTime</span></p>
                                    <p>(Maximum characters: 100) You have <input readonly type="text" name="countdown" size="3" value="160"> characters left.</p>
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
                    </ul>
                </div>
            </div>
        </div>
    </section>
</section>
<footer></footer>
<script src="https://ptc-campaign.herokuapp.com/js/lib/jquery.min.js"></script>
<script src="https://ptc-campaign.herokuapp.com/js/lib/jquery-ui.min.js"></script>
<script src="https://ptc-campaign.herokuapp.com/js/plugins.js"></script>
<script src="https://ptc-campaign.herokuapp.com/js/custom.js"></script>
<script src="https://ptc-campaign.herokuapp.com/js/app_script.js"></script>
<script src="https://ptc-campaign.herokuapp.com/js/loader/script.js"></script>
<script src="https://ptc-campaign.herokuapp.com/js/sticky/sticky.min.js"></script>
<!--<script src="js/lib/jquery.min.js"></script>-->
<!--<script src="js/lib/jquery-ui.min.js"></script>-->
<!--<script src="js/plugins.js"></script>-->
<!--<script src="js/custom.js"></script>-->
<!--<script src="js/app_script.js"></script>-->
<!--<script src="js/loader/script.js"></script>-->
<!--<script src="js/sticky/sticky.min.js"></script>-->
</body>
</html>