class AmendementPresenter {

    constructor(view, eventEmitter, id) {
        this.view = view;
        this.eventEmitter = eventEmitter;
        this.bindAppEvent();
        this.fetchAmendement(id)

    }

    bindAppEvent() {
        //?
    }


    fetchAmendement(amendement_id) {
        console.log('fetchingAmendement...', amendement_id);
        get('../server/php/front/amendement.php?amendement_id=' + amendement_id)
            .then(data => this.updateAmendement(data))
    }

    updateAmendement(amendement) {
        this.eventEmitter.fire("amendement_fetched", amendement);
        this.view.updateAmendement(amendement);
    }
}

class AmendementView {

    constructor(html_root, eventEmitter, id) {
        this.html_root = html_root;
        this.html_root.innerHTML = "...";
        this.presenter = new AmendementPresenter(this, eventEmitter, id);
        this.bindUiEvent()
    }

    bindUiEvent() {
        //?
    }

    updateAmendement(amendement) {
        this.html_root.innerHTML =
            `<div class="card-divider">
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
                </div>`;
        FB.XFBML.parse(this.html_root); //to make diplay facebook stuff
    }
}