w3.includeHTML();

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

    new App(document, window);

    console.log('login...');
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
};


// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
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


class HomeViewPresenter {
    constructor(view) {
        this._view = view;
        this._amendements = new Map()
    }

    route(hash) {
        console.log('route', hash);
        let anchor = hash.substr(1);
        let match = anchor.match('[0-9]+');
        console.log('route parsing', match);
        this.current_loi_id = match ? match[0] : null;
        console.log("current_loi_id", this.current_loi_id);

        this.loadAmendements()
    }


    loadAmendements() {
        if (this.current_loi_id) {
            console.log("_amendements", this._amendements);
            let current_loi_amendements = this._amendements.get(this.current_loi_id);
            if (current_loi_amendements) {
                this._view.renderAmendements(current_loi_amendements)
            } else {
                console.log('fetchingAmendements...', this.current_loi_id);
                get('../server/php/amendements.php?id_loi=' + this.current_loi_id)
                    .then(data => this.handleAmendements(data))
            }
        }
    }

    handleAmendements(data) {
        this._amendements.set(this.current_loi_id, data);
        this._view.renderAmendements(this._amendements.get(this.current_loi_id))
    }
}

// the view, passive part : fire ui event to presenter, display method to be call from presenter
// class HomeView {
//
//
//     constructor() {
//         this._homeViewPresenter = new HomeViewPresenter(this);
//         this.form = document.querySelector(".form-amendement");
//         this.bindUIEvents()
//     }
//
//     bindUIEvents() {
//         const route = () => this._homeViewPresenter.route(window.location.hash)
//
//         window.onload = route;
//         window.onhashchange = route
//     }
//
//
//
//
//
//     renderAmendements(amendements) {
//         console.log('rendering amendements', amendements);
//
//         // generate html
//         let html = '';
//         amendements.forEach((amendement) => html += this.amendementsToHtml(amendement));
//
//         // attach it to DOM
//         let list = document.querySelector(".liste-amendements");
//         list.innerHTML = html
//         FB.XFBML.parse(list);
//     }
//
//     amendementsToHtml(amendement) {
//         console.log('tohtml amendement');
//
//         let template =
//             `<div class="card liste-amendement">
//                     <div class="card-divider">
//                         ${amendement.titre}
//                     </div>
//                     <div class="card-section">
//                         <p>${amendement.texte}</p>
//                     </div>
//                     <div
//                             class="fb-like"
//                             data-share="true"
//                             data-layout="button"
//                             data-show-faces="false">
//                     </div>
//                 </div>`;
//         return template
//
//     }
//
//
//     showAmendementForm(isVisible) {
//         this.show(this.form, isVisible);
//     }
//
//     renderForm(loi) {
//         //TODO afficher le nom de la loi sur le formulaire
//         console.log('rendering form', loi);
//         this.showAmendementForm(true)
//         const element = document.querySelector("#form-amendement-title");
//         element.innerHTML = `Ajouter un amendement à la loi ${loi.titre}`;
//     }
//
//     show(element, show) {
//         if (show) {
//             element.classList.remove('hidden');
//         } else {
//             element.classList.add('hidden');
//         }
//         console.log('element.display', element.style.display)
//     }
// }
