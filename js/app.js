const i18n = {
  zh: {
    brand: "免费 GIS 数据导航",
    navCatalog: "数据目录",
    navAbout: "关于",
    eyebrow: "开放地理空间数据索引",
    heroTitle: "快速发现可用的免费 GIS 数据源",
    heroText: "整理自然地理、人文地理、国家和地区专题数据入口，适合制图、空间分析、遥感、城市规划和环境研究使用。",
    startSearch: "开始检索",
    sourceSite: "参考原始目录",
    statDatasets: "数据资源",
    statCategories: "分类主题",
    statRegions: "地区入口",
    catalogEyebrow: "可配置数据目录",
    catalogTitle: "检索数据资源",
    keyword: "关键词",
    group: "资源大类",
    category: "分类 / 地区",
    format: "数据形态",
    access: "访问方式",
    resultSuffix: "条结果",
    reset: "重置筛选",
    aboutEyebrow: "维护方式",
    aboutTitle: "静态页面，也能持续扩展",
    aboutText: "所有资源数据集中维护在 js/data.js 中。后续新增或删除数据时，只需要调整数组条目，筛选器和统计信息会自动更新。",
    disclaimer: "数据免责声明：本站仅整理并展示第三方公开 GIS 数据入口，不拥有这些数据，也不保证其准确性、完整性、时效性、许可条件或可用性。使用前请核验原始发布机构、授权协议、边界争议和质量说明，并自行承担使用风险。",
    credit: "资源参考：",
    all: "全部",
    open: "访问资源",
    noResults: "没有匹配的数据资源，请调整关键词或筛选条件。",
    registration: "需注册",
    free: "免费开放"
  },
  en: {
    brand: "Free GIS Data Directory",
    navCatalog: "Catalog",
    navAbout: "About",
    eyebrow: "Open geospatial data index",
    heroTitle: "Find useful free GIS datasets faster",
    heroText: "A curated directory of physical geography, human geography, and country-specific GIS data sources for mapping, spatial analysis, remote sensing, planning, and environmental research.",
    startSearch: "Search catalog",
    sourceSite: "Original directory",
    statDatasets: "datasets",
    statCategories: "categories",
    statRegions: "regions",
    catalogEyebrow: "Config-driven catalog",
    catalogTitle: "Search datasets",
    keyword: "Keyword",
    group: "Group",
    category: "Category / region",
    format: "Format",
    access: "Access",
    resultSuffix: "results",
    reset: "Reset filters",
    aboutEyebrow: "Maintenance",
    aboutTitle: "Static site, easy to extend",
    aboutText: "All dataset entries live in js/data.js. Add or remove objects in that array and the filters, cards, and statistics update automatically.",
    disclaimer: "Data disclaimer: this site only organizes and links to third-party public GIS data sources. It does not own the data and does not guarantee accuracy, completeness, timeliness, licensing, or availability. Verify the original publisher, license, boundary disputes, and quality notes before use.",
    credit: "Reference source:",
    all: "All",
    open: "Open resource",
    noResults: "No datasets match your filters.",
    registration: "Registration required",
    free: "Open / free"
  }
};

const state = {
  lang: localStorage.getItem("gis-lang") || "zh",
  query: "",
  group: "",
  category: "",
  format: "",
  access: ""
};

const datasets = Array.isArray(window.GIS_DATASETS) ? window.GIS_DATASETS : [];
const els = {
  langToggle: document.querySelector("#langToggle"),
  searchInput: document.querySelector("#searchInput"),
  groupFilter: document.querySelector("#groupFilter"),
  categoryFilter: document.querySelector("#categoryFilter"),
  formatFilter: document.querySelector("#formatFilter"),
  accessFilter: document.querySelector("#accessFilter"),
  resetFilters: document.querySelector("#resetFilters"),
  datasetGrid: document.querySelector("#datasetGrid"),
  resultCount: document.querySelector("#resultCount"),
  totalCount: document.querySelector("#totalCount"),
  categoryCount: document.querySelector("#categoryCount"),
  regionCount: document.querySelector("#regionCount")
};

