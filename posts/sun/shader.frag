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

bool rect(vec2 uv, vec2 c, vec2 s){
  return (uv.x > c.x-s.x && uv.x < c.x+s.x && uv.y < c.y+s.y && uv.y > c.y-s.y);
}

float map(float x, float a1, float a2, float b1, float b2){
  return b1 + (b2-b1) * (x-a1) / (a2-a1);
}

float ellipse(vec2 uv, vec2 c, float r){
  float d = distance(uv,c);
  return 1.-smoothstep(r, r+0.05, d);
}

vec3 hsb2rgb( in vec3 c ){
 vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0), 6.0)-3.0)-1.0, 0.0, 1.0 );
 rgb = rgb*rgb*(3.0-2.0*rgb);  return c.z * mix(vec3(1.0), rgb, c.y);
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

   float f = cos(a*24.+u_time);
    // f = abs(cos(a*3.));
    // f = abs(cos(a*2.5))*.5+.3;
    // f = abs(cos(a*12.)*sin(a*3.))*.8+.1;
    // f = smoothstep(-.5,1., cos(a*10.))*0.2+0.5;

   color.rg += max(.0,.2-smoothstep(f,f+3.,r));
   color.rg += ellipse(uv, c, .2);

   gl_FragColor = vec4(color,1.);
 }
