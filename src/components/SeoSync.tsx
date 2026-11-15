import {useEffect} from 'react';
import {useRouterState} from '@tanstack/react-router';
import {PAGE_META} from '../lib/render-page.mjs';
export function SeoSync(){
 const pathname=useRouterState({select:s=>s.location.pathname});
 useEffect(()=>{
  const path=pathname==='/'?'/':pathname.replace(/\/$/,'');
  const m=PAGE_META[path]||PAGE_META['/'];
  document.title=m.title;
  const description=document.querySelector('meta[name="description"]');
  description?.setAttribute('content',m.description);
 },[pathname]);
 return null;
}
