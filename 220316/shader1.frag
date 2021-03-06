#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_rez;
uniform sampler2D tex0;
//uniform float mytime;
//varying vec2 vTexCoord; //without uniform using TexCoord

void main(){
  vec2 coord = gl_FragCoord.xy;
  vec2 st = coord.xy/u_rez.xy;
  st.y = 1.0 - st.y;

  vec2 dir = vec2(0.0,0.0);
  vec4 col = texture2D(tex0,st);
  float cnt = 0.0;

  //float sin1 = sin(mytime);

  for(int i=-3;i<=3;i++){
    for(int j=-3;j<=3;j++){
      vec2 off = vec2(i,j)/u_rez.xy;
      vec2 ref = st.xy + off.xy;
      if(st.xy != ref.xy){
        vec4 mycol = texture2D(tex0,ref);
        float val = col.z-mycol.z;
        float val1 = mycol.z-col.z;
        //float val2 = mix(val1,val2,sin1);
        off = off * val;
        dir = dir + off;
        cnt = cnt +1.0;
      }
    }
  }

  dir = dir/cnt;
  //vec3 dircross = cross(vec3(dir.x,0.0,dir.y),vec3(0.0,1.0,0.0));
  //dir = vec2(dircross.x,dircross.z)+dir;
  vec2 tar = st.xy + dir.xy;
  vec4 tex = texture2D(tex0,tar);

  gl_FragColor = tex;
}
