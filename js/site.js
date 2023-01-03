document.addEventListener("scroll", (event) => {
    let currentScrollPosition = window.scrollY;

    if(currentScrollPosition > 0) {
        document.getElementById("navbar").classList.remove("so-navbar--transparent");
    } else {
        document.getElementById("navbar").classList.add("so-navbar--transparent");
    }
})
