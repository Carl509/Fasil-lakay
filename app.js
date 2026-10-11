// Fasil Lakay — configuration locale
// Remplace ce numéro par le WhatsApp professionnel que tu contrôles, format international sans + ni espaces.
const BUSINESS_WHATSAPP = "50900000000";
const KEY = "fasil_lakay_annonces_v1";
const demo = [
 {id:"demo1",title:"Création de flyers et logos",category:"Services",price:"À partir de 500 HTG",city:"Port-au-Prince",phone:"",emoji:"🎨",description:"Service de création graphique pour commerces, événements et réseaux sociaux. Exemple de démonstration — contactez l'entreprise pour un devis.",demo:true},
 {id:"demo2",title:"Réparation de téléphones",category:"Services",price:"Sur devis",city:"À préciser",phone:"",emoji:"📱",description:"Exemple fictif de catégorie. Vérifiez le prestataire et demandez un devis avant toute réparation.",demo:true},
 {id:"demo3",title:"Accessoires personnalisés",category:"Produits",price:"Prix à confirmer",city:"À préciser",phone:"",emoji:"🛍️",description:"Exemple fictif pour montrer comment un vendeur pourrait présenter ses produits.",demo:true},
 {id:"demo4",title:"Initiation au design sur téléphone",category:"Formation",price:"À confirmer",city:"En ligne",phone:"",emoji:"📚",description:"Exemple fictif de formation. Vérifiez le programme, le formateur et les conditions avant paiement.",demo:true}
];
let currentCategory = "Tout", currentQuery = "";
function loadUser(){try{return JSON.parse(localStorage.getItem(KEY)||"[]")}catch(e){return []}}
function saveUser(items){localStorage.setItem(KEY,JSON.stringify(items))}
function allItems(){return [...loadUser(),...demo]}
function esc(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function showToast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2800)}
function phoneLink(phone,title){const n=(phone||"").replace(/\D/g,"");if(n.length<8)return "";return `https://wa.me/${n}?text=${encodeURIComponent("Bonjour, j'ai vu votre annonce « "+title+" » sur Fasil Lakay.")}`}
function render(){
 const items=allItems().filter(x=>(currentCategory==="Tout"||x.category===currentCategory)&&((x.title+" "+x.description+" "+x.city+" "+x.category).toLowerCase().includes(currentQuery.toLowerCase())));
 document.getElementById("resultCount").textContent=items.length+" annonce(s)";
 const grid=document.getElementById("listingGrid");
 if(!items.length){grid.innerHTML='<div class="empty">Aucune annonce trouvée. Essaie un autre mot-clé ou publie la première annonce.</div>';return}
 grid.innerHTML=items.map(x=>{const link=!x.demo?phoneLink(x.phone,x.title):"";return `<article class="listing"><div class="thumb">${esc(x.emoji||"✨")}</div><div class="listingmain"><h3>${esc(x.title)}</h3><p>${esc(x.description)}</p><div class="price">${esc(x.price||"Prix à discuter")}</div><div class="meta"><span>📍 ${esc(x.city)}</span><span>${esc(x.category)}</span>${x.demo?'<span>Exemple</span>':'<span>Annonce locale</span>'}</div>${link?`<a class="contact" href="${link}" target="_blank" rel="noopener">Contacter sur WhatsApp</a>`:x.demo?'<span class="small">Annonce de démonstration — pas de contact réel</span>':'<span class="small">Ajoute un numéro WhatsApp valide pour être contacté.</span>'}</div></article>`}).join("");
}
function setPage(page){
 for(const id of ["home","post","business","about"]){document.getElementById(id+"Section").style.display=id===page?"block":"none"}
 document.querySelectorAll(".navbtn").forEach(b=>b.classList.toggle("active",b.dataset.page===page));
 window.scrollTo({top:0,behavior:"smooth"});
}
document.getElementById("categories").addEventListener("click",e=>{const b=e.target.closest("[data-cat]");if(!b)return;currentCategory=b.dataset.cat;document.querySelectorAll(".cat").forEach(x=>x.classList.toggle("active",x===b));document.querySelectorAll(".tab").forEach(x=>x.classList.toggle("active",x.dataset.filter===currentCategory));render()});
document.getElementById("tabs").addEventListener("click",e=>{const b=e.target.closest("[data-filter]");if(!b)return;currentCategory=b.dataset.filter;document.querySelectorAll(".tab").forEach(x=>x.classList.toggle("active",x===b));document.querySelectorAll(".cat").forEach(x=>x.classList.toggle("active",x.dataset.cat===currentCategory));render()});
function doSearch(){currentQuery=document.getElementById("searchInput").value.trim();setPage("home");render()}
document.getElementById("searchBtn").addEventListener("click",doSearch);
document.getElementById("searchInput").addEventListener("keydown",e=>{if(e.key==="Enter")doSearch()});
document.querySelectorAll(".navbtn").forEach(b=>b.addEventListener("click",()=>setPage(b.dataset.page)));
document.getElementById("cancelPost").addEventListener("click",()=>setPage("home"));
document.getElementById("listingForm").addEventListener("submit",e=>{
 e.preventDefault();
 const phone=document.getElementById("phone").value.trim();
 if(phone.replace(/\D/g,"").length<8){showToast("Entre un numéro WhatsApp valide avec l'indicatif du pays.");return}
 const item={id:"u"+Date.now(),title:document.getElementById("title").value.trim(),category:document.getElementById("category").value,price:document.getElementById("price").value?Number(document.getElementById("price").value).toLocaleString("fr-FR")+" HTG":"Prix à discuter",city:document.getElementById("city").value.trim(),phone,emoji:document.getElementById("emoji").value,description:document.getElementById("description").value.trim(),createdAt:new Date().toISOString()};
 const items=loadUser();items.unshift(item);
 try{saveUser(items)}catch(err){showToast("Stockage indisponible. Vérifie l'espace du navigateur.");return}
 e.target.reset();showToast("Annonce enregistrée sur cet appareil.");currentCategory="Tout";currentQuery="";document.getElementById("searchInput").value="";render();setPage("home");
});
document.getElementById("clearLocal").addEventListener("click",()=>{if(confirm("Effacer toutes les annonces créées sur cet appareil ?")){localStorage.removeItem(KEY);render();showToast("Annonces locales effacées.")}});
document.getElementById("hpContact").href="https://wa.me/"+BUSINESS_WHATSAPP+"?text="+encodeURIComponent("Bonjour Henry Production, je vous contacte depuis Fasil Lakay.");
render();
// PWA install prompt, when supported by the browser.
let installPrompt=null;
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();installPrompt=e;document.getElementById("installBtn").style.display="inline-block"});
document.getElementById("installBtn").addEventListener("click",async()=>{if(!installPrompt){showToast("Dans Chrome : menu ⋮ puis « Installer l'application » ou « Ajouter à l'écran d'accueil ».");return}installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;document.getElementById("installBtn").style.display="none"});
if("serviceWorker" in navigator && location.protocol.startsWith("http"))window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
