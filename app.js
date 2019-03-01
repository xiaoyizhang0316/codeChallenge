const xMax = 5;
const yMax = 5;
const xMin = -1;
const yMin = -1;
let currentX;
let currentY;
let direction;
let setPlace = false;
let directionArray = ['EAST','WEST','NORTH','SOUTH'];

var stdin = process.openStdin();

console.log(`
*******************************
Welcome to Pacman simulator
*******************************
valid command (case-insensitive): 

PLACE X,Y,F

MOVE

LEFT

RIGHT

REPORT

Input your command:`);

stdin.addListener("data", (input) => {
    try{
    	handleInput(input.toString().trim().toUpperCase()); 
    }
    catch(e) {
    	console.log('Wrong format of input.')
    }
    console.log('Input your command:')
  });


handleInput = (input) => {
	switch(input.split(' ')[0]){
		case 'PLACE' : place(input);
			break;
		case 'MOVE' : move(direction);
			break;
		case 'LEFT' : changeDirection('LEFT');
			break;
		case 'RIGHT' :changeDirection('RIGHT');
			 break;
		case 'REPORT' : report();
			 break;
		default: console.log('wrong command, please input again.');
	}
	
}

place = (input) => {
	let s = input.split(' ')[1].split(',');
	if (s.length != 3 || !directionArray.includes(s[2]))
		console.log('wrong syntax of initial place, please input again');
	else{
		setPosition(s[0],s[1],s[2]);
		setPlace = true;
	}
}

move = (d) => {
	if(setPlace){
		switch(d){
			case 'SOUTH' : setPosition(currentX,parseInt(currentY) - 1,d);
				break;
			case 'NORTH' : setPosition(currentX,parseInt(currentY) + 1,d);
				break;
			case 'EAST' : setPosition(parseInt(currentX) + 1,currentY,d);
				break;
			case 'WEST' : setPosition(parseInt(currentX) - 1,currentY,d);
				break;
			default: console.log('wrong movement input.');
		}
	}
	else
		console.log('you have not set an initial place.');
}

changeDirection = (d) => {
	if(setPlace){
		switch(direction){
			case 'SOUTH' : d == 'RIGHT' ? direction = 'WEST' : direction = 'EAST';
				break;
			case 'NORTH' : d == 'RIGHT' ? direction = 'EAST' : direction = 'WEST';
				break;
			case 'EAST' : d == 'RIGHT' ? direction = 'SOUTH' : direction = 'NORTH';
				break;
			case 'WEST' : d == 'RIGHT' ? direction = 'NORTH' : direction = 'SOUTH';
				break;
			default: console.log('wrong direction input');
		}
		console.log(`Now facing ${direction}`)
	}
	else
		console.log('you have not set an initial place.');
}

report = () => {
	if(setPlace)
		console.log(`your current position is (${currentX}, ${currentY}), towarding ${direction}`);
	else
		console.log('you have not set an initial place.');
}

setPosition = (x,y,d) => {
	if(x < xMax && x > xMin && y < yMax && y > yMin){
		currentX = x;
		currentY = y;
		direction = d;
		console.log(`Move to (${currentX},${currentY}) facing ${direction}`);
	}
	else
		console.log('Position over boundry.');
}