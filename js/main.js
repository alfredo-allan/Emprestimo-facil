window.addEventListener("scroll", function() {
  var button = document.getElementById("botao");
  var rect = button.parentNode.getBoundingClientRect();
  button.style.top = rect.top + "px";
});


