function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},n={},r=t.parcelRequired7c6;null==r&&((r=function(e){if(e in o)return o[e].exports;if(e in n){var t=n[e];delete n[e];var r={id:e,exports:{}};return o[e]=r,t.call(r.exports,r,r.exports),r.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){n[e]=t},t.parcelRequired7c6=r);var a=r("fZKcF"),l=r("7Y9D8"),i=r("ak5AJ"),s=r("aO2mr");const c=new(e(a))(".gallery a",{captionDelay:150,captionsData:"alt"}),d=document.querySelector("#search-form input"),u=document.querySelector("#search-button"),y=document.querySelector(".gallery"),f=document.querySelector(".load-more");f.style.display="none";let h,g=1;u.addEventListener("click",(async e=>{try{e.preventDefault(),y.innerHTML="",f.style.display="none";const t=d.value.trim();""===t&&l.Notify.info("This filed cannot be empty. Please enter someting"),""!==t&&await(0,i.fetchImages)(t,g).then((e=>{0===e.data.hits.length?l.Notify.failure("Sorry, there are no images matching your search query. Please try again."):(0,s.renderGallery)(e.data.hits).then((()=>{l.Notify.success(`Hooray! We found ${e.data.totalHits} images.`),f.style.display="block",c.refresh()}))}))}catch(e){console.log(e.toString())}})),f.addEventListener("click",(async e=>{try{f.style.display="block",g+=1;const e=d.value.trim();""!==e&&await(0,i.fetchImages)(e,g).then((e=>{h=Math.ceil(e.data.totalHits/40),(0,s.renderGallery)(e.data.hits).then((()=>{l.Notify.success(`Hooray! We found ${e.data.totalHits} images.`),c.refresh(),function(){const{height:e}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:2*e,behavior:"smooth"})}()})),g===h&&(f.style.display="none",l.Notify.info("We're sorry, but you've reached the end of search results.",{timeout:8e3,position:"center-bottom"}))}))}catch(e){console.log(e.toString())}}));
//# sourceMappingURL=uiWithButton.8848b758.js.map
