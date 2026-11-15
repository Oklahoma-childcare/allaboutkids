import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {PAGE_META,renderPage,faqData} from '../src/lib/render-page.mjs';
const root=path.resolve(fileURLToPath(new URL('..',import.meta.url)));
const load=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const site=load('src/lib/site.json');
const photos=load('src/lib/photos.json');
const social=load('src/lib/social-links.json');
const esc=s=>String(s??'').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const json=s=>JSON.stringify(s).replace(/</g,'\\u003c');
const config={...process.env};
for(const name of ['.env','.env.local']){
 const file=path.join(root,name);
 if(!fs.existsSync(file)) continue;
 for(const line of fs.readFileSync(file,'utf8').split(/\r?\n/)){
  const match=line.match(/^\s*(VITE_[A-Z_0-9]+)\s*=\s*(.*?)\s*$/);
  if(match)config[match[1]]=match[2].replace(/^['"]|['"]$/g,'');
 }
}
const origin=String(config.VITE_SITE_URL||'').trim().replace(/\/$/,'');
const approved=String(config.VITE_PUBLICATION_APPROVED||'false')==='true';
const validDomain=/^https:\/\/[a-z0-9][a-z0-9.-]+\.[a-z]{2,}$/i.test(origin)
 && !/(vercel\.app|pages\.dev|netlify\.app|localhost|example\.(com|org)|127\.0\.0\.1)/i.test(origin);
if(approved&&!validDomain)throw new Error('Publication approval requires VITE_SITE_URL with an authorized HTTPS custom domain.');
const indexable=approved&&validDomain;
const url=r=>`${origin}${r==='/'?'/':`${r}/`}`;
const isActualLogo=Boolean(site.logoUrl);
const officialSocials=['facebook','instagram','youtube','tiktok','pinterest'].map(k=>social[k]).filter(Boolean);
const addr=`${site.street}, ${site.city}, ${site.stateCode} ${site.postalCode}`;
const localBusiness={
 '@context':'https://schema.org','@type':'ChildCare',
 name:site.name, alternateName:site.registeredName,
 identifier:site.license,telephone:site.phoneHref,email:site.email,
 address:{'@type':'PostalAddress',streetAddress:site.street,addressLocality:site.city,addressRegion:site.stateCode,postalCode:site.postalCode,addressCountry:'US'},
 areaServed:{'@type':'City',name:site.city},
 hasMap:site.mapUrl,
 openingHoursSpecification:[{'@type':'OpeningHoursSpecification',dayOfWeek:['Monday','Tuesday','Wednesday','Thursday','Friday'],opens:site.weekdayOpens,closes:site.weekdayCloses}],
 sameAs:[site.providerUrl,...officialSocials],
 publicAccess:true
};
if(indexable)localBusiness.url=url('/');
if(isActualLogo&&indexable)localBusiness.logo=`${origin}${site.logoUrl}`;
fs.mkdirSync(path.join(root,'public'),{recursive:true});
fs.writeFileSync(path.join(root,'public/site.css'),fs.readFileSync(path.join(root,'src/index.css'),'utf8'));
for(const [route,meta] of Object.entries(PAGE_META)){
 const canonical=indexable?url(route):null;
 const socialImage=indexable?`${origin}/og-card.png`:null;
 const breadcrumb=indexable&&route!=='/'?`<script type="application/ld+json">${json({'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:url('/')},{'@type':'ListItem',position:2,name:route==='/'?'Home':route.slice(1).replace(/^\w/,s=>s.toUpperCase()),item:url(route)}]})}</script>`:'';
 const faqSchema=route==='/faq'&&indexable?`<script type="application/ld+json">${json({'@context':'https://schema.org','@type':'FAQPage',mainEntity:faqData(site)})}</script>`:'';
 const preload=route==='/'&&photos.hero?.src?`<link rel="preload" href="${esc(photos.hero.src)}" as="image" fetchpriority="high">`:'';
 const html=`<!doctype html><html lang="en-US"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(meta.title)}</title><meta name="description" content="${esc(meta.description)}"><meta name="theme-color" content="#2f4fbd"><meta name="robots" content="${indexable?'index,follow,max-image-preview:large':'noindex,nofollow'}">
${canonical?`<link rel="canonical" href="${esc(canonical)}">`:''}
<meta property="og:type" content="website"><meta property="og:locale" content="en_US"><meta property="og:site_name" content="${esc(site.name)}"><meta property="og:title" content="${esc(meta.title)}"><meta property="og:description" content="${esc(meta.description)}">
${canonical?`<meta property="og:url" content="${esc(canonical)}">`:''}${socialImage?`<meta property="og:image" content="${esc(socialImage)}"><meta property="og:image:alt" content="All About Kids Discovery Learning Academy, Moore Oklahoma">`:''}
<meta name="twitter:card" content="${socialImage?'summary_large_image':'summary'}"><link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="preconnect" href="https://images.pexels.com" crossorigin>
${preload}<link rel="stylesheet" href="/site.css"><script src="/site.js" defer></script>
<script type="application/ld+json">${json(localBusiness)}</script>${indexable?`<script type="application/ld+json">${json({'@context':'https://schema.org','@type':'WebSite',name:site.name,url:url('/')})}</script>`:''}${breadcrumb}${faqSchema}
</head><body><div id="root"><div class="site-content">${renderPage(route,site,photos,social)}</div></div><script type="module" src="/src/main.tsx"></script></body></html>`;
 const dir=route==='/'?root:path.join(root,route.slice(1));
 fs.mkdirSync(dir,{recursive:true});
 fs.writeFileSync(path.join(dir,'index.html'),html,'utf8');
}
if(indexable){
 const nodes=Object.keys(PAGE_META).map(k=>`<url><loc>${esc(url(k))}</loc></url>`).join('');
 fs.writeFileSync(path.join(root,'public/sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${nodes}</urlset>`);
 fs.writeFileSync(path.join(root,'public/robots.txt'),`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
}else{
 fs.rmSync(path.join(root,'public/sitemap.xml'),{force:true});
 fs.writeFileSync(path.join(root,'public/robots.txt'),'User-agent: *\nAllow: /\n');
}
console.log(`Generated ${Object.keys(PAGE_META).length} fully rendered HTML routes, ${indexable?'approved-public':'noindex-review'} mode, social accounts: ${officialSocials.length}, community references: ${social.facebookCommunityPost?1:0}.`);
