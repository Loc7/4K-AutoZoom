Bugs
- auf Karbona-Seite wird Zoom ausgeführt bei Klick auf Produktlink, der ein Overlay öffnet (ähnliches Verhalten wie mittlere Maustaste) --> ServiceWorker debuggen


Changelog

V1.4, 21.05.24
- Refactored code to fully use the Chrome message runtime
- Refactored code to trigger popup only on true window width resize events
- Added display: block to show popup on all pages

V1.3, 20.05.24
- Make iframe invisible to clicks to prevent blocking of clickable UI elements
- Reduce iframe size to popup content

V1.2, 18.05.24:
- Circumvent Chrome bug: Opening link with middle mouse button leads Chrome to trigger a resize event with window.outerWidth = 0
- Prevent background scripts from being killed by Chrome after 5 minutes of inactivity
- Resize only active tab, not all tabs to reduce unnecessary zoom events

V1.1, 17.05.24:
- Added "color-scheme: auto" to popup so it's transparent on dark mode pages as well
- Removed popup on initial load when zoom level = 100%
- Removed "document.body.style.zoom" in favor of "chrome.tabs.setZoom()"
- Don't show popup on manual zoom

V1.0, 16.05.24
- Initial release
