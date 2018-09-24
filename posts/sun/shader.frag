#ifdef GL_ES
precision mediump float;
#endif
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision highp float;
#endif

#define pi 3.14159265359
#define orig vec3(uv.x, 0., uv.y)

uniform vec2 u_resolution;
uniform float u_time;

vec3 hsb2rgb( in vec3 c){
 vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0), 6.0)-3.0)-1.0, 0.0, 1.0 );
 rgb = rgb*rgb*(3.0-2.0*rgb);  return c.z * mix(vec3(1.0), rgb, c.y);
}

vec3 rect(vec2 uv, vec2 c, vec2 s, vec2 off){
  float p = max(smoothstep(c.x+s.x,c.x+s.x+off.x, uv.x),
                smoothstep(c.y+s.y,c.y+s.y+off.y,uv.y));
  float q = max(smoothstep(c.x-s.x,c.x-s.x-off.x, uv.x),
                smoothstep(c.y-s.y,c.y-s.y-off.y,uv.y));
  return vec3(1.-max(p,q));
}

float map(float x, float a1, float a2, float b1, float b2){
  return b1 + (b2-b1) * (x-a1) / (a2-a1);
}

vec3 ellipse(vec2 uv, vec2 c, float r){
  float d = distance(uv,c);
  return vec3(1.-smoothstep(r, r+0.08, d));
}

vec3 shape(vec2 st, int N, float scl, float smth, float rt){
  // Remap the space to -1. to 1.
  st = st *2.-1.;
  // Angle and radius from the current pixel
  float a = atan(st.x,st.y)+pi+rt;
  float r = pi*2./float(N);
  // Shaping function that modulate the distance
  float d = cos(floor(.5+a/r)*r-a)*length(st*2.)*scl;
  return vec3(1.0-smoothstep(r,r+smth,d));
}

 void main(void) {
   float t = u_time;
   vec2 uv = gl_FragCoord.xy / u_resolution.xy;
   vec3 topColor = vec3(0.65, 0.03, 0.03);
   vec3 bottomColor = vec3(0.0, 0.02, 0.33);
   vec3 color = vec3(mix(bottomColor, topColor, uv.y));
   vec2 pos = vec2(0.5)-uv;
   float r = length(pos)*1.0;
   float a = atan(pos.y,pos.x);
   float f = cos(a*20.+t);
   vec3 seaRect =  rect(uv, vec2(.5,.0), vec2(.5, .30),vec2(.08));
   float dcx = abs(.5-uv.x);

   //sun shine
   color.rg +=  0.8*shape(uv, 5, 3.5, 5.5,.15*t).rg;
   //black hole inside
   color.rgb += -1.5*shape(uv, 5, 3.2 , 0.9,.15*t).rgb;
   //rays all around
   color.rg +=  max(.0,.15-smoothstep(f,f+7.+sin(t),r));
   //sea and sun rg loss with distance from middle
   color.rg += -1.2*dcx*1.2*seaRect.rg;
   color += .05;
   gl_FragColor = vec4(color,1.);
 }
