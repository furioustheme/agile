(function () {
  "use strict";

  // ####################### Page Active #########################
  document.addEventListener("DOMContentLoaded", () => {
    let currentUrl = window.location.pathname;
    let activeLink = document.querySelector("a[href='" + currentUrl + "']");
    activeLink.classList.add("nav-active");
    let dropdownParent = activeLink.closest(".nav-dropdown");
    if (!dropdownParent) return;
    const dropdownLink = dropdownParent.querySelector(".nav-link");
    dropdownLink.classList.add("nav-active");
  });

  // ####################### Dropdown #########################
  const dropDownLists = document.querySelectorAll(".nav-dropdown>span");
  dropDownLists.forEach((dropDown) => {
    dropDown.addEventListener("click", function () {
      this.parentElement.classList.toggle("collapsed");
    });
  });

  // ####################### Header #########################
  const header = document.querySelector(".header");
  window.addEventListener("scroll", function (event) {
    const scrollY = this.window.pageYOffset;
    if (scrollY >= 30) {
      header.classList.add("shadow");
      return;
    }
    header.classList.remove("shadow");
  });

  // ####################### Brand Slider #########################
  new Swiper(".brand-slider", {
    spaceBetween: 12,
    loop: true,

    breakpoints: {
      0: {
        slidesPerView: 2,
      },
      450: {
        slidesPerView: 2.5,
      },
      700: {
        slidesPerView: 3,
      },
      850: {
        slidesPerView: 4,
      },
      1024: {
        slidesPerView: 5,
      },

      1600: {
        slidesPerView: 5.5,
      },
    },
  });

  // ########################## Logo Animation ##############################
  new Swiper(".logo-animation", {
    spaceBetween: 56,
    allowTouchMove: false,
    speed: 4000,
    loop: true,
    autoplay: {
      delay: 1,
      disableOnInteraction: false,
    },
    breakpoints: {
      1650: { slidesPerView: 11 },
      1480: { slidesPerView: 10 },
      1480: { slidesPerView: 10 },
      1350: { slidesPerView: 9 },
      1180: { slidesPerView: 8 },
      1000: { slidesPerView: 7 },
      790: { slidesPerView: 6 },
      680: { slidesPerView: 5 },
      480: { slidesPerView: 4 },
      0: { slidesPerView: 3 },
    },
  });

  new Swiper(".logo-animation-rtl", {
    spaceBetween: 56,
    allowTouchMove: false,
    loop: true,
    speed: 4000,
    autoplay: {
      delay: 1,
      disableOnInteraction: false,
      reverseDirection: true,
    },
    breakpoints: {
      1650: { slidesPerView: 11 },
      1480: { slidesPerView: 10 },
      1480: { slidesPerView: 10 },
      1350: { slidesPerView: 9 },
      1180: { slidesPerView: 8 },
      1000: { slidesPerView: 7 },
      790: { slidesPerView: 6 },
      680: { slidesPerView: 5 },
      480: { slidesPerView: 4 },
      0: { slidesPerView: 3 },
    },
  });

  new Swiper(".testimonial-slider", {
    spaceBetween: 24,
    loop: true,
    pagination: {
      el: ".testimonial-slider-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
    },
  });

  // ########################## Tab ##########################
  function setActiveTab(tabGroup, tabName) {
    const tabsNav = tabGroup.querySelector("[data-tab-nav]");
    const tabsContent = tabGroup.querySelector("[data-tab-content]");

    tabsNav.querySelectorAll("[data-tab]").forEach((tabNavItem) => {
      tabNavItem.classList.remove("active");
    });
    tabsContent.querySelectorAll("[data-tab-panel]").forEach((tabPane) => {
      tabPane.classList.remove("active");
    });

    const selectedTabNavItem = tabsNav.querySelector(`[data-tab="${tabName}"]`);
    selectedTabNavItem.classList.add("active");
    const selectedTabPane = tabsContent.querySelector(
      `[data-tab-panel="${tabName}"]`
    );
    selectedTabPane.classList.add("active");
  }
  const tabGroups = document.querySelectorAll("[data-tab-group]");
  tabGroups.forEach((tabGroup) => {
    const tabsNav = tabGroup.querySelector("[data-tab-nav]");
    const tabsNavItem = tabsNav.querySelectorAll("[data-tab]");
    const activeTabName =
      localStorage.getItem(`activeTabName-${tabGroup.dataset.tabGroup}`) ||
      tabsNavItem[0].getAttribute("data-tab");

    setActiveTab(tabGroup, activeTabName);

    tabsNavItem.forEach((tabNavItem) => {
      tabNavItem.addEventListener("click", () => {
        const tabName = tabNavItem.dataset.tab;
        setActiveTab(tabGroup, tabName);
        localStorage.setItem(
          `activeTabName-${tabGroup.dataset.tabGroup}`,
          tabName
        );
      });
    });
  });

  // ########################## Accordion ##########################
  const accordion = document.querySelectorAll("[data-accordion]");
  accordion.forEach((header) => {
    header.addEventListener("click", () => {
      const accordionItem = header.parentElement;
      accordionItem.classList.toggle("active");
    });
  });

  // ########################## Modal ##############################
  const openModalButtons = document.querySelectorAll("[data-modal-open]");
  const closeModalButtons = document.querySelectorAll("[data-modal-close]");

  function openModal(modal) {
    if (modal === null) {
      return null;
    }
    const overlay = modal.querySelector("[data-modal-overlay]");
    modal.style.display = "block";
    overlay.style.display = "block";
  }

  function closeModal(modal) {
    if (modal === null) {
      return null;
    }
    const overlay = modal.querySelector("[data-modal-overlay]");
    modal.style.display = "none";
    overlay.style.display = "none";
  }

  openModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.nextElementSibling;
      openModal(modal);
    });
  });

  closeModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest("[data-modal]");
      closeModal(modal);
    });
  });

  // video player
  const thumnails = document.querySelectorAll("[data-thumnail]");
  thumnails.forEach((thumnail) => {
    thumnail.addEventListener("click", () => {
      const video = thumnail.nextElementSibling;
      video.classList.remove("hidden");
      video.classList.add("block");
    });
  });

  // card filter
  const departmentSelect = document.querySelector("[data-department]");
  const locationSelect = document.querySelector("[data-office]");
  const cardList = document.querySelectorAll("[data-filter]");

  let selectedDepartment = "*";
  let selectedLocation = "*";

  const filtrCardList = (filter) => {
    cardList.forEach((card) => {
      const attr = card.dataset.filter;
      if (filter === "*") {
        card.style.display = "block";
      } else {
        const validJSON = attr.replace(/'/g, '"');
        const filterArray = JSON.parse(validJSON);
        const isValueInFilter = filterArray.includes(filter);
        card.style.display = isValueInFilter ? "block" : "none";
      }
    });
  };

  departmentSelect?.addEventListener("change", (e) => {
    selectedDepartment = e.target.value;
    filtrCardList(selectedDepartment);
  });

  locationSelect?.addEventListener("change", (e) => {
    selectedLocation = e.target.value;
    filtrCardList(selectedLocation);
  });

  //pricing
  const priceTags = document.querySelectorAll("[data-package]");
  priceTags?.forEach((priceTag) => {
    priceTag.addEventListener("click", function () {
      priceTags.forEach((priceTag) => priceTag.classList.remove("btn-primary"));
      this.classList.add("btn-primary");

      const priceTypes = this.dataset.package;
      const elements = document.querySelectorAll(
        "[data-price-" + priceTypes + "]"
      );

      elements.forEach((element) => {
        const price = element.getAttribute("data-price-" + priceTypes);
        element.innerHTML = "$" + price;
      });
    });
  });

  function startCounter(counter) {
    const speed = parseInt(counter.getAttribute("data-speed"));
    const target = parseInt(counter.getAttribute("data-target"));
    const count = parseInt(counter.innerText);
    const increment = Math.trunc(target / speed);
    if (count < target) {
      counter.innerHTML = count + increment;
      setTimeout(() => startCounter(counter), 80);
    } else {
      counter.innerText = target;
    }
  }

  function handleIntersection(entries, observer) {
    entries.forEach(function (entry) {
      if (entry.intersectionRatio > 0) {
        startCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }

  //  counter;
  let observer = new IntersectionObserver(handleIntersection, {
    root: null,
    rootMargin: "0px",
    threshold: 0.8,
  });

  const counters = document.querySelectorAll("[data-counter]");
  counters?.forEach((counter) => observer.observe(counter));

  //shuffle gallery
  const gallery = document.getElementById("photo-gallery");

  if (gallery) {
    new Shuffle(gallery, {
      itemSelector: ".picture-item",
    });
  }
})();
