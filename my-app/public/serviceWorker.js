const CACHE_NAME="version-1";
const urlstocache=["index.html"];
this.addEventListener('install',(event)=>{
    event.waitUntil(    
        caches.open(CACHE_NAME).then((cache)=>{
            console.log("Opend Cache");
            return cache.addAll(urlstocache);
        })
    )
})  

this.addEventListener('fetch',(event)=>{
    event.respondWith(
        caches.match(event.request).then((res)=>{
            return fetch(event.request).catch(()=>{
                caches.match('offline.html');
            })
        })
    )
})

this.addEventListener('activate',(event)=>{
    const cachewhitelist=[];
    cachewhitelist.push(CACHE_NAME);
    event.waitUntil(caches.keys().then((cacheNames)=>Promise.all(
        cacheNames.map((cachename)=>{
            if(!cachewhitelist.includes(cachename)){
                return caches.delete(cachename);
            }
        })
    )))
})