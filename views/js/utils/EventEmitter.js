class EventEmitter {
    constructor() {
        this.listeners = new Map();
    }

    on(label, callback) {
        this.listeners.has(label) || this.listeners.set(label, []);
        this.listeners.get(label).push(callback);
    }

//        removeListener(label, callback) { }

    fire(label, event) {
        let callbacks = this.listeners.get(label);

        if (callbacks && callbacks.length) {
            callbacks.forEach((callback) => {
                callback(event);
            });
            return true;
        }
        return false;
    }
}