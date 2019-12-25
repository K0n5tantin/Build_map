function displayCanvas(){
    var canvasHTML = document.getElementById('myCanvas');
    var contextHTML = canvasHTML.getContext('2d');
    contextHTML.strokeRect(0,0,canvasHTML.width, canvasHTML.height);
    
    var k1=1*document.getElementById('k1').value;
    var k2=1*document.getElementById('k2').value;
    var b1=1*document.getElementById('b1').value;
    var b2=1*document.getElementById('b2').value;
    
    var xmin = 1*document.getElementById('xmin').value;
    var xmax = 1*document.getElementById('ymax').value;
    var ymin = 1*document.getElementById('ymin').value;
    var ymax = 1*document.getElementById('ymax').value;
		
		var f1 = function(x){return ((k1 * x)+b1);}
    var f2 = function(x){return ((k2 *x*x)+b2);}
    
    //console.log(k1,b1,k2,b2);
		//console.log(f1(xmin));
		
		var p1={x:0,y:0};
    var p2={x:0,y:0};
    
		if (f1(xmin) <= ymax){
			if (f1(xmin) >= ymin){
				p1.x = xmin;
				p1.y = f1(p1.x);
			}else{
				p1.y = ymin;
				p1.x = (ymin - b1)/k1;
			}
		}else{
			p1.y = ymax;
			p1.x = (ymax - b1)/k1;
		}
		if (f1(xmax) <= ymax){
			if (f1(xmax) >= ymin){
				p2.x = xmax;
				p2.y = f1(p2.x);
			}else{
				p2.y = ymin;
				p2.x = (ymin - b1)/k1;
			}
		}else{
			p2.y = ymax;
			p2.x = (ymax - b1)/k1;
		}
		
		var xToConvas = function(x){
      return canvasHTML.width*(x-xmin)/(xmax-xmin);
    }
    
    var yToConvas = function(y){
      return canvasHTML.height*(ymax-y)/(ymax-ymin);
    }
    
    var xFromConvas = function(x){
      return (x*(xmax-xmin))/canvasHTML.width + xmin;
    }
    
    var yFromConvas = function(y){
      return (y*(ymax-ymin))/canvasHTML.height + ymax;
    }
    
    //Расчет центра координат 
    var xCenter = xToConvas(0);
    var yCenter = yToConvas(0);
    
    //Очистка экрана. 
    contextHTML.fillStyle = "#ffffff";
    contextHTML.fillRect(0,0,canvasHTML.width,canvasHTML.height);
    
    // Рисуем ось X 
    contextHTML.beginPath();
    contextHTML.lineWidth = 2;
    contextHTML.moveTo(0, yCenter);
    contextHTML.lineTo(canvasHTML.width, yCenter);
    contextHTML.strokeStyle = '#000000';
    contextHTML.stroke();
    
    // Рисуем ось Y 
    contextHTML.beginPath();
    contextHTML.lineWidth = 2;
    contextHTML.moveTo(xCenter, 0);
    contextHTML.lineTo(xCenter, canvasHTML.height);
    contextHTML.strokeStyle = '#000000';
    contextHTML.stroke();
    
		contextHTML.lineWidth = 5;
		
    // координатная сетка
    for(var xtemp = xmin; xtemp <= xmax; xtemp++){
      contextHTML.beginPath();
      contextHTML.lineWidth = 1;
      contextHTML.moveTo(xToConvas(xtemp), 0);
      contextHTML.lineTo(xToConvas(xtemp), canvasHTML.height);
      contextHTML.strokeStyle = '#888888';
      contextHTML.stroke();
      
      contextHTML.beginPath();
      contextHTML.lineWidth = 2;
      contextHTML.moveTo(xToConvas(xtemp), yToConvas(0)+5);
      contextHTML.lineTo(xToConvas(xtemp), yToConvas(0)-5);
      contextHTML.strokeStyle = '#000000';
      contextHTML.stroke();
      
      contextHTML.beginPath();
      contextHTML.font = '14px sans-serif';
      contextHTML.strokeText(xtemp, xToConvas(xtemp), yToConvas(0)+15);
      contextHTML.stroke();
      contextHTML.closePath();
    }
    
    for(var ytemp = ymin; ytemp <= ymax; ytemp++){
      contextHTML.beginPath();
      contextHTML.lineWidth = 1;
      contextHTML.moveTo(0, yToConvas(ytemp));
      contextHTML.lineTo(canvasHTML.width, yToConvas(ytemp));
      contextHTML.strokeStyle = '#888888';
      contextHTML.stroke();
      
      contextHTML.beginPath();
      contextHTML.lineWidth = 2;
      contextHTML.moveTo(xToConvas(0)+5, yToConvas(ytemp));
      contextHTML.lineTo(xToConvas(0)-5, yToConvas(ytemp));
      contextHTML.strokeStyle = '#000000';
      contextHTML.stroke();
      
      contextHTML.beginPath();
      contextHTML.font = '14px sans-serif';
      contextHTML.strokeText(ytemp, xToConvas(0)+15, yToConvas(ytemp));
      contextHTML.stroke();
      contextHTML.closePath();
    }
    
    //график функции y=k1*x+b1
    if (document.getElementById("check-1").checked == true){
      
      var ps1={
        x:xToConvas(p1.x),
        y:yToConvas(p1.y)
      };
      var ps2={
        x:xToConvas(p2.x),
        y:yToConvas(p2.y)
      };
      
      contextHTML.beginPath();
      contextHTML.moveTo(ps1.x, ps1.y);
      contextHTML.lineTo(ps2.x, ps2.y);
      contextHTML.strokeStyle = '#773355';
      contextHTML.stroke();
	  }
    
    //график функции y=k1*x^2+b1
    if (document.getElementById("check-2").checked == true){
      var dp = 0.5;
      for(var xctemp = 0; xctemp <= (canvasHTML.width + 1); xctemp = xctemp + dp){
        var xtemp = xFromConvas(xctemp);
        var ytemp = f2(xtemp);
        if ( (ytemp <= ymax) && (ytemp >= ymin)){
          
          var pt1={
            x:xToConvas(xtemp-dp),
            y:yToConvas(f2(xtemp-dp))
          };
          var pt2={
            x:xctemp,
            y:yToConvas(ytemp)
          };
          
          contextHTML.beginPath();
          contextHTML.moveTo(pt1.x, pt1.y);
          contextHTML.lineTo(pt2.x, pt2.y);
          contextHTML.strokeStyle = '#773355';
          contextHTML.stroke();
        }
        
      }
	  }
    //Рисуем центр часов
    /*
    contextHTML.beginPath();
    contextHTML.strokeStyle =  "#000000";
    contextHTML.fillStyle = "#ffffff";
    contextHTML.lineWidth = 3;
    contextHTML.arc(xCenter, yCenter, 5, 0, 2*Math.PI, true);
    contextHTML.stroke();
    contextHTML.fill();
    contextHTML.closePath();
    */
    return;
}

