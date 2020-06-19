function Event(name) {
    this.name = name;
    this.callbacks = [];
}

Event.prototype.registerCallback = function (callback) {
    this.callbacks.push(callback);
}

function Reactor() {
    this.events = {};
}

Reactor.prototype.registerEvent = function (eventName) {
    var event = new Event(eventName);
    this.events[eventName] = event;
};


// when dispatching an event, we can send in eventArgs to call the callbacks with
Reactor.prototype.dispatchEvent = function (eventName, eventArgs) {
    this.events[eventName].callbacks.forEach(function (callback) {
        callback(eventArgs);
    });
};

Reactor.prototype.addEventListener = function (eventName, callback) {
    this.events[eventName].registerCallback(callback);
};

exports.data = {
    reactor: new Reactor(),
};
