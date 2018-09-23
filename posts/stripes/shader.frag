#ifdef GL_ES
precision mediump float;
#endif
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision highp float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

#define pi 3.14159265359
#define inA vec3(0.0, 0.0, 0.0)
#define inB vec3(1.0, 1.0, 1.0)

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

void main(void) {
 float t = u_time;
 vec2 uv = gl_FragCoord.xy / u_resolution.xy;
// uv -= 1.;
 uv*= 1.;
 uv = fract(uv);
 vec2 c = vec2(.5,.5);

 float d = abs(.5-uv.x) + abs(.5-uv.y); //distance(uv,c);
 float r = distance(uv,c);

 vec3 color = vec3(0.);
 if(d < .5){
 	d*= 2.;
   float spd = 5.;
   float inR = .25;
   if(r<inR){
     color = vec3(mix(inA, inB, 1.-map(mod(d+t/spd,.1), .0, .08, 0., 1.)));
   }
   if(r>=inR){
     color = vec3(mix(inA, inB, 1.-map(mod(d-t/spd,.1), .0, .08, 0., 1.)));
   }
 }
 gl_FragColor = vec4(color,1.);
}
