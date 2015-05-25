/* global outdatedBrowser */

(function() {
    'use strict';

    var scripts = document.getElementsByTagName('script');
    var url = scripts[scripts.length - 1].src;

    var urlArray = url.split('/');

    urlArray.pop();
    urlArray.pop();

    var languagePath = urlArray.join('/') + '/vendor/outdated-browser/outdatedbrowser/lang/en.html';

    function addLoadEvent(func) {
        var oldonload = window.onload;

        if (typeof window.onload !== 'function') {
            window.onload = func;
        } else {
            window.onload = function() {
                oldonload();
                func();
            };
        }
    }

    function appendHtml(el, str) {

        var div = document.createElement('div');

        div.innerHTML = str;

        while (div.children.length > 0) {
            el.appendChild(div.children[0]);
        }
    }

    addLoadEvent(function() {

        var outdatedDiv = '<div id="outdated"></div>';

        appendHtml(document.body, outdatedDiv);

        outdatedBrowser({
            bgColor: '#f25648',
            color: '#ffffff',
            lowerThan: 'boxShadow',
            languagePath: languagePath
        });
    });

})();
