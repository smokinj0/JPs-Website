// JavaScript for Back to Top button
window.onscroll = function() {
  var btn = document.getElementById("back-to-top");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    btn.classList.add("show");
  } else {
    btn.classList.remove("show");
  }
};

function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
}
```