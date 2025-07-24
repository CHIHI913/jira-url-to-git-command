# Jira URL to Git Command

JiraのイシューURLからGitブランチのチェックアウトコマンドを生成するChrome拡張機能です。

## 機能

- 現在のタブのURLからJiraイシューキー（例：ABC-123）を抽出
- Gitコマンドを生成：`git fetch && git checkout feature/{issue-key}`
- ワンクリックでクリップボードにコピー

## インストール方法

1. このリポジトリをクローン
2. Chromeで `chrome://extensions/` を開く
3. 「デベロッパーモード」を有効化（右上）
4. 「パッケージ化されていない拡張機能を読み込む」をクリック
5. クローンしたディレクトリを選択

## 使い方

1. Jiraのイシューページを開く
2. 拡張機能のアイコンをクリック
3. 「変換」ボタンをクリック
4. Gitコマンドがクリップボードにコピーされます

## 対応するJira URL形式

- `https://company.atlassian.net/browse/PROJ-123`
- `https://jira.company.com/browse/ABC-456`
- その他、イシューキー（[A-Z]+-[0-9]+）を含むURL

## ライセンス

MIT