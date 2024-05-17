function toggleBundledProductDetails(element) {
  var details = element.nextElementSibling;
  var arrow = element.querySelector(".arrow");
  if (details.style.display === "none") {
    details.style.display = "block";
    arrow.innerHTML = "&#x25B2;"; // Up arrow
  } else {
    details.style.display = "none";
    arrow.innerHTML = "&#x25BC;"; // Down arrow
  }
}

function updateMainImage(src, id) {
  document.getElementById(id).src = src;
}
