/* ============================================================
   主脚本：项目数据与渲染 / 汉堡菜单 / 导航高亮 / 滚动动画 / 回到顶部
   ============================================================ */

(function () {
  "use strict";

  /* ---------- 项目数据（来自 profile.md） ---------- */
  const PROJECTS = [
    {
      name: "学生成绩查询网页",
      category: "Web 应用",
      desc: "前端页面实现学生成绩录入与浏览查询，支持按课程查看分数，界面简洁直观。",
      image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=student+grade+query+web+app+dashboard+ui+clean+table+layout+light+theme&image_size=landscape_16_9"
    },
    {
      name: "AI简易聊天演示网页",
      category: "AI 应用",
      desc: "网页对话界面，模拟AI助手的简单交互演示，展示消息收发与对话流程。",
      image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ai+chatbot+conversation+interface+mockup+modern+minimal+bubbles&image_size=landscape_16_9"
    }
  ];

  /* ---------- 1. 渲染项目列表 ---------- */
  function renderProjects() {
    const list = document.getElementById("projectList");
    if (!list) return;

    list.innerHTML = PROJECTS.map(function (p, i) {
      const num = String(i + 1).padStart(2, "0");

      return (
        '<article class="project reveal">' +
          '<figure class="project-media">' +
            '<img src="' + p.image + '" alt="' + p.name + ' 项目截图" loading="lazy">' +
            '<figcaption class="project-index">' + num + "</figcaption>" +
          "</figure>" +
          '<div class="project-body">' +
            '<div class="project-title-row">' +
              '<h3 class="project-name">' + p.name + "</h3>" +
              '<span class="project-tag">' + p.category + "</span>" +
            "</div>" +
            '<p class="project-desc">' + p.desc + "</p>" +
          "</div>" +
        "</article>"
      );
    }).join("");
  }

  /* ---------- 2. 移动端汉堡菜单 ---------- */
  function initMenu() {
    const toggle = document.getElementById("menuToggle");
    const overlay = document.getElementById("overlay");
    if (!toggle) return;

    function closeMenu() {
      document.body.classList.remove("nav-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }

    toggle.addEventListener("click", function () {
      const open = document.body.classList.toggle("nav-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });

    // 点击遮罩关闭抽屉
    if (overlay) overlay.addEventListener("click", closeMenu);

    // 点击导航链接后自动收起抽屉
    document.querySelectorAll("#siteNav a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    // 窗口拉宽回桌面端时重置菜单状态
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 1024) closeMenu();
    });
  }

  /* ---------- 3. 滚动进入动画 ---------- */
  function initReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 4. 导航当前区块高亮 ---------- */
  function initNavSpy() {
    const links = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));
    const sections = links
      .map(function (l) { return document.querySelector(l.getAttribute("href")); })
      .filter(Boolean);
    if (!sections.length) return;

    function setActive(id) {
      links.forEach(function (l) {
        l.classList.toggle("is-active", l.getAttribute("href") === "#" + id);
      });
    }

    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: "-40% 0px -55% 0px" });

    sections.forEach(function (s) { io.observe(s); });
  }

  /* ---------- 5. 回到顶部按钮 ---------- */
  function initBackToTop() {
    const btn = document.getElementById("backToTop");
    if (!btn) return;

    function onScroll() {
      btn.classList.toggle("is-visible", window.scrollY > 400);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // 处理刷新后页面停在中间的情况

    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- 启动 ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    renderProjects();   // 先渲染，再让 reveal 观察器接管新项目
    initMenu();
    initReveal();
    initNavSpy();
    initBackToTop();
  });
})();
