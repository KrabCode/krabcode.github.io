// Author: Krab
// Title: Day'n'Nite

#ifdef GL_ES
precision mediump float;
#endif
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

bool rect(vec2 uv, vec2 c, vec2 s){
	if(uv.x > c.x-s.x
  	 && uv.x < c.x+s.x
  	 && uv.y < c.y+s.y
  	 && uv.y > c.y-s.y ){
  	return true;
  }
  return false;
}

bool ellipse(vec2 uv, vec2 c, float r){
	return distance(uv,c)<r;
}

bool moon(vec2 uv, vec2 c, vec2 r, float t){
	return ellipse(uv,c,r.x) && !ellipse(uv,vec2(c.x+r.x*2.*sin(t/26.), c.y), r.x);
}

void main(void) {
  float pi = 3.14159;
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float t = u_time*2.;
  vec2 ec = vec2(.5+.4*sin(t),.5+.4*cos(t));
  vec2 rc = vec2(.5+.4*sin(float(t)+pi), .5+.4*cos(float(t)+pi));
  vec2 fc = vec2(.5, 0.);
  vec2 s = vec2(0.080,-0.010);
  vec3 daysky = vec3(0.353,0.409,0.975);
  vec3 nitesky = vec3(0.114,0.132,0.315);
  vec3 dayground = vec3(0.521,0.975,0.310);
  vec3 niteground = vec3(0.75, 0.55, 0.09));
  vec3 clr = mix(daysky, nitesky, sin(pi*-.5+t));
  if(ellipse(uv, ec, s.x)){
    clr = vec3(1.000,0.887,0.116);
  }
  if(moon(uv, rc, s, t)){
  	clr = vec3(0.395,0.379,0.455);
    if(ellipse(uv, vec2(rc.x-.02, rc.y-.03), s.x/4.)){
        clr = vec3(0.239,0.229,0.275);
    }
    if(ellipse(uv, vec2(rc.x+.03, rc.y+.03), s.x/4.)){
    	clr = vec3(0.317,0.304,0.365);
    }
  }
  if(rect(uv, fc, vec2(0.690,0.270))){
      clr = mix(dayground, niteground, sin(pi*-.5+t));
  }
  gl_FragColor = vec4(clr,1.0);
}
