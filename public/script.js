const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("show");
});

tailwind.config = {
    theme: {
      extend: {
        colors: {
          primaryGreen: '#41fd5b',
          secondaryGreen: '#007410',
          darkGreen: '#35cb49',
          backgroundGreen: '#003407',
          errorRed: '#FF7070',
          secondaryErrorRed: '#DF6666'
        },
      },
    },
  };