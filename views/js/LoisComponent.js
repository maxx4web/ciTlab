class LoisPresenter {
    constructor(view, eventEmitter) {
        this.view = view;
        this.eventEmitter = eventEmitter;
        this.loi_ids = [];
        this.bindAppEvent()
    }

    bindAppEvent() {
        this.eventEmitter.on("hash_changed", e => this.fetchLois(e))
        // this.eventEmitter.on("lois_fetched", e => this.updateLois(e))
    }

    fetchLois(route) {
        if (route) {
            console.log('updateLois single with cache');
            this.loi_ids = [route];
            this.updateLois()
        }
        else if (this.loi_ids.length > 1) {
            console.log('updateLois multiple with cache');
            this.updateLois()
        }
        else {
            console.log('updateLois multiple with server request');
            get('../server/php/lois.php')
                .then(data => {
                    this.loi_ids = data.ids;
                    this.updateLois();
                })
                .catch(ex => console.error('updating view failed', ex))
        }
    }

    updateLois() {
        this.eventEmitter.fire("lois_fetched", this.loi_ids);
        this.view.renderLois(this.loi_ids)
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
        while (this.html.firstChild) {
            this.html.removeChild(this.html.firstChild);
        }
        if (lois_ids.length) {
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