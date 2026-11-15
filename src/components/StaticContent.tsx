import site from '../lib/site.json';
import photos from '../lib/photos.json';
import social from '../lib/social-links.json';
import {renderPage} from '../lib/render-page.mjs';
export function StaticContent({path}:{path:string}){
 return <div className="site-content" dangerouslySetInnerHTML={{__html:renderPage(path,site,photos,social)}} />;
}
