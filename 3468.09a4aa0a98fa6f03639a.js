"use strict";(self.webpackChunkreact_redux_arcgis_boilerplate=self.webpackChunkreact_redux_arcgis_boilerplate||[]).push([[3468],{12668:function(e,t,o){o.d(t,{D:function(){return j},b:function(){return B}});var i=o(47635),r=o(29785),n=o(77788),a=o(29592),s=o(31790),l=o(32728),c=o(3525),d=o(18185),u=o(79887),h=o(51229),m=o(73713),v=o(83143),f=o(11255),p=o(36261),g=o(50710),x=o(87646),b=o(31434),T=o(40574),M=o(23605),w=o(75762),y=o(35212),S=o(88251),C=o(85807),O=o(69563),_=o(24578),E=o(78546),A=o(79906),I=o(79377),z=o(69952),H=o(64802),N=o(92121),G=o(19635),L=o(41014),P=o(92624),R=o(19778),D=o(33763),F=o(288);function B(e){const t=new P.N5,{vertex:o,fragment:B,varyings:j}=t,{output:W,normalType:V,offsetBackfaces:U,instancedColor:q,spherical:Y,receiveShadows:Z,snowCover:J,pbrMode:k,textureAlphaPremultiplied:X,instancedDoublePrecision:$,hasVertexColors:K,hasVertexTangents:Q,hasColorTexture:ee,hasNormalTexture:te,hasNormalTextureTransform:oe,hasColorTextureTransform:ie}=e;if((0,z.NB)(o,e),t.include(d.I),j.add("vpos","vec3"),t.include(_.A,e),t.include(l.B,e),t.include(f.G,e),t.include(O.q2,e),!(0,n.RN)(W))return t.include(p.E,e),t;t.include(O.Sx,e),t.include(O.MU,e),t.include(O.O1,e),t.include(O.QM,e),(0,z.yu)(o,e),t.include(c.Y,e),t.include(s.d,e);const re=V===c.W.Attribute||V===c.W.Compressed;return re&&U&&t.include(r.M),t.include(g.W,e),t.include(v.Mh,e),q&&t.attributes.add(D.r.INSTANCECOLOR,"vec4"),j.add("vPositionLocal","vec3"),t.include(h.U,e),t.include(i.oD,e),t.include(u.K,e),t.include(m.c,e),o.uniforms.add(new N.E("externalColor",(e=>e.externalColor))),j.add("vcolorExt","vec4"),e.terrainDepthTest&&j.add("depth","float"),o.main.add(L.H`
    forwardNormalizedVertexColor();
    vcolorExt = externalColor;
    ${(0,L.If)(q,"vcolorExt *= instanceColor * 0.003921568627451;")}
    vcolorExt *= vvColor();
    vcolorExt *= getSymbolColor();
    forwardColorMixMode();

    if (vcolorExt.a < ${L.H.float(E.Q)}) {
      gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
    } else {
      vpos = getVertexInLocalOriginSpace();
      vPositionLocal = vpos - view[3].xyz;
      vpos = subtractOrigin(vpos);
      ${(0,L.If)(re,"vNormalWorld = dpNormal(vvLocalNormal(normalModel()));")}
      vpos = addVerticalOffset(vpos, localOrigin);
      ${(0,L.If)(Q,"vTangent = dpTransformVertexTangent(tangent);")}
      gl_Position = transformPosition(proj, view, vpos);
      ${(0,L.If)(re&&U,"gl_Position = offsetBackfacingClipPosition(gl_Position, vpos, vNormalWorld, cameraPosition);")}
    }

    ${(0,L.If)(e.terrainDepthTest,"depth = (view * vec4(vpos, 1.0)).z;")}
    forwardLinearDepth();
    forwardTextureCoordinates();
    forwardColorUV();
    forwardNormalUV();
    forwardEmissiveUV();
    forwardOcclusionUV();
    forwardMetallicRoughnessUV();
  `),t.include(b.kA,e),t.include(x.n,e),t.include(A.S,e),t.include($?S.G:S.Bz,e),t.include(C.Z,e),t.include(a.HQ,e),t.include(F.z,e),(0,z.yu)(B,e),B.uniforms.add(o.uniforms.get("localOrigin"),new H.t("ambient",(e=>e.ambient)),new H.t("diffuse",(e=>e.diffuse)),new G.m("opacity",(e=>e.opacity)),new G.m("layerOpacity",(e=>e.layerOpacity))),ee&&B.uniforms.add(new R.N("tex",(e=>e.texture))),t.include(y._Z,e),t.include(w.c,e),B.include(I.N),t.include(M.r,e),(0,b.a8)(B),(0,b.eU)(B),(0,T.O4)(B),B.main.add(L.H`
      discardBySlice(vpos);
      ${(0,L.If)(e.terrainDepthTest,"terrainDepthTest(depth);")}
      ${ee?L.H`
              vec4 texColor = texture(tex, ${ie?"colorUV":"vuv0"});
              ${(0,L.If)(X,"texColor.rgb /= texColor.a;")}
              discardOrAdjustAlpha(texColor);`:L.H`vec4 texColor = vec4(1.0);`}
      shadingParams.viewDirection = normalize(vpos - cameraPosition);
      ${V===c.W.ScreenDerivative?L.H`vec3 normal = screenDerivativeNormal(vPositionLocal);`:L.H`shadingParams.normalView = vNormalWorld;
                 vec3 normal = shadingNormal(shadingParams);`}
      applyPBRFactors();
      float ssao = evaluateAmbientOcclusionInverse() * getBakedOcclusion();

      vec3 posWorld = vpos + localOrigin;

      float additionalAmbientScale = additionalDirectedAmbientLight(posWorld);
      float shadow = ${Z?"max(lightingGlobalFactor * (1.0 - additionalAmbientScale), readShadowMap(vpos, linearDepth))":(0,L.If)(Y,"lightingGlobalFactor * (1.0 - additionalAmbientScale)","0.0")};

      vec3 matColor = max(ambient, diffuse);
      vec3 albedo = mixExternalColor(${(0,L.If)(K,"vColor.rgb *")} matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
      float opacity_ = layerOpacity * mixExternalOpacity(${(0,L.If)(K,"vColor.a * ")} opacity, texColor.a, vcolorExt.a, int(colorMixMode));
      ${te?`mat3 tangentSpace = computeTangentSpace(${Q?"normal":"normal, vpos, vuv0"});\n             vec3 shadingNormal = computeTextureNormal(tangentSpace, ${oe?"normalUV":"vuv0"});`:"vec3 shadingNormal = normal;"}
      vec3 normalGround = ${Y?"normalize(posWorld);":"vec3(0.0, 0.0, 1.0);"}

      ${(0,L.If)(J,L.H`
            float snow = smoothstep(0.5, 0.55, dot(normal, normalGround));
            albedo = mix(albedo, vec3(1), snow);
            shadingNormal = mix(shadingNormal, normal, snow);
            ssao = mix(ssao, 1.0, snow);`)}

      vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;

      ${k===y.A9.Normal||k===y.A9.Schematic?L.H`
              float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];
              ${(0,L.If)(J,L.H`mrr = mix(mrr, vec3(0.0, 1.0, 0.04), snow);`)}
              vec4 emission = ${J?"mix(getEmissions(), vec4(0.0), snow)":"getEmissions()"};
              vec3 shadedColor = evaluateSceneLightingPBR(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight, shadingParams.viewDirection, normalGround, mrr, emission, additionalAmbientIrradiance);`:L.H`vec3 shadedColor = evaluateSceneLighting(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight);`}
      vec4 finalColor = vec4(shadedColor, opacity_);
      outputColorHighlightOID(finalColor, vpos);
  `),t}const j=Object.freeze(Object.defineProperty({__proto__:null,build:B},Symbol.toStringTag,{value:"Module"}))},38716:function(e,t,o){o.d(t,{R:function(){return R},b:function(){return P}});var i=o(47635),r=o(29785),n=o(77788),a=o(29592),s=o(31790),l=o(32728),c=o(3525),d=o(18185),u=o(79887),h=o(51229),m=o(73713),v=o(11255),f=o(36261),p=o(87646),g=o(31434),x=o(40574),b=o(75762),T=o(35212),M=o(88251),w=o(85807),y=o(24578),S=o(78546),C=o(79906),O=o(79377),_=o(69952),E=o(64802),A=o(92121),I=o(19635),z=o(41014),H=o(92624),N=o(19778),G=o(33763),L=o(288);function P(e){const t=new H.N5,{vertex:o,fragment:P,varyings:R}=t,{output:D,offsetBackfaces:F,instancedColor:B,pbrMode:j,snowCover:W,spherical:V}=e,U=j===T.A9.Normal||j===T.A9.Schematic;if((0,_.NB)(o,e),t.include(d.I),R.add("vpos","vec3"),t.include(y.A,e),t.include(l.B,e),t.include(v.G,e),D===n.V.Color&&((0,_.yu)(t.vertex,e),t.include(c.Y,e),t.include(s.d,e),F&&t.include(r.M),B&&t.attributes.add(G.r.INSTANCECOLOR,"vec4"),R.add("vNormalWorld","vec3"),R.add("localvpos","vec3"),e.terrainDepthTest&&R.add("depth","float"),t.include(h.U,e),t.include(i.oD,e),t.include(u.K,e),t.include(m.c,e),o.uniforms.add(new A.E("externalColor",(e=>e.externalColor))),R.add("vcolorExt","vec4"),o.main.add(z.H`
      forwardNormalizedVertexColor();
      vcolorExt = externalColor;
      ${(0,z.If)(B,"vcolorExt *= instanceColor * 0.003921568627451;")}
      vcolorExt *= vvColor();
      vcolorExt *= getSymbolColor();
      forwardColorMixMode();

      if (vcolorExt.a < ${z.H.float(S.Q)}) {
        gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
      } else {
        vpos = getVertexInLocalOriginSpace();
        localvpos = vpos - view[3].xyz;
        vpos = subtractOrigin(vpos);
        vNormalWorld = dpNormal(vvLocalNormal(normalModel()));
        vpos = addVerticalOffset(vpos, localOrigin);
        gl_Position = transformPosition(proj, view, vpos);
        ${(0,z.If)(F,"gl_Position = offsetBackfacingClipPosition(gl_Position, vpos, vNormalWorld, cameraPosition);")}
      }
      ${(0,z.If)(e.terrainDepthTest,"depth = (view * vec4(vpos, 1.0)).z;")}
      forwardLinearDepth();
      forwardTextureCoordinates();`)),D===n.V.Color){const{hasColorTexture:i,hasColorTextureTransform:r,receiveShadows:n}=e;t.include(g.kA,e),t.include(p.n,e),t.include(C.S,e),t.include(e.instancedDoublePrecision?M.G:M.Bz,e),t.include(w.Z,e),t.include(a.HQ,e),t.include(L.z,e),(0,_.yu)(t.fragment,e),(0,x.Gc)(P),(0,g.a8)(P),(0,g.eU)(P),P.uniforms.add(o.uniforms.get("localOrigin"),o.uniforms.get("view"),new E.t("ambient",(e=>e.ambient)),new E.t("diffuse",(e=>e.diffuse)),new I.m("opacity",(e=>e.opacity)),new I.m("layerOpacity",(e=>e.layerOpacity))),i&&P.uniforms.add(new N.N("tex",(e=>e.texture))),t.include(T._Z,e),t.include(b.c,e),P.include(O.N),(0,x.O4)(P),P.main.add(z.H`
      discardBySlice(vpos);
      ${(0,z.If)(e.terrainDepthTest,"terrainDepthTest(depth);")}
      vec4 texColor = ${i?`texture(tex, ${r?"colorUV":"vuv0"})`:" vec4(1.0)"};
      ${(0,z.If)(i,`${(0,z.If)(e.textureAlphaPremultiplied,"texColor.rgb /= texColor.a;")}\n        discardOrAdjustAlpha(texColor);`)}
      vec3 viewDirection = normalize(vpos - cameraPosition);
      applyPBRFactors();
      float ssao = evaluateAmbientOcclusionInverse();
      ssao *= getBakedOcclusion();

      float additionalAmbientScale = additionalDirectedAmbientLight(vpos + localOrigin);
      vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;
      float shadow = ${n?"max(lightingGlobalFactor * (1.0 - additionalAmbientScale), readShadowMap(vpos, linearDepth))":V?"lightingGlobalFactor * (1.0 - additionalAmbientScale)":"0.0"};
      vec3 matColor = max(ambient, diffuse);
      ${e.hasVertexColors?z.H`vec3 albedo = mixExternalColor(vColor.rgb * matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
             float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, int(colorMixMode));`:z.H`vec3 albedo = mixExternalColor(matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
             float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, int(colorMixMode));`}
      ${(0,z.If)(W,"albedo = mix(albedo, vec3(1), 0.9);")}
      ${z.H`vec3 shadingNormal = normalize(vNormalWorld);
             albedo *= 1.2;
             vec3 viewForward = vec3(view[0][2], view[1][2], view[2][2]);
             float alignmentLightView = clamp(dot(viewForward, -mainLightDirection), 0.0, 1.0);
             float transmittance = 1.0 - clamp(dot(viewForward, shadingNormal), 0.0, 1.0);
             float treeRadialFalloff = vColor.r;
             float backLightFactor = 0.5 * treeRadialFalloff * alignmentLightView * transmittance * (1.0 - shadow);
             additionalLight += backLightFactor * mainLightIntensity;`}
      ${(0,z.If)(U,`vec3 normalGround = ${V?"normalize(vpos + localOrigin)":"vec3(0.0, 0.0, 1.0)"};`)}
      ${U?z.H`float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];
                 ${(0,z.If)(W,z.H`mrr = vec3(0.0, 1.0, 0.04);`)}
            vec4 emission = ${W?"vec4(0.0)":"getEmissions()"};
            vec3 shadedColor = evaluateSceneLightingPBR(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight, viewDirection, normalGround, mrr, emission, additionalAmbientIrradiance);`:z.H`vec3 shadedColor = evaluateSceneLighting(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight);`}
      vec4 finalColor = vec4(shadedColor, opacity_);
      outputColorHighlightOID(finalColor, vpos);`)}return t.include(f.E,e),t}const R=Object.freeze(Object.defineProperty({__proto__:null,build:P},Symbol.toStringTag,{value:"Module"}))},43300:function(e,t,o){o.d(t,{S:function(){return g},b:function(){return v},g:function(){return f}});var i=o(53334),r=o(56560),n=o(28019),a=o(16937),s=o(36288),l=o(66579),c=o(19635),d=o(41014),u=o(92624),h=o(19778);const m=16;function v(){const e=new u.N5,t=e.fragment;return e.include(n.c),e.include(s.Ir),t.include(a.E),t.uniforms.add(new c.m("radius",((e,t)=>f(t.camera)))).code.add(d.H`vec3 sphere[16] = vec3[16](
vec3(0.186937, 0.0, 0.0),
vec3(0.700542, 0.0, 0.0),
vec3(-0.864858, -0.481795, -0.111713),
vec3(-0.624773, 0.102853, -0.730153),
vec3(-0.387172, 0.260319, 0.007229),
vec3(-0.222367, -0.642631, -0.707697),
vec3(-0.01336, -0.014956, 0.169662),
vec3(0.122575, 0.1544, -0.456944),
vec3(-0.177141, 0.85997, -0.42346),
vec3(-0.131631, 0.814545, 0.524355),
vec3(-0.779469, 0.007991, 0.624833),
vec3(0.308092, 0.209288,0.35969),
vec3(0.359331, -0.184533, -0.377458),
vec3(0.192633, -0.482999, -0.065284),
vec3(0.233538, 0.293706, -0.055139),
vec3(0.417709, -0.386701, 0.442449)
);
float fallOffFunction(float vv, float vn, float bias) {
float f = max(radius * radius - vv, 0.0);
return f * f * f * max(vn - bias, 0.0);
}`),t.code.add(d.H`float aoValueFromPositionsAndNormal(vec3 C, vec3 n_C, vec3 Q) {
vec3 v = Q - C;
float vv = dot(v, v);
float vn = dot(normalize(v), n_C);
return fallOffFunction(vv, vn, 0.1);
}`),t.uniforms.add(new h.N("normalMap",(e=>e.normalTexture)),new h.N("depthMap",(e=>e.depthTexture)),new c.m("projScale",(e=>e.projScale)),new h.N("rnm",(e=>e.noiseTexture)),new l.G("rnmScale",((e,t)=>(0,i.hZ)(p,t.camera.fullWidth/e.noiseTexture.descriptor.width,t.camera.fullHeight/e.noiseTexture.descriptor.height))),new c.m("intensity",(e=>e.intensity)),new l.G("screenSize",((e,t)=>(0,i.hZ)(p,t.camera.fullWidth,t.camera.fullHeight)))),e.outputs.add("fragOcclusion","float"),t.main.add(d.H`
      float depth = depthFromTexture(depthMap, uv);

      // Early out if depth is out of range, such as in the sky
      if (depth >= 1.0 || depth <= 0.0) {
        fragOcclusion = 1.0;
        return;
      }

      // get the normal of current fragment
      vec4 norm4 = texture(normalMap, uv);
      if(norm4.a != 1.0) {
        fragOcclusion = 1.0;
        return;
      }
      vec3 norm = vec3(-1.0) + 2.0 * norm4.xyz;

      float currentPixelDepth = linearizeDepth(depth);
      vec3 currentPixelPos = reconstructPosition(gl_FragCoord.xy, currentPixelDepth);

      float sum = 0.0;
      vec3 tapPixelPos;

      vec3 fres = normalize(2.0 * texture(rnm, uv * rnmScale).xyz - 1.0);

      // note: the factor 2.0 should not be necessary, but makes ssao much nicer.
      // bug or deviation from CE somewhere else?
      float ps = projScale / (2.0 * currentPixelPos.z * zScale.x + zScale.y);

      for(int i = 0; i < ${d.H.int(m)}; ++i) {
        vec2 unitOffset = reflect(sphere[i], fres).xy;
        vec2 offset = vec2(-unitOffset * radius * ps);

        // don't use current or very nearby samples
        if( abs(offset.x) < 2.0 || abs(offset.y) < 2.0){
          continue;
        }

        vec2 tc = vec2(gl_FragCoord.xy + offset);
        if (tc.x < 0.0 || tc.y < 0.0 || tc.x > screenSize.x || tc.y > screenSize.y) continue;
        vec2 tcTap = tc / screenSize;
        float occluderFragmentDepth = linearDepthFromTexture(depthMap, tcTap);

        tapPixelPos = reconstructPosition(tc, occluderFragmentDepth);

        sum += aoValueFromPositionsAndNormal(currentPixelPos, norm, tapPixelPos);
      }

      // output the result
      float A = max(1.0 - sum * intensity / float(${d.H.int(m)}), 0.0);

      // Anti-tone map to reduce contrast and drag dark region farther: (x^0.2 + 1.2 * x^4) / 2.2
      A = (pow(A, 0.2) + 1.2 * A * A * A * A) / 2.2;

      fragOcclusion = A;`),e}function f(e){return Math.max(10,20*e.computeScreenPixelSizeAtDist(Math.abs(4*e.relativeElevation)))}const p=(0,r.vt)(),g=Object.freeze(Object.defineProperty({__proto__:null,build:v,getRadius:f},Symbol.toStringTag,{value:"Module"}))},26599:function(e,t,o){o.d(t,{S:function(){return m},b:function(){return h}});var i=o(28019),r=o(16937),n=o(37138),a=o(19635),s=o(41014),l=o(92624),c=o(29247),d=o(19778);const u=4;function h(){const e=new l.N5,t=e.fragment;e.include(i.c);const o=(u+1)/2,h=1/(2*o*o);return t.include(r.E),t.uniforms.add(new d.N("depthMap",(e=>e.depthTexture)),new c.o("tex",(e=>e.colorTexture)),new n.t("blurSize",(e=>e.blurSize)),new a.m("projScale",((e,t)=>{const o=t.camera.distance;return o>5e4?Math.max(0,e.projScale-(o-5e4)):e.projScale}))),t.code.add(s.H`
    void blurFunction(vec2 uv, float r, float center_d, float sharpness, inout float wTotal, inout float bTotal) {
      float c = texture(tex, uv).r;
      float d = linearDepthFromTexture(depthMap, uv);

      float ddiff = d - center_d;

      float w = exp(-r * r * ${s.H.float(h)} - ddiff * ddiff * sharpness);
      wTotal += w;
      bTotal += w * c;
    }
  `),e.outputs.add("fragBlur","float"),t.main.add(s.H`
    float b = 0.0;
    float w_total = 0.0;

    float center_d = linearDepthFromTexture(depthMap, uv);

    float sharpness = -0.05 * projScale / center_d;
    for (int r = -${s.H.int(u)}; r <= ${s.H.int(u)}; ++r) {
      float rf = float(r);
      vec2 uvOffset = uv + rf * blurSize;
      blurFunction(uvOffset, rf, center_d, sharpness, w_total, b);
    }
    fragBlur = b / w_total;`),e}const m=Object.freeze(Object.defineProperty({__proto__:null,build:h},Symbol.toStringTag,{value:"Module"}))},94669:function(e,t,o){o.d(t,{C:function(){return c},Cr:function(){return u},H6:function(){return f},_I:function(){return m},dz:function(){return p},fA:function(){return d},kb:function(){return h},ld:function(){return g},sd:function(){return v},vt:function(){return l}});var i=o(4506),r=o(82444),n=o(80347),a=o(19913),s=o(11631);function l(e){return e?{origin:(0,a.o8)(e.origin),vector:(0,a.o8)(e.vector)}:{origin:(0,a.vt)(),vector:(0,a.vt)()}}function c(e,t=l()){return d(e.origin,e.vector,t)}function d(e,t,o=l()){return(0,n.c)(o.origin,e),(0,n.c)(o.vector,t),o}function u(e,t,o=l()){return(0,n.c)(o.origin,e),(0,n.d)(o.vector,t,e),o}function h(e,t){const o=(0,n.d)(s.rq.get(),t,e.origin),r=(0,n.f)(e.vector,o),a=(0,n.f)(e.vector,e.vector),l=(0,i.qE)(r/a,0,1),c=(0,n.d)(s.rq.get(),(0,n.h)(s.rq.get(),e.vector,l),o);return(0,n.f)(c,c)}function m(e,t,o){return f(e,t,0,1,o)}function v(e,t,o){return(0,n.g)(o,e.origin,(0,n.h)(o,e.vector,t))}function f(e,t,o,r,a){const{vector:l,origin:c}=e,d=(0,n.d)(s.rq.get(),t,c),u=(0,n.f)(l,d)/(0,n.k)(l);return(0,n.h)(a,l,(0,i.qE)(u,o,r)),(0,n.g)(a,a,e.origin)}function p(e,t){if(x(e,function(e,t){const o=T.get();return o.origin=e,o.vector=t,o}(t.origin,t.direction),!1,b)){const{tA:t,pB:o,distance2:i}=b;if(t>=0&&t<=1)return i;if(t<0)return(0,n.s)(e.origin,o);if(t>1)return(0,n.s)((0,n.g)(s.rq.get(),e.origin,e.vector),o)}return null}function g(e,t,o){return!!x(e,t,!0,b)&&((0,n.c)(o,b.pA),!0)}function x(e,t,o,r){const a=1e-6,l=e.origin,c=(0,n.g)(s.rq.get(),l,e.vector),d=t.origin,u=(0,n.g)(s.rq.get(),d,t.vector),h=s.rq.get(),m=s.rq.get();if(h[0]=l[0]-d[0],h[1]=l[1]-d[1],h[2]=l[2]-d[2],m[0]=u[0]-d[0],m[1]=u[1]-d[1],m[2]=u[2]-d[2],Math.abs(m[0])<a&&Math.abs(m[1])<a&&Math.abs(m[2])<a)return!1;const v=s.rq.get();if(v[0]=c[0]-l[0],v[1]=c[1]-l[1],v[2]=c[2]-l[2],Math.abs(v[0])<a&&Math.abs(v[1])<a&&Math.abs(v[2])<a)return!1;const f=h[0]*m[0]+h[1]*m[1]+h[2]*m[2],p=m[0]*v[0]+m[1]*v[1]+m[2]*v[2],g=h[0]*v[0]+h[1]*v[1]+h[2]*v[2],x=m[0]*m[0]+m[1]*m[1]+m[2]*m[2],b=(v[0]*v[0]+v[1]*v[1]+v[2]*v[2])*x-p*p;if(Math.abs(b)<a)return!1;let T=(f*p-g*x)/b,M=(f+p*T)/x;o&&(T=(0,i.qE)(T,0,1),M=(0,i.qE)(M,0,1));const w=s.rq.get(),y=s.rq.get();return w[0]=l[0]+T*v[0],w[1]=l[1]+T*v[1],w[2]=l[2]+T*v[2],y[0]=d[0]+M*m[0],y[1]=d[1]+M*m[1],y[2]=d[2]+M*m[2],r.tA=T,r.tB=M,r.pA=w,r.pB=y,r.distance2=(0,n.s)(w,y),!0}const b={tA:0,tB:0,pA:(0,a.vt)(),pB:(0,a.vt)(),distance2:0},T=new r.I((()=>l()))},45660:function(e,t,o){o.d(t,{Fm:function(){return l},Q7:function(){return c}});var i=o(82444),r=o(80347),n=o(19913),a=o(94669);o(11631);function s(e){return e?{p0:(0,n.o8)(e.p0),p1:(0,n.o8)(e.p1),p2:(0,n.o8)(e.p2)}:{p0:(0,n.vt)(),p1:(0,n.vt)(),p2:(0,n.vt)()}}function l(e,t,o){const i=t[0]-e[0],r=t[1]-e[1],n=o[0]-e[0],a=o[1]-e[1];return.5*Math.abs(i*a-r*n)}function c(e,t,o){return(0,r.d)(d,t,e),(0,r.d)(u,o,e),.5*(0,r.l)((0,r.e)(d,d,u))}new i.I(a.vt),new i.I((()=>s()));const d=(0,n.vt)(),u=(0,n.vt)()},96153:function(e,t,o){o.d(t,{Eb:function(){return a},_j:function(){return s},k5:function(){return i}});var i,r,n=o(4506);function a(e){switch(e){case"multiply":default:return i.Multiply;case"ignore":return i.Ignore;case"replace":return i.Replace;case"tint":return i.Tint}}function s(e,t,o){if(null==e||t===i.Ignore)return o[0]=255,o[1]=255,o[2]=255,void(o[3]=255);const r=(0,n.qE)(Math.round(e[3]*c),0,c),a=0===r||t===i.Tint?0:t===i.Replace?d:u;o[0]=(0,n.qE)(Math.round(e[0]*l),0,l),o[1]=(0,n.qE)(Math.round(e[1]*l),0,l),o[2]=(0,n.qE)(Math.round(e[2]*l),0,l),o[3]=r+a}(r=i||(i={}))[r.Multiply=1]="Multiply",r[r.Ignore=2]="Ignore",r[r.Replace=3]="Replace",r[r.Tint=4]="Tint";const l=255,c=85,d=c,u=2*c},89458:function(e,t,o){o.d(t,{A:function(){return n}});var i=o(96153),r=o(41014);function n(e){e.vertex.code.add(r.H`
    vec4 decodeSymbolColor(vec4 symbolColor, out int colorMixMode) {
      float symbolAlpha = 0.0;

      const float maxTint = 85.0;
      const float maxReplace = 170.0;
      const float scaleAlpha = 3.0;

      if (symbolColor.a > maxReplace) {
        colorMixMode = ${r.H.int(i.k5.Multiply)};
        symbolAlpha = scaleAlpha * (symbolColor.a - maxReplace);
      } else if (symbolColor.a > maxTint) {
        colorMixMode = ${r.H.int(i.k5.Replace)};
        symbolAlpha = scaleAlpha * (symbolColor.a - maxTint);
      } else if (symbolColor.a > 0.0) {
        colorMixMode = ${r.H.int(i.k5.Tint)};
        symbolAlpha = scaleAlpha * symbolColor.a;
      } else {
        colorMixMode = ${r.H.int(i.k5.Multiply)};
        symbolAlpha = 0.0;
      }

      return vec4(symbolColor.r, symbolColor.g, symbolColor.b, symbolAlpha);
    }
  `)}},29785:function(e,t,o){o.d(t,{M:function(){return r}});var i=o(41014);function r(e){e.vertex.code.add(i.H`vec4 offsetBackfacingClipPosition(vec4 posClip, vec3 posWorld, vec3 normalWorld, vec3 camPosWorld) {
vec3 camToVert = posWorld - camPosWorld;
bool isBackface = dot(camToVert, normalWorld) > 0.0;
if (isBackface) {
posClip.z += 0.0000003 * posClip.w;
}
return posClip;
}`)}},32728:function(e,t,o){o.d(t,{B:function(){return x}});var i=o(82541),r=o(79441),n=o(26110),a=o(80347),s=o(19913),l=o(77788),c=o(30588),d=o(69952),u=o(223),h=o(41014),m=o(19835),v=o(99040),f=o(33763),p=o(3016);h.Y;const g=(0,r.vt)();function x(e,t){const o=t.hasModelTransformation,r=t.instancedDoublePrecision;o&&(e.vertex.uniforms.add(new v.X("model",(e=>e.modelTransformation??n.zK))),e.vertex.uniforms.add(new m.k("normalLocalOriginFromModel",(e=>((0,i.Ge)(g,e.modelTransformation??n.zK),g))))),t.instanced&&r&&(e.attributes.add(f.r.INSTANCEMODELORIGINHI,"vec3"),e.attributes.add(f.r.INSTANCEMODELORIGINLO,"vec3"),e.attributes.add(f.r.INSTANCEMODEL,"mat3"),e.attributes.add(f.r.INSTANCEMODELNORMAL,"mat3"));const s=e.vertex;r&&(s.include(c.u,t),s.uniforms.add(new u.W("viewOriginHi",((e,t)=>(0,p.Zo)((0,a.i)(b,t.camera.viewInverseTransposeMatrix[3],t.camera.viewInverseTransposeMatrix[7],t.camera.viewInverseTransposeMatrix[11]),b))),new u.W("viewOriginLo",((e,t)=>(0,p.jA)((0,a.i)(b,t.camera.viewInverseTransposeMatrix[3],t.camera.viewInverseTransposeMatrix[7],t.camera.viewInverseTransposeMatrix[11]),b))))),s.code.add(h.H`
    vec3 getVertexInLocalOriginSpace() {
      return ${o?r?"(model * vec4(instanceModel * localPosition().xyz, 1.0)).xyz":"(model * localPosition()).xyz":r?"instanceModel * localPosition().xyz":"localPosition().xyz"};
    }

    vec3 subtractOrigin(vec3 _pos) {
      ${r?h.H`
          // Negated inputs are intentionally the first two arguments. The other way around the obfuscation in dpAdd() stopped
          // working for macOS 14+ and iOS 17+.
          // Issue: https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/56280
          vec3 originDelta = dpAdd(-instanceModelOriginHi, -instanceModelOriginLo, viewOriginHi, viewOriginLo);
          return _pos - originDelta;`:"return vpos;"}
    }
    `),s.code.add(h.H`
    vec3 dpNormal(vec4 _normal) {
      return normalize(${o?r?"normalLocalOriginFromModel * (instanceModelNormal * _normal.xyz)":"normalLocalOriginFromModel * _normal.xyz":r?"instanceModelNormal * _normal.xyz":"_normal.xyz"});
    }
    `),t.output===l.V.Normal&&((0,d.S7)(s),s.code.add(h.H`
    vec3 dpNormalView(vec4 _normal) {
      return normalize((viewNormal * ${o?r?"vec4(normalLocalOriginFromModel * (instanceModelNormal * _normal.xyz), 1.0)":"vec4(normalLocalOriginFromModel * _normal.xyz, 1.0)":r?"vec4(instanceModelNormal * _normal.xyz, 1.0)":"_normal"}).xyz);
    }
    `)),t.hasVertexTangents&&s.code.add(h.H`
    vec4 dpTransformVertexTangent(vec4 _tangent) {
      ${o?r?"return vec4(normalLocalOriginFromModel * (instanceModelNormal * _tangent.xyz), _tangent.w);":"return vec4(normalLocalOriginFromModel * _tangent.xyz, _tangent.w);":r?"return vec4(instanceModelNormal * _tangent.xyz, _tangent.w);":"return _tangent;"}
    }`)}const b=(0,s.vt)()},79887:function(e,t,o){o.d(t,{K:function(){return l}});var i=o(89458),r=o(88531),n=o(41014),a=o(33763),s=o(73395);function l(e,t){t.hasSymbolColors?(e.include(i.A),e.attributes.add(a.r.SYMBOLCOLOR,"vec4"),e.varyings.add("colorMixMode","mediump float"),e.vertex.code.add(n.H`int symbolColorMixMode;
vec4 getSymbolColor() {
return decodeSymbolColor(symbolColor, symbolColorMixMode) * 0.003921568627451;
}
void forwardColorMixMode() {
colorMixMode = float(symbolColorMixMode) + 0.5;
}`)):(e.fragment.uniforms.add(new r.c("colorMixMode",(e=>s.Um[e.colorMixMode]))),e.vertex.code.add(n.H`vec4 getSymbolColor() { return vec4(1.0); }
void forwardColorMixMode() {}`))}},36261:function(e,t,o){o.d(t,{E:function(){return b}});var i=o(47635),r=o(77788),n=o(29592),a=o(31790),s=o(3525),l=o(38587),c=o(51229),d=o(83143),u=o(23932),h=o(15479),m=o(24578),v=o(79906),f=o(69952),p=o(41014),g=o(19778),x=o(10875);function b(e,t){const{vertex:o,fragment:b}=e,T=t.hasColorTexture&&t.alphaDiscardMode!==x.sf.Opaque,{output:M,normalType:w,hasColorTextureTransform:y}=t;switch(M){case r.V.Depth:(0,f.NB)(o,t),e.include(a.d,t),e.include(n.HQ,t),e.include(c.U,t),T&&b.uniforms.add(new g.N("tex",(e=>e.texture))),o.main.add(p.H`vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPosition(proj, view, vpos);
forwardTextureCoordinates();`),e.include(v.S,t),b.main.add(p.H`
          discardBySlice(vpos);
          ${(0,p.If)(T,p.H`vec4 texColor = texture(tex, ${y?"colorUV":"vuv0"});
                 discardOrAdjustAlpha(texColor);`)}`);break;case r.V.Shadow:case r.V.ShadowHighlight:case r.V.ShadowExcludeHighlight:case r.V.ViewshedShadow:case r.V.ObjectAndLayerIdColor:(0,f.NB)(o,t),e.include(a.d,t),e.include(c.U,t),e.include(m.A,t),e.include(u.L,t),e.include(n.HQ,t),e.include(l.g,t),(0,i.xJ)(e),e.varyings.add("depth","float"),T&&b.uniforms.add(new g.N("tex",(e=>e.texture))),o.main.add(p.H`vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPositionWithDepth(proj, view, vpos, nearFar, depth);
forwardTextureCoordinates();
forwardObjectAndLayerIdColor();`),e.include(v.S,t),b.main.add(p.H`
          discardBySlice(vpos);
          ${(0,p.If)(T,p.H`vec4 texColor = texture(tex, ${y?"colorUV":"vuv0"});
                 discardOrAdjustAlpha(texColor);`)}
          ${M===r.V.ObjectAndLayerIdColor?p.H`outputObjectAndLayerIdColor();`:p.H`outputDepth(depth);`}`);break;case r.V.Normal:{(0,f.NB)(o,t),e.include(a.d,t),e.include(s.Y,t),e.include(d.Mh,t),e.include(c.U,t),e.include(m.A,t),T&&b.uniforms.add(new g.N("tex",(e=>e.texture))),w===s.W.ScreenDerivative&&e.varyings.add("vPositionView","vec3");const i=w===s.W.Attribute||w===s.W.Compressed;o.main.add(p.H`
          vpos = getVertexInLocalOriginSpace();
          ${i?p.H`vNormalWorld = dpNormalView(vvLocalNormal(normalModel()));`:p.H`vPositionView = (view * vec4(vpos, 1.0)).xyz;`}
          vpos = subtractOrigin(vpos);
          vpos = addVerticalOffset(vpos, localOrigin);
          gl_Position = transformPosition(proj, view, vpos);
          forwardTextureCoordinates();`),e.include(n.HQ,t),e.include(v.S,t),b.main.add(p.H`
          discardBySlice(vpos);
          ${(0,p.If)(T,p.H`vec4 texColor = texture(tex, ${y?"colorUV":"vuv0"});
                 discardOrAdjustAlpha(texColor);`)}

          ${w===s.W.ScreenDerivative?p.H`vec3 normal = screenDerivativeNormal(vPositionView);`:p.H`vec3 normal = normalize(vNormalWorld);
                     if (gl_FrontFacing == false){
                       normal = -normal;
                     }`}
          fragColor = vec4(0.5 + 0.5 * normal, 1.0);`);break}case r.V.Highlight:(0,f.NB)(o,t),e.include(a.d,t),e.include(c.U,t),e.include(m.A,t),T&&b.uniforms.add(new g.N("tex",(e=>e.texture))),o.main.add(p.H`vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPosition(proj, view, vpos);
forwardTextureCoordinates();`),e.include(n.HQ,t),e.include(v.S,t),e.include(h.Q,t),b.main.add(p.H`
          discardBySlice(vpos);
          ${(0,p.If)(T,p.H`vec4 texColor = texture(tex, ${y?"colorUV":"vuv0"});
                 discardOrAdjustAlpha(texColor);`)}
          calculateOcclusionAndOutputHighlight();`)}}},23932:function(e,t,o){o.d(t,{L:function(){return a}});var i=o(77788),r=o(63607),n=o(41014);function a(e,t){switch(t.output){case i.V.Shadow:case i.V.ShadowHighlight:case i.V.ShadowExcludeHighlight:case i.V.ViewshedShadow:e.fragment.include(r.U),e.fragment.code.add(n.H`float _calculateFragDepth(const in float depth) {
const float SLOPE_SCALE = 2.0;
const float BIAS = 20.0 * .000015259;
float m = max(abs(dFdx(depth)), abs(dFdy(depth)));
return depth + SLOPE_SCALE * m + BIAS;
}
void outputDepth(float _linearDepth) {
fragColor = floatToRgba4(_calculateFragDepth(_linearDepth));
}`)}}},50710:function(e,t,o){o.d(t,{W:function(){return f}});var i=o(79441),r=o(56560),n=o(51229),a=o(2169),s=o(23605),l=o(66579),c=o(41014),d=o(19835),u=o(29247),h=o(19778),m=o(34088),v=o(33763);function f(e,t){const o=e.fragment;t.hasVertexTangents?(e.attributes.add(v.r.TANGENT,"vec4"),e.varyings.add("vTangent","vec4"),t.doubleSidedMode===s.W.WindingOrder?o.code.add(c.H`mat3 computeTangentSpace(vec3 normal) {
float tangentHeadedness = gl_FrontFacing ? vTangent.w : -vTangent.w;
vec3 tangent = normalize(gl_FrontFacing ? vTangent.xyz : -vTangent.xyz);
vec3 bitangent = cross(normal, tangent) * tangentHeadedness;
return mat3(tangent, bitangent, normal);
}`):o.code.add(c.H`mat3 computeTangentSpace(vec3 normal) {
float tangentHeadedness = vTangent.w;
vec3 tangent = normalize(vTangent.xyz);
vec3 bitangent = cross(normal, tangent) * tangentHeadedness;
return mat3(tangent, bitangent, normal);
}`)):o.code.add(c.H`mat3 computeTangentSpace(vec3 normal, vec3 pos, vec2 st) {
vec3 Q1 = dFdx(pos);
vec3 Q2 = dFdy(pos);
vec2 stx = dFdx(st);
vec2 sty = dFdy(st);
float det = stx.t * sty.s - sty.t * stx.s;
vec3 T = stx.t * Q2 - sty.t * Q1;
T = T - normal * dot(normal, T);
T *= inversesqrt(max(dot(T,T), 1.e-10));
vec3 B = sign(det) * cross(normal, T);
return mat3(T, B, normal);
}`),t.textureCoordinateType!==n.I.None&&(e.include(a.r,t),o.uniforms.add(t.bindType===m.c.Pass?new h.N("normalTexture",(e=>e.textureNormal)):new u.o("normalTexture",(e=>e.textureNormal))),t.hasNormalTextureTransform&&(o.uniforms.add(new l.G("scale",(e=>e.scale??r.Un))),o.uniforms.add(new d.k("normalTextureTransformMatrix",(e=>e.normalTextureTransformMatrix??i.zK)))),o.code.add(c.H`vec3 computeTextureNormal(mat3 tangentSpace, vec2 uv) {
vec3 rawNormal = textureLookup(normalTexture, uv).rgb * 2.0 - 1.0;`),t.hasNormalTextureTransform&&o.code.add(c.H`mat3 normalTextureRotation = mat3(normalTextureTransformMatrix[0][0]/scale[0], normalTextureTransformMatrix[0][1]/scale[1], 0.0,
normalTextureTransformMatrix[1][0]/scale[0], normalTextureTransformMatrix[1][1]/scale[1], 0.0,
0.0, 0.0, 0.0 );
rawNormal.xy = (normalTextureRotation * vec3(rawNormal.x, rawNormal.y, 1.0)).xy;`),o.code.add(c.H`return tangentSpace * rawNormal;
}`))}},44118:function(e,t,o){o.d(t,{W:function(){return u}});var i=o(80347),r=o(19913),n=o(74772),a=o(76982),s=o(35212),l=o(64802),c=o(92121),d=o(41014);function u(e,t){const o=e.fragment,r=void 0!==t.lightingSphericalHarmonicsOrder?t.lightingSphericalHarmonicsOrder:2;0===r?(o.uniforms.add(new l.t("lightingAmbientSH0",((e,t)=>(0,i.i)(h,t.lighting.sh.r[0],t.lighting.sh.g[0],t.lighting.sh.b[0])))),o.code.add(d.H`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec3 ambientLight = 0.282095 * lightingAmbientSH0;
return ambientLight * (1.0 - ambientOcclusion);
}`)):1===r?(o.uniforms.add(new c.E("lightingAmbientSH_R",((e,t)=>(0,n.s)(m,t.lighting.sh.r[0],t.lighting.sh.r[1],t.lighting.sh.r[2],t.lighting.sh.r[3]))),new c.E("lightingAmbientSH_G",((e,t)=>(0,n.s)(m,t.lighting.sh.g[0],t.lighting.sh.g[1],t.lighting.sh.g[2],t.lighting.sh.g[3]))),new c.E("lightingAmbientSH_B",((e,t)=>(0,n.s)(m,t.lighting.sh.b[0],t.lighting.sh.b[1],t.lighting.sh.b[2],t.lighting.sh.b[3])))),o.code.add(d.H`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec4 sh0 = vec4(
0.282095,
0.488603 * normal.x,
0.488603 * normal.z,
0.488603 * normal.y
);
vec3 ambientLight = vec3(
dot(lightingAmbientSH_R, sh0),
dot(lightingAmbientSH_G, sh0),
dot(lightingAmbientSH_B, sh0)
);
return ambientLight * (1.0 - ambientOcclusion);
}`)):2===r&&(o.uniforms.add(new l.t("lightingAmbientSH0",((e,t)=>(0,i.i)(h,t.lighting.sh.r[0],t.lighting.sh.g[0],t.lighting.sh.b[0]))),new c.E("lightingAmbientSH_R1",((e,t)=>(0,n.s)(m,t.lighting.sh.r[1],t.lighting.sh.r[2],t.lighting.sh.r[3],t.lighting.sh.r[4]))),new c.E("lightingAmbientSH_G1",((e,t)=>(0,n.s)(m,t.lighting.sh.g[1],t.lighting.sh.g[2],t.lighting.sh.g[3],t.lighting.sh.g[4]))),new c.E("lightingAmbientSH_B1",((e,t)=>(0,n.s)(m,t.lighting.sh.b[1],t.lighting.sh.b[2],t.lighting.sh.b[3],t.lighting.sh.b[4]))),new c.E("lightingAmbientSH_R2",((e,t)=>(0,n.s)(m,t.lighting.sh.r[5],t.lighting.sh.r[6],t.lighting.sh.r[7],t.lighting.sh.r[8]))),new c.E("lightingAmbientSH_G2",((e,t)=>(0,n.s)(m,t.lighting.sh.g[5],t.lighting.sh.g[6],t.lighting.sh.g[7],t.lighting.sh.g[8]))),new c.E("lightingAmbientSH_B2",((e,t)=>(0,n.s)(m,t.lighting.sh.b[5],t.lighting.sh.b[6],t.lighting.sh.b[7],t.lighting.sh.b[8])))),o.code.add(d.H`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec3 ambientLight = 0.282095 * lightingAmbientSH0;
vec4 sh1 = vec4(
0.488603 * normal.x,
0.488603 * normal.z,
0.488603 * normal.y,
1.092548 * normal.x * normal.y
);
vec4 sh2 = vec4(
1.092548 * normal.y * normal.z,
0.315392 * (3.0 * normal.z * normal.z - 1.0),
1.092548 * normal.x * normal.z,
0.546274 * (normal.x * normal.x - normal.y * normal.y)
);
ambientLight += vec3(
dot(lightingAmbientSH_R1, sh1),
dot(lightingAmbientSH_G1, sh1),
dot(lightingAmbientSH_B1, sh1)
);
ambientLight += vec3(
dot(lightingAmbientSH_R2, sh2),
dot(lightingAmbientSH_G2, sh2),
dot(lightingAmbientSH_B2, sh2)
);
return ambientLight * (1.0 - ambientOcclusion);
}`),t.pbrMode!==s.A9.Normal&&t.pbrMode!==s.A9.Schematic||o.code.add(d.H`const vec3 skyTransmittance = vec3(0.9, 0.9, 1.0);
vec3 calculateAmbientRadiance(float ambientOcclusion)
{
vec3 ambientLight = 1.2 * (0.282095 * lightingAmbientSH0) - 0.2;
return ambientLight *= (1.0 - ambientOcclusion) * skyTransmittance;
}`))}const h=(0,r.vt)(),m=(0,a.vt)()},87646:function(e,t,o){o.d(t,{n:function(){return P}});var i=o(41014),r=o(19778),n=o(82392),a=o(4506),s=o(57725),l=o(61985),c=o(67900),d=o(81482),u=(o(6273),o(80861),o(67498),o(26325)),h=o(53334),m=o(28251),v=o(38236),f=o(84586),p=o(60060),g=o(21979),x=o(50837),b=o(26599),T=o(15651);class M extends x.w{constructor(e,t,i){super(e,t,new g.$(b.S,(()=>o.e(3271).then(o.bind(o,43271)))),i)}initializePipeline(){return(0,T.Ey)({colorWrite:T.kn})}}var w=o(56560);class y extends i.Y{constructor(){super(...arguments),this.projScale=1}}class S extends y{constructor(){super(...arguments),this.intensity=1}}class C extends i.Y{}class O extends C{constructor(){super(...arguments),this.blurSize=(0,w.vt)()}}var _=o(43300);class E extends x.w{constructor(e,t,i){super(e,t,new g.$(_.S,(()=>o.e(1348).then(o.bind(o,81348)))),i)}initializePipeline(){return(0,T.Ey)({colorWrite:T.kn})}}var A=o(10875),I=o(68716),z=o(22497),H=o(88416);const N=2;let G=class extends f.A{constructor(e){super(e),this.consumes={required:["normals"]},this.produces=m.OG.SSAO,this.isEnabled=()=>!1,this._enableTime=(0,c.l5)(0),this._passParameters=new S,this._drawParameters=new O}initialize(){const e=Uint8Array.from(atob("eXKEvZaUc66cjIKElE1jlJ6MjJ6Ufkl+jn2fcXp5jBx7c6KEflSGiXuXeW6OWs+tfqZ2Yot2Y7Zzfo2BhniEj3xoiXuXj4eGZpqEaHKDWjSMe7palFlzc3BziYOGlFVzg6Zzg7CUY5JrjFF7eYJ4jIKEcyyEonSXe7qUfqZ7j3xofqZ2c4R5lFZ5Y0WUbppoe1l2cIh2ezyUho+BcHN2cG6DbpqJhqp2e1GcezhrdldzjFGUcyxjc3aRjDyEc1h7Sl17c6aMjH92pb6Mjpd4dnqBjMOEhqZleIOBYzB7gYx+fnqGjJuEkWlwnCx7fGl+c4hjfGyRe5qMlNOMfnqGhIWHc6OMi4GDc6aMfqZuc6aMzqJzlKZ+lJ6Me3qRfoFue0WUhoR5UraEa6qMkXiPjMOMlJOGe7JrUqKMjK6MeYRzdod+Sl17boiPc6qEeYBlcIh2c1WEe7GDiWCDa0WMjEmMdod+Y0WcdntzhmN8WjyMjKJjiXtzgYxYaGd+a89zlEV7e2GJfnd+lF1rcK5zc4p5cHuBhL6EcXp5eYB7fnh8iX6HjIKEeaxuiYOGc66RfG2Ja5hzjlGMjEmMe9OEgXuPfHyGhPeEdl6JY02McGuMfnqGhFiMa3WJfnx2l4hwcG1uhmN8c0WMc39og1GBbrCEjE2EZY+JcIh2cIuGhIWHe0mEhIVrc09+gY5+eYBlnCyMhGCDl3drfmmMgX15aGd+gYx+fnuRfnhzY1SMsluJfnd+hm98WtNrcIuGh4SEj0qPdkqOjFF7jNNjdnqBgaqUjMt7boeBhnZ4jDR7c5pze4GGjEFrhLqMjHyMc0mUhKZze4WEa117kWlwbpqJjHZ2eX2Bc09zeId+e0V7WlF7jHJ2l72BfId8l3eBgXyBe897jGl7c66cgW+Xc76EjKNbgaSEjGx4fId8jFFjgZB8cG6DhlFziZhrcIh2fH6HgUqBgXiPY8dahGFzjEmMhEFre2dxhoBzc5SGfleGe6alc7aUeYBlhKqUdlp+cH5za4OEczxza0Gcc4J2jHZ5iXuXjH2Jh5yRjH2JcFx+hImBjH+MpddCl3dreZeJjIt8ZW18bm1zjoSEeIOBlF9oh3N7hlqBY4+UeYFwhLJjeYFwaGd+gUqBYxiEYot2fqZ2ondzhL6EYyiEY02Ea0VjgZB8doaGjHxoc66cjEGEiXuXiXWMiZhreHx8frGMe75rY02Ec5pzfnhzlEp4a3VzjM+EhFFza3mUY7Zza1V5e2iMfGyRcziEhDyEkXZ2Y4OBnCx7g5t2eyBjgV6EhEFrcIh2dod+c4Z+nJ5zjm15jEmUeYxijJp7nL6clIpjhoR5WrZraGd+fnuRa6pzlIiMg6ZzfHx5foh+eX1ufnB5eX1ufnB5aJt7UqKMjIh+e3aBfm5lbYSBhGFze6J4c39oc0mUc4Z+e0V7fKFVe0WEdoaGY02Ec4Z+Y02EZYWBfH6HgU1+gY5+hIWUgW+XjJ57ebWRhFVScHuBfJ6PhBx7WqJzlM+Ujpd4gHZziX6HjHmEgZN+lJt5boiPe2GJgX+GjIGJgHZzeaxufnB5hF2JtdN7jJ57hp57hK6ElFVzg6ZzbmiEbndzhIWHe3uJfoFue3qRhJd2j3xoc65zlE1jc3p8lE1jhniEgXJ7e657vZaUc3qBh52BhIF4aHKDa9drgY5+c52GWqZzbpqJe8tjnM+UhIeMfo2BfGl+hG1zSmmMjKJjZVaGgX15c1lze0mEp4OHa3mUhIWHhDyclJ6MeYOJkXiPc0VzhFiMlKaEboSJa5Jze41re3qRhn+HZYWBe0mEc4p5fnORbox5lEp4hGFjhGGEjJuEc1WEhLZjeHeGa7KlfHx2hLaMeX1ugY5+hIWHhKGPjMN7c1WEho1zhoBzZYx7fnhzlJt5exyUhFFziXtzfmmMa6qMYyiEiXxweV12kZSMeWqXSl17fnhzxmmMrVGEe1mcc4p5eHeGjK6MgY5+doaGa6pzlGV7g1qBh4KHkXiPeW6OaKqafqZ2eXZ5e1V7jGd7boSJc3BzhJd2e0mcYot2h1RoY8dahK6EQmWEWjx7e1l2lL6UgXyBdnR4eU9zc0VreX1umqaBhld7fo2Bc6KEc5Z+hDyEcIeBWtNrfHyGe5qMhMuMe5qMhEGEbVVupcNzg3aHhIF4boeBe0mEdlptc39ofFl5Y8uUlJOGiYt2UmGEcyxjjGx4jFF7a657ZYWBnElzhp57iXtrgZN+tfOEhIOBjE2HgU1+e8tjjKNbiWCDhE15gUqBgYN7fnqGc66ce9d7iYSBj0qPcG6DnGGcT3eGa6qMZY+JlIiMl4hwc3aRdnqBlGV7eHJ2hLZjfnuRhDyEeX6MSk17g6Z+c6aUjHmEhIF4gXyBc76EZW18fGl+fkl+jCxrhoVwhDyUhIqGlL2DlI6EhJd2tdN7eYORhEGMa2Faa6pzc3Bzc4R5lIRznM+UY9eMhDycc5Z+c4p5c4iGY117pb6MgXuPrbJafnx2eYOJeXZ5e657hDyEcziElKZjfoB5eHeGj4WRhGGEe6KGeX1utTStc76EhFGJnCyMa5hzfH6HnNeceYB7hmN8gYuMhIVrczSMgYF8h3N7c5pza5hzjJqEYIRdgYuMlL2DeYRzhGGEeX1uhLaEc4iGeZ1zdl6JhrVteX6Me2iMfm5lWqJzSpqEa6pzdnmchHx2c6OMhNdrhoR5g3aHczxzeW52gV6Ejm15frGMc0Vzc4Z+l3drfniJe+9rWq5rlF1rhGGEhoVwe9OEfoh+e7pac09+c3qBY0lrhDycdnp2lJ6MiYOGhGCDc3aRlL2DlJt5doaGdnp2gYF8gWeOjF2Uc4R5c5Z+jEmMe7KEc4mEeYJ4dmyBe0mcgXiPbqJ7eYB7fmGGiYSJjICGlF1reZ2PnElzbpqJfH6Hc39oe4WEc5eJhK6EhqyJc3qBgZB8c09+hEmEaHKDhFGJc5SGiXWMUpaEa89zc6OMnCyMiXtrho+Be5qMc7KEjJ57dmN+hKGPjICGbmiEe7prdod+hGCDdnmchBx7eX6MkXZ2hGGEa657hm98jFFjY5JreYOJgY2EjHZ2a295Y3FajJ6Mc1J+YzB7e4WBjF2Uc4R5eV12gYxzg1qBeId+c9OUc5pzjFFjgY5+hFiMlIaPhoR5lIpjjIKBlNdSe7KEeX2BfrGMhIqGc65zjE2UhK6EklZ+QmWEeziMWqZza3VzdnR4foh+gYF8n3iJiZhrnKp7gYF8eId+lJ6Me1lrcIuGjKJjhmN8c66MjFF7a6prjJ6UnJ5zezyUfruRWlF7nI5zfHyGe657h4SEe8tjhBx7jFFjc09+c39ojICMeZeJeXt+YzRzjHZ2c0WEcIeBeXZ5onSXkVR+gYJ+eYFwdldzgYF7eX2BjJ6UiXuXlE1jh4SEe1mchLJjc4Z+hqZ7eXZ5bm1zlL6Ue5p7iWeGhKqUY5pzjKJjcIeBe8t7gXyBYIRdlEp4a3mGnK6EfmmMZpqEfFl5gYxzjKZuhGFjhoKGhHx2fnx2eXuMe3aBiWeGvbKMe6KGa5hzYzB7gZOBlGV7hmN8hqZlYot2Y117a6pzc6KEfId8foB5rctrfneJfJ6PcHN2hFiMc5pzjH92c0VzgY2EcElzdmCBlFVzg1GBc65zY4OBboeBcHiBeYJ4ewxzfHx5lIRzlEmEnLKEbk1zfJ6PhmN8eYBljBiEnMOEiXxwezyUcIeBe76EdsKEeX2BdnR4jGWUrXWMjGd7fkl+j4WRlEGMa5Jzho+BhDyEfnqMeXt+g3aHlE1jczClhNN7ZW18eHx8hGFjZW18iXWMjKJjhH57gYuMcIuGWjyMe4ZtjJuExmmMj4WRdntzi4GDhFFzYIRdnGGcjJp7Y0F7e4WEkbCGiX57fnSHa657a6prhBCMe3Z+SmmMjH92eHJ2hK6EY1FzexhrvbKMnI5za4OEfnd+eXuMhImBe897hLaMjN+EfG+BeIOBhF1+eZeJi4GDkXZ2eXKEgZ6Ejpd4c2GHa1V5e5KUfqZuhCx7jKp7lLZrg11+hHx2hFWUoot2nI5zgbh5mo9zvZaUe3qRbqKMfqZ2kbCGhFiM"),(e=>e.charCodeAt(0))),t=new H.R;t.wrapMode=I.pF.CLAMP_TO_EDGE,t.pixelFormat=I.Ab.RGB,t.wrapMode=I.pF.REPEAT,t.hasMipmap=!0,t.width=32,t.height=32,this._passParameters.noiseTexture=new z.g(this.renderingContext,t,e),this.techniques.precompile(E),this.techniques.precompile(M),this.addHandles((0,l.wB)((()=>this.isEnabled()),(()=>this._enableTime=(0,c.l5)(0))))}destroy(){this._passParameters.noiseTexture=(0,s.WD)(this._passParameters.noiseTexture)}render(e){const t=this.bindParameters,o=e.find((({name:e})=>"normals"===e)),i=o?.getTexture(),r=o?.getTexture(I.nI),n=this.fboCache,s=t.camera,l=s.fullViewport[2],d=s.fullViewport[3],u=Math.round(l/N),f=Math.round(d/N),g=this.techniques.acquire(E),x=this.techniques.acquire(M);if(!g.compiled||!x.compiled)return this._enableTime=(0,c.l5)(performance.now()),this.requestRender(A.C7.UPDATE),g.release(),x.release(),n.acquire(u,f,m.OG.SSAO,v.N.RED);0===this._enableTime&&(this._enableTime=(0,c.l5)(performance.now()));const b=this.renderingContext,T=this.view.qualitySettings.fadeDuration,w=s.relativeElevation,y=(0,a.qE)((p.b-w)/(p.b-p.O),0,1),S=T>0?Math.min(T,performance.now()-this._enableTime)/T:1,C=S*y;this._passParameters.normalTexture=i,this._passParameters.depthTexture=r,this._passParameters.projScale=1/s.computeScreenPixelSizeAtDist(1),this._passParameters.intensity=4*L/(0,_.g)(s)**6*C;const O=n.acquire(l,d,"ssao input",v.N.RG);b.bindFramebuffer(O.fbo),b.setViewport(0,0,l,d),b.bindTechnique(g,t,this._passParameters,this._drawParameters),b.screen.draw(),g.release();const z=n.acquire(u,f,"ssao blur",v.N.RED);b.bindFramebuffer(z.fbo),this._drawParameters.colorTexture=O.getTexture(),(0,h.hZ)(this._drawParameters.blurSize,0,N/d),b.bindTechnique(x,t,this._passParameters,this._drawParameters),b.setViewport(0,0,u,f),b.screen.draw(),O.release();const H=n.acquire(u,f,m.OG.SSAO,v.N.RED);return b.bindFramebuffer(H.fbo),b.setViewport(0,0,l,d),b.setClearColor(1,1,1,0),b.clear(I.NV.COLOR),this._drawParameters.colorTexture=z.getTexture(),(0,h.hZ)(this._drawParameters.blurSize,N/l,0),b.bindTechnique(x,t,this._passParameters,this._drawParameters),b.setViewport(0,0,u,f),b.screen.draw(),x.release(),b.setViewport4fv(s.fullViewport),z.release(),S<1&&this.requestRender(A.C7.UPDATE),H}};(0,n._)([(0,d.MZ)()],G.prototype,"consumes",void 0),(0,n._)([(0,d.MZ)()],G.prototype,"produces",void 0),(0,n._)([(0,d.MZ)({constructOnly:!0})],G.prototype,"techniques",void 0),(0,n._)([(0,d.MZ)({constructOnly:!0})],G.prototype,"isEnabled",void 0),G=(0,n._)([(0,u.$)("esri.views.3d.webgl-engine.effects.ssao.SSAO")],G);const L=.5;function P(e,t){const o=e.fragment;t.receiveAmbientOcclusion?(o.uniforms.add(new r.N("ssaoTex",((e,t)=>t.ssao?.getTexture()))),o.constants.add("blurSizePixelsInverse","float",1/N),o.code.add(i.H`float evaluateAmbientOcclusionInverse() {
vec2 ssaoTextureSizeInverse = 1.0 / vec2(textureSize(ssaoTex, 0));
return texture(ssaoTex, gl_FragCoord.xy * blurSizePixelsInverse * ssaoTextureSizeInverse).r;
}
float evaluateAmbientOcclusion() {
return 1.0 - evaluateAmbientOcclusionInverse();
}`)):o.code.add(i.H`float evaluateAmbientOcclusionInverse() { return 1.0; }
float evaluateAmbientOcclusion() { return 0.0; }`)}},31434:function(e,t,o){o.d(t,{a8:function(){return v},eU:function(){return f},kA:function(){return p}});var i=o(95039),r=o(44118),n=o(87646),a=o(40574),s=o(75762),l=o(35212),c=o(48425),d=o(27981),u=o(19635),h=o(41014),m=o(4477);function v(e){e.constants.add("ambientBoostFactor","float",m.uH)}function f(e){e.uniforms.add(new u.m("lightingGlobalFactor",((e,t)=>t.lighting.globalFactor)))}function p(e,t){const o=e.fragment;switch(e.include(n.n,t),t.pbrMode!==l.A9.Disabled&&e.include(s.c,t),e.include(r.W,t),e.include(c.p),o.code.add(h.H`
    const float GAMMA_SRGB = 2.1;
    const float INV_GAMMA_SRGB = 0.4761904;
    ${t.pbrMode===l.A9.Disabled?"":"const vec3 GROUND_REFLECTANCE = vec3(0.2);"}
  `),v(o),f(o),(0,a.Gc)(o),o.code.add(h.H`
    float additionalDirectedAmbientLight(vec3 vPosWorld) {
      float vndl = dot(${t.spherical?h.H`normalize(vPosWorld)`:h.H`vec3(0.0, 0.0, 1.0)`}, mainLightDirection);
      return smoothstep(0.0, 1.0, clamp(vndl * 2.5, 0.0, 1.0));
    }
  `),(0,a.O4)(o),o.code.add(h.H`vec3 evaluateAdditionalLighting(float ambientOcclusion, vec3 vPosWorld) {
float additionalAmbientScale = additionalDirectedAmbientLight(vPosWorld);
return (1.0 - ambientOcclusion) * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor * mainLightIntensity;
}`),t.pbrMode){case l.A9.Disabled:case l.A9.WaterOnIntegratedMesh:case l.A9.Water:e.include(a.Vt),o.code.add(h.H`vec3 evaluateSceneLighting(vec3 normalWorld, vec3 albedo, float shadow, float ssao, vec3 additionalLight) {
vec3 mainLighting = applyShading(normalWorld, shadow);
vec3 ambientLighting = calculateAmbientIrradiance(normalWorld, ssao);
vec3 albedoLinear = pow(albedo, vec3(GAMMA_SRGB));
vec3 totalLight = mainLighting + ambientLighting + additionalLight;
totalLight = min(totalLight, vec3(PI));
vec3 outColor = vec3((albedoLinear / PI) * totalLight);
return pow(outColor, vec3(INV_GAMMA_SRGB));
}`);break;case l.A9.Normal:case l.A9.Schematic:o.code.add(h.H`const float fillLightIntensity = 0.25;
const float horizonLightDiffusion = 0.4;
const float additionalAmbientIrradianceFactor = 0.02;
vec3 evaluateSceneLightingPBR(vec3 normal, vec3 albedo, float shadow, float ssao, vec3 additionalLight, vec3 viewDir, vec3 normalGround, vec3 mrr, vec4 _emission, float additionalAmbientIrradiance)
{
vec3 viewDirection = -viewDir;
vec3 h = normalize(viewDirection + mainLightDirection);
PBRShadingInfo inputs;
inputs.NdotV = clamp(abs(dot(normal, viewDirection)), 0.001, 1.0);
inputs.NdotNG = clamp(dot(normal, normalGround), -1.0, 1.0);
vec3 reflectedView = normalize(reflect(viewDirection, normal));
inputs.RdotNG = clamp(dot(reflectedView, normalGround), -1.0, 1.0);
inputs.albedoLinear = pow(albedo, vec3(GAMMA_SRGB));
inputs.ssao = ssao;
inputs.metalness = mrr[0];
inputs.roughness = clamp(mrr[1] * mrr[1], 0.001, 0.99);`),o.code.add(h.H`inputs.f0 = (0.16 * mrr[2] * mrr[2]) * (1.0 - inputs.metalness) + inputs.albedoLinear * inputs.metalness;
inputs.f90 = vec3(clamp(dot(inputs.f0, vec3(50.0 * 0.33)), 0.0, 1.0));
inputs.diffuseColor = inputs.albedoLinear * (vec3(1.0) - inputs.f0) * (1.0 - inputs.metalness);`),t.useFillLights?o.uniforms.add(new d.e("hasFillLights",((e,t)=>t.enableFillLights))):o.constants.add("hasFillLights","bool",!1),o.code.add(h.H`vec3 ambientDir = vec3(5.0 * normalGround[1] - normalGround[0] * normalGround[2], - 5.0 * normalGround[0] - normalGround[2] * normalGround[1], normalGround[1] * normalGround[1] + normalGround[0] * normalGround[0]);
ambientDir = ambientDir != vec3(0.0) ? normalize(ambientDir) : normalize(vec3(5.0, -1.0, 0.0));
inputs.NdotAmbDir = hasFillLights ? abs(dot(normal, ambientDir)) : 1.0;
float NdotL = clamp(dot(normal, mainLightDirection), 0.001, 1.0);
vec3 mainLightIrradianceComponent = NdotL * (1.0 - shadow) * mainLightIntensity;
vec3 fillLightsIrradianceComponent = inputs.NdotAmbDir * mainLightIntensity * fillLightIntensity;
vec3 ambientLightIrradianceComponent = calculateAmbientIrradiance(normal, ssao) + additionalLight;
inputs.skyIrradianceToSurface = ambientLightIrradianceComponent + mainLightIrradianceComponent + fillLightsIrradianceComponent ;
inputs.groundIrradianceToSurface = GROUND_REFLECTANCE * ambientLightIrradianceComponent + mainLightIrradianceComponent + fillLightsIrradianceComponent ;`),o.uniforms.add(new u.m("lightingSpecularStrength",((e,t)=>t.lighting.mainLight.specularStrength)),new u.m("lightingEnvironmentStrength",((e,t)=>t.lighting.mainLight.environmentStrength))).code.add(h.H`vec3 horizonRingDir = inputs.RdotNG * normalGround - reflectedView;
vec3 horizonRingH = normalize(viewDirection + horizonRingDir);
inputs.NdotH_Horizon = dot(normal, horizonRingH);
float NdotH = clamp(dot(normal, h), 0.0, 1.0);
vec3 mainLightRadianceComponent = lightingSpecularStrength * normalDistribution(NdotH, inputs.roughness) * mainLightIntensity * (1.0 - shadow);
vec3 horizonLightRadianceComponent = lightingEnvironmentStrength * normalDistribution(inputs.NdotH_Horizon, min(inputs.roughness + horizonLightDiffusion, 1.0)) * mainLightIntensity * fillLightIntensity;
vec3 ambientLightRadianceComponent = lightingEnvironmentStrength * calculateAmbientRadiance(ssao) + additionalLight;
float normalDirectionModifier = mix(1., min(mix(0.1, 2.0, (inputs.NdotNG + 1.) * 0.5), 1.0), clamp(inputs.roughness * 5.0, 0.0 , 1.0));
inputs.skyRadianceToSurface = (ambientLightRadianceComponent + horizonLightRadianceComponent) * normalDirectionModifier + mainLightRadianceComponent;
inputs.groundRadianceToSurface = 0.5 * GROUND_REFLECTANCE * (ambientLightRadianceComponent + horizonLightRadianceComponent) * normalDirectionModifier + mainLightRadianceComponent;
inputs.averageAmbientRadiance = ambientLightIrradianceComponent[1] * (1.0 + GROUND_REFLECTANCE[1]);`),o.code.add(h.H`
        vec3 reflectedColorComponent = evaluateEnvironmentIllumination(inputs);
        vec3 additionalMaterialReflectanceComponent = inputs.albedoLinear * additionalAmbientIrradiance;
        vec3 emissionComponent = _emission.rgb == vec3(0.0) ? _emission.rgb : pow(_emission.rgb, vec3(GAMMA_SRGB));
        vec3 outColorLinear = reflectedColorComponent + additionalMaterialReflectanceComponent + emissionComponent;
        ${t.pbrMode!==l.A9.Schematic||t.hasColorTexture?h.H`vec3 outColor = pow(blackLevelSoftCompression(outColorLinear, inputs), vec3(INV_GAMMA_SRGB));`:h.H`vec3 outColor = pow(max(vec3(0.0), outColorLinear - 0.005 * inputs.averageAmbientRadiance), vec3(INV_GAMMA_SRGB));`}
        return outColor;
      }
    `);break;case l.A9.Simplified:case l.A9.TerrainWithWater:(0,a.Gc)(o),(0,a.O4)(o),o.code.add(h.H`const float roughnessTerrain = 0.5;
const float specularityTerrain = 0.5;
const vec3 fresnelReflectionTerrain = vec3(0.04);
vec3 evaluatePBRSimplifiedLighting(vec3 n, vec3 c, float shadow, float ssao, vec3 al, vec3 vd, vec3 nup) {
vec3 viewDirection = -vd;
vec3 h = normalize(viewDirection + mainLightDirection);
float NdotL = clamp(dot(n, mainLightDirection), 0.001, 1.0);
float NdotV = clamp(abs(dot(n, viewDirection)), 0.001, 1.0);
float NdotH = clamp(dot(n, h), 0.0, 1.0);
float NdotNG = clamp(dot(n, nup), -1.0, 1.0);
vec3 albedoLinear = pow(c, vec3(GAMMA_SRGB));
float lightness = 0.3 * albedoLinear[0] + 0.5 * albedoLinear[1] + 0.2 * albedoLinear[2];
vec3 f0 = (0.85 * lightness + 0.15) * fresnelReflectionTerrain;
vec3 f90 =  vec3(clamp(dot(f0, vec3(50.0 * 0.33)), 0.0, 1.0));
vec3 mainLightIrradianceComponent = (1. - shadow) * NdotL * mainLightIntensity;
vec3 ambientLightIrradianceComponent = calculateAmbientIrradiance(n, ssao) + al;
vec3 ambientSky = ambientLightIrradianceComponent + mainLightIrradianceComponent;
vec3 indirectDiffuse = ((1.0 - NdotNG) * mainLightIrradianceComponent + (1.0 + NdotNG ) * ambientSky) * 0.5;
vec3 outDiffColor = albedoLinear * (1.0 - f0) * indirectDiffuse / PI;
vec3 mainLightRadianceComponent = normalDistribution(NdotH, roughnessTerrain) * mainLightIntensity;
vec2 dfg = prefilteredDFGAnalytical(roughnessTerrain, NdotV);
vec3 specularColor = f0 * dfg.x + f90 * dfg.y;
vec3 specularComponent = specularityTerrain * specularColor * mainLightRadianceComponent;
vec3 outColorLinear = outDiffColor + specularComponent;
vec3 outColor = pow(outColorLinear, vec3(INV_GAMMA_SRGB));
return outColor;
}`);break;default:(0,i.Xb)(t.pbrMode);case l.A9.COUNT:}}},23605:function(e,t,o){o.d(t,{W:function(){return i},r:function(){return a}});var i,r=o(95039),n=o(41014);function a(e,t){const o=e.fragment;switch(o.code.add(n.H`struct ShadingNormalParameters {
vec3 normalView;
vec3 viewDirection;
} shadingParams;`),t.doubleSidedMode){case i.None:o.code.add(n.H`vec3 shadingNormal(ShadingNormalParameters params) {
return normalize(params.normalView);
}`);break;case i.View:o.code.add(n.H`vec3 shadingNormal(ShadingNormalParameters params) {
return dot(params.normalView, params.viewDirection) > 0.0 ? normalize(-params.normalView) : normalize(params.normalView);
}`);break;case i.WindingOrder:o.code.add(n.H`vec3 shadingNormal(ShadingNormalParameters params) {
return gl_FrontFacing ? normalize(params.normalView) : normalize(-params.normalView);
}`);break;default:(0,r.Xb)(t.doubleSidedMode);case i.COUNT:}}!function(e){e[e.None=0]="None",e[e.View=1]="View",e[e.WindingOrder=2]="WindingOrder",e[e.COUNT=3]="COUNT"}(i||(i={}))},88251:function(e,t,o){o.d(t,{Bz:function(){return m},G:function(){return h}});o(26110),o(19913);var i=o(63607),r=o(92121),n=o(88531),a=o(41014),s=o(7804),l=o(34088);class c extends s.n{constructor(e,t,o){super(e,"mat4",l.c.Draw,((o,i,r,n)=>o.setUniformMatrix4fv(e,t(i,r,n))),o)}}class d extends s.n{constructor(e,t,o){super(e,"mat4",l.c.Pass,((o,i,r)=>o.setUniformMatrix4fv(e,t(i,r))),o)}}var u=o(19778);a.Y;a.Y;function h(e,t){t.receiveShadows&&(e.fragment.uniforms.add(new d("shadowMapMatrix",((e,t)=>t.shadowMap.getShadowMapMatrices(e.origin)),4)),v(e))}function m(e,t){t.receiveShadows&&(e.fragment.uniforms.add(new c("shadowMapMatrix",((e,t)=>t.shadowMap.getShadowMapMatrices(e.origin)),4)),v(e))}function v(e){const t=e.fragment;t.include(i.U),t.uniforms.add(new u.N("shadowMap",((e,t)=>t.shadowMap.depthTexture)),new n.c("numCascades",((e,t)=>t.shadowMap.numCascades)),new r.E("cascadeDistances",((e,t)=>t.shadowMap.cascadeDistances))).code.add(a.H`int chooseCascade(float depth, out mat4 mat) {
vec4 distance = cascadeDistances;
int i = depth < distance[1] ? 0 : depth < distance[2] ? 1 : depth < distance[3] ? 2 : 3;
mat = i == 0 ? shadowMapMatrix[0] : i == 1 ? shadowMapMatrix[1] : i == 2 ? shadowMapMatrix[2] : shadowMapMatrix[3];
return i;
}
vec3 lightSpacePosition(vec3 _vpos, mat4 mat) {
vec4 lv = mat * vec4(_vpos, 1.0);
lv.xy /= lv.w;
return 0.5 * lv.xyz + vec3(0.5);
}
vec2 cascadeCoordinates(int i, ivec2 textureSize, vec3 lvpos) {
float xScale = float(textureSize.y) / float(textureSize.x);
return vec2((float(i) + lvpos.x) * xScale, lvpos.y);
}
float readShadowMapDepth(ivec2 uv, sampler2D _depthTex) {
return rgba4ToFloat(texelFetch(_depthTex, uv, 0));
}
float posIsInShadow(ivec2 uv, vec3 lvpos, sampler2D _depthTex) {
return readShadowMapDepth(uv, _depthTex) < lvpos.z ? 1.0 : 0.0;
}
float filterShadow(vec2 uv, vec3 lvpos, ivec2 texSize, sampler2D _depthTex) {
vec2 st = fract(uv * vec2(texSize) + vec2(0.5));
ivec2 base = ivec2(uv * vec2(texSize) - vec2(0.5));
float s00 = posIsInShadow(ivec2(base.x, base.y), lvpos, _depthTex);
float s10 = posIsInShadow(ivec2(base.x + 1, base.y), lvpos, _depthTex);
float s11 = posIsInShadow(ivec2(base.x + 1, base.y + 1), lvpos, _depthTex);
float s01 = posIsInShadow(ivec2(base.x, base.y + 1), lvpos, _depthTex);
return mix(mix(s00, s10, st.x), mix(s01, s11, st.x), st.y);
}
float readShadowMap(const in vec3 _vpos, float _linearDepth) {
mat4 mat;
int i = chooseCascade(_linearDepth, mat);
if (i >= numCascades) { return 0.0; }
vec3 lvpos = lightSpacePosition(_vpos, mat);
if (lvpos.z >= 1.0 || lvpos.x < 0.0 || lvpos.x > 1.0 || lvpos.y < 0.0 || lvpos.y > 1.0) { return 0.0; }
ivec2 size = textureSize(shadowMap, 0);
vec2 uv = cascadeCoordinates(i, size, lvpos);
return filterShadow(uv, lvpos, size, shadowMap);
}`)}},69563:function(e,t,o){o.d(t,{MU:function(){return c},O1:function(){return d},QM:function(){return u},Sx:function(){return l},q2:function(){return s}});var i=o(79441),r=o(51229),n=o(41014),a=o(19835);function s(e,t){t.hasColorTextureTransform?(e.varyings.add("colorUV","vec2"),e.vertex.uniforms.add(new a.k("colorTextureTransformMatrix",(e=>e.colorTextureTransformMatrix??i.zK))).code.add(n.H`void forwardColorUV(){
colorUV = (colorTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):e.vertex.code.add(n.H`void forwardColorUV(){}`)}function l(e,t){t.hasNormalTextureTransform&&t.textureCoordinateType!==r.I.None?(e.varyings.add("normalUV","vec2"),e.vertex.uniforms.add(new a.k("normalTextureTransformMatrix",(e=>e.normalTextureTransformMatrix??i.zK))).code.add(n.H`void forwardNormalUV(){
normalUV = (normalTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):e.vertex.code.add(n.H`void forwardNormalUV(){}`)}function c(e,t){t.hasEmissionTextureTransform&&t.textureCoordinateType!==r.I.None?(e.varyings.add("emissiveUV","vec2"),e.vertex.uniforms.add(new a.k("emissiveTextureTransformMatrix",(e=>e.emissiveTextureTransformMatrix??i.zK))).code.add(n.H`void forwardEmissiveUV(){
emissiveUV = (emissiveTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):e.vertex.code.add(n.H`void forwardEmissiveUV(){}`)}function d(e,t){t.hasOcclusionTextureTransform&&t.textureCoordinateType!==r.I.None?(e.varyings.add("occlusionUV","vec2"),e.vertex.uniforms.add(new a.k("occlusionTextureTransformMatrix",(e=>e.occlusionTextureTransformMatrix??i.zK))).code.add(n.H`void forwardOcclusionUV(){
occlusionUV = (occlusionTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):e.vertex.code.add(n.H`void forwardOcclusionUV(){}`)}function u(e,t){t.hasMetallicRoughnessTextureTransform&&t.textureCoordinateType!==r.I.None?(e.varyings.add("metallicRoughnessUV","vec2"),e.vertex.uniforms.add(new a.k("metallicRoughnessTextureTransformMatrix",(e=>e.metallicRoughnessTextureTransformMatrix??i.zK))).code.add(n.H`void forwardMetallicRoughnessUV(){
metallicRoughnessUV = (metallicRoughnessTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):e.vertex.code.add(n.H`void forwardMetallicRoughnessUV(){}`)}},79906:function(e,t,o){o.d(t,{S:function(){return l}});var i=o(78546),r=o(7804);o(34088);r.n;var n=o(19635),a=o(41014),s=o(10875);function l(e,t){c(e,t,new n.m("textureAlphaCutoff",(e=>e.textureAlphaCutoff)))}function c(e,t,o){const r=e.fragment;switch(t.alphaDiscardMode){case s.sf.Blend:e.fragment.code.add(a.H`
        #define discardOrAdjustAlpha(color) { if (color.a < ${a.H.float(i.Q)}) { discard; } }
      `);break;case s.sf.Opaque:r.code.add(a.H`void discardOrAdjustAlpha(inout vec4 color) {
color.a = 1.0;
}`);break;case s.sf.Mask:r.uniforms.add(o).code.add(a.H`#define discardOrAdjustAlpha(color) { if (color.a < textureAlphaCutoff) { discard; } else { color.a = 1.0; } }`);break;case s.sf.MaskBlend:r.uniforms.add(o).code.add(a.H`#define discardOrAdjustAlpha(color) { if (color.a < textureAlphaCutoff) { discard; } }`)}}},79377:function(e,t,o){o.d(t,{N:function(){return a}});var i=o(96153),r=o(83660),n=o(41014);function a(e){e.include(r.a),e.code.add(n.H`
    vec3 mixExternalColor(vec3 internalColor, vec3 textureColor, vec3 externalColor, int mode) {
      // workaround for artifacts in macOS using Intel Iris Pro
      // see: https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/10475
      vec3 internalMixed = internalColor * textureColor;
      vec3 allMixed = internalMixed * externalColor;

      if (mode == ${n.H.int(i.k5.Multiply)}) {
        return allMixed;
      }
      if (mode == ${n.H.int(i.k5.Ignore)}) {
        return internalMixed;
      }
      if (mode == ${n.H.int(i.k5.Replace)}) {
        return externalColor;
      }

      // tint (or something invalid)
      float vIn = rgb2v(internalMixed);
      vec3 hsvTint = rgb2hsv(externalColor);
      vec3 hsvOut = vec3(hsvTint.x, hsvTint.y, vIn * hsvTint.z);
      return hsv2rgb(hsvOut);
    }

    float mixExternalOpacity(float internalOpacity, float textureOpacity, float externalOpacity, int mode) {
      // workaround for artifacts in macOS using Intel Iris Pro
      // see: https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/10475
      float internalMixed = internalOpacity * textureOpacity;
      float allMixed = internalMixed * externalOpacity;

      if (mode == ${n.H.int(i.k5.Ignore)}) {
        return internalMixed;
      }
      if (mode == ${n.H.int(i.k5.Replace)}) {
        return externalOpacity;
      }

      // multiply or tint (or something invalid)
      return allMixed;
    }
  `)}},63607:function(e,t,o){o.d(t,{U:function(){return r}});var i=o(41014);function r(e){e.code.add(i.H`const float MAX_RGBA4_FLOAT =
15.0 / 16.0 +
15.0 / 16.0 / 16.0 +
15.0 / 16.0 / 16.0 / 16.0 +
15.0 / 16.0 / 16.0 / 16.0 / 16.0;
const vec4 FIXED_POINT_FACTORS_RGBA4 = vec4(1.0, 16.0, 16.0 * 16.0, 16.0 * 16.0 * 16.0);
vec4 floatToRgba4(const float value) {
float valueInValidDomain = clamp(value, 0.0, MAX_RGBA4_FLOAT);
vec4 fixedPointU4 = floor(fract(valueInValidDomain * FIXED_POINT_FACTORS_RGBA4) * 16.0);
const float toU4AsFloat = 1.0 / 15.0;
return fixedPointU4 * toU4AsFloat;
}
const vec4 RGBA4_2_FLOAT_FACTORS = vec4(
15.0 / (16.0),
15.0 / (16.0 * 16.0),
15.0 / (16.0 * 16.0 * 16.0),
15.0 / (16.0 * 16.0 * 16.0 * 16.0)
);
float rgba4ToFloat(vec4 rgba) {
return dot(rgba, RGBA4_2_FLOAT_FACTORS);
}`)}},14103:function(e,t,o){o.d(t,{$U:function(){return N}});var i=o(80347),r=o(19913),n=o(84456),a=o(7724),s=o(77788),l=o(3525),c=o(6750),d=o(23605),u=o(35212),h=o(78546),m=o(84618),v=o(10875),f=o(71678),p=o(31272),g=o(8445),x=o(17555),b=o(15449),T=o(33763),M=o(72559),w=o(66356),y=o(73395),S=o(83244),C=o(82392),O=o(51229),_=o(67069),E=o(12013);class A extends E.E{constructor(e,t){super(),this.spherical=e,this.doublePrecisionRequiresObfuscation=t,this.alphaDiscardMode=v.sf.Opaque,this.doubleSidedMode=d.W.None,this.pbrMode=u.A9.Disabled,this.cullFace=v.s2.None,this.normalType=l.W.Attribute,this.customDepthTest=v.it.Less,this.emissionSource=c.ZX.None,this.hasVertexColors=!1,this.hasSymbolColors=!1,this.hasVerticalOffset=!1,this.hasSlicePlane=!1,this.hasSliceHighlight=!0,this.hasColorTexture=!1,this.hasMetallicRoughnessTexture=!1,this.hasOcclusionTexture=!1,this.hasNormalTexture=!1,this.hasScreenSizePerspective=!1,this.hasVertexTangents=!1,this.hasOccludees=!1,this.hasModelTransformation=!1,this.offsetBackfaces=!1,this.vvSize=!1,this.vvColor=!1,this.receiveShadows=!1,this.receiveAmbientOcclusion=!1,this.textureAlphaPremultiplied=!1,this.instanced=!1,this.instancedColor=!1,this.writeDepth=!0,this.transparent=!1,this.enableOffset=!0,this.terrainDepthTest=!1,this.cullAboveTerrain=!1,this.snowCover=!1,this.hasColorTextureTransform=!1,this.hasEmissionTextureTransform=!1,this.hasNormalTextureTransform=!1,this.hasOcclusionTextureTransform=!1,this.hasMetallicRoughnessTextureTransform=!1,this.occlusionPass=!1,this.hasVvInstancing=!0,this.useCustomDTRExponentForWater=!1,this.useFillLights=!0}get textureCoordinateType(){return this.hasColorTexture||this.hasMetallicRoughnessTexture||this.emissionSource===c.ZX.Texture||this.hasOcclusionTexture||this.hasNormalTexture?O.I.Default:O.I.None}get objectAndLayerIdColorInstanced(){return this.instanced}get discardInvisibleFragments(){return this.transparent}}(0,C._)([(0,_.W)({count:v.sf.COUNT})],A.prototype,"alphaDiscardMode",void 0),(0,C._)([(0,_.W)({count:d.W.COUNT})],A.prototype,"doubleSidedMode",void 0),(0,C._)([(0,_.W)({count:u.A9.COUNT})],A.prototype,"pbrMode",void 0),(0,C._)([(0,_.W)({count:v.s2.COUNT})],A.prototype,"cullFace",void 0),(0,C._)([(0,_.W)({count:l.W.COUNT})],A.prototype,"normalType",void 0),(0,C._)([(0,_.W)({count:v.it.COUNT})],A.prototype,"customDepthTest",void 0),(0,C._)([(0,_.W)({count:c.ZX.COUNT})],A.prototype,"emissionSource",void 0),(0,C._)([(0,_.W)()],A.prototype,"hasVertexColors",void 0),(0,C._)([(0,_.W)()],A.prototype,"hasSymbolColors",void 0),(0,C._)([(0,_.W)()],A.prototype,"hasVerticalOffset",void 0),(0,C._)([(0,_.W)()],A.prototype,"hasSlicePlane",void 0),(0,C._)([(0,_.W)()],A.prototype,"hasSliceHighlight",void 0),(0,C._)([(0,_.W)()],A.prototype,"hasColorTexture",void 0),(0,C._)([(0,_.W)()],A.prototype,"hasMetallicRoughnessTexture",void 0),(0,C._)([(0,_.W)()],A.prototype,"hasOcclusionTexture",void 0),(0,C._)([(0,_.W)()],A.prototype,"hasNormalTexture",void 0),(0,C._)([(0,_.W)()],A.prototype,"hasScreenSizePerspective",void 0),(0,C._)([(0,_.W)()],A.prototype,"hasVertexTangents",void 0),(0,C._)([(0,_.W)()],A.prototype,"hasOccludees",void 0),(0,C._)([(0,_.W)()],A.prototype,"hasModelTransformation",void 0),(0,C._)([(0,_.W)()],A.prototype,"offsetBackfaces",void 0),(0,C._)([(0,_.W)()],A.prototype,"vvSize",void 0),(0,C._)([(0,_.W)()],A.prototype,"vvColor",void 0),(0,C._)([(0,_.W)()],A.prototype,"receiveShadows",void 0),(0,C._)([(0,_.W)()],A.prototype,"receiveAmbientOcclusion",void 0),(0,C._)([(0,_.W)()],A.prototype,"textureAlphaPremultiplied",void 0),(0,C._)([(0,_.W)()],A.prototype,"instanced",void 0),(0,C._)([(0,_.W)()],A.prototype,"instancedColor",void 0),(0,C._)([(0,_.W)()],A.prototype,"writeDepth",void 0),(0,C._)([(0,_.W)()],A.prototype,"transparent",void 0),(0,C._)([(0,_.W)()],A.prototype,"enableOffset",void 0),(0,C._)([(0,_.W)()],A.prototype,"terrainDepthTest",void 0),(0,C._)([(0,_.W)()],A.prototype,"cullAboveTerrain",void 0),(0,C._)([(0,_.W)()],A.prototype,"snowCover",void 0),(0,C._)([(0,_.W)()],A.prototype,"hasColorTextureTransform",void 0),(0,C._)([(0,_.W)()],A.prototype,"hasEmissionTextureTransform",void 0),(0,C._)([(0,_.W)()],A.prototype,"hasNormalTextureTransform",void 0),(0,C._)([(0,_.W)()],A.prototype,"hasOcclusionTextureTransform",void 0),(0,C._)([(0,_.W)()],A.prototype,"hasMetallicRoughnessTextureTransform",void 0);var I=o(21979),z=o(38716);class H extends S.R5{constructor(e,t,i){super(e,t,i,new I.$(z.R,(()=>o.e(6252).then(o.bind(o,56252))))),this.type="RealisticTreeTechnique"}}class N extends p.im{constructor(e,t){super(e,L),this.materialType="default",this.supportsEdges=!0,this.produces=new Map([[b.N.OPAQUE_MATERIAL,e=>((0,s.iq)(e)||(0,s.PJ)(e))&&!this.parameters.transparent],[b.N.TRANSPARENT_MATERIAL,e=>((0,s.iq)(e)||(0,s.PJ)(e))&&this.parameters.transparent&&this.parameters.writeDepth],[b.N.TRANSPARENT_MATERIAL_WITHOUT_DEPTH,e=>((0,s.XY)(e)||(0,s.PJ)(e))&&this.parameters.transparent&&!this.parameters.writeDepth]]),this._vertexBufferLayout=function(e){const t=(0,a.BP)().vec3f(T.r.POSITION);return e.normalType===l.W.Compressed?t.vec2i16(T.r.NORMALCOMPRESSED,{glNormalized:!0}):t.vec3f(T.r.NORMAL),e.hasVertexTangents&&t.vec4f(T.r.TANGENT),(e.textureId||e.normalTextureId||e.metallicRoughnessTextureId||e.emissiveTextureId||e.occlusionTextureId)&&t.vec2f(T.r.UV0),e.hasVertexColors&&t.vec4u8(T.r.COLOR),e.hasSymbolColors&&t.vec4u8(T.r.SYMBOLCOLOR),(0,m.E)()&&t.vec4u8(T.r.OBJECTANDLAYERIDCOLOR),t}(this.parameters),this._configuration=new A(t.spherical,t.doublePrecisionRequiresObfuscation)}isVisibleForOutput(e){return e!==s.V.Shadow&&e!==s.V.ShadowExcludeHighlight&&e!==s.V.ShadowHighlight||this.parameters.castShadows}get visible(){const e=this.parameters;if(e.layerOpacity<h.Q)return!1;const{hasInstancedColor:t,hasVertexColors:o,hasSymbolColors:i,vvColor:r}=e,n=t||r||i,a="replace"===e.colorMixMode,s=e.opacity>=h.Q;if(o&&n)return a||s;const l=e.externalColor&&e.externalColor[3]>=h.Q;return o?a?l:s:n?a||s:a?l:s}get hasEmissions(){return!!this.parameters.emissiveTextureId||!(0,i.p)(this.parameters.emissiveFactor,r.uY)}getConfiguration(e,t){const o=this.parameters,{treeRendering:i,doubleSided:r,doubleSidedType:n}=o;return this._configuration.output=e,this._configuration.hasNormalTexture=!i&&!!o.normalTextureId,this._configuration.hasColorTexture=!!o.textureId,this._configuration.hasVertexTangents=!i&&o.hasVertexTangents,this._configuration.instanced=o.isInstanced,this._configuration.instancedDoublePrecision=o.instancedDoublePrecision,this._configuration.vvSize=!!o.vvSize,this._configuration.hasVerticalOffset=null!=o.verticalOffset,this._configuration.hasScreenSizePerspective=null!=o.screenSizePerspective,this._configuration.hasSlicePlane=o.hasSlicePlane,this._configuration.hasSliceHighlight=o.hasSliceHighlight,this._configuration.alphaDiscardMode=o.textureAlphaMode,this._configuration.normalType=i?l.W.Attribute:o.normalType,this._configuration.transparent=o.transparent,this._configuration.writeDepth=o.writeDepth,null!=o.customDepthTest&&(this._configuration.customDepthTest=o.customDepthTest),this._configuration.hasOccludees=t.hasOccludees,this._configuration.cullFace=o.hasSlicePlane?v.s2.None:o.cullFace,this._configuration.terrainDepthTest=t.terrainDepthTest,this._configuration.cullAboveTerrain=t.cullAboveTerrain,this._configuration.hasModelTransformation=!i&&null!=o.modelTransformation,this._configuration.hasVertexColors=o.hasVertexColors,this._configuration.hasSymbolColors=o.hasSymbolColors,this._configuration.doubleSidedMode=i?d.W.WindingOrder:r&&"normal"===n?d.W.View:r&&"winding-order"===n?d.W.WindingOrder:d.W.None,this._configuration.instancedColor=o.hasInstancedColor,this._configuration.receiveShadows=o.receiveShadows&&o.receiveShadows,this._configuration.receiveAmbientOcclusion=o.receiveAmbientOcclusion&&null!=t.ssao,this._configuration.vvColor=!!o.vvColor,this._configuration.textureAlphaPremultiplied=!!o.textureAlphaPremultiplied,this._configuration.pbrMode=o.usePBR?o.isSchematic?u.A9.Schematic:u.A9.Normal:u.A9.Disabled,this._configuration.hasMetallicRoughnessTexture=!i&&!!o.metallicRoughnessTextureId,this._configuration.emissionSource=i?c.ZX.None:null!=o.emissiveTextureId?c.ZX.Texture:o.usePBR?c.ZX.Value:c.ZX.None,this._configuration.hasOcclusionTexture=!i&&!!o.occlusionTextureId,this._configuration.offsetBackfaces=!(!o.transparent||!o.offsetTransparentBackfaces),this._configuration.oitPass=t.oitPass,this._configuration.enableOffset=t.camera.relativeElevation<g.xt,this._configuration.snowCover=function(e){return null!=e.weather&&e.weatherVisible&&"snowy"===e.weather.type&&"enabled"===e.weather.snowCover}(t),this._configuration.hasColorTextureTransform=!!o.colorTextureTransformMatrix,this._configuration.hasNormalTextureTransform=!!o.normalTextureTransformMatrix,this._configuration.hasEmissionTextureTransform=!!o.emissiveTextureTransformMatrix,this._configuration.hasOcclusionTextureTransform=!!o.occlusionTextureTransformMatrix,this._configuration.hasMetallicRoughnessTextureTransform=!!o.metallicRoughnessTextureTransformMatrix,this._configuration}intersect(e,t,o,r,a,s){if(null!=this.parameters.verticalOffset){const e=o.camera;(0,i.i)(j,t[12],t[13],t[14]);let s=null;switch(o.viewingMode){case n.RT.Global:s=(0,i.n)(F,j);break;case n.RT.Local:s=(0,i.c)(F,D)}let l=0;const c=(0,i.d)(W,j,e.eye),d=(0,i.l)(c),u=(0,i.h)(c,c,1/d);let h=null;this.parameters.screenSizePerspective&&(h=(0,i.f)(s,u)),l+=(0,y.kE)(e,d,this.parameters.verticalOffset,h??0,this.parameters.screenSizePerspective),(0,i.h)(s,s,l),(0,i.q)(B,s,o.transform.inverseRotation),r=(0,i.d)(P,r,B),a=(0,i.d)(R,a,B)}(0,x.Uy)(e,o,r,a,(0,M.ou)(o.verticalOffset),s)}createGLMaterial(e){return new G(e)}createBufferWriter(){return new w.Z(this._vertexBufferLayout)}}class G extends f.m8{constructor(e){super({...e,...e.material.parameters})}beginSlot(e){this._material.setParameters({receiveShadows:e.shadowMap.enabled});const t=this._material.parameters;this.updateTexture(t.textureId);const o=e.camera.viewInverseTransposeMatrix;return(0,i.i)(t.origin,o[3],o[7],o[11]),this._material.setParameters(this.textureBindParameters),this.acquireTechnique(t.treeRendering?H:S.R5,e)}}class L extends S.uD{constructor(){super(...arguments),this.initTextureTransparent=!1,this.treeRendering=!1,this.hasVertexTangents=!1}}const P=(0,r.vt)(),R=(0,r.vt)(),D=(0,r.fA)(0,0,1),F=(0,r.vt)(),B=(0,r.vt)(),j=(0,r.vt)(),W=(0,r.vt)()},83244:function(e,t,o){o.d(t,{R5:function(){return w},V:function(){return M},uD:function(){return T}});var i=o(19913),r=o(76982),n=o(77788),a=o(3525),s=o(83143),l=o(78546),c=o(21979),d=o(50837),u=o(10875),h=o(31272),m=o(14692),v=o(8445),f=o(28116),p=o(40327),g=o(12668),x=o(68716),b=o(15651);class T extends s.Zo{constructor(){super(...arguments),this.isSchematic=!1,this.usePBR=!1,this.mrrFactors=p.mb,this.hasVertexColors=!1,this.hasSymbolColors=!1,this.doubleSided=!1,this.doubleSidedType="normal",this.cullFace=u.s2.Back,this.isInstanced=!1,this.hasInstancedColor=!1,this.emissiveFactor=i.uY,this.instancedDoublePrecision=!1,this.normalType=a.W.Attribute,this.receiveShadows=!0,this.receiveAmbientOcclusion=!0,this.castShadows=!0,this.ambient=(0,i.CN)(.2,.2,.2),this.diffuse=(0,i.CN)(.8,.8,.8),this.externalColor=(0,r.fA)(1,1,1,1),this.colorMixMode="multiply",this.opacity=1,this.layerOpacity=1,this.origin=(0,i.vt)(),this.hasSlicePlane=!1,this.hasSliceHighlight=!0,this.offsetTransparentBackfaces=!1,this.vvSize=null,this.vvColor=null,this.vvOpacity=null,this.vvSymbolAnchor=null,this.vvSymbolRotationMatrix=null,this.modelTransformation=null,this.transparent=!1,this.writeDepth=!0,this.customDepthTest=u.it.Less,this.textureAlphaMode=u.sf.Blend,this.textureAlphaCutoff=l.Q,this.textureAlphaPremultiplied=!1,this.renderOccluded=h.m$.Occlude,this.isDecoration=!1}}class M extends s.gy{constructor(){super(...arguments),this.origin=(0,i.vt)(),this.slicePlaneLocalOrigin=this.origin}}class w extends d.w{constructor(e,t,i,r=new c.$(g.D,(()=>o.e(1084).then(o.bind(o,41084))))){super(e,t,r,i),this.type="DefaultMaterialTechnique"}_makePipeline(e,t){const{oitPass:o,output:i,transparent:r,cullFace:a,customDepthTest:s,hasOccludees:l,enableOffset:c}=e,d=o===m.Y.NONE,u=o===m.Y.FrontFace;return(0,b.Ey)({blending:(0,n.RN)(i)&&r?(0,v.Yf)(o):null,culling:S(e)?(0,b.Xt)(a):null,depthTest:{func:(0,v.K_)(o,y(s))},depthWrite:(0,v.z5)(e),drawBuffers:i===n.V.Depth?{buffers:[x.Hr.NONE]}:(0,v.m6)(o,i),colorWrite:b.kn,stencilWrite:l?f.v0:null,stencilTest:l?t?f.a9:f.qh:null,polygonOffset:d||u?null:(0,v.aB)(c)})}initializePipeline(e){return this._occludeePipelineState=this._makePipeline(e,!0),this._makePipeline(e,!1)}getPipeline(e){return e?this._occludeePipelineState:super.getPipeline()}}function y(e){return e===u.it.Lequal?x.MT.LEQUAL:x.MT.LESS}function S(e){return e.cullFace!==u.s2.None||!e.hasSlicePlane&&!e.transparent&&!e.doubleSidedMode}}}]);
//# sourceMappingURL=3468.09a4aa0a98fa6f03639a.js.map