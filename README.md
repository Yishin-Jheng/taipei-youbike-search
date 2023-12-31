# 烏龜移動技術考試題目 Q5 Solution

## 目次

- [題目要求](#題目要求)
- [使用套件與開發工具](#使用套件與開發工具)
- [已完成項目](#已完成項目)

## 題目要求

- 需按照設計稿製作
- 串接 Open API
- 請使用 React (使用 Next.js 加分)
- 需將程式碼上傳至 GitHub，並以 live demo 方式呈現 (CodeSandbox, GCP, etc.)
- 真實資料只需串接台北市 YouBike API，其餘縣市可用假資料或空白示意

### 功能

- 縣市搜尋 Input

  - 可透過文字篩選縣市清單
  - 按鈕點擊，顯示／收合縣市清單
  - 具備一鍵清除
  - 縣市清單及 checkbox 渲染，需針對縣市搜尋 input 操作即時反饋 (ex. 輸入台北市 縣市清單顯示台北市，checkbox 顯示台北市行政區)

- 行政區 checkbox

  - 預設為全選
  - 勾選／取消勾選後其餘 checkbox 狀態需跟著變動

- Header

  - 點擊後需切換路由 (頁面內容不需更動，路由可自行規劃)

- 加分區 (非必需)

  - 表格區效能優化
    - 針對表格資料動態渲染
    - 點擊表頭可進行排序
  - 站點搜尋 Input
    - 表格資料渲染需針對 input 操作即時反饋
    - 只需針對站點名稱篩選搜尋

## 使用套件與開發工具

- SCSS
- React
- React Icons
- Lodash
- Vite
- axios

## 已完成項目

Live demo: [🔗](https://taipei-youbike-yishin.netlify.app/)

- 搜尋欄位 Input & Dropdown

  - 按鈕點擊，顯示／收合縣市清單
  - 點擊 Input 欄位旁的放大鏡 icon 可一鍵清除欄內文字

- 行政區勾選 Checkbox

  - 全部選取之選項預設為勾起
  - 勾選／取消全部選取後，其餘 checkbox 狀態會跟著變動

- Header (or Top Navigator)

  - 點擊不同項目後，highlight 的項目也會跟著發生變化 (由於不需要更改實際的頁面內容，所以這邊並不是很理解題目內的「路由」指的是何物。)

- 加分項目

  - 點擊表格頂端列的「可借車輛」與「可還空位」後，會依點擊的次數從昇順、降順、原始排列等形式來進行資料的排序。
  - 表格中的資料會依照 Input 欄位中的資料去進行篩選，只會顯示含有搜尋名稱的站點資料。
