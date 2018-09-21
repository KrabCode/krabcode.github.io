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

#define pi 3.14159
#define daysky vec3(0.353,0.409,0.975)
#define nitesky vec3(0.114,0.132,0.315)
#define dayground vec3(0.521,0.975,0.310)
#define niteground vec3(0.75, 0.55, 0.09)

uniform vec2 u_resolution;
uniform float u_time;

bool rect(vec2 uv, vec2 c, vec2 s){
  return (uv.x > c.x-s.x && uv.x < c.x+s.x
    	 && uv.y < c.y+s.y && uv.y > c.y-s.y);
}

bool ellipse(vec2 uv, vec2 c, float r){
	return distance(uv,c)<r;
}

bool moon(vec2 uv, vec2 c, vec2 r, float t){
	return ellipse(uv,c,r.x)
	&& !ellipse(uv,vec2(c.x+r.x*2.*sin(1.+t/6.), c.y), r.x);
}

bool stars(vec2 uv, float t){
	return ellipse(uv, vec2(.2,.84),.005);
}

void main(void) {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float t = u_time*.8;
  vec2 ec = vec2(.5+.4*sin(t),.5+.4*cos(t));
  vec2 rc = vec2(.5+.4*sin(t+pi), .5+.4*cos(t+pi));
  vec2 fc = vec2(.5, 0.);
  vec2 s = vec2(0.08,.0);
  vec3 clr = mix(daysky, nitesky, sin(pi*-.5+t));

  if(ellipse(uv, ec, s.x)){
    clr = vec3(1.000,0.887,0.116);
  }
  if(moon(uv, rc, s, t)){
  	clr = vec3(0.395,0.379,0.455);
    if(ellipse(uv, vec2(rc.x-.02, rc.y-.03), s.x/4.)){
        clr = vec3(0.239,0.229,0.275);
    }
    if(ellipse(uv, vec2(rc.x+.03, rc.y+.03), s.x/6.)){
    	clr = vec3(0.317,0.304,0.365);
    }
    if(ellipse(uv, vec2(rc.x+.045, rc.y-.04), s.x/7.)){
    	clr = vec3(0.287,0.28,0.33);
    }
    if(ellipse(uv, vec2(rc.x-.05, rc.y+.06), s.x/3.)){
    	clr = vec3(0.307,0.3,0.345);
    }
  }
  if(rect(uv, fc, vec2(0.690,0.3))){
      clr = mix(dayground, niteground, sin(pi*-.5+t));
  }
  gl_FragColor = vec4(clr,1.);
}
