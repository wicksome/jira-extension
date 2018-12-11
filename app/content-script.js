const createButton = title => {
  const $a = document.createElement("a");
  $a.setAttribute("id", "jira-copy-summary");
  $a.setAttribute("class", "aui-button toolbar-trigger");
  $a.setAttribute("title", "Copy summary of the issue");
  $a.setAttribute("href", "#");
  $a.setAttribute("style", "background-color: rgba(80, 195, 43, 0.22)");

  const $span = document.createElement("span");
  $span.setAttribute("class", "trigger-label");
  $span.innerHTML = title;

  $a.appendChild($span);
  return $a;
};

/**
 * Update text in button.
 * @param {DOMElement} $button
 * @param {String} title
 * @returns before title text
 */
const updateButtonTitle = ($button, title) => {
  const old = $button.firstChild.innerHTML;
  $button.firstChild.innerHTML = title;
  return old;
};

/**
 * Copy to clipboard.
 * @param {String} text
 * @returns {Boolean} copy status
 */
const copyToClipboard = str => {
  const el = document.createElement("textarea");
  el.value = str;
  document.body.appendChild(el);
  el.select();
  const state = document.execCommand("copy");
  document.body.removeChild(el);
  return state;
};

const getTemplate = () => {
  const title = document.getElementById("summary-val").textContent;
  const key = document.getElementById("key-val").textContent;

  // return `[${key}] ${title}`;
  return document.title.split(" - ")[0];
};

document.addEventListener("DOMContentLoaded", () => {
  const $button = createButton("🍿복사");

  $button.addEventListener("click", event => {
    event.preventDefault();

    const template = getTemplate();

    if (copyToClipboard(template)) {
      const oldTitle = updateButtonTitle($button, "✅성공");
      setTimeout(() => {
        updateButtonTitle($button, oldTitle);
      }, 500);
    }
  });

  document.getElementById("opsbar-jira.issue.tools").prepend($button);
});
