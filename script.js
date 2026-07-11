const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
navToggle?.addEventListener("click", () => {
  const open = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!open));
  nav?.classList.toggle("open", !open);
});
nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  navToggle?.setAttribute("aria-expanded", "false");
  nav.classList.remove("open");
}));

const progress = document.querySelector(".scroll-progress span");
const updateProgress = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = max > 0 ? window.scrollY / max : 0;
  if (progress) progress.style.transform = `scaleX(${ratio})`;
};
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

const reveals = document.querySelectorAll(".reveal");
if (reduceMotion) {
  reveals.forEach((el) => el.classList.add("visible"));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach((el) => observer.observe(el));
}

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
  document.querySelector("#video-placeholder strong")?.animate(
    [{ opacity: 1 }, { opacity: 0.35 }, { opacity: 1 }],
    { duration: 700, easing: "ease-out" },
  );
});

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
    copy: "Generate and inspect a real dependency-aware dbt pipeline with staging, intermediate, and marts layers and full lineage.",
    alt: "DAClaw Pipeline Studio interface",
  },
  benchmark: {
    src: "assets/screens/benchmark.png",
    label: "Benchmark Matrix",
    number: "04",
    copy: "Score every model and harness across the full-stack taxonomy — L1 Atomic, L2 Engineering, L3 Analysis, and Text-to-Viz.",
    alt: "DAClaw Benchmark Matrix showing the data-agent taxonomy",
  },
  story: {
    src: "assets/screens/data-story.png",
    label: "Data Video",
    number: "05",
    copy: "Turn grounded evidence into an autoplay, narrated narrative with KPI scenes and charts — a data story that plays like a film.",
    alt: "DAClaw narrated Data Video interface",
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
