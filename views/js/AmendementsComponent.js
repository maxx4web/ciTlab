class AmendementsPresenter {

    constructor(view, eventEmitter) {
        this.view = view;
        this.eventEmitter = eventEmitter;
        this.bindAppEvent()

    }

    bindAppEvent() {
        this.eventEmitter.on("hash_changed", route => this.handle(route))
    }

    handle(route) {
        // _ -> # : load & ids = liste
        // # -> #' : load & ids = liste
        // _ -> _ : clear & ids = vide
        // # -> _ : clear & ids = vide

        if (route) {
            this.fetchAmendements(route)
        } else {
            this.view.renderAmendements([]);
        }
    }

    fetchAmendements(loi_id) {
        console.log('fetchingAmendements...', loi_id);
        get('../server/php/amendements.php?loi_id=' + loi_id)
            .then(data => this.updateAmendements(data.ids))
    }

    updateAmendements(amendements) {
        this.eventEmitter.fire("amendements_fetched", amendements);
        this.view.renderAmendements(amendements);
    }
}

class AmendementsView {

    constructor(html_root, eventEmitter) {
        this.html_root = html_root;
        this.presenter = new AmendementsPresenter(this, eventEmitter);
        this.bindUiEvent()
    }

    bindUiEvent() {
        //?
    }

    renderAmendements(amendements_ids) {
        console.log('rendering Amendements', amendements_ids);
        this.clearChildren();
        if (amendements_ids.length) {
            this.appendNewChildren(amendements_ids);
        }
    }

    clearChildren() {
        while (this.html_root.firstChild) {
            this.html_root.removeChild(this.html_root.firstChild);
        }
    }

    appendNewChildren(amendements_ids) {
        console.log('append New Children');
        const fragment = document.createDocumentFragment();

        for (let amendement_id of amendements_ids) {
            //TODO mettre la construction de "el" dans la View
            const el = document.createElement('div');
            el.classList.add("card", "liste-amendement");
            const node = fragment.appendChild(el);
            console.log('creation Amendement', amendement_id);
            new AmendementView(node, this.presenter.eventEmitter, amendement_id)
        }
        // attach it to DOM
        this.html_root.appendChild(fragment);
    }

}