"use strict";(self.webpackChunkreact_redux_arcgis_boilerplate=self.webpackChunkreact_redux_arcgis_boilerplate||[]).push([[8326],{3800:function(t,n,r){r.d(n,{a:function(){return x},c:function(){return g},e:function(){return A},f:function(){return C},g:function(){return _},k:function(){return F},l:function(){return M},m:function(){return p},n:function(){return S},o:function(){return E},p:function(){return D},s:function(){return I},w:function(){return y}});r(6273),r(80861);var e=r(4506),o=r(25336),i=r(80347),c=r(19913),u=r(74772),a=r(76982),s=r(78115),l=r(60929),f=r(63918);function d(t,n){const r=(0,i.l)(t),o=(0,e.YN)(t[2]/r),c=Math.atan2(t[1]/r,t[0]/r);return(0,i.i)(n,r,o,c),n}var h=r(74695),v=r(11631);const m=g();function g(){return(0,a.vt)()}const p=u.e,b=u.e;function A(t,n){return(0,u.c)(n,t)}function M(t,n){return(0,a.fA)(t[0],t[1],t[2],n)}function y(t){return t}function _(t){return t[3]}function x(t){return t}function C(t,n,r,e){return(0,a.fA)(t,n,r,e)}function w(t,n,r){if(null==n)return!1;if(!R(t,n,P))return!1;let{t0:e,t1:o}=P;if((e<0||o<e&&o>0)&&(e=o),e<0)return!1;if(r){const{origin:t,direction:o}=n;r[0]=t[0]+o[0]*e,r[1]=t[1]+o[1]*e,r[2]=t[2]+o[2]*e}return!0}function S(t,n,r){const e=(0,f.Cr)(n,r);if(!R(t,e,P))return[];const{origin:o,direction:u}=e,{t0:a,t1:l}=P,d=n=>{const r=(0,c.vt)();return(0,i.b)(r,o,u,n),D(t,r,r)};return Math.abs(a-l)<(0,s.FD)()?[d(a)]:[d(a),d(l)]}const P={t0:0,t1:0};function R(t,n,r){const{origin:e,direction:o}=n,i=T;i[0]=e[0]-t[0],i[1]=e[1]-t[1],i[2]=e[2]-t[2];const c=o[0]*o[0]+o[1]*o[1]+o[2]*o[2];if(0===c)return!1;const u=2*(o[0]*i[0]+o[1]*i[1]+o[2]*i[2]),a=u*u-4*c*(i[0]*i[0]+i[1]*i[1]+i[2]*i[2]-t[3]*t[3]);if(a<0)return!1;const s=Math.sqrt(a);return r.t0=(-u-s)/(2*c),r.t1=(-u+s)/(2*c),!0}const T=(0,c.vt)();function F(t,n){return w(t,n,null)}function O(t,n,r){const e=v.rq.get(),c=v.Rc.get();(0,i.e)(e,n.origin,n.direction);const u=_(t);(0,i.e)(r,e,n.origin),(0,i.h)(r,r,1/(0,i.l)(r)*u);const a=H(t,n.origin),s=(0,h.g7)(n.origin,r);return(0,o.$0)(c,s+a,e),(0,i.t)(r,r,c),r}function D(t,n,r){const e=(0,i.d)(v.rq.get(),n,t),o=(0,i.h)(v.rq.get(),e,t[3]/(0,i.l)(e));return(0,i.g)(r,o,t)}function H(t,n){const r=(0,i.d)(v.rq.get(),n,t),o=(0,i.l)(r),c=_(t),u=c+Math.abs(c-o);return(0,e.XM)(c/u)}const q=(0,c.vt)();function N(t,n,r,e){const o=(0,i.d)(q,n,t);switch(r){case l._.X:{const t=d(o,q)[2];return(0,i.i)(e,-Math.sin(t),Math.cos(t),0)}case l._.Y:{const t=d(o,q),n=t[1],r=t[2],c=Math.sin(n);return(0,i.i)(e,-c*Math.cos(r),-c*Math.sin(r),Math.cos(n))}case l._.Z:return(0,i.n)(e,o);default:return}}function B(t,n){const r=(0,i.d)(U,n,t);return(0,i.l)(r)-t[3]}function E(t,n){const r=(0,i.s)(t,n),e=_(t);return r<=e*e}const U=(0,c.vt)(),k=g(),I=Object.freeze(Object.defineProperty({__proto__:null,NullSphere:m,altitudeAt:B,angleToSilhouette:H,axisAt:N,cameraFrustumCoverage:function(t,n,r,e){const o=_(t),i=o*o,c=n+.5*Math.PI,u=r*r+i-2*Math.cos(c)*r*o,a=Math.sqrt(u),s=u-i;if(s<=0)return.5;const l=Math.sqrt(s),f=Math.acos(l/a)-Math.asin(o/(a/Math.sin(c)));return Math.min(1,(f+.5*e)/e)},clear:function(t){t[0]=t[1]=t[2]=t[3]=0},closestPoint:function(t,n,r){return w(t,n,r)?r:((0,f.oC)(n,t,r),D(t,r,r))},closestPointOnSilhouette:O,containsPoint:E,copy:A,create:g,distanceToSilhouette:function(t,n){const r=(0,i.d)(v.rq.get(),n,t),e=(0,i.k)(r),o=t[3]*t[3];return Math.sqrt(Math.abs(e-o))},elevate:function(t,n,r){return t!==r&&(r[0]=t[0],r[1]=t[1],r[2]=t[2]),r[3]=t[3]+n,r},equals:b,exactEquals:p,fromCenterAndRadius:M,fromRadius:function(t,n){return t[0]=t[1]=t[2]=0,t[3]=n,t},fromValues:C,getCenter:x,getExtent:function(t,n){return n},getRadius:_,intersectLine:S,intersectRay:w,intersectRayClosestSilhouette:function(t,n,r){if(w(t,n,r))return r;const e=O(t,n,v.rq.get());return(0,i.g)(r,n.origin,(0,i.h)(v.rq.get(),n.direction,(0,i.j)(n.origin,e)/(0,i.l)(n.direction))),r},intersectsRay:F,projectPoint:D,setAltitudeAt:function(t,n,r,e){const o=B(t,n),c=N(t,n,l._.Z,U),u=(0,i.h)(U,c,r-o);return(0,i.g)(e,n,u)},setExtent:function(t,n,r){return t!==r&&A(t,r),r},tmpSphere:k,union:function(t,n,r=(0,a.vt)()){const e=(0,i.j)(t,n),o=t[3],c=n[3];return e+c<o?((0,u.c)(r,t),r):e+o<c?((0,u.c)(r,n),r):((0,i.m)(r,t,n,(e+c-o)/(2*e)),r[3]=(e+o+c)/2,r)},wrap:y},Symbol.toStringTag,{value:"Module"}))},82444:function(t,n,r){r.d(n,{I:function(){return o}});var e=r(71709);class o{constructor(t){this._allocator=t,this._items=[],this._itemsPtr=0,this._grow()}get(){return 0===this._itemsPtr&&(0,e.d)((()=>this._reset())),this._itemsPtr===this._items.length&&this._grow(),this._items[this._itemsPtr++]}_reset(){const t=Math.min(3*Math.max(8,this._itemsPtr),this._itemsPtr+3*i);this._items.length=Math.min(t,this._items.length),this._itemsPtr=0}_grow(){for(let t=0;t<Math.max(8,Math.min(this._items.length,i));t++)this._items.push(this._allocator())}}const i=1024},39637:function(t,n,r){r.d(n,{T:function(){return i},U:function(){return o}});var e=r(4506);function o(t,n,r=0){const o=(0,e.qE)(t,0,a);for(let t=0;t<4;t++)n[r+t]=Math.floor(256*s(o*c[t]))}function i(t,n=0){let r=0;for(let e=0;e<4;e++)r+=t[n+e]*u[e];return r}const c=[1,256,65536,16777216],u=[1/256,1/65536,1/16777216,1/4294967296],a=i(new Uint8ClampedArray([255,255,255,255]));function s(t){return t-Math.floor(t)}},64159:function(t,n,r){r.d(n,{g:function(){return c}});var e=r(19913),o=r(3034),i=r(88133);function c(t,n,r,e){if((0,o.canProjectWithoutEngine)(t.spatialReference,r)){u[0]=t.x,u[1]=t.y;const o=t.z;return u[2]=o??e??0,(0,i.projectBuffer)(u,t.spatialReference,0,n,r,0)}const c=(0,o.tryProjectWithZConversion)(t,r);return!!c&&(n[0]=c?.x,n[1]=c?.y,n[2]=c?.z??e??0,!0)}const u=(0,e.vt)()},42722:function(t,n,r){r.d(n,{F:function(){return i}});r(3034);var e=r(44153),o=r(64159);function i(t,n,r,e,i){return!(null==n||null==e||t.length<2)&&(c.x=t[0],c.y=t[1],c.z=t[2],c.spatialReference=n,(0,o.g)(c,r,e,i))}const c=(0,r(82320).T)(0,0,0,e.A.WGS84)},63918:function(t,n,r){r.d(n,{C:function(){return f},Cr:function(){return d},LV:function(){return l},kb:function(){return h},oC:function(){return v},vt:function(){return a}});r(3223);var e=r(82444),o=(r(82541),r(79441)),i=r(80347),c=r(19913),u=r(11631);function a(t){return t?s((0,c.o8)(t.origin),(0,c.o8)(t.direction)):s((0,c.vt)(),(0,c.vt)())}function s(t,n){return{origin:t,direction:n}}function l(t,n){const r=m.get();return r.origin=t,r.direction=n,r}function f(t,n=a()){return function(t,n,r=a()){return(0,i.c)(r.origin,t),(0,i.c)(r.direction,n),r}(t.origin,t.direction,n)}function d(t,n,r=a()){return(0,i.c)(r.origin,t),(0,i.d)(r.direction,n,t),r}function h(t,n){const r=(0,i.e)(u.rq.get(),(0,i.n)(u.rq.get(),t.direction),(0,i.d)(u.rq.get(),n,t.origin));return(0,i.f)(r,r)}function v(t,n,r){const e=(0,i.f)(t.direction,(0,i.d)(r,n,t.origin));return(0,i.g)(r,t.origin,(0,i.h)(r,t.direction,e)),r}const m=new e.I((()=>a()));(0,c.vt)(),(0,c.vt)(),(0,c.vt)(),(0,o.vt)()},82320:function(t,n,r){function e(t,n,r,e){return{x:t,y:n,z:r,hasZ:null!=r,hasM:!1,spatialReference:e,type:"point"}}function o(t,n,r,e,o){t.x=n,t.y=r,t.z=e,t.hasZ=null!=e,t.spatialReference=o}r.d(n,{J:function(){return o},T:function(){return e}})},96153:function(t,n,r){r.d(n,{k5:function(){return e}});var e;r(4506);!function(t){t[t.Multiply=1]="Multiply",t[t.Ignore=2]="Ignore",t[t.Replace=3]="Replace",t[t.Tint=4]="Tint"}(e||(e={}))},89458:function(t,n,r){r.d(n,{A:function(){return i}});var e=r(96153),o=r(41014);function i(t){t.vertex.code.add(o.H`
    vec4 decodeSymbolColor(vec4 symbolColor, out int colorMixMode) {
      float symbolAlpha = 0.0;

      const float maxTint = 85.0;
      const float maxReplace = 170.0;
      const float scaleAlpha = 3.0;

      if (symbolColor.a > maxReplace) {
        colorMixMode = ${o.H.int(e.k5.Multiply)};
        symbolAlpha = scaleAlpha * (symbolColor.a - maxReplace);
      } else if (symbolColor.a > maxTint) {
        colorMixMode = ${o.H.int(e.k5.Replace)};
        symbolAlpha = scaleAlpha * (symbolColor.a - maxTint);
      } else if (symbolColor.a > 0.0) {
        colorMixMode = ${o.H.int(e.k5.Tint)};
        symbolAlpha = scaleAlpha * symbolColor.a;
      } else {
        colorMixMode = ${o.H.int(e.k5.Multiply)};
        symbolAlpha = 0.0;
      }

      return vec4(symbolColor.r, symbolColor.g, symbolColor.b, symbolAlpha);
    }
  `)}},77788:function(t,n,r){var e;function o(t){return t===e.Shadow||t===e.ShadowHighlight||t===e.ShadowExcludeHighlight||t===e.ViewshedShadow}function i(t){return function(t){return l(t)||f(t)}(t)||t===e.Normal}function c(t){return function(t){return function(t){return s(t)||u(t)}(t)||f(t)}(t)||t===e.Normal}function u(t){return t===e.Highlight||t===e.ObjectAndLayerIdColor}function a(t){return t===e.Color}function s(t){return a(t)||d(t)}function l(t){return a(t)||u(t)}function f(t){return t===e.Depth}function d(t){return t===e.ColorEmission}r.d(n,{LG:function(){return d},PJ:function(){return o},RN:function(){return s},V:function(){return e},XY:function(){return i},dX:function(){return l},iq:function(){return c}}),function(t){t[t.Color=0]="Color",t[t.ColorEmission=1]="ColorEmission",t[t.Depth=2]="Depth",t[t.Normal=3]="Normal",t[t.Shadow=4]="Shadow",t[t.ShadowHighlight=5]="ShadowHighlight",t[t.ShadowExcludeHighlight=6]="ShadowExcludeHighlight",t[t.ViewshedShadow=7]="ViewshedShadow",t[t.Highlight=8]="Highlight",t[t.ObjectAndLayerIdColor=9]="ObjectAndLayerIdColor",t[t.COUNT=10]="COUNT"}(e||(e={}))},3525:function(t,n,r){r.d(n,{W:function(){return e},Y:function(){return a}});var e,o,i=r(95039),c=r(41014),u=r(33763);function a(t,n){switch(n.normalType){case e.Compressed:t.attributes.add(u.r.NORMALCOMPRESSED,"vec2"),t.vertex.code.add(c.H`vec3 decompressNormal(vec2 normal) {
float z = 1.0 - abs(normal.x) - abs(normal.y);
return vec3(normal + sign(normal) * min(z, 0.0), z);
}
vec3 normalModel() {
return decompressNormal(normalCompressed);
}`);break;case e.Attribute:t.attributes.add(u.r.NORMAL,"vec3"),t.vertex.code.add(c.H`vec3 normalModel() {
return normal;
}`);break;case e.ScreenDerivative:t.fragment.code.add(c.H`vec3 screenDerivativeNormal(vec3 positionView) {
return normalize(cross(dFdx(positionView), dFdy(positionView)));
}`);break;default:(0,i.Xb)(n.normalType);case e.COUNT:}}(o=e||(e={}))[o.Attribute=0]="Attribute",o[o.Compressed=1]="Compressed",o[o.ScreenDerivative=2]="ScreenDerivative",o[o.COUNT=3]="COUNT"},30588:function(t,n,r){r.d(n,{u:function(){return o}});var e=r(41014);function o({code:t},n){n.doublePrecisionRequiresObfuscation?t.add(e.H`vec3 dpPlusFrc(vec3 a, vec3 b) {
return mix(a, a + b, vec3(notEqual(b, vec3(0))));
}
vec3 dpMinusFrc(vec3 a, vec3 b) {
return mix(vec3(0), a - b, vec3(notEqual(a, b)));
}
vec3 dpAdd(vec3 hiA, vec3 loA, vec3 hiB, vec3 loB) {
vec3 t1 = dpPlusFrc(hiA, hiB);
vec3 e = dpMinusFrc(t1, hiA);
vec3 t2 = dpMinusFrc(hiB, e) + dpMinusFrc(hiA, dpMinusFrc(t1, e)) + loA + loB;
return t1 + t2;
}`):t.add(e.H`vec3 dpAdd(vec3 hiA, vec3 loA, vec3 hiB, vec3 loB) {
vec3 t1 = hiA + hiB;
vec3 e = t1 - hiA;
vec3 t2 = ((hiB - e) + (hiA - (t1 - e))) + loA + loB;
return t1 + t2;
}`)}},80002:function(t,n,r){r.d(n,{W:function(){return o}});var e=r(41014);function o(t){t.code.add(e.H`const float MAX_RGBA_FLOAT =
255.0 / 256.0 +
255.0 / 256.0 / 256.0 +
255.0 / 256.0 / 256.0 / 256.0 +
255.0 / 256.0 / 256.0 / 256.0 / 256.0;
const vec4 FIXED_POINT_FACTORS = vec4(1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0);
vec4 float2rgba(const float value) {
float valueInValidDomain = clamp(value, 0.0, MAX_RGBA_FLOAT);
vec4 fixedPointU8 = floor(fract(valueInValidDomain * FIXED_POINT_FACTORS) * 256.0);
const float toU8AsFloat = 1.0 / 255.0;
return fixedPointU8 * toU8AsFloat;
}`),t.code.add(e.H`const vec4 RGBA_2_FLOAT_FACTORS = vec4(
255.0 / (256.0),
255.0 / (256.0 * 256.0),
255.0 / (256.0 * 256.0 * 256.0),
255.0 / (256.0 * 256.0 * 256.0 * 256.0)
);
float rgba2float(vec4 rgba) {
return dot(rgba, RGBA_2_FLOAT_FACTORS);
}`),t.code.add(e.H`const vec4 uninterpolatedRGBAToFloatFactors = vec4(
1.0 / 256.0,
1.0 / 256.0 / 256.0,
1.0 / 256.0 / 256.0 / 256.0,
1.0 / 256.0 / 256.0 / 256.0 / 256.0
);
float uninterpolatedRGBAToFloat(vec4 rgba) {
return (dot(round(rgba * 255.0), uninterpolatedRGBAToFloatFactors) - 0.5) * 2.0;
}`)}},223:function(t,n,r){r.d(n,{W:function(){return i}});var e=r(7804),o=r(34088);class i extends e.n{constructor(t,n){super(t,"vec3",o.c.Draw,((r,e,o,i)=>r.setUniform3fv(t,n(e,o,i))))}}},64802:function(t,n,r){r.d(n,{t:function(){return i}});var e=r(7804),o=r(34088);class i extends e.n{constructor(t,n){super(t,"vec3",o.c.Pass,((r,e,o)=>r.setUniform3fv(t,n(e,o))))}}},7792:function(t,n,r){r.d(n,{V:function(){return i}});var e=r(7804),o=r(34088);class i extends e.n{constructor(t,n){super(t,"vec4",o.c.Draw,((r,e,o)=>r.setUniform4fv(t,n(e,o))))}}},19635:function(t,n,r){r.d(n,{m:function(){return i}});var e=r(7804),o=r(34088);class i extends e.n{constructor(t,n){super(t,"float",o.c.Pass,((r,e,o)=>r.setUniform1f(t,n(e,o))))}}},26746:function(t,n,r){r.d(n,{h:function(){return i}});var e=r(7804),o=r(34088);class i extends e.n{constructor(t,n){super(t,"mat3",o.c.Draw,((r,e,o)=>r.setUniformMatrix3fv(t,n(e,o))))}}},19835:function(t,n,r){r.d(n,{k:function(){return i}});var e=r(7804),o=r(34088);class i extends e.n{constructor(t,n){super(t,"mat3",o.c.Pass,((r,e,o)=>r.setUniformMatrix3fv(t,n(e,o))))}}},99040:function(t,n,r){r.d(n,{X:function(){return i}});var e=r(7804),o=r(34088);class i extends e.n{constructor(t,n){super(t,"mat4",o.c.Pass,((r,e,o)=>r.setUniformMatrix4fv(t,n(e,o))))}}},29247:function(t,n,r){r.d(n,{o:function(){return i}});var e=r(7804),o=r(34088);class i extends e.n{constructor(t,n){super(t,"sampler2D",o.c.Draw,((r,e,o)=>r.bindTexture(t,n(e,o))))}}},7804:function(t,n,r){r.d(n,{n:function(){return o}});var e=r(34088);class o{constructor(t,n,r,o,i=null){if(this.name=t,this.type=n,this.arraySize=i,this.bind={[e.c.Pass]:null,[e.c.Draw]:null},o)switch(r){case e.c.Pass:this.bind[e.c.Pass]=o;break;case e.c.Draw:this.bind[e.c.Draw]=o}}equals(t){return this.type===t.type&&this.name===t.name&&this.arraySize===t.arraySize}}},41014:function(t,n,r){r.d(n,{H:function(){return o},If:function(){return i},Y:function(){return e}});const e=class{};function o(t,...n){let r="";for(let e=0;e<n.length;e++)r+=t[e]+n[e];return r+=t[t.length-1],r}function i(t,n,r=""){return t?n:r}!function(t){t.int=function(t){return Math.round(t).toString()},t.float=function(t){return t.toPrecision(8)}}(o||(o={}))},34088:function(t,n,r){var e;r.d(n,{c:function(){return e}}),function(t){t[t.Pass=0]="Pass",t[t.Draw=1]="Draw"}(e||(e={}))},84618:function(t,n,r){r.d(n,{E:function(){return o}});var e=r(6273);function o(){return!!(0,e.A)("enable-feature:objectAndLayerId-rendering")}}}]);
//# sourceMappingURL=8326.0999665ea1557a21455e.js.map