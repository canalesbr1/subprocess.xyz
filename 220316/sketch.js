let shader1,shader2;
let tex0,tex1;
let o = 25;
let o1 = .01;

function preload(){
	shader1 = loadShader("shader1.vert","shader1.frag");
	shader2 = loadShader("shader1.vert","shader2.frag");
}

function setup() {
	createCanvas(600, 600,WEBGL);
	pixelDensity(1);
	noStroke();

	tex0 = createGraphics(width,height);
	tex1 = createGraphics(width,height,WEBGL);

	tex0.noStroke();
	//tex0.noFill();
	tex1.noStroke();
	tex0.background(240);
}

function draw() {

	shader1.setUniform("u_rez",[width,height]);
	shader2.setUniform("u_rez",[width,height]);
	shader1.setUniform("tex0",tex0);
	shader2.setUniform("mytime",frameCount*.01);

	let r = map(sin(frameCount*(.1)),-1,1,0,255);
	let g = map(sin(frameCount*(.1+o1)+o),-1,1,0,255);
	let b = map(sin(frameCount*(.1+o1*2)+o*2),-1,1,0,255);

	if(mouseIsPressed){
		tex0.fill(r,g,b);
		tex0.ellipse(mouseX,mouseY,15,15);
	}
	//tex0.shader(shader1);
	tex1.shader(shader1);
	tex1.rect(0,0,width,height);
	tex0.image(tex1,0,0);
	//shader(shader2);

	shader2.setUniform("tex1",tex1);
	shader(shader2);
	rect(0,0,width,height);
	//image(tex0,width*-.5,height*-.5);

	//tex0.clear();
	//tex0 = tex1;
	//tex0.image(tex1,width,height);

	//image(tex1,-width*.5,-height*.5);




	//tex0 = get(0,0,width,height);
	//tex0.background(255,0,0);
	//image(tex0,-width*.5,-height*.5);
	//ellipse(mouseX,mouseY,25,25);
}
