function animate(options) {

  var start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction от 0 до 1
    var timeFraction = (time - start) / options.duration;
    if (timeFraction > 1) timeFraction = 1;

    // текущее состояние анимации
    var progress = options.timing(timeFraction)
    
    options.draw(progress);

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }

  });
}

 function makeEaseOut(timing) {
      return function(timeFraction) {
        return 1 - timing(1 - timeFraction);
      }
    }

    function bounce(timeFraction) {
      for (let a = 0, b = 1, result; 1; a += b, b /= 2) {
        if (timeFraction >= (7 - 4 * a) / 11) {
          return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
        }
      }
    }

    function quad(timeFraction) {
      return Math.pow(timeFraction, 2);
    }

    ball.onclick = function() {

      let height = 800 - ball.clientHeight;
      let width = 100;

      animate({
        duration: 2000,
        timing: makeEaseOut(bounce),
        draw: function(progress) {
          ball.style.top = height * progress + 'px'
        }
      });

      animate({
        duration: 2000,
        timing: makeEaseOut(quad),
        draw: function(progress) {
          ball.style.left = width * progress + "px"
        }
      });
    }


function dragstart_handler(ev) {
 console.log("dragStart");
 // Change the source element's background color to signify drag has started
 ev.currentTarget.style.border = "1px dashed";
 // Add the id of the drag source element to the drag data payload so
 // it is available when the drop event is fired
 ev.dataTransfer.setData("text", ev.target.id);
 // Tell the browser both copy and move are possible
 ev.effectAllowed = "copyMove";
 
 /*
 console.log("dragBox", ev);
 var dragBox = ev.target.getBoundingClientRect();
 console.log("dragBox", dragBox, ev.screenX, ev.screenY, ev.clientX, ev.clientY);
  console.log("dragBox-x", ev.screenX - ev.target.getBoundingClientRect().x);
  console.log("dragBox-y", ev.screenY - ev.target.getBoundingClientRect().y);
  */
  
}

function dragover_handler(ev) {
 console.log("dragOver");
 // Change the target element's border to signify a drag over event
 // has occurred
 //ev.currentTarget.style.background = "lightblue";
 
 ev.preventDefault();
 /*
 var id = ev.dataTransfer.getData("text");
 var el = document.getElementById(id);
 console.log("element", el);
 */
 //console.log("element", el.getBoundingClientRect().x, el.getBoundingClientRect().y);
}

function drop_handler(ev) {
  console.log("Drop");
  ev.preventDefault();
  console.log(ev);
  // Get the id of drag source element (that was added to the drag data
  // payload by the dragstart event handler)
  var id = ev.dataTransfer.getData("text");
  var el = document.getElementById(id);
  
  // Only Move the element if the source and destination ids are both "move"
  if (id == "src_move" && ev.target.id == "dest_move"){
    /*
    var dropPlace = {
      x: el 
    }
    */
    console.log("element", el.getBoundingClientRect().x, el.getBoundingClientRect().y);
    console.log("element", el.getBoundingClientRect());
    
    ev.target.appendChild(el);
    console.log(ev.target);
    
    console.log(ev);
    
    /*
    el.style.left = (ev.screenX - ev.target.getClientRects().x) + "px";
    el.style.top = (ev.screenY - ev.target.getClientRects().y) + "px";
    */
    
    var dropBox = ev.target.getBoundingClientRect();
    
    //console.log(ev.clientX, dropBox.x, ev.screenX - dropBox.x);
    //console.log(ev.clientY, dropBox.y, ev.screenY - dropBox.y);
    
    el.style.left = (ev.clientX - dropBox.x - 0.5*el.getBoundingClientRect().width) + "px";
    el.style.top = (ev.clientY - dropBox.y - 0.5*el.getBoundingClientRect().height) + "px";
    
    console.log(dropBox);
  }
  
  // Copy the element if the source and destination ids are both "copy"
  if (id == "src_copy" && ev.target.id == "dest_copy") {
   var nodeCopy = document.getElementById(id).cloneNode(true);
   nodeCopy.id = "newId";
   ev.target.appendChild(nodeCopy);
  }
}

function dragend_handler(ev) {
  console.log("dragEnd");
  // Restore source's border
  ev.target.style.border = "solid 1px black";
  // Remove all of the drag data
  ev.dataTransfer.clearData();
}

window.onload = function(){
	
  
  
  var elements = document.querySelectorAll(".graphs");
  
  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', event => displayCanvas());
  }
  
  var input_boxes = document.querySelectorAll(".input_box");
  for (var i = 0; i < input_boxes.length; i++) {
    input_boxes[i].addEventListener('click', event => displayCanvas());
    input_boxes[i].addEventListener('keyup', event => displayCanvas());
    
  }
  
};
