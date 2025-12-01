/* -------------------------------------------------------
   UTILS.JS — Helper Utilities & Component Loader
------------------------------------------------------- */

/**
 * Load an external HTML component into a target element.
 */
async function loadComponent(targetSelector, filePath) {
    const target = document.querySelector(targetSelector);
    if (!target) return;

    try {
        const response = await fetch(filePath);
        const html = await response.text();
        target.innerHTML = html;
    } catch (err) {
        console.error(`Component load error → ${filePath}`, err);
    }
}

/**
 * Simple DOM selector helpers
 */
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

/**
 * Smooth navigation
 */
function navigateTo(url) {
    window.location.href = url;
}
