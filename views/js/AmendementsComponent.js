class LoisPresenter {
    constructor(view, eventEmitter) {
        this.view = view;
        this.eventEmitter = eventEmitter;
        this.lois = [];
        this.bindAppEvent();
        this.fetchLois()
    }

    bindAppEvent() {
        this.eventEmitter.on("hash_changed", e => this.fetchLois(e))
        // this.eventEmitter.on("lois_fetched", e => this.updateLois(e))
    }

    fetchLois() {
        //lazy load
        if (this.lois.length) {
            console.log('updateLois with cache');
            this.updateLois(this.lois);
        } else {
            console.log('updateLois with server request');
            get('../server/php/lois.php')
                .then(data => {
                    this.lois = data;
                    this.updateLois();
                })
                .catch(ex => console.log('updating view failed', ex))
        }
    }

    updateLois() {
        this.eventEmitter.fire("lois_fetched", this.lois);
        this.view.renderLois(this.lois.ids)
    }
}

class LoisView {

    constructor(html, eventEmitter) {
        this.html = html;
        this.presenter = new LoisPresenter(this, eventEmitter);
        this.bindUiEvent()
    }

    bindUiEvent() {
        //onsubmit?
    }

    renderLois(lois_ids) {
        console.log('rendering Lois', lois_ids);

        if (lois_ids) {
            //     // generate html
            //
            const fragment = document.createDocumentFragment();

            for (let loi_id of lois_ids) {
                const el = document.createElement('article');
                el.classList.add("card", "detail-loi");
                const node = fragment.appendChild(el);
                new LoiView(node, this.presenter.eventEmitter, loi_id)
            }
            // attach it to DOM
            this.html.appendChild(fragment);
        }
    }
}