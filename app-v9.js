/* FARTAK v9 — app logic */
const D=window.FARTAK_DATA;
const EN_POOL=['cat_laptop','cat_gpu','cat_cpu','cat_monitor','cat_keyboard','cat_case','cat_headphone','cat_ram','cat_ssd','cat_motherboard'];
const imgFor=en=>({laptop:'cat_laptop',gpu:'cat_gpu',cpu:'cat_cpu',monitor:'cat_monitor',keyboard:'cat_keyboard',case:'cat_case',headphone:'cat_headphone',ram:'cat_ram',ssd:'cat_ssd',motherboard:'cat_motherboard'}[en]||'cat_laptop')+'.jpg';
let PID=0;
const prep=(list,pool)=>list.map(p=>{PID++;return {...p,id:PID,en:pool[(PID-1)%pool.length]};});
const best=prep(D.best_sellers,EN_POOL), neu=prep(D.new_arrivals,EN_POOL), flash=prep(D.flash_sale,EN_POOL);
const allProds=[...best,...neu,...flash];
const stockInfo=s=>s==='out'?['ناموجود','#9ca3af']:s==='low'?['موجودی کم','#d97706']:['موجود','#16a34a'];
const badge=p=>p.discount?`<span class="p-badge sale">${p.discount}</span>`:p.badge==='new'?`<span class="p-badge new">جدید</span>`:p.badge==='bestseller'?`<span class="p-badge best">پرفروش</span>`:p.stock==='low'?`<span class="p-badge low">کم</span>`:'';
function cardHTML(p){
  const[st,sc]=stockInfo(p.stock);
  return `<div class="product" data-id="${p.id}" data-name="${p.name}">
    ${badge(p)}
    <div class="quick">
      <button class="act-btn wish-btn" aria-label="علاقه‌مندی"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="1.8" d="M12 20s-7-4.3-7-9.5A3.5 3.5 0 0 1 12 7a3.5 3.5 0 0 1 7 3.5C19 15.7 12 20 12 20Z"/></svg></button>
      <button class="act-btn cmp-btn" aria-label="مقایسه"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="1.8" d="M8 3v14M8 3 5 6m3-3 3 3M16 21V7m0 14 3-3m-3 3-3-3"/></svg></button>
      <button class="act-btn" aria-label="مشاهده سریع" onclick="openQV(${p.id})"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="1.8" d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg></button>
    </div>
    <div class="p-img"><img src="assets/img/${imgFor(p.en)}" loading="lazy" alt="${p.name}" onerror="this.parentElement.innerHTML='<div class=\\'w-24 h-24 rounded-2xl bg-bg grid place-items-center text-ink2 font-black text-2xl\\'>${p.brand[0]}</div>'"></div>
    <div class="p-body">
      <div class="p-brand">${p.brand}</div>
      <h3 class="p-name">${p.name}</h3>
      <div class="p-meta"><span class="stock-dot" style="background:${sc}"></span><span>${st}</span><span class="mr-auto text-amber-500">★ ${p.rating}</span></div>
      <div class="flex items-end gap-1"><span class="p-price">${p.price}</span><span class="text-[10px] text-txt2">تومان</span>${p.old_price?`<span class="p-old">${p.old_price}</span>`:''}</div>
      <button class="p-cart" ${p.stock==='out'?'disabled':''} onclick="addCart(this)">${p.stock==='out'?'ناموجود':'افزودن به سبد'}</button>
    </div>
  </div>`;
}
const render=(list,id)=>document.getElementById(id).innerHTML=list.map(cardHTML).join('');
render(best,'best-row');render(neu,'new-row');render(flash,'rec-row');
/* STORIES + VIEWER */
const STORY_DEFS=[
  {title:'تخفیف ویژه',img:'story_gpu'},{title:'گیمینگ',img:'story_laptop'},
  {title:'RTX',img:'story_gpu'},{title:'لپ‌تاپ',img:'story_laptop'},
  {title:'مانیتور',img:'story_monitor'},{title:'SSD',img:'story_ssd'},
  {title:'CPU',img:'story_cpu'},{title:'RAM',img:'story_ram'},
  {title:'هدست',img:'story_headphone'},{title:'کیبورد',img:'story_keyboard'}
];
document.getElementById('storyStrip').innerHTML=STORY_DEFS.map((s,i)=>`<button class="story ${i<3?'unread':'read'}" onclick="openStory(${i})"><span class="story-ring"><img src="assets/img/${s.img}.jpg" onerror="this.style.display='none'"></span><span class="story-label">${s.title}</span></button>`).join('');
let svTimer,svIdx=0;
function openStory(i){
  svIdx=i;const s=STORY_DEFS[i];
  document.getElementById('svCard').innerHTML=`<div class="sv-progress"><div class="sv-bar"><span></span></div></div><img class="sv-img" src="assets/img/${s.img}.jpg" onerror="this.style.background='#2b313a'"><div class="sv-body"><h3 class="text-lg font-extrabold mb-1">${s.title}</h3><p class="text-[13px] text-white/70 mb-4">بهترین محصولات ${s.title} با گارانتی معتبر و ارسال سریع.</p><a href="#best" onclick="closeStory()" class="btn-primary" style="background:#e23b3b">مشاهده محصولات</a></div><div class="sv-nav sv-prev" onclick="svNav(-1)">▶</div><div class="sv-nav sv-next" onclick="svNav(1)">◀</div><button class="absolute top-3 left-3 w-9 h-9 rounded-full bg-black/40 text-white grid place-items-center" onclick="closeStory()" aria-label="بستن">✕</button>`;
  document.getElementById('sv').classList.add('show');
  const bar=document.querySelector('.sv-bar>span');let w=0;clearInterval(svTimer);
  svTimer=setInterval(()=>{w+=2;bar.style.width=w+'%';if(w>=100){clearInterval(svTimer);document.querySelector('.sv-bar').classList.add('done');}},60);
}
function svNav(d){const n=(svIdx+d+STORY_DEFS.length)%STORY_DEFS.length;openStory(n);}
function closeStory(){document.getElementById('sv').classList.remove('show');clearInterval(svTimer);}
document.getElementById('sv').addEventListener('click',e=>{if(e.target.id==='sv')closeStory();});

