/*jshint esversion: 6 */

var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d'); //referenece for canvas.getContext

var mouse = {
	x: undefined,
	y: undefined
};

var maxRadius = 40;
var minRadius = 2;

var colourArray = [
	'#012E40',
	'#024959',
	'#026773',
	'#3CA6A6',
	'#F2E3D5',
	];

window.addEventListener('mousemove', 
	function(event){
		mouse.x = event.x;
		mouse.y = event.y;
});

window.addEventListener('resize', 
	function(event){
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		init();
	});

function Circle(x, y, dx, dy, radius) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.colour = colourArray[Math.floor(Math.random() * colourArray.length)];
	this.minRadius = radius;

	this.draw = function(){
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.colour;
		c.fill();
	};

	this.update = function(){
		if(this.x + this.radius > innerWidth || this.x - this.radius < 0 ){
			this.dx = -this.dx;
		}
		if(this.y + this.radius > innerHeight || this.y - this.radius < 0 ){
			this.dy = -this.dy;
		}
		this.x += this.dx;
		this.y += this.dy;

		//--interactivity--// 

		if(mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
			mouse.y - this.y < 50 && mouse.y - this.y > -50){
			
			if(this.radius < maxRadius){
				this.radius += 1;
			}

			
		}
		else if(this.radius > this.minRadius){
			this.radius -= 1;
		}

		this.draw();
	};
}




var circleArray = [];

function init(){
	circleArray = [];

	for(let i =0; i< 800; i++){
		let radius = Math.random() * 3 + 1;
		let x = Math.random() * (innerWidth - radius * 2) + radius;
		let y = Math.random() * (innerHeight - radius * 2) + radius;
		let dx = (Math.random() - 0.5) * 2;
		let dy = (Math.random() - 0.5) * 2;
		
		circleArray.push(new Circle(x, y, dx, dy, radius));
	}
}



function animate(){
	requestAnimationFrame(animate);
	c.clearRect(0,0, innerWidth, innerHeight);

	for(let i = 0; i< circleArray.length; i++){
		circleArray[i].update();
	}

}
init();
animate();