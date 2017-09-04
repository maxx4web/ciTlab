/**
 * Created by maxx on 11/07/2017.
 */

w3.includeHTML();

class HomeViewPresenter {
    constructor(ecmaView) {
        this._view = ecmaView;
        this._amendements = new Map()
    }

    route(hash) {
        console.log('route', hash);
        let anchor = hash.substr(1);

        if (!anchor) {
            this._view.showAmendementForm(false)
        }
        this.loadLois();

        let match = anchor.match('[0-9]+');
        console.log('route parsing', match);
        if (match) {
            this._view.showAmendementForm(true);
            this.loadAmendements(match[0])
        }
    }

    loadLois() {
        console.log("_lois", this._lois);
        let lois = this._lois;
        if (lois) {
            this._view.renderLois(lois)
        } else {
            console.log('fetching Lois...');
            this.get('/lois')
                .then(data => this.handleLois(data))
        }
    }

    handleLois(data) {
        this._lois = data;
        this._view.renderLois(data)
    }

    loadAmendements(loi_id) {
        console.log("_amendements", this._amendements);
        let loi_amendements = this._amendements.get(loi_id);
        if (loi_amendements) {
            this._view.renderAmendements(loi_amendements)
        } else {
            console.log('fetchingAmendements...', loi_id);
            this.get('/amendements?id_loi=' + loi_id)
                .then(data => this.handleAmendements(loi_id, data))
        }
    }

    handleAmendements(loi_id, data) {
        this._amendements.set(loi_id, data);
        this._view.renderAmendements(this._amendements.get(loi_id))
    }

    get(url) {
        return fetch(url)
            .then(function (response) {
                return response.json()
            }).then(function (json) {
                return json;
            }).catch(function (ex) {
                console.log('parsing failed', ex)
            })
    }
}

// the view, passive part : fire ui event to presenter, display method to be call from presenter
class HomeView {


    constructor() {
        this._homeViewPresenter = new HomeViewPresenter(this);
        this.form = document.querySelector(".form-amendement");
        this.bindUIEvents()
    }

    bindUIEvents() {
        window.onload = e => {
            this._homeViewPresenter.route(window.location.hash)
        };
        window.onhashchange = e => {
            this._homeViewPresenter.route(window.location.hash)
        }
    }


    renderLois(lois) {
        console.log('rendering Lois', lois);

        // generate html
        let html = '';
        lois.forEach((loi) => html += this.loiToHtml(loi));

        // attach it to DOM
        let list = document.querySelector(".liste-top-lois");
        list.innerHTML = html;

        //binding click event
        let loisElm = document.querySelectorAll(".detail-loi");
        loisElm.forEach((elm, index) => {
            elm.onclick = e => {
                console.log('event', e);

            }
        });

    }

    loiToHtml(loi) {
        console.log('tohtml loi');
        let template =
            `<a href="#${loi.id}"><article class="card detail-loi">
                    <div class="card-divider">
                        ${loi.titre}
                    </div>
                    <div class="card-section">
                        <p>${loi.detail}</p>
                    </div>
                    <div
                            class="fb-like"
                            data-share="true"
                            data-layout="button"
                            data-show-faces="false">
                    </div>
                </article></a>`;
        return template
    }


    renderAmendements(amendements) {
        console.log('rendering amendements', amendements);

        // generate html
        let html = '';
        amendements.forEach((amendement) => html += this.amendementsToHtml(amendement));

        // attach it to DOM
        let list = document.querySelector(".liste-amendements");
        list.innerHTML = html

    }

    amendementsToHtml(amendement) {
        console.log('tohtml amendement');

        let template =
            `<div class="card liste-amendement">
                    <div class="card-divider">
                        ${amendement.titre}
                    </div>
                    <div class="card-section">
                        <p>${amendement.texte}</p>
                    </div>
                    <div
                            class="fb-like"
                            data-share="true"
                            data-layout="button"
                            data-show-faces="false">
                    </div>
                </div>`;
        return template

    }


    showAmendementForm(isVisible) {
        this.show(this.form, isVisible);
    }

    show(element, show) {
        if (show) {
            element.classList.remove('hidden');
        } else {
            element.classList.add('hidden');
        }
        console.log('element.display', element.style.display)
    }
}

new HomeView();
