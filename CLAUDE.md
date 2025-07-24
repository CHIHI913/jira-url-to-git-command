# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

JiraのイシューURLからGitブランチのチェックアウトコマンドを生成するChrome拡張機能です。Jiraチケットとgitブランチを扱う開発者のワークフローを効率化するシンプルなユーティリティです。

### 主な機能
- 現在のタブのURLからJiraイシューキー（例：ABC-123）を抽出
- Gitコマンドを生成：`git fetch && git checkout feature/{issue-key}`
- コマンドをクリップボードにコピー
- 日本語で視覚的なフィードバックを提供

## 開発コマンド

### 拡張機能の読み込み
開発中の変更をテストする方法：
1. Chromeで `chrome://extensions/` を開く
2. 「デベロッパーモード」を有効化（右上）
3. 「パッケージ化されていない拡張機能を読み込む」をクリックし、このディレクトリを選択
4. ツールバーに拡張機能のアイコンが表示される

### 変更の適用
- ファイルを直接編集 - ビルドプロセスは不要
- 変更後、Chromeで拡張機能をリロード：
  - `chrome://extensions/` にアクセス
  - 拡張機能カードの更新アイコンをクリック
  - または拡張機能ページでCmd+R（Mac）/ Ctrl+R（Windows）

## アーキテクチャ

### ファイル構成
- `manifest.json` - Chrome拡張機能の設定（Manifest V3）
- `popup.html` - 拡張機能のポップアップUI
- `popup.js` - URL解析とコマンド生成のコアロジック

### 実装の詳細

**URLパターンマッチング** (popup.js:22)
- 正規表現 `/[A-Z]+-\d+/` でJiraイシューキーをマッチ
- ABC-123、PROJ-4567のようなパターンに対応

**使用しているChrome拡張機能API**
- `chrome.tabs.query()` - 現在のタブのURLを取得 (popup.js:2)
- `navigator.clipboard.writeText()` - クリップボードにコピー (popup.js:32)

**UIの言語**
- インターフェースのテキストは日本語
- 成功メッセージ：「Gitコマンドをクリップボードにコピーしました！」
- エラーメッセージ：「JiraのURLではありません。」

## よくある開発タスク

### Gitコマンドフォーマットの変更
popup.js:7のコマンドテンプレートを修正：
```javascript
var gitCommand = `git fetch && git checkout feature/${issueKey}`;
```

### イシューキーパターンの変更
異なるイシュー形式に対応するには、popup.js:22の正規表現を更新

### 各種JiraURLのテスト
以下のようなJiraURL形式でテスト：
- `https://company.atlassian.net/browse/PROJ-123`
- `https://jira.company.com/browse/ABC-456`
- クエリパラメータやフラグメント付きのURL

## 重要事項

- 自動テストなし - Chromeで手動テスト
- 依存関係やビルドツールなし - バニラJavaScriptのみ
- クリップボード操作にはユーザーの操作（ボタンクリック）が必要
- 拡張機能は現在のURLを読み取るために `activeTab` 権限が必要