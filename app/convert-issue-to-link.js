let lastRefresh = new Date().getTime();

const convert = () => {
  const current = window.location.href;

  if (/oss\.navercorp\.com\/.*\/(issues|pull)\/\d+$/.test(current)) {
    const title = document
      .getElementById("partial-discussion-header")
      .getElementsByClassName("js-issue-title")[0];

    if (/ADDRSUS-\d+/.test(title.innerText)) {
      const issue = title.innerText.match(/ADDRSUS-\d+/)[0];

      title.innerHTML = title.innerText
        .split(/ADDRSUS-\d+/)
        .join(
          `<a href="http://bts1.navercorp.com/nhnbts/browse/${issue}">${issue}</a>`
        );
    }
  }

  if (/oss\.navercorp\.com\/.*\/issues/.test(current)) {
    // TODO: 이슈/PR 리스트에서도 링크 변환하기
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