/* CATEGORIES */
document.getElementById('catGrid').innerHTML=D.categories_q.map(c=>`<a href="#" class="cat-card"><div class="img-wrap"><img src="assets/img/${imgFor(c.en)}" onerror="this.style.display='none'"></div><p class="text-center text-[12px] font-medium py-2.5">${c.title}</p></a>`).join('');

/* GAMING */
document.getElementById('gamingGrid').innerHTML=D.gaming_cats.map(g=>`<a href="#" class="g-card"><img src="assets/img/${g.title.includes('گیمینگ')?'story_gpu':g.title.includes('مانیتور')?'story_monitor':'story_keyboard'}.jpg" onerror="this.style.display='none'"><div class="p-3"><p class="font-bold text-[13px]">${g.title}</p></div></a>`).join('');

/* READY PCs */
const PCs=[
  {t:'سیستم گیمینگ X1',cpu:'Ryzen 7 7800X3D',gpu:'RTX 4070',ram:'32GB',ssd:'1TB',price:'62,900,000',img:'cat_case'},
  {t:'سیستم ورک‌استیشن W2',cpu:'Intel i9-14900K',gpu:'RTX 4080',ram:'64GB',ssd:'2TB',price:'98,500,000',img:'cat_motherboard'},
  {t:'سیستم کریتور C3',cpu:'Ryzen 9 7950X',gpu:'RTX 4090',ram:'64GB',ssd:'4TB',price:'145,000,000',img:'cat_gpu'},
  {t:'سیستم اداری O4',cpu:'Intel i5-14400F',gpu:'GTX 1660',ram:'16GB',ssd:'512GB',price:'28,400,000',img:'cat_cpu'}
];
document.getElementById('pcGrid').innerHTML=PCs.map(p=>`<div class="pc-card"><div class="img-wrap" style="height:160px;background:var(--c-bg);overflow:hidden"><img src="assets/img/${p.img}.jpg" class="w-full h-full object-cover" onerror="this.style.display='none'"></div><div class="p-4"><h3 class="font-bold text-[14px] mb-2">${p.t}</h3><div class="pc-spec"><span>${p.cpu}</span><span>${p.gpu}</span><span>${p.ram}</span><span>${p.ssd}</span></div><div class="flex items-center justify-between"><span class="p-price">${p.price}</span><a href="#" class="btn-primary" style="padding:8px 16px;font-size:12.5px">مشاهده</a></div></div></div>`).join('');

