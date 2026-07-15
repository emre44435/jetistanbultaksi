"use strict";

// Tüm temel bilgiler bu nesneden tek noktada değiştirilebilir.
const invitationConfig = {
  brideName: "Elif",
  groomName: "Kerem",
  eventDate: "2027-06-20T19:30:00+03:00",
  eventEnd: "2027-06-20T23:30:00+03:00",
  venueName: "Garden Palace",
  city: "İstanbul",
  address: "Örnek Mahallesi, Zarafet Caddesi No:20, İstanbul",
  phone: "905555555555",
  whatsapp: "905555555555",
  email: "davet@example.com",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Garden+Palace+Istanbul",
  siteUrl: "https://davetiye-ornek.com/",
  invitationText: "Hayatlarımızı birleştirdiğimiz bu özel günde mutluluğumuzu paylaşmanız, en güzel anılarımıza ortak olmanız ve yanımızda bulunmanız dileğiyle sizleri düğün törenimize davet ediyoruz.",
  brideFamily: "Ayşe & Mehmet Yılmaz",
  groomFamily: "Zeynep & Ahmet Kaya",
  iban: "TR00 0000 0000 0000 0000 0000 00",
  musicUrl: "assets/audio/wedding-music.mp3"
};

const qs = (s, root = document) => root.querySelector(s);
const qsa = (s, root = document) => [...root.querySelectorAll(s)];
const prefersReducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
let activeModal = null;
let previousFocus = null;

function formatLongDate(value) {
  return new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric" }).format(new Date(value));
}

function applyConfig() {
  qsa("[data-config]").forEach((el) => {
    const key = el.dataset.config;
    if (Object.prototype.hasOwnProperty.call(invitationConfig, key)) el.textContent = invitationConfig[key];
  });
  qsa("[data-date-long]").forEach((el) => { el.textContent = formatLongDate(invitationConfig.eventDate); });
  qsa(".js-map-link").forEach((el) => { el.href = invitationConfig.mapUrl; });
  qsa(".js-phone-link").forEach((el) => { el.href = `tel:+${invitationConfig.phone}`; });
  qsa(".js-sms-link").forEach((el) => { el.href = `sms:+${invitationConfig.phone}?body=${encodeURIComponent(`${invitationConfig.brideName} ve ${invitationConfig.groomName}’in düğün davetiyesi hakkında iletişime geçiyorum.`)}`; });
  qsa(".js-email-link").forEach((el) => { el.href = `mailto:${invitationConfig.email}?subject=${encodeURIComponent(`${invitationConfig.brideName} & ${invitationConfig.groomName} Düğünü`)}&body=${encodeURIComponent("Merhaba, dijital davetiye hakkında iletişime geçiyorum.")}`; });
  qsa(".js-whatsapp-link").forEach((el) => {
    const msg = `Merhaba, ${invitationConfig.brideName} ve ${invitationConfig.groomName}’in düğün davetiyesi hakkında iletişime geçiyorum.`;
    el.href = `https://wa.me/${invitationConfig.whatsapp}?text=${encodeURIComponent(msg)}`;
  });
  const source = qs("#weddingMusic source");
  if (source) source.src = invitationConfig.musicUrl;
}

function toast(message) {
  const region = qs("#toastRegion");
  const node = document.createElement("div");
  node.className = "toast";
  node.textContent = message;
  region.appendChild(node);
  setTimeout(() => node.classList.add("hide"), 3000);
  setTimeout(() => node.remove(), 3300);
}

async function copyText(text, success) {
  try {
    if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(text);
    else {
      const area = document.createElement("textarea");
      area.value = text; area.setAttribute("readonly", ""); area.style.position = "fixed"; area.style.opacity = "0";
      document.body.appendChild(area); area.select(); document.execCommand("copy"); area.remove();
    }
    toast(success);
  } catch { toast("Kopyalama işlemi tamamlanamadı."); }
}

function openModal(modal) {
  if (!modal) return;
  previousFocus = document.activeElement;
  activeModal = modal;
  modal.hidden = false;
  document.body.classList.add("is-locked");
  requestAnimationFrame(() => qs(".modal-panel", modal)?.focus());
}

function closeModal(modal = activeModal) {
  if (!modal) return;
  modal.hidden = true;
  activeModal = null;
  if (qs("#opening").classList.contains("is-opened")) document.body.classList.remove("is-locked");
  if (previousFocus instanceof HTMLElement) previousFocus.focus();
}

