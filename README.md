# firefoxinfo-site

火狐資訊 FoxInfo 公司網站 —— 多產品結構，部署於 GitHub Pages，網址 https://www.firefoxinfo.com/。

## 網站結構

```
/                               火狐資訊 landing（公司門面，列產品）
├── index.html                  landing 本身（inline CSS，獨立於 StockKeeper）
├── FoxInfo.svg / FoxInfo.ico   favicon（給 landing 用）
├── CNAME                       GitHub Pages 綁定 www.firefoxinfo.com
├── sitemap.xml                 全站 sitemap
├── robots.txt                  含 Disallow 下載頁的規則
│
├── StockKeeper/                產品 1：StockKeeper 台股 / 美股投資記帳
│   ├── index.html              StockKeeper 介紹頁
│   ├── style.css, script.js    StockKeeper 專屬樣式與腳本
│   ├── FoxInfo.svg / .ico      favicon（複製，讓 ../FoxInfo.svg 的相對路徑能工作）
│   ├── images/                 全部 StockKeeper 相關圖
│   ├── tutorials/              各功能教學 HTML（新增教學請放這）
│   ├── download/               latest*.html 轉址到 GitHub Release（真正的下載 URL）
│   └── updates/
│       ├── release_index.html  所有版本的 changelog（新 release 編輯這）
│       └── releases/           每版對應的小轉址頁（refresh 到 release_index 的 anchor）
│
├── ScheduleCalculator/         產品 2：營造工程工期計算（規劃中，目前空資料夾）
│
├── download/                   【LEGACY MIRROR】見 download/README.md
├── tutorials/                  【LEGACY REDIRECTS】見 tutorials/README.md
└── updates/                    【LEGACY REDIRECTS】見 updates/README.md
```

## 給 AI session / 新開發者的注意事項

### 1. 三個 root legacy 資料夾不要刪
- `/download/`、`/tutorials/`、`/updates/` 是為了相容既有 Google 索引、FB 貼文連結、以及**舊版 StockKeeper auto-updater 寫死的 URL** 保留下來的
- 每個資料夾裡有 README.md 詳細說明用途與維護方式
- 新增教學、新 release 時**要同時更新 root 轉址頁**（或至少知道這個規則）

### 2. 兩層 StockKeeper URL
- 新 URL：`https://www.firefoxinfo.com/StockKeeper/...`
- 舊 URL：`https://www.firefoxinfo.com/...`（透過 root 的 legacy 資料夾轉址）
- 新寫的 HTML 內部連結、canonical、og:url 都用 **新 URL**
- 下載 URL 兩邊鏡像維持（方案 A）

### 3. 共用資產
- `/FoxInfo.svg`、`/FoxInfo.ico` 是 landing 用
- `/StockKeeper/FoxInfo.svg`、`/StockKeeper/FoxInfo.ico` 是 StockKeeper 內部用（複本）
- StockKeeper 內的頁面用相對路徑 `../FoxInfo.svg`（而非 `/FoxInfo.svg`），好處是把 StockKeeper 整個複製到別處也能運作

### 4. 首頁 header 的 back link
- StockKeeper 內所有頁面的 `<header>` 都有 `<a href="/" class="logo-link">` 包住 logo、以及 `<a href="/" class="brand-parent">火狐資訊</a>` 連結，點了會回到 landing
- 新寫 StockKeeper 頁面時沿用相同結構（抄現有的 `index.html` header 就好）

## 常見任務速查

### 新增一篇 StockKeeper 教學
1. 寫 `/StockKeeper/tutorials/tutorial_新功能.html`（抄現有教學的 header + skeleton）
2. 建對應 root 轉址頁 `/tutorials/tutorial_新功能.html`（抄現有轉址頁，換檔名）
3. 在 `/StockKeeper/index.html` 的 `<section class="tutorials-section">` 加教學卡
4. 在 `/sitemap.xml` 加 URL（優先度 0.5 ~ 0.7）
5. 記得 og:image 用 `/StockKeeper/images/Tutorial/新功能/Main.png` 風格

### 新 release 版本
1. 編輯 `/StockKeeper/updates/release_index.html`：新增 `<section id="vX-X-X">`，移除前一版的「最新」tag
2. TOC 加對應項目
3. 建 `/StockKeeper/updates/releases/release-vX.X.X.html`（StockKeeper 內部用，refresh 到 `../release_index.html#vX-X-X`）
4. 建 `/updates/releases/release-vX.X.X.html`（root 轉址頁，refresh 到 `/StockKeeper/updates/release_index.html#vX-X-X`）
5. 更新 `/StockKeeper/index.html`：
   - JSON-LD `softwareVersion`
   - 最新版本卡片（版本 pill、日期、標題、描述）
   - 下載卡標題與三顆 platform version pill
6. **方案 A 鏡像**：同時更新 `/StockKeeper/download/latest*.html` **以及** `/download/latest*.html` 三份，目標 URL 改為新版本 GitHub Release 檔案
7. `/sitemap.xml` 的首頁與 release_index 的 lastmod 更新為當天日期

### GitHub Release 檔案命名規範
- Tag: `StockKeeper_v3_6_0`（底線分隔）
- 檔案: `StockKeeper_v3_6_0.zip`（Windows 免安裝 & Mac）、`StockKeeper_Setup_v3_6_0.exe`（Windows 安裝版）

## 部署

GitHub Pages 從 main 分支自動部署，CNAME = `www.firefoxinfo.com`。沒有 build step，純靜態 HTML/CSS/JS。
