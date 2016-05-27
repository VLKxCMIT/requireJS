(function entryPoint() {
    var src = document.getElementsByTagName('script')[0].getAttribute('data-main');
    if (src) {
        var mainJs = document.createElement('script');
        mainJs.setAttribute('src', src);
        document.head.appendChild(mainJs);
    } else {
        console.log('entry point not found');
    }
})();

function requirejs(deps, func) {
    var module = new Module(deps, func);
    module.load();
}

function define(deps, func) {
    var module = new Module(deps, func);
    module.load();
}

function Module(deps, func) {
    this.deps = deps;
    this.depsCount = deps.length;
    this.onLoad = func;
}

Module.prototype = {
    load: function() {
        var self = this;
        for (var i = 0; i < this.deps.length; i++) {
            var depJs = document.createElement('script');
            depJs.src = this.deps[i];
            depJs.onload = onreadystatechange = function() {
                self.depsCount--;
            };
            document.head.appendChild(depJs);
        }
        var intervalId = setInterval(function() {
            if (!self.depsCount) {
                clearInterval(intervalId);
                self.onLoad.call(self.onLoad);
            }
        }, 1000);
    }
};