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
  if (type === "access" && state.lang === "zh") {
    return value === "Registration required" ? text("registration") : text("free");
  }
  return value;
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
    const prefix = item.groupZh ? `${item.groupZh} / ${item.category}` : item.category;
    return `${prefix}。${item.description || "该资源提供公开 GIS 数据入口，请访问原始站点查看下载方式和许可信息。"}`;
  }
  return item.description || "Open the source website for download options and license details.";
}

function renderCard(item) {
  const article = document.createElement("article");
  article.className = "dataset-card";
  const meta = [
    optionLabel(item.group, "group"),
    item.category,
    ...((item.formats || []).slice(0, 2))
  ];
  article.innerHTML = `
    <div class="card-meta">${meta.map((label) => `<span class="pill">${escapeHtml(label)}</span>`).join("")}</div>
    <h3>${escapeHtml(item.name)}</h3>
    <p>${escapeHtml(displayDescription(item))}</p>
    <p>${escapeHtml(item.domain || item.region || "")}</p>
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
