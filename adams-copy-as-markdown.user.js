// ==UserScript==
// @name        Adam's Copy as Markdown
// @author      aheckler
// @description Takes the current selection, turns it into Markdown, and places it in the clipboard.
// @namespace   https://github.com/aheckler/copy-as-markdown
// @match       *://*/*
// @grant       GM_setClipboard
// @require     https://unpkg.com/turndown@^7/dist/turndown.js
// @version     1.0.0
// @updateURL   https://github.com/aheckler/copy-as-markdown/raw/main/adams-copy-as-markdown.user.js
// @downloadURL https://github.com/aheckler/copy-as-markdown/raw/main/adams-copy-as-markdown.user.js
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