const groupName = {
  zh: {
    "Physical Geography": "自然地理",
    "Human Geography": "人文地理",
    "Country-specific": "国家/地区专题"
  },
  en: {
    "Physical Geography": "Physical Geography",
    "Human Geography": "Human Geography",
    "Country-specific": "Country-specific"
  }
};

// Topic translations
const topicName = {
  zh: {
    "Elevation": "高程/地形",
    "Hydrology": "水文",
    "Boundaries": "边界",
    "Base Map": "底图",
    "Land Cover": "土地覆盖",
    "Population": "人口",
    "Transport": "交通",
    "Climate": "气候",
    "Ecology": "生态",
    "General": "综合",
    "Energy & Minerals": "能源与矿产",
    "Risk & Conflict": "风险与冲突",
    "Antarctica": "南极洲",
    "Arctic": "北极",
    "Argentina": "阿根廷",
    "Australia": "澳大利亚",
    "Austria": "奥地利",
    "Belgium": "比利时",
    "Bolivia": "玻利维亚",
    "Canada": "加拿大",
    "Central America": "中美洲",
    "Chile": "智利",
    "China": "中国",
    "Denmark": "丹麦",
    "Finland": "芬兰",
    "France": "法国",
    "Germany": "德国",
    "Greece": "希腊",
    "Iceland": "冰岛",
    "Italy": "意大利",
    "Kenya": "肯尼亚",
    "Nepal": "尼泊尔",
    "New Zealand": "新西兰",
    "Norway": "挪威",
    "Romania": "罗马尼亚",
    "Russia": "俄罗斯",
    "Slovenia": "斯洛文尼亚",
    "Spain": "西班牙",
    "Switzerland": "瑞士",
    "The Netherlands": "荷兰",
    "United Arab Emirates": "阿联酋",
    "United Kingdom (UK)": "英国",
    "United States of America (USA)": "美国"
  },
  en: {}
};

// Format translations
const formatName = {
  zh: {
    "Vector": "矢量",
    "Raster": "栅格",
    "API / Portal": "API / 门户",
    "Tabular": "表格",
    "Mixed / Unspecified": "混合 / 未指定"
  },
  en: {}
};

// Category translations
const categoryName = {
  zh: {
    "General": "综合",
    "Land and Ocean Boundaries": "陆地与海洋边界",
    "Elevation": "高程",
    "Weather and Climate": "天气与气候",
    "Hydrology": "水文",
    "Snow/Ice": "雪/冰",
    "Natural Disasters": "自然灾害",
    "Land Cover": "土地覆盖",
    "Environment & Ecology": "环境与生态",
    "Mineral Resources/Oil and Gas": "矿产资源/石油天然气",
    "Administrative Boundaries": "行政边界",
    "Environmental Boundaries": "环境边界",
    "Buildings, Roads and Points of Interest": "建筑、道路与兴趣点",
    "Gazetteers (place/feature names)": "地名录（地点/要素名称）",
    "Lakes, Oceans and other Water Sources": "湖泊、海洋及其他水体",
    "Land Use": "土地利用",
    "Miscellaneous": "其他",
    "Population": "人口",
    "Transport and Communications": "交通与通信",
    "Wars, Conflict and Crime": "战争、冲突与犯罪",
    // Countries
    "Afghanistan": "阿富汗",
    "Antarctica": "南极洲",
    "Arctic": "北极",
    "Argentina": "阿根廷",
    "Australia": "澳大利亚",
    "Austria": "奥地利",
    "Belgium": "比利时",
    "Belize": "伯利兹",
    "Bolivia": "玻利维亚",
    "Brazil": "巴西",
    "Canada": "加拿大",
    "Central America": "中美洲",
    "Chile": "智利",
    "China": "中国",
    "Cyprus": "塞浦路斯",
    "Denmark": "丹麦",
    "Finland": "芬兰",
    "France": "法国",
    "Germany": "德国",
    "Greece": "希腊",
    "Iceland": "冰岛",
    "India": "印度",
    "Ireland": "爱尔兰",
    "Italy": "意大利",
    "Japan": "日本",
    "Kenya": "肯尼亚",
    "Mexico": "墨西哥",
    "Namibia": "纳米比亚",
    "Nepal": "尼泊尔",
    "New Zealand": "新西兰",
    "Norway": "挪威",
    "Peru": "秘鲁",
    "Philippines": "菲律宾",
    "Portugal": "葡萄牙",
    "Puerto Rico": "波多黎各",
    "Romania": "罗马尼亚",
    "Russia": "俄罗斯",
    "Slovenia": "斯洛文尼亚",
    "South Africa": "南非",
    "Spain": "西班牙",
    "Switzerland": "瑞士",
    "The Netherlands": "荷兰",
    "United Arab Emirates": "阿联酋",
    "United Kingdom (UK)": "英国",
    "United States of America (USA)": "美国"
  },
  en: {}
};