function trapFocus(event) {
  if (!activeModal || event.key !== "Tab") return;
  const focusables = qsa('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])', activeModal).filter((el) => el.offsetParent !== null);
  if (!focusables.length) return;
  const first = focusables[0], last = focusables[focusables.length - 1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
}

function initOpening() {
  const opening = qs("#opening"), button = qs("#openInvitation");
  button.addEventListener("click", async () => {
    opening.classList.add("animate");
    await setMusic(true);
    setTimeout(() => {
      opening.classList.add("is-opened");
      document.body.classList.remove("is-locked");
      qs("#home").focus?.();
      setTimeout(() => { opening.setAttribute("aria-hidden", "true"); }, 850);
    }, prefersReducedMotion ? 80 : 950);
  });
}

function initHeaderAndReveal() {
  const header = qs("#siteHeader"), top = qs("#backToTop");
  const update = () => {
    const scrolled = scrollY > 40;
    header.classList.toggle("scrolled", scrolled);
    top.classList.toggle("visible", scrollY > 700);
  };
  addEventListener("scroll", update, { passive: true }); update();
  top.addEventListener("click", () => scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" }));
  if (prefersReducedMotion || !("IntersectionObserver" in window)) qsa(".reveal").forEach((el) => el.classList.add("is-visible"));
  else {
    const io = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); io.unobserve(entry.target); } }), { threshold: .12, rootMargin: "0px 0px -40px" });
    qsa(".reveal").forEach((el) => io.observe(el));
  }
  const sections = qsa("main section[id]");
  if ("IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        qsa(".mobile-nav a").forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`));
      }
    }), { rootMargin: "-45% 0px -45%", threshold: 0 });
    sections.forEach((section) => navObserver.observe(section));
  }
}

function initCountdown() {
  const ids = { days: qs("#days"), hours: qs("#hours"), minutes: qs("#minutes"), seconds: qs("#seconds") };
  const target = new Date(invitationConfig.eventDate).getTime();
  const update = () => {
    const diff = target - Date.now();
    if (diff <= 0) { qs("#countdownGrid").hidden = true; qs("#countdownEnded").hidden = false; return; }
    ids.days.textContent = String(Math.floor(diff / 86400000)).padStart(3, "0");
    ids.hours.textContent = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, "0");
    ids.minutes.textContent = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
    ids.seconds.textContent = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
  };
  update(); setInterval(update, 1000);
}

function initRSVP() {
  const modal = qs("#rsvpModal"), form = qs("#rsvpForm");
  qsa(".js-open-rsvp").forEach((btn) => btn.addEventListener("click", () => openModal(modal)));
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const attendance = String(data.get("attendance") || "").trim();
    if (!name || !attendance) { toast("Lütfen ad soyad ve katılım durumunu doldurun."); if (!name) form.elements.name.focus(); return; }
    const lines = [
      `Merhaba, ${invitationConfig.brideName} ve ${invitationConfig.groomName}’in dijital davetiyesi üzerinden katılım durumumu bildiriyorum.`, "",
      `Ad Soyad: ${name}`,
      `Telefon: ${String(data.get("phone") || "Belirtilmedi").trim() || "Belirtilmedi"}`,
      `Katılım Durumu: ${attendance}`,
      `Yetişkin Sayısı: ${data.get("adults") || "0"}`,
      `Çocuk Sayısı: ${data.get("children") || "0"}`,
      `Yemek Tercihi: ${data.get("meal") || "Belirtilmedi"}`,
      `Not: ${String(data.get("note") || "Yok").trim() || "Yok"}`
    ];
    toast("Katılım bilginiz hazırlandı. WhatsApp’a yönlendiriliyorsunuz.");
    const url = `https://wa.me/${invitationConfig.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
    setTimeout(() => window.open(url, "_blank", "noopener,noreferrer"), 450);
  });
}

function calendarDates() {
  const compact = (date) => new Date(date).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  return { start: compact(invitationConfig.eventDate), end: compact(invitationConfig.eventEnd) };
}
function eventDescription() { return `${invitationConfig.brideName} ve ${invitationConfig.groomName}’in düğün töreni. ${invitationConfig.invitationText}\n\nYol tarifi: ${invitationConfig.mapUrl}`; }
function buildIcs() {
  const dates = calendarDates();
  const esc = (v) => String(v).replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
  return ["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//ElifKerem//Dijital Davetiye//TR","CALSCALE:GREGORIAN","METHOD:PUBLISH","BEGIN:VEVENT",`UID:${Date.now()}@davetiye-ornek.com`,`DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z")}`,`DTSTART:${dates.start}`,`DTEND:${dates.end}`,`SUMMARY:${esc(`${invitationConfig.brideName} & ${invitationConfig.groomName} Düğünü`)}`,`DESCRIPTION:${esc(eventDescription())}`,`LOCATION:${esc(`${invitationConfig.venueName}, ${invitationConfig.address}`)}`,"STATUS:CONFIRMED","END:VEVENT","END:VCALENDAR"].join("\r\n");
}
function downloadIcs() {
  const blob = new Blob([buildIcs()], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob), a = document.createElement("a");
  a.href = url; a.download = "elif-kerem-dugun.ics"; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
  toast("Takvim dosyası oluşturuldu.");
}
function initCalendar() {
  const modal = qs("#calendarModal"), dates = calendarDates();
  qsa(".js-open-calendar").forEach((btn) => btn.addEventListener("click", () => openModal(modal)));
  const title = `${invitationConfig.brideName} & ${invitationConfig.groomName} Düğünü`;
  qs("#googleCalendar").href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${dates.start}/${dates.end}&details=${encodeURIComponent(eventDescription())}&location=${encodeURIComponent(`${invitationConfig.venueName}, ${invitationConfig.address}`)}`;
  qs("#outlookCalendar").href = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(title)}&startdt=${encodeURIComponent(new Date(invitationConfig.eventDate).toISOString())}&enddt=${encodeURIComponent(new Date(invitationConfig.eventEnd).toISOString())}&body=${encodeURIComponent(eventDescription())}&location=${encodeURIComponent(`${invitationConfig.venueName}, ${invitationConfig.address}`)}`;
  qs("#appleCalendar").addEventListener("click", downloadIcs); qs("#downloadIcs").addEventListener("click", downloadIcs);
}

