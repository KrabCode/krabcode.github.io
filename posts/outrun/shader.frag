//Author: Krab
//Title: Outrun

#ifdef GL_ES
precision mediump float;
#endif
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision highp float;
#endif

#define pi 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define bgA vec3(0.1, 0.1, 0.8)
#define bgB vec3(0.93, 0.32, 0.06)
#define sunA vec3(0.89, 0.69, 0.11)
#define sunB vec3(1.0, 0.0, 0.0)
#define seaA vec3(0.22, 0.24, 0.76)
#define seaB vec3(0.77, 0.18, 0.69)
#define islA vec3(0.22, 0.24, 0.76)
#define islB vec3(0.77, 0.18, 0.69)

bool rect(vec2 uv, vec2 c, vec2 s){
  return (uv.x > c.x-s.x && uv.x < c.x+s.x && uv.y < c.y+s.y && uv.y > c.y-s.y);
}

float map(float x, float a1, float a2, float b1, float b2){
  return b1 + (b2-b1) * (x-a1) / (a2-a1);
}

bool ellipse(vec2 uv, vec2 c, float r){
	return distance(uv,c)<r;
}

vec3 hsb2rgb( in vec3 c ){
 vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0), 6.0)-3.0)-1.0, 0.0, 1.0 );
 rgb = rgb*rgb*(3.0-2.0*rgb);  return c.z * mix(vec3(1.0), rgb, c.y);
}

bool sea(vec2 uv){
  return rect(uv, vec2(.5, .0), vec2(.5, .5));
}

bool island(vec2 uv){
  return false;
}

void main(void) {
 float t = u_time;
 vec2 uv = gl_FragCoord.xy / u_resolution.xy;
 vec2 sc = vec2(.7,.7);
 float d = distance(uv,sc);
 float r = .27;
 vec3 color = mix(bgA, bgB, 1.-uv.y);
 if(ellipse(uv, sc, r)){
   if(mod(.5+.5*sin(t*0.05)+uv.y, .1)>.02){
     float p = .5+.5*sin((1.1-uv.y));     
     color = mix(sunB,sunA, p);
   }
}

if(sea(uv)){
  color = mix(seaA, seaB, uv.y);
}


if(island(uv)){
  //float islandP = vec3(0.87, 0.94, 0.09);
  //mix(islandA, islandB, islandP);
  color = vec3(0.87, 0.94, 0.09);
}

 gl_FragColor = vec4(color,1.);
}
