class App {

    constructor(root, window) {
        this.root = root;
        this.window = window;
        this.eventEmitter = new EventEmitter();
        this.bindUIEvents();
        //TODO new header component
        new LoisView(
            root.querySelector("#liste-top-lois"),
            this.eventEmitter);
        //TODO new amendent component
        this.route(window.location.hash)
    }

    bindUIEvents() {
        const route = () => this.route(window.location.hash);
        // window.onload = route;
        window.onhashchange = route
    }

    route(hash) {
        console.log('hash', hash);
        let anchor = hash.replace("#", "");
        let match = anchor.match("[0-9]+");
        console.log('route parsing', match);
        //TODO
        const route = match ? match[0] : "";
        console.log("route", route);
        this.eventEmitter.fire("hash_changed", route)
    }

}