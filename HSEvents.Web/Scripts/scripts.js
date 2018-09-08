﻿(function (window) {
    function isProduction() {
        return isDomain('app.');
    }

    function isDomain(domain) {
        return location.href.indexOf('http://' + domain) === 0 ||
            location.href.indexOf('https://' + domain) === 0;
    }

    function addStyle(href) {
        var head = document.getElementsByTagName('head')[0],
            link = document.createElement('link'),
            t = +new Date();
        link.rel = 'stylesheet';
        link.href = href + '?t=' + t;
        head.appendChild(link);
    }

    window.isProduction = isProduction;
    window.addStyle = addStyle;
})(window);

(function (xhr) {
    function endsWith(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }
    var open = xhr.open,
        t = +new Date();
    xhr.open = function (method, url) {
        if (url && url.indexOf('/client/') !== -1 &&
            (endsWith(url, '.js') || endsWith(url, '.css') || endsWith(url, '.html'))) {
            url += '?t=' + t;
        }
        return open.call(this, method, url);
    };
})(XMLHttpRequest.prototype);

