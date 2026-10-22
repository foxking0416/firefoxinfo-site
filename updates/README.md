# /updates/ — LEGACY REDIRECTS（不可刪除）

這個資料夾裡的 HTML 都是**轉址頁**，不是真正的版本更新內容。

## 為什麼存在

網站在 2026-10 做多產品結構重構時，StockKeeper 的 release notes 搬到了 `/StockKeeper/updates/`。但在那之前：
- 粉絲專頁、FB 貼文、Google 索引都指向舊網址 `https://www.firefoxinfo.com/updates/release_index.html`（或 `/updates/releases/release-vX.X.X.html`）

舊連結直接 404 會造成不好的使用者體驗。因此這個資料夾裡每個檔案都是 **meta refresh 轉址頁**，自動把訪客跳轉到新位置。

## 真正的 release notes 在哪裡

**所有實際的版本更新內容都在 `/StockKeeper/updates/release_index.html`**。本資料夾只保留 meta refresh 轉址頁：

| 舊路徑 | 轉址到 |
|---|---|
| `/updates/release_index.html` | `/StockKeeper/updates/release_index.html` |
| `/updates/releases/release-vX.X.X.html` | `/StockKeeper/updates/release_index.html#vX-X-X` |

**不要在本資料夾新增 release note 內容。** 新 release 請直接編輯 `/StockKeeper/updates/release_index.html`（增加對應 `<section>`）。

## 每次 release 時要做什麼

1. 在 `/StockKeeper/updates/release_index.html` 增加新版本的 `<section id="vX-X-X">` 內容
2. 在 `/StockKeeper/updates/releases/` 建立對應的 `release-vX.X.X.html`（StockKeeper 內部用的轉址頁，refresh 到 `../release_index.html#vX-X-X`）
3. **同時在本資料夾 `/updates/releases/` 建立同名轉址頁**（給舊連結用，refresh 到 `/StockKeeper/updates/release_index.html#vX-X-X`）

本資料夾轉址頁的 template（照抄其他現有檔案就好）：

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>vX.X.X 版本更新 - StockKeeper</title>
  <link rel="canonical" href="https://www.firefoxinfo.com/StockKeeper/updates/release_index.html#vX-X-X">
  <meta http-equiv="refresh" content="0; url=/StockKeeper/updates/release_index.html#vX-X-X">
  <script>window.location.replace("/StockKeeper/updates/release_index.html#vX-X-X");</script>
  <link rel="icon" href="/FoxInfo.svg" type="image/svg+xml">
</head>
<body>
  <p>vX.X.X 版本更新已搬至 <a href="/StockKeeper/updates/release_index.html#vX-X-X">新位置</a>。</p>
</body>
</html>
```

> 嚴格來說新 release 不需要在舊位置佔位（舊 FB 貼文不會貼到還沒存在的網址），但為了與既有慣例一致，建議還是建立對應轉址頁。

## 什麼時候可以刪？

當確認 Google 索引已完全轉到 `/StockKeeper/updates/` 時可以考慮移除。原則與 `/tutorials/README.md` 相同：
- 每檔 < 1KB，無限期保留的成本可忽略
- 不要在沒有觀察過流量前就刪
