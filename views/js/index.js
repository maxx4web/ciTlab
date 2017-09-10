w3.includeHTML();

(function (d, s, id) {
    let js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/fr_FR/sdk.js#xfbml=1&version=v2.10&appId=1405239716228196";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
// appId: '341958356242416', //maxx-app-1 - Test1

window.fbAsyncInit = function () {
    // Now that we've initialized the JavaScript SDK, we call
    // FB.getLoginStatus().  This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.  They can be:
    //
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
    // These three cases are handled in the callback function.

    document.getElementById('login-button').classList.add('hidden');
    console.log('login...');

    const html = document.querySelector("#liste-top-lois");
    new LoisView(html, new EventEmitter());

    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
};


// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log('LoginStatus response ', response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        // Logged into your app and Facebook.
        testAPI();
        document.getElementById('login-button').classList.add('hidden');
    } else {
        // The person is not logged into your app or we are unable to tell.
        document.getElementById('login-button').classList.remove('hidden');
        document.getElementById('status').innerHTML = 'Please log into this app.';
    }
}

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me?fields=id,name,email', function (response) {
        console.log('/me response ', response);
        document.getElementById('status').innerHTML =
            'Thanks for logging in, ' + response.name + '!';
        fetch("../server/php/connect.php?user_id = " + response.id)
            .then(response => response.text())
            .then(text => {
                const sessionId = text;
                console.log('sessionId', sessionId)
            })
    });
}


// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}

