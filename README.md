<h1 align="center" style="display: flex; align-items: center; justify-content: center; font-weight: 700;">
		<img src="https://raw.githubusercontent.com/Eshiunm/Rocket_HowOh/dev/src/assets/imgs/Howoh.ico" alt="HowOhLogo" />
	&nbsp;HowOh｜租屋交易與評價系統平台
</h1>
<div align="center" style="margin-bottom:24px">
  <a href="https://drive.google.com/file/d/1PA-nUPBaDxbWcsjRX8_U9CmcTLuKvKSq/view?usp=drive_link">
    簡報介紹
  </a>
  <span>｜</span>
  <a href="https://howoh.vercel.app/">
  佈署網址 
  </a>
  <span>｜</span>
  <a href="https://github.com/Eshiunm/Rocket_HowOh">
   前端 Github Repo 
  </a>
  <span>｜</span>
  <a href="https://github.com/Che1z/HowohBackEnd">
    後端 Github Repo 
  </a>
  <span>｜</span>
  <a href="http://52.140.100.60/swagger/ui/index">
  API swagger
  </a>
  <span>｜</span>
  <a href="https://smart-governor-e0d.notion.site/b5ca7a9893f9435ba967d608b0cbc2d4?pvs=4">
  Notion
  </a>
</div>

## 專案發想原由

根據內政部的數據推算，台灣的租屋人數總共為 255 萬人，約佔台灣總人口的 12%，相當於每 8 人就有 1 人是租屋者。<br>
此外，由於近年來房價所得比節節攀升，可以預期未來租屋人口的比例只會越來越高。<br>
目前租屋市場的主要痛點有**供需失衡**和**權力失衡**兩方面：<br>
由於房屋持有成本過低，市場上有許多房子完全閒置未使用，導致整體租屋市場呈現房東主導的局面。
這種供需失衡進一步導致了權力的不對等，租客的權利無法保障。<br>
此外，黑市問題也使得政府無法有效保障廣大租客的權益。<br>
最後，我們認為黑市問題導致的資訊不透明是可以改善的，因此有了『**好窩租屋交易與評價系統平台**』。

## 功能清單
### 租客身份功能
- 可建立個人帳號、大頭貼
- 可使用一般搜尋查找房源
- 可透過搜尋的條件快速過濾出房源
- 可透過房源列表進到單一房源頁面
- 可使用地圖搜尋查找房源
- 點選地圖標記導向單一房源頁面
- 可以針對喜歡的房源使用「預約看房」功能，發送預約看房資訊給房東
- 可在「租屋管理」頁面查看『預約看房』、『租約邀請』、『承租歷史』、『待評價』四個列表
  - 預約看房：查看自己預約了哪些房源
  - 租約邀請：查看自己收到哪些房東的租約邀請
  - 承租歷史：查看自己承租的歷史資訊
  - 待評價：租約到期後可以針對房源或房東進行評價
  
### 房東身份功能

## Git 規範
### Commit

|   類型   |   格式    | 說明                                          	|
| :------: | :-------: | :----------------------------------------------- |
| 新增功能 |   feat:   | 新增功能                                     	|
| 修補錯誤 |   fix:    | 修正現有功能的錯誤                        	|
| 重構程式 | refactor: | 重組、優化程式(邏輯不變)                         	|
| 樣式相關 |  style:   | 修改程式碼風格 (不影響程式碼運行的變動)          	|
| 維護資料 |  chore:   | 更新專案建置、版本…其他 (不影響程式碼運行的變動) 	|

### Branch

|     類型     |   格式    |
| :----------: | :-------: |
| 新增頁面樣式 |  layout/  |
|   新增功能   | feature/  |
|   重構功能   | refactor/ |
|   修正功能   |  bugfix/  |
|   緊急修復   |  hotfix/  |

## **前端技術**

<div align="center" style="display:flex; justify-content:center; column-gap:4px; margin: 12px;">
  <img alt="NPM" src="https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white" /> 
</div>
<div align="center" style="display:flex; justify-content:center; column-gap:4px; margin: 12px;">
  <img alt="VS Code" src="https://img.shields.io/badge/VS_Code-%23007ACC?style=for-the-badge&logo=visualstudiocode" />
  <img alt="VITE" src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" />
</div>
<div align="center" style="display:flex; justify-content:center; column-gap:4px; margin: 12px;">
  <img alt="Vercel" src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
  <img alt="GItHUB" src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" />
  <img alt="Git" src="https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white" />
</div>
<div align="center" style="display:flex; justify-content:center; column-gap:4px; margin: 12px;">
 <img alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img alt="React Hook Form" src="https://img.shields.io/badge/%20React_Hook_Form-pink?style=for-the-badge&logo=reacthookform" />
    <img alt="REDUX" src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" />
</div>
<div align="center" style="display:flex; justify-content:center; column-gap:4px; margin: 12px;">
  <img alt="AXIOS" src="https://img.shields.io/badge/axios-%235A29E4?style=for-the-badge&logo=axios" />
  <img alt="TypeScript" src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" />
  <img alt="TailwindCSS" src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img alt="Swiper" src="https://img.shields.io/badge/Swiper-%236332F6?style=for-the-badge&logo=swiper"/>
</div>
<div align="center" style="display:flex; justify-content:center; column-gap:4px; margin: 12px;">
  <img alt="ESLINT" src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white" />
</div>

