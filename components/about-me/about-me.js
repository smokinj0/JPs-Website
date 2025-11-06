// Ensures the code runs ONLY after the full HTML page is loaded
document.addEventListener("DOMContentLoaded", function() {
    // Get the button element by ID
    let mybutton = document.getElementById("backToTopBtn");

    // CRITICAL CHECK: If the button wasn't found, stop and log an error.
    if (!mybutton) {
        // console.error("Back to Top Button not found. Check ID spelling in HTML.");
        return; 
    }

    // Event listener to trigger the show/hide function when the window scrolls
    window.onscroll = function() {
        scrollFunction();
    };

    // Function to show/hide the button
    function scrollFunction() {
        // If the user scrolls past 200 pixels, show the button, otherwise hide it.
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }

    // The function called by the button's HTML onclick="topFunction()"
    window.topFunction = function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        });
    }
});
