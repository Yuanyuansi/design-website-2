const links = [...document.querySelectorAll('.chapter-link')];
const chapters = [...document.querySelectorAll('.portfolio-chapter')];
let scheduled = false;
function updateChapter() {
 const threshold = matchMedia('(max-width:650px)').matches ? 125 : 90;
 let active = chapters[0];
 for (const chapter of chapters) { if(chapter.getBoundingClientRect().top <= threshold) active = chapter; else break; }
 links.forEach(link => { const selected = link.hash === '#' + active.id; link.classList.toggle('active', selected); if(selected) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current'); });
 scheduled = false;
}
addEventListener('scroll', () => { if(!scheduled) {scheduled=true;requestAnimationFrame(updateChapter);} }, {passive:true});
addEventListener('resize', updateChapter);
addEventListener('pageshow', updateChapter);
links.forEach(link => link.addEventListener('click', () => {if(matchMedia('(max-width:650px)').matches) {const nav=link.closest('nav');nav.scrollTo({left:link.offsetLeft-16,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});}}));
updateChapter();
const viewer = document.querySelector('.image-viewer');
const canvas = document.querySelector('.viewer-canvas');
const display = document.querySelector('#viewer-image');
const scale = document.querySelector('.viewer-scale');
const triggers = [...document.querySelectorAll('.image-open')];
let current = 0, origin;
function showImage(index) {
 current=index;
 const image=triggers[index].querySelector('img');
 display.src=image.getAttribute('src');display.alt=image.alt;
 canvas.style.setProperty('--natural-width',image.getAttribute('width')+'px');
 canvas.classList.remove('actual-size');scale.textContent='原始尺寸';scale.setAttribute('aria-pressed','false');
 canvas.scrollTop=0;canvas.scrollLeft=0;
 document.querySelector('#viewer-title').textContent=image.alt;
 document.querySelector('#viewer-position').textContent=String(index+1).padStart(2,'0')+' / '+triggers.length;
 document.querySelector('.viewer-prev').disabled=index===0;
 document.querySelector('.viewer-next').disabled=index===triggers.length-1;
}
triggers.forEach((button,index)=>button.addEventListener('click',()=>{origin=button;showImage(index);viewer.showModal();}));
function closeViewer(){viewer.close();origin?.focus({preventScroll:true});}
document.querySelector('.viewer-close').addEventListener('click',closeViewer);
scale.addEventListener('click',()=>{const actual=canvas.classList.toggle('actual-size');scale.textContent=actual?'适应页面':'原始尺寸';scale.setAttribute('aria-pressed',String(actual));});
document.querySelector('.viewer-prev').addEventListener('click',()=>{if(current>0)showImage(current-1);});
document.querySelector('.viewer-next').addEventListener('click',()=>{if(current<triggers.length-1)showImage(current+1);});
viewer.addEventListener('click',event=>{if(event.target===viewer){const r=viewer.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeViewer();}});
viewer.addEventListener('keydown',event=>{if(event.key==='ArrowRight'&&current<triggers.length-1){event.preventDefault();showImage(current+1);}if(event.key==='ArrowLeft'&&current>0){event.preventDefault();showImage(current-1);}});
