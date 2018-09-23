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

bool ellipse(vec2 uv, vec2 c, float r){
	return distance(uv,c)<r;
}

bool line(vec2 a, vec2 b){
  return false;
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
   vec3 color = (vec3(uv.xy,1.));
   vec2 pos = vec2(0.5)-uv;
   float r = length(pos)*5.0;
   float a = atan(pos.y,pos.x);
   color.bg += sin(a+u_time);
   float f = abs(cos(pi/2.+a*2.))*.5+.3;
   color += vec3(.5-smoothstep(f,f+.5,r));
   gl_FragColor = vec4(color,1.);
}
