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
	
	//tempDeep=0;
	
	for (let i = count; i > 0; i--) 
	{
		console.log(i);
			if (inputLine[i]==")"){ tempDeep++; }
      else{
				//if(tempDeep!=0) 
				tempDeep--;
      }
		
		if (tempDeep == topPoint.deep)
		{
			
			if (maxLength < (topPoint.pos - i))
			{
				maxPositionRight = topPoint.pos;
				maxPositionLeft = i;
				
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
	
	console.log("---------");
	maxLength = maxPositionRight - maxPositionLeft;
	console.log(" PL = " +  maxPositionLeft + " PR = " + maxPositionRight + " | mL = " + maxLength);
	
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
