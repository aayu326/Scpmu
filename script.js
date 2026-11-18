/* Soumya Chauhan Permanent Makeup Studio */
(function () {
  "use strict";
  var PHONE = "917209558552";

  /* footer year */
  var y = new Date().getFullYear();
  document.querySelectorAll("[data-year]").forEach(function (e) { e.textContent = y > 2026 ? "2026\u2013" + y : "2026"; });

  /* header: let the "coming soon" bar scroll away, keep the nav stuck */
  var soon = document.querySelector(".soon");
  function setSoon() { document.documentElement.style.setProperty("--soonh", (soon ? soon.offsetHeight : 0) + "px"); }
  setSoon(); addEventListener("resize", setSoon); addEventListener("load", setSoon);

  /* mobile menu */
  var mb = document.querySelector(".menu"), nv = document.querySelector("nav");
  function setMenu(open) {
    if (!nv || !mb) return;
    nv.classList.toggle("open", open);
    mb.setAttribute("aria-expanded", open ? "true" : "false");
    mb.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  if (mb && nv) {
    mb.addEventListener("click", function () { setMenu(!nv.classList.contains("open")); });
    nv.querySelectorAll("ul a").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && nv.classList.contains("open")) { setMenu(false); mb.focus(); } });
    document.addEventListener("click", function (e) { if (!nv.contains(e.target)) setMenu(false); });
    addEventListener("resize", function () { if (innerWidth > 1080) setMenu(false); });
  }

  /* booking form -> WhatsApp, with validation, success and error messages */
  var f = document.getElementById("bookform");
  if (f) {
    var status = document.getElementById("form-status");
    var fields = { name: f.elements.name, phone: f.elements.phone, date: f.elements.date };
    var errBox = { name: document.getElementById("n-err"), phone: document.getElementById("p-err"), date: document.getElementById("d-err") };
    var btn = f.querySelector("button[type=submit]");
    var d0 = new Date(); d0.setMinutes(d0.getMinutes() - d0.getTimezoneOffset());
    var today = d0.toISOString().slice(0, 10);
    if (fields.date) fields.date.min = today;

    function setErr(k, msg) {
      var el = fields[k], box = errBox[k];
      if (!el || !box) return;
      if (msg) { box.textContent = msg; box.hidden = false; el.setAttribute("aria-invalid", "true"); }
      else { box.textContent = ""; box.hidden = true; el.removeAttribute("aria-invalid"); }
    }
    function show(kind, html) {
      status.className = "fstatus " + kind;
      status.innerHTML = html;
      status.hidden = false;
    }
    function validate() {
      var bad = [];
      var name = fields.name.value.trim();
      var phone = fields.phone.value.replace(/[\s\-().]/g, "");
      setErr("name", name.length < 2 ? "Please enter your name." : "");
      if (name.length < 2) bad.push("name");
      var okPhone = /^(?:\+?91|0)?[6-9]\d{9}$/.test(phone);
      setErr("phone", !phone ? "Please enter your phone number." : (okPhone ? "" : "Please enter a valid 10-digit Indian mobile number."));
      if (!okPhone) bad.push("phone");
      var dv = fields.date.value;
      var okDate = !dv || dv >= today;
      setErr("date", okDate ? "" : "Please choose today or a future date.");
      if (!okDate) bad.push("date");
      return bad;
    }
    ["name", "phone", "date"].forEach(function (k) {
      fields[k].addEventListener("input", function () { if (fields[k].getAttribute("aria-invalid")) validate(); });
    });

    f.addEventListener("submit", function (e) {
      e.preventDefault();
      status.hidden = true;
      var bad = validate();
      if (bad.length) {
        show("bad", "Please fix the highlighted fields and try again.");
        fields[bad[0]].focus();
        return;
      }
      var d = new FormData(f);
      var msg = "Hello Soumya, I want to book an appointment.\nName: " + d.get("name").trim() +
        "\nPhone: " + d.get("phone").trim() + "\nService: " + d.get("service") +
        "\nPreferred date: " + (d.get("date") || "Not decided") +
        (String(d.get("notes") || "").trim() ? "\nNotes: " + String(d.get("notes")).trim() : "");
      var url = "https://wa.me/" + PHONE + "?text=" + encodeURIComponent(msg);
      btn.disabled = true;
      var w = null;
      try { w = window.open(url, "_blank"); if (w) w.opener = null; } catch (err) { w = null; }
      btn.disabled = false;
      if (w) {
        show("ok", "<strong>Thank you, " + String(d.get("name")).trim().replace(/[<>&"]/g, "") + ".</strong> WhatsApp is opening with your details. Tap <em>Send</em> there to confirm your request, and Soumya will reply to arrange a time. " +
          "Nothing opened? <a href=\"" + url + "\" target=\"_blank\" rel=\"noopener noreferrer\">Open WhatsApp</a>.");
        f.reset();
      } else {
        show("bad", "We could not open WhatsApp automatically, possibly because pop-ups are blocked. " +
          "<a href=\"" + url + "\" target=\"_blank\" rel=\"noopener noreferrer\">Tap here to send your request on WhatsApp</a>, or call <a href=\"tel:+" + PHONE + "\">+91 72095 58552</a>.");
      }
      status.focus();
    });
  }

  /* gallery filter */
  var fb = document.querySelectorAll(".filters button"), ba = document.querySelectorAll(".ba");
  fb.forEach(function (x) {
    x.addEventListener("click", function () {
      fb.forEach(function (y) { y.setAttribute("aria-pressed", y === x ? "true" : "false"); });
      ba.forEach(function (c) { c.hidden = x.dataset.f !== "all" && c.dataset.c !== x.dataset.f; });
    });
  });

  /* one soft reveal for content below the first screen */
  (function () {
    var els = document.querySelectorAll(".reveal,.card,.ba,.vid,details,.steps>div");
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion:reduce)").matches) {
      els.forEach(function (e) { e.classList.add("in"); }); return;
    }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } });
    }, { threshold: .1 });
    els.forEach(function (el) {
      if (el.getBoundingClientRect().top < innerHeight) { el.classList.add("in"); return; }
      el.classList.add("reveal");
      el.style.setProperty("--d", (Array.prototype.indexOf.call(el.parentNode.children, el) % 4) * 90 + "ms");
      io.observe(el);
    });
  })();

  /* hero slideshow */
  (function () {
    var hs = [].slice.call(document.querySelectorAll(".hs")), dots = [].slice.call(document.querySelectorAll(".hdots button"));
    if (hs.length < 2) return;
    var i = 0, t, gap = 5500, still = matchMedia("(prefers-reduced-motion:reduce)").matches;
    document.documentElement.style.setProperty("--dur", gap + "ms");
    function go(n) {
      if (n === i) return;
      hs.forEach(function (s) { s.classList.remove("prev"); });
      hs[i].classList.remove("on"); hs[i].classList.add("prev"); i = n; hs[i].classList.add("on");
      dots.forEach(function (d, k) { d.setAttribute("aria-current", k === i ? "true" : "false"); });
    }
    function run() { clearInterval(t); if (!still && !document.hidden) t = setInterval(function () { go((i + 1) % hs.length); }, gap); }
    dots.forEach(function (d, k) { d.addEventListener("click", function () { go(k); run(); }); });
    document.addEventListener("visibilitychange", run);
    hs.forEach(function (s) { var u = s.style.backgroundImage.slice(5, -2); if (u) { var im = new Image(); im.src = u; } });
    run();
  })();
})();
