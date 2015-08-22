precision highp float;

uniform vec3      iResolution;
uniform sampler2D iChannel;

void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
	fragColor = texture2D(iChannel, fragCoord.xy / iResolution.xy);
}

void main( void ){
    vec4 color = vec4(0.0,0.0,0.0,1.0);
    mainImage( color, gl_FragCoord.xy );
    color.w = 1.0;
    gl_FragColor = color;
}