/* BRANDS */
document.getElementById('brandGrid').innerHTML=D.brands.map(b=>`<div class="brand-pill">${b}</div>`).join('');

/* TRUST */
const TRUST=[['ضمانت اصالت کالا','کالای اورجینال با گارانتی معتبر'],['پشتیبانی تخصصی','تیم فنی حرفه‌ای در خدمت شما'],['ارسال سریع','ارسال به سراسر کشور در کمترین زمان'],['مشاوره خرید','راهنمایی برای بهترین انتخاب']];
/* SEARCH */
const RECENT=['RTX 4090','لپ‌تاپ گیمینگ','مادربرد ASUS','رم DDR5'];
const POP=['کارت گرافیک','پردازنده Ryzen','مانیتور 4K','کیبورد مکانیکی','SSD سامسونگ'];
const CATS=['قطعات کامپیوتر','لپ‌تاپ','گیمینگ','لوازم جانبی','شبکه','سیستم‌های آماده'];
function panelHTML(v){
  if(!v)return `<div class="sp-sec">آخرین جستجوها</div>${RECENT.map(r=>`<a href="#" class="sp-item">${r}</a>`).join('')}<div class="sp-sec">جستجوهای محبوب</div>${POP.map(r=>`<a href="#" class="sp-item">${r}</a>`).join('')}<div class="sp-sec">دسته‌بندی‌های مرتبط</div>${CATS.map(c=>`<a href="#" class="sp-item">${c}</a>`).join('')}`;
  const m=allProds.filter(p=>p.name.includes(v)||p.brand.includes(v)).slice(0,5);
  return `<div class="sp-sec">محصولات پیشنهادی</div>${m.length?m.map(p=>`<a href="#" class="sp-item"><img src="assets/img/${imgFor(p.en)}" class="w-8 h-8 rounded object-cover" onerror="this.style.display='none'"><span>${p.name}</span><span class="text-[11px] text-brand mr-auto">${p.price}</span></a>`).join(''):'<div class="sp-item text-txt2">موردی یافت نشد</div>'}`;
}
const search=document.getElementById('search'),sug=document.getElementById('sug'),searchClear=document.getElementById('searchClear');
search.addEventListener('focus',()=>{sug.innerHTML=panelHTML('');sug.classList.add('show');});
search.addEventListener('input',()=>{searchClear.classList.toggle('hidden',!search.value);sug.innerHTML=panelHTML(search.value.trim());sug.classList.add('show');});
searchClear.addEventListener('click',()=>{search.value='';searchClear.classList.add('hidden');search.focus();sug.innerHTML=panelHTML('');sug.classList.add('show');});
search.addEventListener('blur',()=>setTimeout(()=>sug.classList.remove('show'),200));
const mSearch=document.getElementById('mSearch'),mSug=document.getElementById('mSug');
mSearch.addEventListener('input',()=>{mSug.innerHTML=panelHTML(mSearch.value.trim());mSug.style.display='block';});
mSearch.addEventListener('focus',()=>{mSug.innerHTML=panelHTML('');mSug.style.display='block';});

