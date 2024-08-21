import"../chunks/disclose-version.Bg9kRutz.js";import{f as p,e as d,r as c,g as h,s as z,t as E}from"../chunks/runtime.aXHnhyvJ.js";import{c as v,a as i,t as b}from"../chunks/template.eTO5rkRx.js";import{s as $,d as f}from"../chunks/misc.DnqR7_Mr.js";import{s as w}from"../chunks/render.BE2DS_ko.js";import{i as B}from"../chunks/if.SkAuWYcG.js";import{e as S,i as U,a as j}from"../chunks/attributes.CbBv2cPg.js";import{c as q}from"../chunks/svelte-component.B01si1_d.js";import{s as A}from"../chunks/class.x-Z0nLVU.js";import{l as m,s as u}from"../chunks/props.BZlKUZyv.js";import{I as _}from"../chunks/Icon.CwQCy4dD.js";function D(n,e){const o=m(e,["children","$$slots","$$events","$$legacy"]);_(n,u({type:"outline",name:"calendar-check"},()=>o,{iconNode:[["path",{d:"M11.5 21h-5.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v6"}],["path",{d:"M16 3v4"}],["path",{d:"M8 3v4"}],["path",{d:"M4 11h16"}],["path",{d:"M15 19l2 2l4 -4"}]],children:(a,r)=>{var t=v(),s=p(t);$(s,f(e),{}),i(a,t)},$$slots:{default:!0}}))}function F(n,e){const o=m(e,["children","$$slots","$$events","$$legacy"]);_(n,u({type:"outline",name:"circle-plus"},()=>o,{iconNode:[["path",{d:"M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"}],["path",{d:"M9 12h6"}],["path",{d:"M12 9v6"}]],children:(a,r)=>{var t=v(),s=p(t);$(s,f(e),{}),i(a,t)},$$slots:{default:!0}}))}function G(n,e){const o=m(e,["children","$$slots","$$events","$$legacy"]);_(n,u({type:"outline",name:"map"},()=>o,{iconNode:[["path",{d:"M3 7l6 -3l6 3l6 -3v13l-6 3l-6 -3l-6 3v-13"}],["path",{d:"M9 4v13"}],["path",{d:"M15 7v13"}]],children:(a,r)=>{var t=v(),s=p(t);$(s,f(e),{}),i(a,t)},$$slots:{default:!0}}))}function H(n,e){const o=m(e,["children","$$slots","$$events","$$legacy"]);_(n,u({type:"outline",name:"settings"},()=>o,{iconNode:[["path",{d:"M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"}],["path",{d:"M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"}]],children:(a,r)=>{var t=v(),s=p(t);$(s,f(e),{}),i(a,t)},$$slots:{default:!0}}))}function J(n,e){const o=m(e,["children","$$slots","$$events","$$legacy"]);_(n,u({type:"outline",name:"user"},()=>o,{iconNode:[["path",{d:"M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"}],["path",{d:"M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"}]],children:(a,r)=>{var t=v(),s=p(t);$(s,f(e),{}),i(a,t)},$$slots:{default:!0}}))}var K=b('<li><a class="svelte-o8823"><!> <p class="svelte-o8823"> </p></a></li>'),L=b('<nav class="svelte-o8823"><ul class="border-t-2 lg:border-r-2 border-gray-200 border-solid svelte-o8823"></ul></nav>');function Q(n){const e={map:G,events:D,plus:F,user:J,settings:H},o=[{href:"/",label:"Events Map",icon:"map",hideOnMobile:!1},{href:"/my-events/attendee",label:"My Events",icon:"events",hideOnMobile:!1},{href:"/create-event",label:"Create Event",icon:"plus",hideOnMobile:!1},{href:"/profile",label:"Profile",icon:"user",hideOnMobile:!0}],l=t=>e[t]||null;var a=L(),r=d(a);S(r,5,()=>o,U,(t,s)=>{var M=K(),g=d(M),y=d(g);B(y,()=>l(h(s).icon),O=>{var N=v(),C=p(N);q(C,()=>l(h(s).icon),(I,k)=>{k(I,{style:"color: #5B2784; width:30px; height:30px;"})}),i(O,N)});var x=z(y,2),P=d(x);c(x),c(g),c(M),E(()=>{A(M,`${h(s).hideOnMobile??""} svelte-o8823`),j(g,"href",h(s).href),w(P,h(s).label)}),i(t,M)}),c(r),c(a),i(n,a)}var R=b('<div class="fixed inset-0 flex flex-col-reverse lg:flex-row"><!> <main class="flex-1 h-full"><!></main></div>');function ne(n,e){var o=R(),l=d(o);Q(l);var a=z(l,2),r=d(a);$(r,f(e),{}),c(a),c(o),i(n,o)}export{ne as component};