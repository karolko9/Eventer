import"../chunks/disclose-version.Bg9kRutz.js";import{j as h,n as v,i as _,m as w,e as $,g as a,r as x,f as y}from"../chunks/runtime.aXHnhyvJ.js";import{a as n,t as E,c as b}from"../chunks/template.eTO5rkRx.js";import{i as k}from"../chunks/if.SkAuWYcG.js";import{e as A,i as j}from"../chunks/attributes.CbBv2cPg.js";import{i as C}from"../chunks/lifecycle.DNLBlrF2.js";import{s as L,a as M}from"../chunks/store.CkvMirxZ.js";import{a as N}from"../chunks/index-client.CQj2buiT.js";import{g as R}from"../chunks/entry.CNr9gMCq.js";import{a as q}from"../chunks/auth.BEvWUvkO.js";import{E as z}from"../chunks/EventCard.CF2KbLaL.js";var B=E('<section class="w-full h-mobile lg:h-desktop m-auto p-4 overflow-y-auto flex flex-col lg:flex-row lg:flex-wrap gap-4"><!></section>');function T(m,c){h(c,!1);const l=L(),o=()=>M(q,"$auth",l);let r=w([]);N(()=>{o().init().then(()=>{f()})});async function f(){try{if(o().isReady&&o().isAuthenticated){const t=await o().whoamiActor.get_all_events_with_details();_(r,t.map(e=>e))}}catch(t){console.error("Error fetching events:",t)}}function p(t){const{slug:e}=t.detail;R(`/events/${e}`)}C();var i=B(),g=$(i);k(g,()=>a(r).length>0,t=>{var e=b(),d=y(e);A(d,1,()=>a(r),j,(u,s)=>{z(u,{get id(){return a(s).id},get name(){return a(s).name},get date(){return a(s).time_start},get address(){return a(s).address},$$events:{navigate:p}})}),n(t,e)}),x(i),n(m,i),v()}export{T as component};