function initShareAndCopy() {
  qsa(".js-copy-address").forEach((btn) => btn.addEventListener("click", () => copyText(invitationConfig.address, "Adres panoya kopyalandı.")));
  qsa(".js-copy-link").forEach((btn) => btn.addEventListener("click", () => copyText(location.protocol === "file:" ? invitationConfig.siteUrl : location.href, "Davetiye bağlantısı kopyalandı.")));
  qsa(".js-share").forEach((btn) => btn.addEventListener("click", async () => {
    const data = { title: `${invitationConfig.brideName} & ${invitationConfig.groomName} — Dijital Düğün Davetiyesi`, text: `${invitationConfig.brideName} ve ${invitationConfig.groomName}’in düğün davetiyesi. Bu özel günümüzde sizi de aramızda görmekten mutluluk duyarız.`, url: location.protocol === "file:" ? invitationConfig.siteUrl : location.href };
    try { if (navigator.share) await navigator.share(data); else await copyText(data.url, "Davetiye bağlantısı kopyalandı."); } catch (error) { if (error?.name !== "AbortError") toast("Paylaşım işlemi tamamlanamadı."); }
  }));
}

const galleryItems = [
  ["assets/images/couple-1.webp", "Birlikte çıktığımız yol"], ["assets/images/rings.webp", "Sonsuza dek"], ["assets/images/couple-2.webp", "Romantik bir dans"], ["assets/images/venue.webp", "Hayalimizdeki düğün alanı"], ["assets/images/couple-3.webp", "Büyük güne doğru"], ["assets/images/flowers.webp", "Gecenin zarif detayları"]
];
let galleryIndex = 0, touchStartX = 0;
function showGallery(index) { galleryIndex = (index + galleryItems.length) % galleryItems.length; qs("#lightboxImage").src = galleryItems[galleryIndex][0]; qs("#lightboxImage").alt = galleryItems[galleryIndex][1]; qs("#lightboxCaption").textContent = galleryItems[galleryIndex][1]; qs("#lightboxCount").textContent = `${galleryIndex + 1} / ${galleryItems.length}`; }
function openGallery(index = 0) { const box = qs("#lightbox"); previousFocus = document.activeElement; showGallery(index); box.hidden = false; document.body.classList.add("is-locked"); qs(".lightbox-close").focus(); }
function closeGallery() { qs("#lightbox").hidden = true; if (qs("#opening").classList.contains("is-opened")) document.body.classList.remove("is-locked"); if (previousFocus instanceof HTMLElement) previousFocus.focus(); }
function initGallery() {
  qsa(".gallery-item").forEach((btn) => btn.addEventListener("click", () => openGallery(Number(btn.dataset.index)))); qs("#openGallery").addEventListener("click", () => openGallery(0));
  qs(".lightbox-close").addEventListener("click", closeGallery); qs(".lightbox-prev").addEventListener("click", () => showGallery(galleryIndex - 1)); qs(".lightbox-next").addEventListener("click", () => showGallery(galleryIndex + 1));
  const box = qs("#lightbox"); box.addEventListener("touchstart", (e) => { touchStartX = e.changedTouches[0].clientX; }, { passive: true }); box.addEventListener("touchend", (e) => { const delta = e.changedTouches[0].clientX - touchStartX; if (Math.abs(delta) > 45) showGallery(galleryIndex + (delta < 0 ? 1 : -1)); }, { passive: true });
}

