import"./assets/modulepreload-polyfill-3cfb730f.js";import{f as C,i as p}from"./assets/vendor-77e16229.js";const l=document.getElementById("datetime-picker"),e=document.querySelector(".div-butt");e.setAttribute("disabled","");const m=document.querySelector("[data-days]"),f=document.querySelector("[data-hours]"),h=document.querySelector("[data-minutes]"),y=document.querySelector("[data-seconds]");let u=null;C("#datetime-picker",{enableTime:!0,time_24hr:!0,defaultDate:null,minuteIncrement:1,onClose(t){console.log(t[0]),t[0].getTime()>Date.now()?(u=t[0].getTime(),o(e,!1)):(o(e,!0),p.show({title:"",color:"red",position:"topRight",timeout:5e3,close:!1,closeOnClick:!0,message:"Please choose a date in the future",iconUrl:"../img/sprite.svg#close-btn",iconColor:"#FAFAFB"}))}});e.addEventListener("click",()=>{u&&(o(e,!0),o(l,!0)),setInterval(x,1e3)});function x(t){const n=Date.now(),s=u-n,{days:a,hours:d,minutes:i,seconds:c}=S(s);if(m.textContent=r(a),f.textContent=r(d),h.textContent=r(i),y.textContent=r(c),s<=0){clearInterval(t),E(),o(l,!1),o(e,!0);return}}function E(){m.textContent="00",f.textContent="00",h.textContent="00",y.textContent="00"}function o(t,n){n?t.setAttribute("disabled",""):t.removeAttribute("disabled")}function S(t){const i=Math.floor(t/864e5),c=Math.floor(t%864e5/36e5),g=Math.floor(t%864e5%36e5/6e4),b=Math.floor(t%864e5%36e5%6e4/1e3);return{days:i,hours:c,minutes:g,seconds:b}}function r(t){return String(t).padStart(2,"0")}
//# sourceMappingURL=commonHelpers.js.map
