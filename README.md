# 台北市＆新北市 YouBike 站點資訊查詢

## Live demo

[🔗](https://taipei-youbike-yishin.netlify.app/)

## 目次

- [題目要求](#題目要求)
- [使用套件與開發工具](#使用套件與開發工具)
- [已完成項目](#已完成項目)

## 題目要求

- 此專案原為烏龜移動技術考試題目，以下為原始題目要求
- 需按照設計稿製作
- 串接 Open API
- 請使用 React (使用 Next.js 加分)
- 需將程式碼上傳至 GitHub，並以 live demo 方式呈現 (CodeSandbox, GCP, etc.)
- 真實資料只需串接台北市 YouBike API，其餘縣市可用假資料或空白示意

### 功能敘述

- 搜尋欄位 Input & Dropdown
  - 按鈕點擊，顯示/收合縣市清單
  - 點擊 Input 欄位旁的 X icon 可清除欄內文字
  - 根據使用者輸入內容提供建議 autocomplete 選項清單

- 行政區勾選 Checkbox
  - 全部選取之選項預設為勾起
  - 勾選/取消全部選取後，其餘 checkbox 狀態會跟著變動

- 頂部導覽列 Navigator
  - 點擊不同項目後，highlight 的項目也會跟著發生變化 (僅畫面效果，無實際切換頁面內容之功能)

- 其他
  - 點擊表格頂端列的「可借車輛」與「可還空位」後，會依點擊的次數從昇順、降順、原始排列等形式來進行資料的排序

## 使用套件與開發工具

- TypeScript
- SCSS
- React
- React Icons
- Lodash
- Vite
- axios
