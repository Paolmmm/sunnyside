// SCROLL INTO VIEW
const nav = document.querySelector(".nav");
const footerLinks = document.querySelector(".footer__links");
const arrowDown = document.querySelector(".hero__arrow-down");

arrowDown.addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector("#section--1").scrollIntoView({ behavior: "smooth" });
});

nav.addEventListener("click", function (e) {
  if (e.target.classList.contains("nav__link")) {
    e.preventDefault();
    document
      .querySelector(e.target.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });

    document.querySelector(`[name="checkbox"]`).checked = false;
  }
});

footerLinks.addEventListener("click", function (e) {
  if (e.target.classList.contains("footer__link")) {
    e.preventDefault();
    document
      .querySelector(e.target.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  }
});

// STICKY NAV
// h1 oscurato perchè vh del margin in conflitto
const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;
const navAddOn = document.querySelector(".navAddOn");

const headerObserver = new IntersectionObserver(
  function (entries) {
    const [entry] = entries;
    if (
      document.documentElement.getBoundingClientRect().width >= 849 &&
      !entry.isIntersecting
    ) {
      header.querySelector("h1").classList.add("hidden");
      nav.classList.add("sticky");
      navAddOn.classList.remove("hidden");
    } else {
      header.querySelector("h1").classList.remove("hidden");
      nav.classList.remove("sticky");
      navAddOn.classList.add("hidden");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
  }
);

headerObserver.observe(header);

// LAZY LOADING IMAGES
const projects = document.querySelector(".projects");
const imagesLazy = document.querySelectorAll(".image__lazy");
const pictures = document.querySelectorAll("picture.hidden");
const testimonials = document.querySelector(".testimonials");

//di base immagini da cartella lazy, stesso nome, diversa cartella

//div
//picture
//source -> srcset e media
// //desktop
//img (mobile)

//observer
//appena siamo a -tot da projects ...

const observerProjects = new IntersectionObserver(
  function (entries, observer) {
    const [entry] = entries;

    console.log(entry.isIntersecting);

    if (entry.isIntersecting) {
      imagesLazy.forEach((el) => el.classList.add("hidden"));

      pictures.forEach((el) => el.classList.remove("hidden"));

      observer.unobserve(projects);
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: `${testimonials.getBoundingClientRect().height}px`,
  }
);

observerProjects.observe(projects);
