const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---- Mobile nav --------------------------------------------------------- */
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
navToggle?.addEventListener("click", () => {
  const open = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!open));
  nav?.classList.toggle("open", !open);
});
nav?.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    navToggle?.setAttribute("aria-expanded", "false");
    nav.classList.remove("open");
  }),
);

/* ---- Scroll progress + sticky-header shadow ----------------------------- */
const progress = document.querySelector(".scroll-progress span");
const header = document.querySelector(".site-header");
const onScroll = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = max > 0 ? window.scrollY / max : 0;
  if (progress) progress.style.transform = `scaleX(${ratio})`;
  header?.classList.toggle("scrolled", window.scrollY > 12);
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---- Count-up for the stat band ----------------------------------------- */
function countUp(el) {
  const target = Number(el.dataset.count);
  if (!Number.isFinite(target) || reduceMotion) {
    el.textContent = String(target);
    return;
  }
  const duration = 1100;
  const start = performance.now();
  const step = (now) => {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = String(Math.round(target * eased));
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* ---- Reveal on scroll (also triggers bar fills + count-ups) ------------- */
const reveals = document.querySelectorAll(".reveal");
const activate = (el) => {
  el.classList.add("visible");
  el.querySelectorAll?.(".bar i").forEach((bar) => bar.classList.add("fill"));
};
if (reduceMotion) {
  reveals.forEach(activate);
  document.querySelectorAll(".statband [data-count]").forEach(countUp);
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  reveals.forEach((el) => observer.observe(el));

  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          countUp(entry.target);
          statObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 },
  );
  document.querySelectorAll(".statband [data-count]").forEach((el) => statObserver.observe(el));
}

/* ---- Demo video wiring -------------------------------------------------- */
const video = document.querySelector("#demo-video");
const placeholder = document.querySelector("#video-placeholder");
const videoSrc = window.DACLAW_SITE?.videoSrc?.trim();
if (video && videoSrc) {
  video.src = videoSrc;
  video.load();
  placeholder?.classList.add("hidden");
} else {
  video?.removeAttribute("controls");
}
document.querySelector("#placeholder-play")?.addEventListener("click", () => {
  document
    .querySelector("#video-placeholder strong")
    ?.animate([{ opacity: 1 }, { opacity: 0.35 }, { opacity: 1 }], { duration: 700, easing: "ease-out" });
});

/* ---- Product interface tabs --------------------------------------------- */
const screens = {
  analysis: {
    src: "assets/screens/data-analysis.png",
    label: "Mission Control",
    number: "01",
    copy: "Compile a data mission, review the typed workflow with its execution layers and parallel branches, then hit Approve & Run.",
    alt: "DAClaw Mission Control interface with a compiled workflow awaiting approval",
  },
  inspector: {
    src: "assets/screens/node-inspector.png",
    label: "Node Inspector",
    number: "02",
    copy: "Click any node to reveal its inputs, the exact SQL executed, live status, and an output preview — full per-node transparency.",
    alt: "DAClaw Node Inspector showing a step's inputs and executed SQL",
  },
  pipeline: {
    src: "assets/screens/pipeline-studio.png",
    label: "Pipeline Studio",
    number: "03",
    copy: "Describe a goal in one sentence — the agent designs layered dbt models (staging → intermediate → marts) and materializes each into a real table with a ref() lineage DAG.",
    alt: "DAClaw Pipeline Studio building an Auto-DBT data pipeline",
  },
  benchmark: {
    src: "assets/screens/benchmark.png",
    label: "Benchmark Matrix",
    number: "04",
    copy: "Score every model and harness across the full-stack taxonomy — L1 Atomic, L2 Engineering, L3 Analysis, and Text-to-Viz.",
    alt: "DAClaw Data Agent Leaderboard showing model × harness scores",
  },
  story: {
    src: "assets/screens/data-story.png",
    label: "Data Video",
    number: "05",
    copy: "Turn grounded evidence into an autoplay, narrated narrative with KPI scenes and per-scene voice-over — a data story that plays like a film.",
    alt: "DAClaw narrated Data Video with a KPI takeaway scene",
  },
};
const screenImage = document.querySelector("#product-screen");
const screenLabel = document.querySelector("#screen-label");
const screenNumber = document.querySelector("#screen-number");
const screenCopy = document.querySelector("#screen-copy");
document.querySelectorAll(".product-tabs button").forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.dataset.screen;
    const next = screens[key];
    if (!next || !screenImage) return;
    document.querySelectorAll(".product-tabs button").forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-selected", String(active));
    });
    screenImage.classList.add("switching");
    setTimeout(() => {
      screenImage.src = next.src;
      screenImage.alt = next.alt;
      if (screenLabel) screenLabel.textContent = next.label;
      if (screenNumber) screenNumber.textContent = next.number;
      if (screenCopy) screenCopy.textContent = next.copy;
      screenImage.classList.remove("switching");
    }, 160);
  });
});