/* DRAWER + ACCORDION */
const DRAWER_DATA={'قطعات کامپیوتر':['پردازنده','کارت گرافیک','مادربرد','RAM','SSD','هارد','پاور','خنک‌کننده'],'گیمینگ':['سیستم گیمینگ','مانیتور','ماوس','کیبورد','هدست','صندلی'],'لپ‌تاپ':[],'لوازم جانبی':['کیبورد','ماوس','هدست','وبکم','گیم‌پد','اسپیکر'],'شبکه':['روتر','سوییچ','مودم'],'سیستم‌های آماده':['گیمینگ','اداری','مهندسی'],'فروش ویژه':[],'پیشنهاد ویژه':[],'خانه':[],'فروشگاه':[]};
function openDrawer(type){const p=document.getElementById('drawerPanel');
  if(type==='cat'){let h='<div class="flex items-center justify-between px-2 py-2 border-b border-line mb-2"><h3 class="font-bold text-[16px]">منو</h3><button onclick="closeDrawer()" class="w-9 h-9 grid place-items-center rounded-md hover:bg-bg" aria-label="بستن">✕</button></div>';
    h+='<a href="#" class="acc-head">خانه</a>';
    Object.keys(DRAWER_DATA).forEach(c=>{const subs=DRAWER_DATA[c];if(subs.length){h+=`<div class="acc-head" onclick="toggleAcc(this)">${c}<svg class="w-4 h-4 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="2" d="m6 9 6 6 6-6"/></svg></div><div class="acc-body">${subs.map(s=>`<a href="#">${s}</a>`).join('')}</div>`;}else{h+=`<a href="#" class="acc-head">${c}</a>`;}});
    h+='<div class="px-2 py-4 mt-2 border-t border-line text-[12.5px] text-txt2">پشتیبانی ۲۴ ساعته · ارسال سریع · ضمانت بازگشت</div>';p.innerHTML=h;}
  else if(type==='wish'){p.innerHTML='<h3 class="font-bold text-[16px] mb-4">علاقه‌مندی‌ها</h3>'+(wish.size?Array.from(wish).map(id=>{const pr=allProds.find(x=>x.id==id);return `<div class="px-2 py-3 border-b text-[13px]">${pr?pr.name:'-'}</div>`;}).join(''):'<p class="px-2 text-[13px] text-txt2">موردی ذخیره نشده</p>');}
  document.getElementById('drawer').classList.add('show');document.body.classList.add('drawer-open');
}
function toggleAcc(el){const b=el.nextElementSibling;b.classList.toggle('open');el.querySelector('svg').style.transform=b.classList.contains('open')?'rotate(-90deg)':'';}
function closeDrawer(){document.getElementById('drawer').classList.remove('show');document.body.classList.remove('drawer-open');}
function toggleMobileSearch(){const b=document.querySelector('.m-search');b.classList.toggle('open');if(b.classList.contains('open'))document.getElementById('mSearch').focus();}

/* WISHLIST + COMPARE */
const wish=new Set(),cmp=[];
function updateWish(){const w=document.getElementById('wishCount');w.textContent=wish.size;w.classList.toggle('hidden',!wish.size);}
document.addEventListener('click',e=>{const wb=e.target.closest('.wish-btn');if(wb){const card=wb.closest('.product');const id=+card.dataset.id;if(wish.has(id)){wish.delete(id);wb.classList.remove('active');}else{wish.add(id);wb.classList.add('active');}updateWish();}
  const cb=e.target.closest('.cmp-btn');if(cb){const card=cb.closest('.product');const id=+card.dataset.id;const i=cmp.indexOf(id);if(i>=0){cmp.splice(i,1);cb.classList.remove('active');}else if(cmp.length<4){cmp.push(id);cb.classList.add('active');}else{alert('حداکثر ۴ محصول قابل مقایسه است');}updateCmp();}});
function updateCmp(){const c=document.getElementById('cmpCount');c.textContent=cmp.length;c.classList.toggle('hidden',!cmp.length);document.getElementById('cmpN').textContent=cmp.length;
  document.getElementById('cmpItems').innerHTML=cmp.map(id=>{const pr=allProds.find(x=>x.id==id);return `<span class="bg-bg rounded-md px-3 py-1.5 text-[12px]">${pr.name.slice(0,22)}</span>`;}).join('');
  document.getElementById('compareTray').classList.toggle('show',cmp.length>0);}
function toggleCompareTray(){if(cmp.length)document.getElementById('compareTray').classList.toggle('show');}
function clearCompare(){cmp.length=0;document.querySelectorAll('.cmp-btn').forEach(b=>b.classList.remove('active'));updateCmp();}
function openCompare(){alert('صفحه مقایسه (demo): '+cmp.length+' محصول انتخاب شده');}

