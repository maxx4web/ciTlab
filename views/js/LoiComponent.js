class LoiPresenter {
    constructor(view, eventEmitter, id) {
        this.view = view;
        this.eventEmitter = eventEmitter;
        this.id = id;
        this.bindAppEvent();
        this.fetchLois(id)
    }

    bindAppEvent() {
        // this.eventEmitter.on("loi_fetched", e => this.updateLoi(e))
    }

    fetchLois(id) {
        //lazy load
        if (this.loi) {
            console.log('updateLoi with cache');
            this.updateLoi(this.loi);
        } else { //vide
            console.log('updateLoi with server request');
            get(`../server/php/loi.php?id=${id}`)
                .then(data => {
                    this.loi = data;
                    this.updateLoi();
                })
        }
    }

    updateLoi() {
        this.eventEmitter.fire("loi_fetched", this.loi);
        this.view.updateLoi(this.loi)
    }
}

class LoiView {

    constructor(html, eventEmitter, id) {
        this.html = html;
        this.html.innerHTML = "...";
        this.presenter = new LoiPresenter(this, eventEmitter, id);
        this.bindUiEvent()
    }

    bindUiEvent() {
        // click?
    }

    updateLoi(loi) {
        //TODO delete <a> and handle with UI event
        console.log('rendering Loi', loi);
        this.html.innerHTML =
            `<a href="#${loi.id}">
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
                <div class="fb-comments" data-href="http://maxxwebxtb.cluster023.hosting.ovh.net/citlab/views/index.html#${loi.id}" data-numposts="5" width="100%"></div>
            </a>`;
        FB.XFBML.parse(this.html);
    }
}