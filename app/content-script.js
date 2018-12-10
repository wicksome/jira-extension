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

const copyToClipboard = str => {
  const el = document.createElement("textarea");
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

document.addEventListener("DOMContentLoaded", () => {
  const $button = createButton("🍿복사");

  $button.addEventListener("click", event => {
    event.preventDefault();

    const title = document.getElementById("summary-val").textContent;
    const key = document.getElementById("key-val").textContent;

    copyToClipboard(`[${key}] ${title}`);
  });

  document.getElementById("opsbar-jira.issue.tools").prepend($button);
});
