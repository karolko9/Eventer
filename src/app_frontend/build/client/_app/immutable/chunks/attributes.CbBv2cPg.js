import{K as te,b as fe,ap as j,h as T,F as D,a as ue,D as le,V as m,H as oe,E as Y,G as H,d as y,I as ee,c as ae,p as ce,aq as _e,w as L,X as z,ar as $,i as X,as as x,at as ve,m as de,a3 as F,au as he,U as re,av as Ee,ao as ge,M as se,Q as Ae,aw as pe,O as be,ax as Te,a7 as K,ay as Ie,az as we,an as Ne}from"./runtime.aXHnhyvJ.js";import{b as Ce,c as Q,d as ye,n as Me,f as Se}from"./utils.BlcS-Bm0.js";let S=null;function Be(e){S=e}function Ge(e,a){return a}function Oe(e,a,r,i){for(var s=[],h=a.length,f=0;f<h;f++)he(a[f].e,s,!0);var b=h>0&&s.length===0&&r!==null;if(b){var p=r.parentNode;re(p),p.append(r),i.clear(),w(e,a[0].prev,a[h-1].next)}Ee(s,()=>{for(var g=0;g<h;g++){var A=a[g];b||(i.delete(A.k),w(e,A.prev,A.next)),ge(A.e,!b)}})}function Ue(e,a,r,i,s,h=null){var f=e,b={flags:a,items:new Map,first:null},p=(a&j)!==0;if(p){var g=e;f=T?D(se(g)):g.appendChild(te())}T&&ue();var A=null;fe(()=>{var l=r(),E=le(l)?l:l==null?[]:m(l),c=E.length;let _=!1;if(T){var v=f.data===oe;v!==(c===0)&&(f=Y(),D(f),H(!1),_=!0)}if(T){for(var u=null,o,d=0;d<c;d++){if(y.nodeType===8&&y.data===Ae){f=y,_=!0,H(!1);break}var n=E[d],t=i(n,d);o=ie(y,b,u,null,n,t,d,s,a),b.items.set(t,o),u=o}c>0&&D(Y())}T||Re(E,b,f,s,a,i),h!==null&&(c===0?A?ee(A):A=ae(()=>h(f)):A!==null&&ce(A,()=>{A=null})),_&&H(!0)}),T&&(f=y)}function Re(e,a,r,i,s,h){var V,q,B,G;var f=(s&pe)!==0,b=(s&($|x))!==0,p=e.length,g=a.items,A=a.first,l=A,E,c=null,_,v=[],u=[],o,d,n,t;if(f)for(t=0;t<p;t+=1)o=e[t],d=h(o,t),n=g.get(d),n!==void 0&&((V=n.a)==null||V.measure(),(_??(_=new Set)).add(n));for(t=0;t<p;t+=1){if(o=e[t],d=h(o,t),n=g.get(d),n===void 0){var M=l?l.e.nodes_start:r;c=ie(M,a,c,c===null?a.first:c.next,o,d,t,i,s),g.set(d,c),v=[],u=[],l=c.next;continue}if(b&&ke(n,o,t,s),n.e.f&_e&&(ee(n.e),f&&((q=n.a)==null||q.unfix(),(_??(_=new Set)).delete(n))),n!==l){if(E!==void 0&&E.has(n)){if(v.length<u.length){var N=u[0],I;c=N.prev;var P=v[0],R=v[v.length-1];for(I=0;I<v.length;I+=1)J(v[I],N,r);for(I=0;I<u.length;I+=1)E.delete(u[I]);w(a,P.prev,R.next),w(a,c,P),w(a,R,N),l=N,c=R,t-=1,v=[],u=[]}else E.delete(n),J(n,l,r),w(a,n.prev,n.next),w(a,n,c===null?a.first:c.next),w(a,c,n),c=n;continue}for(v=[],u=[];l!==null&&l.k!==d;)(E??(E=new Set)).add(l),u.push(l),l=l.next;if(l===null)continue;n=l}v.push(n),c=n,l=n.next}if(l!==null||E!==void 0){for(var C=E===void 0?[]:m(E);l!==null;)C.push(l),l=l.next;var k=C.length;if(k>0){var ne=s&j&&p===0?r:null;if(f){for(t=0;t<k;t+=1)(B=C[t].a)==null||B.measure();for(t=0;t<k;t+=1)(G=C[t].a)==null||G.fix()}Oe(a,C,ne,g)}}f&&L(()=>{var U;if(_!==void 0)for(n of _)(U=n.a)==null||U.apply()}),z.first=a.first&&a.first.e,z.last=c&&c.e}function ke(e,a,r,i){i&$&&X(e.v,a),i&x?X(e.i,r):e.i=r}function ie(e,a,r,i,s,h,f,b,p){var g=S;try{var A=(p&$)!==0,l=(p&ve)===0,E=A?l?de(s):F(s):s,c=p&x?F(f):f,_={i:c,v:E,k:h,a:null,e:null,prev:r,next:i};return S=_,_.e=ae(()=>b(e,E,c),T),_.e.prev=r&&r.e,_.e.next=i&&i.e,r===null?a.first=_:(r.next=_,r.e.next=_.e),i!==null&&(i.prev=_,i.e.prev=_.e),_}finally{S=g}}function J(e,a,r){for(var i=e.next?e.next.e.nodes_start:r,s=a?a.e.nodes_start:r,h=e.e.nodes_start;h!==i;){var f=be(h);s.before(h),h=f}}function w(e,a,r){a===null?e.first=r:(a.next=r,a.e.next=r&&r.e),r!==null&&(r.prev=a,r.e.prev=a&&a.e)}function De(e,a){if(a){const r=document.body;e.autofocus=!0,L(()=>{document.activeElement===r&&e.focus()})}}function Ye(e){T&&se(e)!==null&&re(e)}let W=!1;function He(){W||(W=!0,document.addEventListener("reset",e=>{Promise.resolve().then(()=>{var a;if(!e.defaultPrevented)for(const r of e.target.elements)(a=r.__on_r)==null||a.call(r)})},{capture:!0}))}function ze(e){if(T){var a=!1,r=()=>{if(!a){if(a=!0,e.hasAttribute("value")){var i=e.value;O(e,"value",null),e.value=i}if(e.hasAttribute("checked")){var s=e.checked;O(e,"checked",null),e.checked=s}}};e.__on_r=r,Te(r),He()}}function O(e,a,r,i){r=r==null?null:r+"";var s=e.__attributes??(e.__attributes={});T&&(s[a]=e.getAttribute(a),a==="src"||a==="href"||a==="srcset")||s[a]!==(s[a]=r)&&(a==="loading"&&(e[Ie]=r),r===null?e.removeAttribute(a):e.setAttribute(a,r))}function Le(e,a,r){if(a in e){var i=e[a],s=typeof i=="boolean"&&r===""?!0:r;(typeof i!="object"||i!==s)&&(e[a]=s)}else O(e,a,r)}function $e(e,a,r,i,s=!1,h){var f=a||{},b=e.tagName==="OPTION";for(var p in a)p in r||(r[p]=null);var g=Z.get(e.nodeName);g||Z.set(e.nodeName,g=Pe(e));var A=e.__attributes??(e.__attributes={}),l=[];for(const u in r){let o=r[u];if(b&&u==="value"&&o==null){e.value=e.__value="",f[u]=o;continue}var E=f[u];if(o!==E){f[u]=o;var c=u[0]+u[1];if(c!=="$$")if(c==="on"){const d={},n="$$"+u;let t=u.slice(2);var _=Se(t);if(Ce(t)&&(t=t.slice(0,-7),d.capture=!0),!_&&E){if(o!=null)continue;e.removeEventListener(t,f[n],d),f[n]=null}if(o!=null)if(_)e[`__${t}`]=o,ye([t]);else{let M=function(N){f[u].call(this,N)};a?f[n]=Q(t,e,M,d):l.push([u,o,()=>f[n]=Q(t,e,M,d)])}}else if(o==null)A[u]=null,e.removeAttribute(u);else if(u==="style")e.style.cssText=o+"";else if(u==="autofocus")De(e,!!o);else if(u==="__value"||u==="value")e.value=e[u]=e.__value=o;else{var v=u;s||(v=Me(v)),g.includes(v)?T&&(v==="src"||v==="href"||v==="srcset")||(e[v]=o):typeof o!="function"&&O(e,v,o)}}}return a||L(()=>{if(e.isConnected)for(const[u,o,d]of l)f[u]===o&&d()}),f}function Xe(e,a,r,i){if(e.tagName.includes("-")){for(var s in a)s in r||(r[s]=null);for(s in r)Le(e,s,r[s]);return r}return $e(e,a,r,i,e.namespaceURI!==Ne)}var xe=["width","height","draggable"],Z=new Map;function Pe(e){for(var a=[],r,i=K(e);i.constructor.name!=="Element";){r=we(i);for(var s in r)r[s].set&&!xe.includes(s)&&a.push(s);i=K(i)}return a}export{O as a,He as b,Be as c,S as d,Ue as e,Xe as f,Ye as g,Ge as i,ze as r,$e as s};