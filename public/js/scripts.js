/* SHOW MENU */
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId);
  nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }
};

showMenu("nav-toggle", "nav-menu");

/* REMOVE MENU MOBILE */

const navLink = document.querySelectorAll(".nav_link");

function linkAction() {
  /* ACTIVATING LINK */
  navLink.forEach((n) => {
    n.classList.remove("active");
  });

  this.classList.add("active");

  /* REMOVING MENU MOBILE */
  const navMenu = document.querySelector(".nav_menu");
  navMenu.classList.remove("show");
}

navLink.forEach((n) => {
  n.addEventListener("click", linkAction);
});

const Mask = {
  apply(input, func) {
    setTimeout(function () {
      input.value = Mask[func](input.value); //Mask[func] === Mask.func
    }, 1);
  },
  formatBRL(value) {
    value = value.replace(/\D/g, "");

    return (value = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(value / 100)));
  },
};