/* QUICK VIEW */
function openQV(id){const p=allProds.find(x=>x.id==id);if(!p)return;const[st]=stockInfo(p.stock);
  document.getElementById('qvCard').innerHTML=`<button onclick="closeQV()" class="absolute top-3 left-3 w-9 h-9 rounded-full bg-bg dark:bg-ink-3 grid place-items-center text-[18px]" aria-label="بستن">✕</button><div class="grid md:grid-cols-2"><div class="bg-bg flex items-center justify-center p-8"><img src="assets/img/${imgFor(p.en)}" class="max-h-72 object-contain" onerror="this.style.display='none'"></div><div class="p-7"><p class="text-[12px] text-muted font-semibold uppercase">${p.brand}</p><h3 class="text-[18px] font-bold mt-1 mb-2">${p.name}</h3><div class="flex items-center gap-2 mb-3"><span class="text-amber-500">★ ${p.rating}</span><span class="text-[12px] text-txt2">(${p.reviews} نظر)</span><span class="stock-dot" style="background:${stockInfo(p.stock)[1]}"></span><span class="text-[12px] text-txt2">${st}</span></div><div class="flex items-end gap-2 mb-4"><span class="p-price text-2xl">${p.price}</span><span class="text-[11px] text-txt2">تومان</span>${p.old_price?`<span class="p-old">${p.old_price}</span>`:''}</div><p class="text-[13px] text-txt2 leading-7 mb-5">محصول با گارانتی معتبر و ارسال سریع. مشاوره تخصصی فرتاک برای انتخاب بهترین گزینه.</p><div class="flex gap-2"><button class="btn-primary flex-1" ${p.stock==='out'?'disabled':''}>${p.stock==='out'?'ناموجود':'افزودن به سبد'}</button><button class="icon-btn border border-line" aria-label="علاقه‌مندی" onclick="addWishFromQV(${id})"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="1.8" d="M12 20s-7-4.3-7-9.5A3.5 3.5 0 0 1 12 7a3.5 3.5 0 0 1 7 3.5C19 15.7 12 20 12 20Z"/></svg></button></div></div></div>`;
  document.getElementById('qvBack').classList.add('show');}
function addWishFromQV(id){if(!wish.has(id)){wish.add(id);updateWish();}closeQV();}
function closeQV(){document.getElementById('qvBack').classList.remove('show');}
document.getElementById('qvBack').addEventListener('click',e=>{if(e.target.id==='qvBack')closeQV();});
function addCart(btn){btn.textContent='✓ افزوده شد';btn.style.background='var(--c-brand)';btn.style.color='#fff';setTimeout(()=>{btn.textContent='افزودن به سبد';btn.style.background='';btn.style.color='';},1600);}

/* THEME */
const root=document.documentElement;
function setTheme(t){root.classList.toggle('dark',t==='dark');localStorage.setItem('ft-theme',t);document.getElementById('themeBtn').innerHTML=t==='dark'?'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" stroke-width="1.8"/><path stroke-width="1.8" d="M12 2v2M12 20v2M2 12h2M20 12h2"/></svg>':'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="1.8" d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"/></svg>';}
setTheme(localStorage.getItem('ft-theme')||'light');
document.getElementById('themeBtn').onclick=()=>setTheme(root.classList.contains('dark')?'light':'dark');

/* PROGRESS + SHRINK */
const header=document.querySelector('.head-main');
addEventListener('scroll',()=>{const h=document.documentElement.scrollTop;document.getElementById('progress').style.width=(h/(document.documentElement.scrollHeight-document.documentElement.clientHeight)*100)+'%';header.classList.toggle('shrink',h>40);});

/* COUNTDOWN */
let total=2*3600+15*60+49;const ce=s=>String(s).padStart(2,'0');
setInterval(()=>{total--;if(total<0)total=0;const h=ce(Math.floor(total/3600)),m=ce(Math.floor(total%3600/60)),s=ce(total%60);document.getElementById('cd-h').textContent=h;document.getElementById('cd-m').textContent=m;document.getElementById('cd-s').textContent=s;if(total===0)document.getElementById('cd-s').textContent='پایان';},1000);

/* GLOBAL KEYS + CAROUSEL */
addEventListener('keydown',e=>{if(e.key==='Escape'){closeQV();closeStory();closeDrawer();document.getElementById('sv').classList.remove('show');}});
function scrollRow(id,d){document.getElementById(id).scrollBy({left:(d<0?-280:280),behavior:'smooth'});}
document.addEventListener('click',e=>{if(!e.target.closest('.search-wrap'))sug.classList.remove('show');if(!e.target.closest('.has-mega'))document.querySelectorAll('.has-mega.open').forEach(m=>m.classList.remove('open'));});
document.querySelectorAll('.bottom-nav a,.bottom-nav button').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.bottom-nav a,.bottom-nav button').forEach(x=>x.classList.remove('active'));b.classList.add('active');}));

/* REVEAL */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in');}),{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));