// Region translations
const regionName = {
  zh: {
    "Global / Multi-region": "全球 / 多区域",
    "Afghanistan": "阿富汗",
    "Antarctica": "南极洲",
    "Arctic": "北极",
    "Argentina": "阿根廷",
    "Australia": "澳大利亚",
    "Austria": "奥地利",
    "Belgium": "比利时",
    "Belize": "伯利兹",
    "Bolivia": "玻利维亚",
    "Brazil": "巴西",
    "Canada": "加拿大",
    "Central America": "中美洲",
    "Chile": "智利",
    "China": "中国",
    "Cyprus": "塞浦路斯",
    "Denmark": "丹麦",
    "Finland": "芬兰",
    "France": "法国",
    "Germany": "德国",
    "Greece": "希腊",
    "Iceland": "冰岛",
    "India": "印度",
    "Ireland": "爱尔兰",
    "Italy": "意大利",
    "Japan": "日本",
    "Kenya": "肯尼亚",
    "Mexico": "墨西哥",
    "Namibia": "纳米比亚",
    "Nepal": "尼泊尔",
    "New Zealand": "新西兰",
    "Norway": "挪威",
    "Peru": "秘鲁",
    "Philippines": "菲律宾",
    "Portugal": "葡萄牙",
    "Puerto Rico": "波多黎各",
    "Romania": "罗马尼亚",
    "Russia": "俄罗斯",
    "Slovenia": "斯洛文尼亚",
    "South Africa": "南非",
    "Spain": "西班牙",
    "Switzerland": "瑞士",
    "The Netherlands": "荷兰",
    "United Arab Emirates": "阿联酋",
    "United Kingdom (UK)": "英国",
    "United States of America (USA)": "美国"
  },
  en: {}
};

function unique(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

function text(key) {
  return i18n[state.lang][key] || key;
}

function setLanguage(lang) {
  state.lang = lang;
  localStorage.setItem("gis-lang", lang);
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = text(node.dataset.i18n);
  });
  els.langToggle.textContent = lang === "zh" ? "EN" : "中文";
  populateFilters();
  render();
}

function optionLabel(value, type) {
  if (!value) return text("all");
  if (type === "group") return groupName[state.lang][value] || value;
  if (type === "category") return categoryName[state.lang][value] || value;
  if (type === "format") return formatName[state.lang][value] || value;
  if (type === "access" && state.lang === "zh") {
    return value === "Registration required" ? text("registration") : text("free");
  }
  return value;
}

function t(value, map) {
  return (map && map[state.lang] && map[state.lang][value]) || value;
}

function fillSelect(select, values, current, type) {
  select.innerHTML = "";
  const all = document.createElement("option");
  all.value = "";
  all.textContent = optionLabel("", type);
  select.appendChild(all);
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = optionLabel(value, type);
    select.appendChild(option);
  });
  select.value = current;
}

