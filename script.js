var PHONE="916207934584";
var base="Hi Soumya, I\u2019d like to book a permanent makeup appointment in Purnea.";
document.querySelectorAll(".wa-link").forEach(function(a){a.href="https://wa.me/"+PHONE+"?text="+encodeURIComponent(a.dataset.msg||base);a.target="_blank";a.rel="noopener"});
var mb=document.querySelector(".menu"),nv=document.querySelector("nav");
if(mb)mb.addEventListener("click",function(){nv.classList.toggle("open");mb.setAttribute("aria-expanded",nv.classList.contains("open"))});
var f=document.getElementById("bookform");
if(f)f.addEventListener("submit",function(e){e.preventDefault();var d=new FormData(f);var m="Hello Soumya, I want to book an appointment.\nName: "+d.get("name")+"\nPhone: "+d.get("phone")+"\nService: "+d.get("service")+"\nPreferred date: "+d.get("date")+"\nNotes: "+d.get("notes");window.open("https://wa.me/"+PHONE+"?text="+encodeURIComponent(m),"_blank","noopener")});
if(!matchMedia("(prefers-reduced-motion:reduce)").matches){
var sc=document.getElementById("scene");
if(sc){var st=sc.parentElement;st.addEventListener("mousemove",function(e){var r=st.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;sc.style.animation="none";sc.style.transform="rotateY("+x*30+"deg) rotateX("+-y*20+"deg)"});st.addEventListener("mouseleave",function(){sc.style.transform="";sc.style.animation=""})}
document.querySelectorAll(".card").forEach(function(c){c.addEventListener("mousemove",function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform="rotateY("+x*14+"deg) rotateX("+-y*14+"deg) translateZ(8px)"});c.addEventListener("mouseleave",function(){c.style.transform=""})});
if("IntersectionObserver" in window){var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}})},{threshold:.12});
document.querySelectorAll(".card,.steps div,.ba,.vid,details,.stats div,tr").forEach(function(el){el.classList.add("reveal");io.observe(el)})}}
