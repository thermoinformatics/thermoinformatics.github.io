# サーモインフォマティクス研究会 Webサイト

https://thermoinformatics.github.io/ のソースです。静的サイトジェネレータ [Hugo](https://gohugo.io/) で生成し、GitHub Pages で公開します。`main` ブランチに push すると GitHub Actions が自動でビルド・公開します（数分で反映）。

## フォルダ構成

| 場所 | 中身 |
|---|---|
| `content/report/` | 活動報告（1件＝1ファイル） |
| `content/news/` | お知らせ（日本語） |
| `content/en/news/` | News（英語） |
| `data/members.yaml` | トップページの「主査・幹事」欄（日本語・英語） |
| `static/uploads/` | 新しく載せる PDF・画像の置き場所 |
| `static/wp-content/uploads/` | 旧WordPressから移したPDF・画像（旧URLのまま参照できるよう残しています） |
| `layouts/` | ページのテンプレート（通常は触らなくてよい） |
| `static/css`, `static/js`, `static/img` | デザイン用ファイル |

## 活動報告を追加する

1. `content/report/` に新しいファイルを作ります。ファイル名がそのままURLになるので半角英数字にします（例：`2026-03-10-dai9kai-houkoku.md` → `/report/2026-03-10-dai9kai-houkoku/`）。既存のファイル（例：`2025-09-03-225.md`）をコピーして書き換えるのが簡単です。
2. 先頭の `---` で囲まれた部分を書きます。

   ```yaml
   ---
   title: "第9回サーモインフォマティクス研究会開催報告"
   date: 2026-03-10T18:00:00+09:00
   report_cat: ["研究会活動"]        # カテゴリ（研究会活動／招待講演／国内会議／学術論文 など）
   report_year: ["2026"]             # 一覧の「DATE」に出る年
   thumbnail: "/uploads/2026/03/9_after.png"   # 一覧のカード画像（省略すると NO IMAGE）
   ---
   ```

3. その下に本文を書きます。改行はそのまま改行、空行で段落が分かれます。`**太字**` で太字になります。
   - 画像：`![](/uploads/2026/03/photo1.jpg)`
   - ダウンロードボタン付きのリンク：
     ```
     {{< file "/uploads/2026/03/講演資料.pdf" >}}1．〇〇大学　〇〇先生{{< /file >}}
     {{< file "https://drive.google.com/file/d/xxxx/view" >}}2．〇〇株式会社　〇〇様{{< /file >}}
     ```
   - 普通のリンク：`[表示する文字](https://example.com/)`
4. PDF・画像は `static/uploads/2026/03/` のように置きます（`static` を除いた `/uploads/...` で参照します）。

`hugo new report/2026-03-10-dai9kai-houkoku.md` とすると雛形入りのファイルが作られます。

## お知らせを追加する

`content/news/`（英語は `content/en/news/`）に1件1ファイルで作ります。お知らせは個別ページを持たず、一覧ページ（/news/）にまとめて表示されます。

```yaml
---
title: "第9回研究会の開催日程を掲載しました。"
date: 2026-01-15T10:00:00+09:00
category: "お知らせ"
# 添付ファイルを付ける場合
# file:
#   url: "/uploads/2026/01/案内.pdf"
#   name: "開催案内.pdf"
#   size: "0.2MB"
---
本文（省略可）
```

## 主査・幹事を変更する

`data/members.yaml` を編集します。顔写真は `static/img/` か `static/uploads/` に置いて `image:` に書きます。

## 公開する

```
git add .
git commit -m "第9回開催報告を追加"
git push
```

GitHub の Web 画面で直接ファイルを編集・アップロード（Add file → Upload files）しても同じように公開されます。進捗はリポジトリの「Actions」タブで確認できます。

## 手元で確認する（任意）

Hugo（extended 版、0.152 以降）を入れて、このフォルダで `hugo server` を実行し、http://localhost:1313/ を開きます。Windows なら `winget install Hugo.Hugo.Extended` で入ります。

## 初回だけ必要な設定

1. このフォルダの中身を GitHub の `thermoinformatics/thermoinformatics.github.io` リポジトリに push する。
2. リポジトリの Settings → Pages → Build and deployment の Source を「GitHub Actions」にする。
3. 数分後に https://thermoinformatics.github.io/ で公開される。

### 独自ドメイン（例：thermoinformatics.jp）を使う場合

1. ドメインを取得し、DNS に次のレコードを登録する。
   - `thermoinformatics.jp`：A レコード ×4（185.199.108.153／185.199.109.153／185.199.110.153／185.199.111.153）
   - `www.thermoinformatics.jp`：`thermoinformatics.github.io` への CNAME
2. Settings → Pages の Custom domain に `thermoinformatics.jp` を入れ、証明書が発行されたら「Enforce HTTPS」をオンにする。
3. `hugo.toml` の `baseURL` を `https://thermoinformatics.jp/` に変える。

## 旧WordPressのURLについて

- PDF・画像の旧URL（`/wp-content/uploads/...`）はそのまま使えます。
- 旧サイトのページURL（`/?report=...`、`/?p=123`、`/?page_id=6` など）で来た場合は、トップページから対応する新しいページへ自動で転送します（新しいドメインで同じパスにアクセスされた場合）。
