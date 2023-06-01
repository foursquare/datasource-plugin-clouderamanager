define(["@grafana/data","@grafana/runtime","rxjs","react","@grafana/ui"],((e,t,r,n,a)=>(()=>{"use strict";var o={305:t=>{t.exports=e},545:e=>{e.exports=t},388:e=>{e.exports=a},650:e=>{e.exports=n},177:e=>{e.exports=r}},i={};function s(e){var t=i[e];if(void 0!==t)return t.exports;var r=i[e]={exports:{}};return o[e](r,r.exports,s),r.exports}s.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return s.d(t,{a:t}),t},s.d=(e,t)=>{for(var r in t)s.o(t,r)&&!s.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),s.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var u={};return(()=>{s.r(u),s.d(u,{plugin:()=>b});var e=s(305),t=s(545),r=s(177);function n(e,t,r,n,a,o,i){try{var s=e[o](i),u=s.value}catch(e){return void r(e)}s.done?t(u):Promise.resolve(u).then(n,a)}function a(e){return function(){var t=this,r=arguments;return new Promise((function(a,o){var i=e.apply(t,r);function s(e){n(i,a,o,s,u,"next",e)}function u(e){n(i,a,o,s,u,"throw",e)}s(void 0)}))}}function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}class i extends e.DataSourceApi{query(e){const{range:r}=e,n=e.targets.filter((function(e){return e.queryText&&!e.hide})).map((n=>{let a,o="/api/v"+this.apiVersion+"/timeseries",i={query:(0,t.getTemplateSrv)().replace(n.queryText,e.scopedVars),from:r.from.toISOString(),to:r.to.toISOString(),contentType:"application/json"};return a=this.apiVersion>=11?{method:"POST",url:o,data:i}:{method:"GET",url:o,params:i},this.doRequest(a).then((e=>e&&e.data&&e.data.items?this.convertResponse(e):[]))}));return Promise.all(n.values()).then((e=>({data:[].concat(...e)})))}testDatasource(){var e=this;return a((function*(){return e.doRequest({url:"/api/version"}).then((e=>{if(void 0===e)return{status:"error",message:"Data source returned an undefined response",title:"Error"};let t=e.data;return e.ok&&/^v\d+/.test(t)?{status:"success",message:"Data source is working. API version is '"+e.data+"'.",title:"Success"}:{status:"error",message:e.data,title:"Error"}}))}))()}doRequest(e){var n=this;return a((function*(){e.url=n.url+e.url,e.method=e.method||"GET",n.basicAuth&&(e.headers={Authorization:n.basicAuth});const a=(0,t.getBackendSrv)().fetch(e);let o;try{o=yield(0,r.lastValueFrom)(a)}catch(e){o=a.toPromise()}return o}))()}makeTimeSeriesName(e){if(e.alias){let t=e.alias;return e.metricName&&(t=t.replace("%metricName%",e.metricName)),e.entityName&&(t=t.replace("%entityName%",e.entityName)),t}return e.metricName&&e.entityName?e.metricName+" ("+e.entityName+")":e.metricName?e.metricName:e.entityName?e.entityName:"UNKNOWN NAME"}convertResponse(t){let r=[];return t.data.items.forEach((t=>{t.timeSeries.forEach((t=>{const n=new e.MutableDataFrame({fields:[{name:"Time",type:e.FieldType.time},{name:"Value",type:e.FieldType.number}]});t.data.map((e=>{n.appendRow([e.timestamp,e.value])})),n.name=this.makeTimeSeriesName(t.metadata),r.push(n)}))})),r}constructor(e){super(e),o(this,"url",void 0),o(this,"basicAuth",void 0),o(this,"apiVersion",void 0),this.url=e.url,this.basicAuth=e.basicAuth,this.apiVersion=4,"v6-10"===e.jsonData.cmApiVersion?this.apiVersion=6:"v11+"===e.jsonData.cmApiVersion&&(this.apiVersion=11)}}var c=s(650),l=s.n(c),p=s(388);function m(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function f(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),n.forEach((function(t){m(e,t,r[t])}))}return e}function d(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):function(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r.push.apply(r,n)}return r}(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))})),e}function y(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}const b=new e.DataSourcePlugin(i).setConfigEditor((function(e){const{onOptionsChange:t,options:r}=e,[n,a]=(0,c.useState)();return l().createElement("div",{className:"gf-form-group"},l().createElement(p.DataSourceHttpSettings,{defaultUrl:r.url,dataSourceConfig:r,showAccessOptions:!0,onChange:t}),l().createElement("h5",null,"Cloudera Manager Settings"),l().createElement("div",{className:"gf-form-group"},l().createElement("div",{className:"gf-form"},l().createElement(p.InlineLabel,{width:26},"CM API Version"),l().createElement(p.Select,{width:40,options:[{label:"v4-5",value:0},{label:"v6-10",value:1},{label:"v11+",value:2}],value:n,onChange:e=>{a(e),(e=>{const n=d(f({},r.jsonData),{cmApiVersion:e});t(d(f({},r),{jsonData:n}))})(e.label)}}))))})).setQueryEditor((function({query:e,onChange:t,onRunQuery:r}){const{queryText:n}=e;return l().createElement("div",{className:"gf-form"},l().createElement(p.Input,{name:"query",required:!0,onChange:n=>{var a,o;t((a=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),n.forEach((function(t){y(e,t,r[t])}))}return e}({},e),o=null!=(o={queryText:n.target.value})?o:{},Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(o)):function(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r.push.apply(r,n)}return r}(Object(o)).forEach((function(e){Object.defineProperty(a,e,Object.getOwnPropertyDescriptor(o,e))})),a)),r()},value:n||""}))}))})(),u})()));
//# sourceMappingURL=module.js.map