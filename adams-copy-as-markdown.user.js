// ==UserScript==
// @author      aheckler
// @description Takes the current selection, turns it into Markdown, and places it in the clipboard.
// @downloadURL https://github.com/aheckler/copy-as-markdown/raw/main/adams-copy-as-markdown.user.js
// @grant       GM_setClipboard
// @match       *://*/*
// @name        Adam's Copy as Markdown
// @namespace   https://github.com/aheckler/copy-as-markdown
// @require     https://unpkg.com/turndown@^7/dist/turndown.js
// @updateURL   https://github.com/aheckler/copy-as-markdown/raw/main/adams-copy-as-markdown.user.js
// @version     1.0.0
// ==/UserScript==

document.addEventListener( 'keydown', event => {
  // Listen for Cmd + Shift + C
  if ( ( event.ctrlKey || event.metaKey ) && event.shiftKey && event.keyCode === 67 ) {
    copyAsMarkdown();
    event.preventDefault(); // Stop the browser dev tools from opening.
  }
});

function getSelectionAsHtml() {
    let html = '';
    const selection = window.getSelection();

    if (selection.rangeCount) {
        const container = document.createElement('div');
        container.appendChild(selection.getRangeAt(0).cloneContents());
        html = container.innerHTML;
    }

    return html;
}

function copyAsMarkdown() {
    const turndownService = new TurndownService();
    const markdown = turndownService.turndown(getSelectionAsHtml());
    if (markdown) {
        GM_setClipboard(markdown, 'text');
    }
}
