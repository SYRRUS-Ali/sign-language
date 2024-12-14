let currentFontSize = 16;

function changeFontSize(amount) {
  currentFontSize += amount;
  if (currentFontSize < 10) currentFontSize = 10;
  if (currentFontSize > 30) currentFontSize = 30;

  document.body.style.fontSize = currentFontSize + "px";
}

document.getElementById("increase-text").addEventListener("click", function () {
  changeFontSize(2);
});

document.getElementById("decrease-text").addEventListener("click", function () {
  changeFontSize(-2);
});
