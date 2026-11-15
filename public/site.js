// Lightweight interactions for SEO-prerendered pages. No dependency on JavaScript for navigation.
function initSite(){
  const toggle=document.querySelector('[data-menu-toggle]');
  const nav=document.querySelector('[data-nav]');
  if(toggle && nav){
    toggle.addEventListener('click',()=>{
      const open=toggle.getAttribute('aria-expanded')==='true';
      toggle.setAttribute('aria-expanded',String(!open));
      nav.classList.toggle('is-open',!open);
      toggle.setAttribute('aria-label',open?'Open menu':'Close menu');
    });
    document.addEventListener('keydown',e=>{
      if(e.key==='Escape'){
        toggle.setAttribute('aria-expanded','false');nav.classList.remove('is-open');toggle.focus();
      }
    });
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false')}));
  }
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',initSite); else initSite();
