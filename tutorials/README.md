# /tutorials/ — LEGACY REDIRECTS（不可刪除）

這個資料夾裡的 HTML 都是**轉址頁**，不是真正的教學內容。

## 為什麼存在

網站在 2026-10 做多產品結構重構時，StockKeeper 的教學搬到了 `/StockKeeper/tutorials/`。但在那之前：
- 粉絲專頁、FB 貼文、Line 群組等地方貼過舊網址 `https://www.firefoxinfo.com/tutorials/tutorial_xxx.html`
- Google、Bing 等搜尋引擎的索引也都指向舊網址

這些舊連結如果直接 404 會造成不好的使用者體驗（也會影響 SEO）。因此這個資料夾裡每個檔案都是 **meta refresh 轉址頁**，自動把訪客跳轉到新位置 `/StockKeeper/tutorials/tutorial_xxx.html`。

## 真正的教學在哪裡

**所有實際的教學內容都在 `/StockKeeper/tutorials/`**。本資料夾裡的檔案只有 meta refresh + 一行文字「教學頁已搬至 新位置」而已。

**不要在本資料夾新增教學內容。** 新教學請直接寫到 `/StockKeeper/tutorials/` 下。

## 每次新增教學時要做什麼

每新增一篇教學（例如 `tutorial_新功能.html`）：

1. 真的教學寫在 `/StockKeeper/tutorials/tutorial_新功能.html`
2. **同時在本資料夾建一個同名的轉址頁** `/tutorials/tutorial_新功能.html`

轉址頁的 template（照抄其他現有檔案就好）：

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>教學已搬家 - StockKeeper</title>
  <link rel="canonical" href="https://www.firefoxinfo.com/StockKeeper/tutorials/tutorial_新功能.html">
  <meta http-equiv="refresh" content="0; url=/StockKeeper/tutorials/tutorial_新功能.html">
  <script>window.location.replace("/StockKeeper/tutorials/tutorial_新功能.html");</script>
  <link rel="icon" href="/FoxInfo.svg" type="image/svg+xml">
</head>
<body>
  <p>教學頁已搬至 <a href="/StockKeeper/tutorials/tutorial_新功能.html">新位置</a>。</p>
</body>
</html>
```

> 嚴格來說新教學不需要在舊位置佔位（舊 FB 貼文不會貼到還沒存在的網址），但維持一致對外部連結或人為手輸網址者比較保險。如果嫌麻煩，可以只為「過去已經在外部連結散播出去」的教學保留轉址頁，新教學不建立對應轉址，不會有壞處。

## 什麼時候可以刪？

當確認 Google 索引已完全轉到 `/StockKeeper/tutorials/`、而且沒有活躍的舊網址流量時可以考慮移除。原則上：
- 每檔 < 1KB，無限期保留的成本可忽略
- 可以用 Google Search Console 看哪些舊 URL 還有展示次數，確認後再逐一移除

**不要在沒有做過流量觀察前就刪**。
