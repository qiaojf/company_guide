# Terabox HTML Presentation

`../src` の43ページを正本として、各ページの承認済み画像を16:9の基準レイヤーに置き、その上に選択可能なHTMLテキスト、CSSレイアウト、HTML/CSS/SVGベースの図解を重ねた静的プレゼンテーションです。バックエンドやビルド工程は不要です。

## Local preview

Pythonが利用できる環境では、プロジェクトディレクトリで次を実行します。

```bash
python -m http.server 4173
```

その後 `http://localhost:4173/#slide-1` を開きます。

通常表示は承認済み画像を見せながら透明なHTML語義レイヤーを重ねる `reference` モードです。文字はドラッグ選択・コピーでき、選択時にlimeで強調表示されます。上部の `LAYER` から合成・比較・DOM表示を切り替えられます。DOMの位置と比率を校正するときは `?layer=compare#slide-1`、底画像を隠してDOMだけを確認するときは `?layer=dom#slide-1` を直接指定することもできます。

`../src` の画像を更新した場合は、PowerShellで `./sync_reference_slides.ps1` を実行すると、ページ番号に対応する43枚を正規化したファイル名で再同期できます。

## GitHub Pages

`terabox-html` ディレクトリの内容をリポジトリの公開対象へ配置し、GitHub Pages の公開元をそのブランチ／ディレクトリに設定してください。すべて相対パスで構成されています。

## Controls

- `←` / `PageUp`: 前のページ
- `→` / `PageDown` / `Space`: 次のページ
- `Home`: 1ページ目
- `End`: 43ページ目
- 左側の章ナビゲーション: 各章の先頭へ移動
- 左側ナビゲーションの章名は目次と同一の日本語表記
- URL Hash: `#slide-1` 〜 `#slide-43`

## Files

- `index.html`: Viewerの構造
- `style.css`: Viewer、基本コンポーネント、レスポンシブ表示
- `fidelity.css`: 承認済み43ページに合わせた高再現レイアウト
- `app.js`: 43ページのHTML内容、ナビゲーション、Hash、キーボード操作
- `assets/images/`: 元PPTから抽出した写真・製品画像・証書・取引先ロゴ
- `assets/reference/`: 承認済みページから分離した写真・建築背景などの非テキスト領域
- `assets/reference/slides/`: `src` と1対1で対応する43ページの基準画像
- `sync_reference_slides.ps1`: `src` から43ページの基準画像を再同期

Viewerのコンテンツ領域は上下左右 `0px` で、内部の1600 × 900ステージを常に16:9のまま最大表示します。