function populateFilters() {
  fillSelect(els.groupFilter, unique(datasets.map((item) => item.group)), state.group, "group");
  fillSelect(els.categoryFilter, unique(datasets.map((item) => item.category)), state.category, "category");
  fillSelect(els.formatFilter, unique(datasets.flatMap((item) => item.formats || [])), state.format, "format");
  fillSelect(els.accessFilter, unique(datasets.map((item) => item.access)), state.access, "access");
}

function matches(item) {
  const haystack = [
    item.name,
    item.description,
    item.group,
    item.groupZh,
    item.category,
    item.region,
    item.domain,
    ...(item.topics || []),
    ...(item.formats || [])
  ].join(" ").toLowerCase();
  return (!state.query || haystack.includes(state.query.toLowerCase()))
    && (!state.group || item.group === state.group)
    && (!state.category || item.category === state.category)
    && (!state.format || (item.formats || []).includes(state.format))
    && (!state.access || item.access === state.access);
}

function displayDescription(item) {
  if (state.lang === "zh") {
    return item.descriptionZh || item.description || "该资源提供公开 GIS 数据入口，请访问原始站点查看下载方式和许可信息。";
  }
  return item.description || "Open the source website for download options and license details.";
}

function renderCard(item) {
  const article = document.createElement("article");
  article.className = "dataset-card";
  const meta = [
    t(item.group, groupName),
    t(item.category, categoryName),
    ...((item.formats || []).slice(0, 2).map(f => t(f, formatName)))
  ];
  const topicTags = (item.topics || []).slice(0, 4).map(tp => `<span class="pill">${escapeHtml(t(tp, topicName))}</span>`).join("");
  article.innerHTML = `
    <div class="card-meta">${meta.map((label) => `<span class="pill">${escapeHtml(label)}</span>`).join("")}</div>
    <h3>${escapeHtml(item.name)}</h3>
    <p>${escapeHtml(displayDescription(item))}</p>
    ${topicTags ? `<div class="card-topics">${topicTags}</div>` : ""}
    <p class="card-domain">${escapeHtml(t(item.region, regionName) || item.domain || "")}</p>
    <a href="${escapeAttr(item.url)}" target="_blank" rel="noopener noreferrer">${text("open")}</a>
  `;
  return article;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;"
  }[char]));
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, "&#096;");
}

function render() {
  const filtered = datasets.filter(matches);
  els.resultCount.textContent = filtered.length.toLocaleString();
  els.datasetGrid.innerHTML = "";
  if (!filtered.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = text("noResults");
    els.datasetGrid.appendChild(empty);
    return;
  }
  filtered.forEach((item) => els.datasetGrid.appendChild(renderCard(item)));
}

function updateStats() {
  els.totalCount.textContent = datasets.length.toLocaleString();
  els.categoryCount.textContent = unique(datasets.map((item) => item.category)).length.toLocaleString();
  els.regionCount.textContent = unique(datasets.map((item) => item.region)).length.toLocaleString();
}

function bindEvents() {
  els.langToggle.addEventListener("click", () => setLanguage(state.lang === "zh" ? "en" : "zh"));
  els.searchInput.addEventListener("input", (event) => {
    state.query = event.target.value.trim();
    render();
  });
  [
    ["group", els.groupFilter],
    ["category", els.categoryFilter],
    ["format", els.formatFilter],
    ["access", els.accessFilter]
  ].forEach(([key, select]) => {
    select.addEventListener("change", (event) => {
      state[key] = event.target.value;
      render();
    });
  });
  els.resetFilters.addEventListener("click", () => {
    state.query = "";
    state.group = "";
    state.category = "";
    state.format = "";
    state.access = "";
    els.searchInput.value = "";
    populateFilters();
    render();
  });
}

updateStats();
bindEvents();
setLanguage(state.lang);
