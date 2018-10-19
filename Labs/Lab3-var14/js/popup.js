 
function pos(overlay, e){
  console.log(e, overlay);
  overlay.style.left = e.clientX + "px";
  overlay.style.top = e.clientY + "px";
}
    
var elements = document.querySelectorAll(".pop_area");
var overlays = document.querySelectorAll(".overlay");
    
for (var i = 0; i < elements.length; i++) {
  elements[i].addEventListener('mousemove', pos.bind(null, overlays[i]));
}
    
console.log(elements);
console.log(overlays);