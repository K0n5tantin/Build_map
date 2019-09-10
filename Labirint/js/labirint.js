

function first_fill_area(width, height, maze_div){
  
  let massiv = [];
  let current_row_div;
  for (let h = 0; h < height; h++) {
    let div_row = document.createElement('div');
    current_row = div_row;
    maze_div.appendChild(div_row);
    current_row.classList.add("row");
    let row = [];
    for (let w = 0; w < width; w++) {
      let div_space = document.createElement('div');
      current_row.appendChild(div_space);
      div_space.classList.add("corridor");
      div_space.classList.add("walltop");
      div_space.classList.add("wallright");
      div_space.classList.add("wallbottom");
      div_space.classList.add("wallleft");
      let space = {
        width: w,
        height: h,
        walltop: true,
        wallright: true,
        wallbottom: true,
        wallleft: true,
        div: div_space,
        row: current_row,
      }
      row.push(space);
    }
    massiv.push(row);
  }
  return massiv;
}

window.onload = function(){
	
  let mazeWidth = 10,
      mazeHeight = 10;
  
  let elements = document.querySelectorAll(".maze");
  let mass = first_fill_area(mazeWidth, mazeHeight, container);
  console.log(mass);
  
  
};