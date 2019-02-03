var canvas = document.querySelector(".ex");
canvas.width = window.innerWidth - 5;
canvas.height = window.innerHeight - 5;

var c = canvas.getContext('2d');
var number = 100; //number of particles

var temCircle;

var mouse = {
  x: undefined,
  y: undefined
}
window.addEventListener('mousemove', function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
  // console.log(mouse);
});

// var x = Math.random() * innerWidth; //starting x-coordinate
// var y = Math.random() * innerHeight; //starting y-coordinate
// var r = 30; //radius of the circle
// var dx = (Math.random() - 0.5) * 15 //speed of x-coordinate
// var dy = (Math.random() - 0.5) * 15 //speed of y-coordinate

// randomize the colour of
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

//multiple circle
function Circle(x, y, dx, dy, r, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.r = r;
  this.color = color;

  this.draw = function() {
    c.fillStyle = this.color; //"#3370d4";
    c.beginPath();
    c.strokeStyle = this.color;
    c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    c.stroke();
    c.closePath();
    c.fill();
  }

  this.update = function() {
    if (((this.x + this.r) > innerWidth) || ((this.x - this.r) < 0)) {
      this.dx = this.dx * -1;
    }
    if (((this.y + this.r) > innerHeight) || ((this.y - this.r) < 0)) {
      this.dy = this.dy * -1;
    }
    //
    //
    temCircle = new Circle(mouse.x, mouse.y, 0, Math.PI * 2, 110, "black");
    temCircle.draw();
    if ((temCircle.x+temCircle.r - this.x) <50 && (temCircle.x+temCircle.r - this.x) >0)
     {
       //console.log(mouse.x,mouse.y);
       this.dx = this.dx * -1;
     }
       if ((temCircle.y+temCircle.r - this.y) <50 && (temCircle.y+temCircle.r - this.y) >0) {
         this.dy = this.dy * -1;
       }
  //   var eqn1 = (Math.pow(temCircle.x, 2) + Math.pow(temCircle.y, 2)) - Math.pow(temCircle.r, 2);
  //
    var eqn2 = (Math.pow(this.x, 2) + Math.pow(this.y, 2)) - Math.pow(this.r, 2);
  //   if(eqn1 == eqn2)
  //   {
  //     this.dx = this.dx * -1;
  // this.dy = this.dy * -1;
  //   }
    // //console.log(eqn1);
    //
    // console.log("PTS",eqn1 - eqn2);
    // if (eqn1 - eqn2 == 1000) {
    //   console.log("sadsa");
    // }



    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}
//var circle = new Circle(200, 200, 3, 3, 30);
var circleArray = [];
for (var i = 0; i < number; i++) {

  var x = Math.random() * innerWidth; //starting x-coordinate
  var y = Math.random() * innerHeight; //starting y-coordinate
  var r = 10; //radius of the circle
  var dx = (Math.random() - 0.5) * 10 //speed of x-coordinate
  var dy = (Math.random() - 0.5) * 10 //speed of y-coordinate
  var color = getRandomColor();
  circleArray.push(new Circle(x, y, dx, dy, r, color));
}
//console.log(circleArray);

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}
animate();
