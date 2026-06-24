# 免费 GIS 数据导航

一个纯静态的免费 GIS 数据资源目录，入口文件为 `index.html`。项目参考并整理了 [Free GIS Data by Robin Wilson](https://freegisdata.rtwilson.com/) 的公开资源列表，提供中文优先界面、英文切换、筛选检索、SEO 元信息、结构化数据、站点地图和爬虫规则。

## 功能

- 使用 HTML、CSS、JavaScript 实现，无需构建工具。
- 支持中英文界面切换，语言偏好会保存在浏览器本地。
- 支持关键词、资源大类、分类/地区、数据形态、访问方式筛选。
- 数据集中维护在 `js/data.js`，后续增删资源无需改页面结构。
- 包含 SEO meta、Open Graph、Twitter Card、Schema.org JSON-LD。
- 包含 `robots.txt`、`sitemap.xml` 和 SVG 浏览器标签图标。
- 响应式布局，适配桌面端和移动端。

## 文件结构

```text
.
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── app.js
│   └── data.js
├── assets/
│   ├── favicon.svg
│   └── og-cover.svg
├── robots.txt
├── sitemap.xml
└── README.md
```

## 本地预览

这是一个纯静态站点，可以直接在浏览器打开 `index.html`。如果希望模拟线上环境，也可以在项目目录启动任意静态服务器。

```powershell
python -m http.server 8080
```

然后访问 `http://localhost:8080/`。

## 数据维护

所有数据资源都在 `js/data.js` 的 `window.GIS_DATASETS` 数组中。每条数据建议包含以下字段：

```js
{
  id: "ds-001",
  name: "Natural Earth - Vector",
  url: "http://www.naturalearthdata.com/",
  domain: "naturalearthdata.com",
  group: "Physical Geography",
  groupZh: "自然地理",
  category: "General",
  region: "Global / Multi-region",
  description: "Dataset description...",
  topics: ["Boundaries", "Base Map"],
  formats: ["Vector"],
  access: "Open / Free",
  source: "Free GIS Data by Robin Wilson",
  language: "en"
}
```

新增资源时复制一条对象并修改字段即可；删除资源时移除对应对象。页面筛选项和统计数字会根据数据自动生成。

## SEO 说明

`index.html` 已包含：

- `description`、`keywords`、`robots`、`canonical`
- Open Graph 标签
- Twitter Card 标签
- Schema.org JSON-LD

上线到 GitHub Pages 或其他域名后，请同步修改以下位置中的站点 URL：

- `index.html` 中的 `canonical`、`og:url`、`og:image`、`twitter:image`
- `robots.txt` 中的 Sitemap 地址
- `sitemap.xml` 中的页面地址

## 数据免责声明

本站仅整理并展示第三方公开 GIS 数据入口，不拥有这些数据，也不保证其准确性、完整性、时效性、许可条件或可用性。使用前请核验原始发布机构、授权协议、边界争议和质量说明，并自行承担使用风险。

## 致谢

资源目录参考：[Free GIS Data by Robin Wilson](https://freegisdata.rtwilson.com/)