function normalizeName(value) { return value.toLocaleLowerCase("tr-TR").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ı/g, "i").replace(/[^a-z0-9 ]/g, "").trim(); }
function initTable() {
  const modal = qs("#tableModal"), result = qs("#tableResult");
  const guests = { "deniz acar": ["Masa Numaranız: 12", "Bahçe Bölümü"], "selin demir": ["Masa Numaranız: 8", "Havuz Bölümü"], "can yildiz": ["Masa Numaranız: 4", "Sahne Bölümü"] };
  qs("#openTableModal").addEventListener("click", () => openModal(modal));
  qs("#tableForm").addEventListener("submit", (e) => { e.preventDefault(); const name = normalizeName(qs("#guestName").value); const item = guests[name]; result.replaceChildren(); const strong = document.createElement("strong"), p = document.createElement("p"); if (item) { strong.textContent = item[0]; p.textContent = item[1]; } else { strong.textContent = "Kayıt bulunamadı"; p.textContent = "Masa bilginiz henüz sisteme eklenmemiş. Lütfen davet sahipleriyle iletişime geçin."; } result.append(strong, p); result.hidden = false; });
}

function initGift() {
  const details = qs("#giftDetails"), toggle = qs("#toggleGift");
  const setOpen = (open) => { details.hidden = !open; toggle.setAttribute("aria-expanded", String(open)); toggle.textContent = open ? "Hediye Bilgilerini Gizle" : "Hediye Bilgilerini Gör"; };
  toggle.addEventListener("click", () => setOpen(details.hidden)); qs("#closeGift").addEventListener("click", () => setOpen(false)); qs("#copyIban").addEventListener("click", () => copyText(invitationConfig.iban, "IBAN başarıyla kopyalandı."));
  qs("#shareAccount").addEventListener("click", async () => { const text = `Hesap Sahibi: ${invitationConfig.brideName} & ${invitationConfig.groomName}\nIBAN: ${invitationConfig.iban}\nDemo bilgidir.`; try { if (navigator.share) await navigator.share({ title: "Hediye Bilgileri", text }); else await copyText(text, "Hesap bilgileri kopyalandı."); } catch (e) { if (e?.name !== "AbortError") toast("Paylaşım işlemi tamamlanamadı."); } });
}

let musicFade = null;
async function setMusic(shouldPlay) {
  const audio = qs("#weddingMusic"); clearInterval(musicFade);
  try {
    if (shouldPlay) { audio.volume = 0; await audio.play(); let v = 0; musicFade = setInterval(() => { v = Math.min(.22, v + .025); audio.volume = v; if (v >= .22) clearInterval(musicFade); }, 80); toast("Müzik açıldı."); }
    else { let v = audio.volume; musicFade = setInterval(() => { v = Math.max(0, v - .035); audio.volume = v; if (v <= 0) { clearInterval(musicFade); audio.pause(); } }, 60); toast("Müzik kapatıldı."); }
    qsa(".music-disc").forEach((d) => d.classList.toggle("is-playing", shouldPlay));
    qsa(".js-music").forEach((b) => { b.setAttribute("aria-label", shouldPlay ? "Müziği kapat" : "Müziği aç"); const label = b.querySelector("small"); if (label) label.textContent = shouldPlay ? "Kapat" : "Müzik"; });
  } catch { qsa(".music-disc").forEach((d) => d.classList.remove("is-playing")); }
}
function initMusic() { qsa(".js-music").forEach((btn) => btn.addEventListener("click", () => setMusic(qs("#weddingMusic").paused))); }

function initModalsAndKeyboard() {
  qsa("[data-close-modal]").forEach((el) => el.addEventListener("click", () => closeModal(el.closest(".modal"))));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") { if (!qs("#lightbox").hidden) closeGallery(); else if (activeModal) closeModal(); }
    if (!qs("#lightbox").hidden && event.key === "ArrowRight") showGallery(galleryIndex + 1);
    if (!qs("#lightbox").hidden && event.key === "ArrowLeft") showGallery(galleryIndex - 1);
    trapFocus(event);
  });
}

function initFAQ() { qsa(".accordion details").forEach((item) => item.addEventListener("toggle", () => { if (item.open) qsa(".accordion details").forEach((other) => { if (other !== item) other.open = false; }); })); }

function boot() { applyConfig(); initOpening(); initHeaderAndReveal(); initCountdown(); initRSVP(); initCalendar(); initShareAndCopy(); initGallery(); initTable(); initGift(); initMusic(); initModalsAndKeyboard(); initFAQ(); }
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
