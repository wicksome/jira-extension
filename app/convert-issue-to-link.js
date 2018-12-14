const JIRA_ISSUE_REGEX = /ADDRSUS-\d+/;

let lastRefresh = new Date().getTime();

const convert = () => {
  const current = window.location.href;

  // oss issue, pr
  if (/oss\.navercorp\.com\/.*\/(issues|pull)\/\d+$/.test(current)) {
    const $title = document.querySelector(
      "#partial-discussion-header .js-issue-title"
    );
    if (!$title || $title.getAttribute("added-jira-link")) return;

    const issue = $title.innerText.match(JIRA_ISSUE_REGEX)[0];
    if (!issue) return;

    $title.innerHTML = $title.innerText
      .split(JIRA_ISSUE_REGEX)
      .join(
        `<a href="http://bts1.navercorp.com/nhnbts/browse/${issue}">${issue}</a>`
      );
    $title.setAttribute("added-jira-link", true);
  }

  // wiki 주간보고
  if (/wiki\.navercorp\.com\/pages\/viewpage.action/.test(current)) {
    const $content = document.getElementById("main-content");

    if (!$content || $content.getAttribute("added-jira-link")) return;

    // TODO: 변환
    // http://bts1.navercorp.com/nhnbts/rest/api/latest/issue/ADDRSUS-11363?fields=status
    // fields.status.name

    $content.setAttribute("added-jira-link", true);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  convert();
});

document.addEventListener("DOMNodeInserted", () => {
  if (new Date().getTime() - lastRefresh >= 250) {
    lastRefresh = new Date().getTime();
    convert();
  }
});
