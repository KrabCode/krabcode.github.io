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

//  Function from Iigo Quiles
//  https://www.shadertoy.com/view/MsS3Wc
vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix(vec3(1.0), rgb, c.y);
}


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
	return ellipse(uv,c,r.x) && !ellipse(uv,vec2(c.x+r.x*2.*sin(t), c.y), r.x);
}

void main(void) {
  float pi = 3.14159;
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float t = u_time*2.;
  vec2 ec = vec2(.5+.4*sin(t),.5+.4*cos(t));
  vec2 rc = vec2(.5+.4*sin(float(t)+pi), .5+.4*cos(float(t)+pi));
  vec2 fc = vec2(.5, 0.);
  vec2 s = vec2(0.080,-0.010);
  vec3 day = vec3(0.353,0.409,0.975);
  vec3 nite = vec3(0.114,0.132,0.315);
  vec3 clr = mix(day, nite, sin(pi*-.5+t));

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
      clr = vec3(0.521,0.975,0.310);
  }
  gl_FragColor = vec4(clr,1.0);
}
