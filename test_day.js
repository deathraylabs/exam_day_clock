// JavaScript Document

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
var end_hour = 1.5;   // time exam ends
var end_minute = 30; //minute exam ends

ctx.translate(radius, radius);
radius = radius * 0.90;
setInterval(drawClock, 1000);

function drawClock() {
  drawIndicators(ctx, radius, end_hour);  
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(0, 0, radius*0.95, 0, 2*Math.PI);
  ctx.fillStyle = 'rgba(255,255,255,1)';
  ctx.fill();
  ctx.closePath();
  ctx.restore();

  // ctx.beginPath();
  // ctx.arc(0, 0, radius, 0, 2*Math.PI);
  // ctx.fillStyle = 'rgba(255,255,255,0)';
  // ctx.fill();
  // grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
  // grad.addColorStop(0, '#333');
  // grad.addColorStop(0.5, 'white');
  // grad.addColorStop(1, '#333');
  // ctx.strokeStyle = grad;
  // ctx.lineWidth = radius*0.05;
  // ctx.stroke();
  // ctx.beginPath();
  // ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
  // ctx.fillStyle = '#333';
  // ctx.fill();
}

function drawNumbers(ctx, radius) {
  var ang;
  var num;
  var num_radial = 0.83;
  ctx.font = radius*0.15 + "px arial";
  ctx.textBaseline="middle";
  ctx.textAlign="center";
  for(num = 1; num < 13; num++){
    ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius*num_radial);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius*num_radial);
    ctx.rotate(-ang);
  }
}

function drawTime(ctx, radius){
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
	
    hour=hour%12;
    hour=(hour*Math.PI/6)+
    (minute*Math.PI/(6*60))+
    (second*Math.PI/(360*60));
    drawHand(ctx, hour, radius*0.5, radius*0.07);
    //minute
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.8, radius*0.07);
    // second
    second=(second*Math.PI/30);
    drawHand(ctx, second, radius*0.9, radius*0.02);
	// draw time remaining
//	drawProgress(ctx, radius, remaining);
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}


// this function is used to draw the indicator bezel
function drawIndicators(ctx, radius, end_hour) {
    var now = new Date();
	var hour = now.getHours();
	
	// still have the whole hour
	if (end_hour - hour === 2) {
		ctx.save();
		ctx.beginPath();
	    ctx.arc(0, 0, radius, 0, 2*Math.PI);
	    ctx.fillStyle = 'green';
	    ctx.fill();
		ctx.restore();
	} else if (end_hour - hour === 1) {
		ctx.save();
		ctx.beginPath();
		ctx.moveTo(0,0);
	    ctx.arc(0, 0, radius, -Math.PI/2, Math.PI, false);
		ctx.closePath();
	    ctx.fillStyle = '#88d8b0';
	    ctx.fill();
		ctx.restore();
		
		ctx.save();
		ctx.beginPath();
		ctx.moveTo(0,0);
	    ctx.arc(0, 0, radius, -Math.PI/2, Math.PI, true);
		ctx.closePath();
	    ctx.fillStyle = '#ffcc5c';
	    ctx.fill();
		ctx.restore();
		
		ctx.save();
		ctx.beginPath();
		ctx.moveTo(0,0);
	    ctx.arc(0, 0, radius, -Math.PI/2, -2*Math.PI/3, true);
		ctx.closePath();
	    ctx.fillStyle = '#ff6f69';
	    ctx.fill();
		ctx.restore();
	} else {
		ctx.beginPath();
	    ctx.arc(0, 0, radius, 0, 2*Math.PI);
	    ctx.fillStyle = 'blue';
	    ctx.fill();
	}
	

	//     ctx.beginPath();
	// ctx.lineWidth = radius*0.1;
	// ctx.lineCap = "square";
	//     ctx.arc(0, 0, radius, -Math.PI/2, -2*Math.PI*remaining,true);
	//     //ctx.fillStyle = '#f00';
	// ctx.strokeStyle = '#090';
	//     ctx.stroke();
}