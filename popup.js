document.getElementById("convertBtn").addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var url = tabs[0].url;
    var issueKey = extractIssueKey(url);

    if (issueKey) {
      var gitCommand = `git fetch && git checkout feature/${issueKey}`;
      copyToClipboard(gitCommand);
      showMessage("Gitコマンドをクリップボードにコピーしました！", "success");
    } else {
      showMessage("JiraのURLではありません。", "error");
    }
  });
});

function extractIssueKey(url) {
  // 正規表現 /[A-Z]+-\d+/ の説明:
  // - [A-Z]+: 1つ以上の大文字のアルファベットにマッチ
  // - -: ハイフン文字自体にマッチ
  // - \d+: 1つ以上の数字にマッチ
  // この正規表現は、Jiraのイシュー番号の形式 (例: ABC-123) にマッチする
  var regex = /[A-Z]+-\d+/;
  var match = url.match(regex);
  return match ? match[0] : null;
}

function copyToClipboard(text) {
  var dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  navigator.clipboard.writeText(text);
  document.body.removeChild(dummy);
}

function showMessage(text, className) {
  var message = document.getElementById("message");
  message.textContent = text;
  message.className = className;
  message.style.display = "block";
  setTimeout(function () {
    message.style.display = "none";
  }, 2000);
}
