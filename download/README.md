# /download/ — LEGACY MIRROR（不可刪除）

這個資料夾是給 **StockKeeper v3.6.0（含）以前的 auto-updater** 用的 URL 鏡像。

## 為什麼存在

StockKeeper 內建的自動更新功能把下載 URL **寫死**在程式碼裡，指向：
- `https://www.firefoxinfo.com/download/latest-setup.html`（Windows 安裝版）
- `https://www.firefoxinfo.com/download/latest.html`（Windows 免安裝版）
- `https://www.firefoxinfo.com/download/latest-mac.html`（Mac 版）

網站在 2026-10 做多產品結構重構時，StockKeeper 主要內容搬到了 `/StockKeeper/`。但舊版 StockKeeper 已經安裝在使用者的電腦上，它的 auto-updater 永遠只會打舊的 URL —— 所以這個資料夾**必須保留**，否則舊版使用者無法升級。

## 內容原則：鏡像（方案 A）

這三個檔案的內容必須**與 `/StockKeeper/download/latest*.html` 完全相同**，都是 `<meta http-equiv="refresh">` 直接指向 GitHub Release 上實際的 .exe / .zip 檔案（**一層** meta refresh，不要做兩層跳轉）。

雙鏡像的好處：
- 舊版 auto-updater 打 `/download/...` 時只需要解析一層 refresh，不會因為「url 指向另一個 HTML 頁」而迷路
- 新版 StockKeeper 之後可以改用 `/StockKeeper/download/...`，兩個路徑的行為一致

## 每次 release 要做什麼

**必須同步更新兩個位置的下載 URL**：

```
/download/latest-setup.html          ← 本資料夾
/StockKeeper/download/latest-setup.html
/download/latest.html                ← 本資料夾
/StockKeeper/download/latest.html
/download/latest-mac.html            ← 本資料夾
/StockKeeper/download/latest-mac.html
```

每個檔案要把 `url=https://github.com/.../StockKeeper_vX_X_X/...` 改為新版本的檔名。

## 什麼時候可以刪？

當**沒有任何舊版 StockKeeper 還在呼叫這些 URL** 時。原則上：
- 無限期保留的成本幾乎為零（每檔 < 1KB）
- 用 Cloudflare Analytics / Google Analytics 之類的工具統計這三個 URL 的訪問量
- 當訪問量降到 0 或接近 0，再評估是否移除

**不要**按「保留 N 版就刪」的方式決定，使用者升級步調不一，有人可能卡在舊版多年。
