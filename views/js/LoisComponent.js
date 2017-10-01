class LoisPresenter {
    constructor(view, eventEmitter) {
        this.view = view;
        this.eventEmitter = eventEmitter;
        this.loi_ids = [];
        this.bindAppEvent()
    }

    bindAppEvent() {
        this.eventEmitter.on("hash_changed", route => this.handle(route))
        // this.eventEmitter.on("lois_fetched", e => this.updateLois(e))
    }

    handle(route) {
        // no route = multiple values
        // route = single value
        if (route) {
            this.updateSingleLoi(route);
        }
        else if (this.loi_ids.length > 1) { // use array in memory
            this.updateLois()
        }
        else {
            this.fetchLois();
        }
    }

    fetchLois() {
        console.log('updateLois multiple with server request');
        get('../server/php/front/lois.php')
            .then(data => {
                this.loi_ids = data.ids;
                this.updateLois();
            })
            .catch(ex => console.error('updating view failed', ex))
    }

    updateSingleLoi(route) {
        console.log('updateLois single with cache');
        this.loi_ids = [route];
        this.updateLois()
    }

    updateLois() {
        this.eventEmitter.fire("lois_fetched", this.loi_ids);
        this.view.renderLois(this.loi_ids)
    }
}

class LoisView {

    constructor(html_root, eventEmitter) {
        this.html_root = html_root;
        this.presenter = new LoisPresenter(this, eventEmitter);
        this.bindUiEvent()
    }

    bindUiEvent() {
        //onsubmit?
    }

    renderLois(lois_ids) {
        console.log('rendering Lois', lois_ids);
        this.clearChildren();
        if (lois_ids.length) {
            this.appendNewChildren(lois_ids);
        }
    }

    clearChildren() {
        while (this.html_root.firstChild) {
            this.html_root.removeChild(this.html_root.firstChild);
        }
    }

    appendNewChildren(lois_ids) {
        const fragment = document.createDocumentFragment();

        for (let loi_id of lois_ids) {
            //TODO mettre la construction de "el" dans la View
            const el = document.createElement('article');
            el.classList.add("card", "detail-loi");
            const node = fragment.appendChild(el);
            new LoiView(node, this.presenter.eventEmitter, loi_id)
        }
        // attach it to DOM
        this.html_root.appendChild(fragment);
    }
}