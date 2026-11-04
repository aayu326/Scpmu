var PHONE="916207934584";
var base="Hi Soumya, I\u2019d like to book a permanent makeup appointment in Purnea.";
document.querySelectorAll(".wa-link").forEach(function(a){a.href="https://wa.me/"+PHONE+"?text="+encodeURIComponent(a.dataset.msg||base);a.target="_blank";a.rel="noopener"});

/* header: let the "coming soon" bar scroll away, keep the nav stuck */
var soon=document.querySelector(".soon");
function setSoon(){document.documentElement.style.setProperty("--soonh",(soon?soon.offsetHeight:0)+"px")}
setSoon();addEventListener("resize",setSoon);addEventListener("load",setSoon);

/* mobile menu */
var mb=document.querySelector(".menu"),nv=document.querySelector("nav");
function closeMenu(){if(nv){nv.classList.remove("open");mb&&mb.setAttribute("aria-expanded","false")}}
if(mb)mb.addEventListener("click",function(){nv.classList.toggle("open");mb.setAttribute("aria-expanded",nv.classList.contains("open"))});
if(nv){nv.querySelectorAll("ul a").forEach(function(a){a.addEventListener("click",closeMenu)});
 document.addEventListener("keydown",function(e){if(e.key==="Escape")closeMenu()});
 document.addEventListener("click",function(e){if(!nv.contains(e.target))closeMenu()})}

/* booking form -> WhatsApp */
var f=document.getElementById("bookform");
if(f)f.addEventListener("submit",function(e){e.preventDefault();var d=new FormData(f);var m="Hello Soumya, I want to book an appointment.\nName: "+d.get("name")+"\nPhone: "+d.get("phone")+"\nService: "+d.get("service")+"\nPreferred date: "+d.get("date")+"\nNotes: "+d.get("notes");window.open("https://wa.me/"+PHONE+"?text="+encodeURIComponent(m),"_blank","noopener")});

/* gallery filter */
var fb=document.querySelectorAll(".filters button"),ba=document.querySelectorAll(".ba");
fb.forEach(function(x){x.addEventListener("click",function(){fb.forEach(function(y){y.setAttribute("aria-pressed",y===x)});ba.forEach(function(c){c.hidden=x.dataset.f!=="all"&&c.dataset.c!==x.dataset.f})})});

/* one soft reveal for content below the first screen */
(function(){
 var els=document.querySelectorAll(".reveal,.card,.ba,.vid,details,.steps>div");
 if(!("IntersectionObserver" in window)||matchMedia("(prefers-reduced-motion:reduce)").matches){els.forEach(function(e){e.classList.add("in")});return}
 var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}})},{threshold:.1});
 els.forEach(function(el){
  if(el.getBoundingClientRect().top<innerHeight){el.classList.add("in");return}
  el.classList.add("reveal");
  el.style.setProperty("--d",(Array.prototype.indexOf.call(el.parentNode.children,el)%4)*90+"ms");io.observe(el)});
})();

/* hero slideshow */
(function(){
 var hs=[].slice.call(document.querySelectorAll(".hs")),dots=[].slice.call(document.querySelectorAll(".hdots button"));
 if(hs.length<2)return;
 var i=0,t,gap=5500,still=matchMedia("(prefers-reduced-motion:reduce)").matches;
 document.documentElement.style.setProperty("--dur",gap+"ms");
 function go(n){if(n===i)return;hs.forEach(function(s){s.classList.remove("prev")});hs[i].classList.remove("on");hs[i].classList.add("prev");i=n;hs[i].classList.add("on");dots.forEach(function(d,k){d.setAttribute("aria-current",k===i)})}
 function run(){clearInterval(t);if(!still&&!document.hidden)t=setInterval(function(){go((i+1)%hs.length)},gap)}
 dots.forEach(function(d,k){d.addEventListener("click",function(){go(k);run()})});
 document.addEventListener("visibilitychange",run);
 hs.forEach(function(s){var u=s.style.backgroundImage.slice(5,-2);if(u){var im=new Image();im.src=u}});
 run();
})();
