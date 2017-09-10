(function (d, s, id) {
    let js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/fr_FR/sdk.js#xfbml=1&version=v2.10&appId=1405239716228196";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
// appId: '341958356242416', //maxx-app-1 - Test1