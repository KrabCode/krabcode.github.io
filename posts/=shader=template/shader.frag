#ifdef GL_ES
precision mediump float;
#endif
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision highp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define pi 3.14159265359

vec3 hsb2rgb( in vec3 c){
 vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0), 6.0)-3.0)-1.0, 0.0, 1.0 );
 rgb = rgb*rgb*(3.0-2.0*rgb);  return c.z * mix(vec3(1.0), rgb, c.y);
}

bool rect(vec2 uv, vec2 c, vec2 s){
  return (uv.x > c.x-s.x && uv.x < c.x+s.x && uv.y < c.y+s.y && uv.y > c.y-s.y);
}

float map(float x, float a1, float a2, float b1, float b2){
  return b1 + (b2-b1) * (x-a1) / (a2-a1);
}

vec3 ellipse(vec2 uv, vec2 c, float r){
  float d = distance(uv,c);
  return vec3(1.-smoothstep(r, r+0.05, d));
}

vec3 shape(vec2 st, int N, float scl, float smth){
  // Remap the space to -1. to 1.
  st = st *2.-1.;
  // Angle and radius from the current pixel
  float a = atan(st.x,st.y)+pi;
  float r = pi*2./float(N);
  // Shaping function that modulate the distance
  float d = cos(floor(.5+a/r)*r-a)*length(st*2.)*scl;
  return vec3(1.0-smoothstep(r,r+smth,d));
}

 void main(void) {
   float t = u_time;
   vec2 uv = gl_FragCoord.xy / u_resolution.xy;
   vec2 c = vec2(.5,.5);
   float d = distance(uv,c);
   vec3 color = vec3(uv.x, 0., uv.y);
   vec2 pos = vec2(0.5)-uv;

   float r = length(pos)*1.0;
   float a = atan(pos.y,pos.x);

   float f = cos(a*20.+u_time);
    // f = abs(cos(a*3.));
    // f = abs(cos(a*2.5))*.5+.3;
    // f = abs(cos(a*12.)*sin(a*3.))*.8+.1;
    // f = smoothstep(-.5,1., cos(a*10.))*0.2+0.5;

   int N = 5;
   float scl = 5.;

   //color.rg += max(.0,.2-smoothstep(f,f+5.2,r));
   color.rg += shape(uv, N, scl, 5.2+.4*(1.+.5*sin(t))).rg*15.5;
   color.rg -= shape(uv, N, scl, 5.+.4*(1.+.5*sin(t))).rg*15.5;

   gl_FragColor = vec4(color,1.);
 }
