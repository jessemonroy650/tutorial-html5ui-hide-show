/*
    Date: 2016-01-01
*/
var app = {
    // Some scoped variables

    onDeviceReady : function () {
        //alert("device ready.");
        console.log("device ready.");
        if (device.platform === "iOS") {
            // deals with post-iOS-7 change that covers the status bar
            // http://coenraets.org/blog/2013/09/phonegap-and-cordova-with-ios-7/
            document.body.style.marginTop = "20px";
        } else if (device.platform == 'Android') {
            // Get rid of 300ms delay 
            document.addEventListener('DOMContentLoaded', function() { FastClick.attach(document.body); }, false);
        } else if (device.platform == 'browser') {
            console.log("You are using a brower.");
        }

    }
};

// Wait for PhoneGap to load
document.addEventListener("deviceready", app.onDeviceReady, false);

// This JS object is create to support `app.onDeviceReady()`, and the timeout below.
// When `deviceready` fires, this variable is overwritten.
// The hope is that "Cordova/Phonegap" have completed before the timeout.
var device = {platform:'browser'};

// This timeout check to see if `cordova.js` has loaded the `device` plugin.
setTimeout(function() {
        console.log("timeout fired.");
        if (! ('cordova' in device) ) {
            app.onDeviceReady();
        }
    },
    2000);

// Note: this is created last with the hope that the entire DOM has loaded.
// If needed, we could wrap this with a function.
// The best time to load this binding is after the `deviceready` event has fired.
// 
var  isVisible = 0; // if element initially hidden, then this to zero (0), else one (1).

$('#toggle').on('click', function() {
    console.log("isVisible:" + isVisible );
    if (isVisible) {
        $('#togglePane').addClass('hide');
        isVisible = 0;
    } else {
        $('#togglePane').removeClass('hide');
        isVisible = 1;
    }
});

