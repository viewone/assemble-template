'use strict';

(function($) {
    $(function() {
        var options = {
            reject: { // Rejection flags for specific browsers
                msie5: true,
                msie6: true,
                msie7: true,
                msie8: true, // Covers MSIE 5-7 (Blocked by default)
                firefox1: true,
                firefox2: true // Covers FF 1-2
                    /*
                     * Possibilities are endless...
                     *
                     * // MSIE Flags (Global, 5-8)
                     * msie, msie5, msie6, msie7, msie8,
                     * // Firefox Flags (Global, 1-3)
                     * firefox, firefox1, firefox2, firefox3,
                     * // Konqueror Flags (Global, 1-3)
                     * konqueror, konqueror1, konqueror2, konqueror3,
                     * // Chrome Flags (Global, 1-4)
                     * chrome, chrome1, chrome2, chrome3, chrome4,
                     * // Safari Flags (Global, 1-4)
                     * safari, safari2, safari3, safari4,
                     * // Opera Flags (Global, 7-10)
                     * opera, opera7, opera8, opera9, opera10,
                     * // Rendering Engines (Gecko, Webkit, Trident, KHTML, Presto)
                     * gecko, webkit, trident, khtml, presto,
                     * // Operating Systems (Win, Mac, Linux, Solaris, iPhone)
                     * win, mac, linux, solaris, iphone,
                     * unknown // Unknown covers everything else
                     */
            },
            // What browsers to display and their order
            display: ['chrome', 'firefox', 'safari', 'opera', 'gcf', 'msie'],
            browserShow: true, // Should the browser options be shown?
            browserInfo: { // Settings for which browsers to display
                firefox: {
                    text: 'Mozilla Firefox', // Text below the icon
                    url: 'http://www.mozilla.com/firefox/' // URL For icon/text link
                },
                chrome: {
                    text: 'Google Chrome',
                    url: 'http://www.google.com/chrome/'
                },
                safari: {
                    text: 'Safari',
                    url: 'http://www.apple.com/safari/download/'
                },
                opera: {
                    text: 'Opera',
                    url: 'http://www.opera.com/download/'
                },
                msie: {
                    text: 'Internet Explorer',
                    url: 'http://www.microsoft.com/windows/Internet-explorer/'
                },
                gcf: {
                    text: 'Google Chrome Frame',
                    url: 'http://code.google.com/chrome/chromeframe/',
                    // This browser option will only be displayed for MSIE
                    allow: {
                        all: false,
                        msie: true
                    }
                }
            },

            // Header of pop-up window
            header: 'Czy wiesz, że Twoja przeglądarka internetowa jest nieaktualna?',
            // Paragraph 1
            paragraph1: 'Twoja przeglądarka jest nieaktualna, i może być ' +
                'nie kompatybilna z naszą stroną. Zalecamy aktualizację ' +
                'przeglądarki. Listę najpopularniejszych przeglądarek internetowych ' +
                'możesz znaleźć poniżej.',
            // Paragraph 2
            paragraph2: 'Wystarczy kliknąć ikonę do przejścia do strony pobierania.',
            close: true, // Allow closing of window
            // Message displayed below closing link
            closeMessage: 'Zamykając to okno bądz świadom że działanie tej strony może być nieprawidłowe.',
            closeLink: 'Zamknij okno', // Text for closing link
            closeURL: '#', // Close URL
            closeESC: true, // Allow closing of window with esc key

            // If cookies should be used to remmember if the window was closed
            // See cookieSettings for more options
            closeCookie: false,
            // Cookie settings are only used if closeCookie is true
            cookieSettings: {
                // Path for the cookie to be saved on
                // Should be root domain in most cases
                path: '/',
                // Expiration Date (in seconds)
                // 0 (default) means it ends with the current session
                expires: 0
            },

            imagePath: getScriptURL() + '/../../vendor/jReject/images/', // Path where images are located
            overlayBgColor: '#000', // Background color for overlay
            overlayOpacity: 0.8, // Background transparency (0-1)

            // Fade in time on open ('slow','medium','fast' or integer in ms)
            fadeInTime: 'fast',
            // Fade out time on close ('slow','medium','fast' or integer in ms)
            fadeOutTime: 'fast',

            // Google Analytics Link Tracking (Optional)
            // Set to true to enable
            // Note: Analytics tracking code must be added separately
            analytics: false
        };

        $.reject(options);
    });

    var getScriptURL = (function() {
        var scripts = document.getElementsByTagName('script');
        var index = scripts.length - 1;
        var myScript = scripts[index];
        return function() {
            return myScript.src;
        };
    })();

})(jQuery);
