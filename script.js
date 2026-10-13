/*
  MANENDRA STORE - starter storefront
  1) Replace WHATSAPP_NUMBER below with your store number, including country code.
     India example: 919876543210 (no +, spaces or dashes).
  2) Replace the demo product names, prices, categories and image URLs below.
  This starter uses WhatsApp for orders; it does not collect online payments.
*/
const WHATSAPP_NUMBER = "91XXXXXXXXXX"; // CHANGE THIS before publishing

const products = [
  {id:1,name:"Everyday Tote",category:"Accessories",price:599,tag:"Bestseller",image:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80"},
  {id:2,name:"Classic Watch",category:"Accessories",price:1299,tag:"Timeless",image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"},
  {id:3,name:"Desk Essential",category:"Lifestyle",price:449,tag:"Daily edit",image:"https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=800&q=80"},
  {id:4,name:"Wireless Earbuds",category:"Tech",price:999,tag:"Popular",image:"https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=800&q=80"}
];

const cart = new Map();
const productGrid = document.getElementById("productGrid");
const cartCount = document.getElementById("cartCount");
const cartOverlay = document.getElementById("cartOverlay");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const toast = document.getElementById("toast");
let activeCategory = "All";
let toastTimer;

function money(amount){ return new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(amount); }
function showToast(message){
  toast.textContent=message; toast.classList.add("show");
  clearTimeout(toastTimer); toastTimer=setTimeout(()=>toast.classList.remove("show"),2300);
}
function escapeHTML(value){
  return String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
}
function renderProducts(){
  const filtered=products.filter(p=>activeCategory==="All"||p.category===activeCategory);
  productGrid.innerHTML=filtered.map(p=>`
    <article class="product-card">
      <div class="product-image">
        <img src="${escapeHTML(p.image)}" alt="${escapeHTML(p.name)}" loading="lazy" onerror="this.style.display='none';this.parentElement.style.background='#d8c9ad'">
        <span class="product-tag">${escapeHTML(p.tag)}</span>
      </div>
      <div class="product-info">
        <div class="product-category">${escapeHTML(p.category)}</div>
        <h3 class="product-title">${escapeHTML(p.name)}</h3>
        <div class="product-price">${money(p.price)}</div>
        <div class="product-actions">
          <button class="add-button" data-add="${p.id}">Add to bag</button>
          <button class="quick-order" data-order="${p.id}">Order now ↗</button>
        </div>
      </div>
    </article>`).join("");
}
function addToCart(id){
  const item=cart.get(id);
  if(item) item.qty+=1; else cart.set(id,{product:products.find(p=>p.id===id),qty:1});
  updateCart(); showToast("Added to your bag");
}
function updateCart(){
  let count=0,total=0;
  cart.forEach(({product,qty})=>{count+=qty;total+=product.price*qty;});
  cartCount.textContent=count; cartTotal.textContent=money(total);
  if(cart.size===0){cartItems.innerHTML='<p class="empty-cart">Your bag is waiting for something lovely.</p>';return;}
  cartItems.innerHTML=[...cart.entries()].map(([id,{product,qty}])=>`
    <div class="cart-item">
      <div><div class="cart-item-name">${escapeHTML(product.name)}</div>
      <div class="cart-item-price">${money(product.price)} each</div>
      <div class="qty-controls"><button data-dec="${id}" aria-label="Decrease quantity">−</button><span>${qty}</span><button data-inc="${id}" aria-label="Increase quantity">+</button></div></div>
      <button class="remove-item" data-remove="${id}">Remove</button>
    </div>`).join("");
}
function openCart(){cartOverlay.hidden=false;document.body.style.overflow="hidden";}
function closeCart(){cartOverlay.hidden=true;document.body.style.overflow="";}
function validWhatsAppNumber(){
  if(!/^\d{10,15}$/.test(WHATSAPP_NUMBER)||WHATSAPP_NUMBER.includes("X")){
    showToast("First add your WhatsApp number in script.js");
    return false;
  }
  return true;
}
function sendWhatsApp(message){
  if(!validWhatsAppNumber()) return;
  const url=`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url,"_blank","noopener,noreferrer");
}
function orderOne(id){
  const p=products.find(product=>product.id===id);
  sendWhatsApp(`Hello Manendra Store! I would like to order:\n• ${p.name} — ${money(p.price)}\nPlease confirm availability and delivery charges.`);
}
function checkout(){
  if(cart.size===0){showToast("Your bag is empty");return;}
  let lines=["Hello Manendra Store! I would like to place an order:", ""];
  let total=0;
  cart.forEach(({product,qty})=>{lines.push(`• ${product.name} × ${qty} — ${money(product.price*qty)}`);total+=product.price*qty;});
  lines.push("",`Estimated total: ${money(total)}`,"Please confirm availability, final total and delivery charges.");
  sendWhatsApp(lines.join("\n"));
}
document.getElementById("filters").addEventListener("click",event=>{
  const button=event.target.closest("[data-category]");if(!button)return;
  activeCategory=button.dataset.category;
  document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active",b===button));
  renderProducts();
});
productGrid.addEventListener("click",event=>{
  const add=event.target.closest("[data-add]"),order=event.target.closest("[data-order]");
  if(add)addToCart(Number(add.dataset.add));
  if(order)orderOne(Number(order.dataset.order));
});
cartItems.addEventListener("click",event=>{
  const inc=event.target.closest("[data-inc]"),dec=event.target.closest("[data-dec]"),remove=event.target.closest("[data-remove]");
  if(inc){const item=cart.get(Number(inc.dataset.inc));if(item)item.qty++;}
  if(dec){const id=Number(dec.dataset.dec),item=cart.get(id);if(item){item.qty--;if(item.qty<=0)cart.delete(id);}}
  if(remove)cart.delete(Number(remove.dataset.remove));
  updateCart();
});
document.getElementById("openCart").addEventListener("click",openCart);
document.getElementById("closeCart").addEventListener("click",closeCart);
cartOverlay.addEventListener("click",event=>{if(event.target===cartOverlay)closeCart();});
document.getElementById("checkoutWhatsApp").addEventListener("click",checkout);
document.getElementById("contactWhatsApp").addEventListener("click",()=>sendWhatsApp("Hello Manendra Store! I have a question about your products."));
document.getElementById("menuToggle").addEventListener("click",()=>{
  const nav=document.getElementById("navLinks");const open=nav.classList.toggle("open");
  document.getElementById("menuToggle").setAttribute("aria-expanded",String(open));
});
document.querySelectorAll("#navLinks a").forEach(link=>link.addEventListener("click",()=>{
  document.getElementById("navLinks").classList.remove("open");
  document.getElementById("menuToggle").setAttribute("aria-expanded","false");
}));
document.addEventListener("keydown",event=>{if(event.key==="Escape"&&!cartOverlay.hidden)closeCart();});
document.getElementById("year").textContent=new Date().getFullYear();
renderProducts();updateCart();
