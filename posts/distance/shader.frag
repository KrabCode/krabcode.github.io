precision mediump float;
uniform vec2 u_resolution;
uniform float u_time;

vec3 hsb2rgb( in vec3 c ){
 vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0), 6.0)-3.0)-1.0, 0.0, 1.0 );
 rgb = rgb*rgb*(3.0-2.0*rgb);  return c.z * mix(vec3(1.0), rgb, c.y);
}

 void main(void) {
   vec2 uv = gl_FragCoord.xy / u_resolution.xy;
   vec2 c = vec2(.5,.5);
   float d = distance(uv,c)*150.;
   d = mod(d*d+(u_time/2.),1.);
   vec3 color = vec3(d,1.,abs(.5-d)*2.);
   gl_FragColor = vec4(hsb2rgb(color),1.);
 }