function validLine(inputLine)
{
  let count = inputLine.length;
  let tempDeep = 0;
  let topPoint ={
		pos: 0,
		deep: 0
	};
  let maxPositionLeft = 0,
	    maxPositionRight = 0,
      maxLength = 0;
  
  for (let i = 1; i < (1+count); i++) {
    if ((inputLine[i-1]=="(") || (inputLine[i-1] == ")"))
    {
      console.log(inputLine[i-1]);
      
      if (inputLine[i-1] == "(") { tempDeep++; }
      else{
				//if(tempDeep!=0) 
					tempDeep--;
      }
			
			if (tempDeep == topPoint.deep){
				if (maxLength < (i - topPoint.pos))
				{
					maxPositionRight = i;
					maxPositionLeft = topPoint.pos;
					
				}
			}
			if (tempDeep < topPoint.deep){
				maxLength = maxPositionRight - maxPositionLeft;
				topPoint.pos = i;
				topPoint.deep = tempDeep;
			}
					
			
			console.log("tDeep = " + tempDeep + " tP.p = " + topPoint.pos + " d = " +  topPoint.deep); 
			console.log(" PL = " +  maxPositionLeft + " PR = " + maxPositionRight + " | mL = " + maxLength);
    }
    else{
      return "line shoul contain only parentheses";
    }
  }
	console.log("---------");
	maxLength = maxPositionRight - maxPositionLeft;
	console.log(" PL = " +  maxPositionLeft + " PR = " + maxPositionRight + " | mL = " + maxLength);
	
	console.log("---------");
	topPoint.pos = count;
	topPoint.deep = tempDeep;
	
	for (let i = count; i > 0; i--) 
	{
		console.log(i);
			if (inputLine[i-1]==")"){ tempDeep++; }
      else{
				//if(tempDeep!=0) 
				tempDeep--;
      }
		
		if (tempDeep == topPoint.deep)
		{
			
			if (maxLength < (topPoint.pos - i))
			{
				maxPositionRight = topPoint.pos;
				maxPositionLeft = i-1;
				
			}
		}
		
		if (tempDeep < topPoint.deep)
		{
			maxLength = maxPositionRight - maxPositionLeft;
			topPoint.pos = i;
			topPoint.deep = tempDeep;
		}
			
	
			
		console.log("tDeep = " + tempDeep + " tP.p = " + topPoint.pos + " d = " +  topPoint.deep); 
		console.log(" PL = " +  maxPositionLeft + " PR = " + maxPositionRight + " | mL = " + maxLength);
	}
	
	
  return maxLength;
}

window.onload = function(){
	
  let input_box = document.getElementById('input_line');
  let button = document.getElementById('find_lenght');
  let output_box = document.getElementById('output_line');
  
  function pushFindValue(){
    //console.log(output_box);
    //console.log(input_box.value);
    console.log(input_box.value.length);
    
    output_box.value = validLine(input_box.value);
  return;
  }
  
  button.addEventListener('click', event => pushFindValue());
  
};
