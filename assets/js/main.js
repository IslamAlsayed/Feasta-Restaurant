/**
 * type 'folder'
 * @components in all files
 */

// include the component header to home page
let headerInner = document.querySelector("header");

// check the header exist or no,
// [ So that we don't have a problem when it is not exist ]
var srcPages;
if (window.location.pathname.split("/")[1] && window.location.pathname.split("/")[1] == "pages") {
  srcPages = '..';
} else {
  srcPages = '.';
}

if (headerInner) {

  fetch(`${srcPages}/includes/components/header.html`)
    .then((result) => result.text())
    .then((data) => {
      headerInner.innerHTML = data;

      onload = () => {
        document.querySelectorAll('.logoImg').forEach(img => {
          var img_src = img.src.split('pages/').join('')
          img.src = img_src + 'assets/images/logos/bibimbap.png'
        })

        document.querySelectorAll('.footer .footer-contact .imgs img').forEach(img => {
          var img_src = img.src.split('pages/').join('')
          img.src = img_src
        })

        document.querySelectorAll('.footer .footer-contact .imgs a').forEach(a => {
          var a_href = a.href.split('pages/').join('')
          a.href = a_href
        })
      }

      // function open dropmenu by click of li
      let menu_lis = document.querySelectorAll(".navbar .menu li");

      if (menu_lis) {
        menu_lis.forEach((li) => {
          li.addEventListener("click", () => {
            menu_lis.forEach((li) => li.classList.remove("open-dropmenu"));
            li.classList.add("open-dropmenu");
            if (document.querySelector(".open-dropmenu"))
              li.querySelector("span").classList.toggle("close-dropmenu");
          });
        });

        // function close dropmenu by window click any way
        document.addEventListener("click", (e) => {
          if (e.target.classList != "close-dropmenu") {
            if (document.querySelector(".close-dropmenu")) {
              document.querySelector(".close-dropmenu").parentElement.classList.remove("open-dropmenu");
              document.querySelector(".close-dropmenu").classList.remove("close-dropmenu");
            }
          }
        });
      }

      // function close dropmenu by window scroll
      document.addEventListener("scroll", (e) => {
        if (document.querySelector(".close-dropmenu")) {
          document.querySelector(".close-dropmenu").parentElement.classList.remove("open-dropmenu");
          document.querySelector(".close-dropmenu").classList.remove("close-dropmenu");
        }
      });

      // get pathname to url
      var url = window.location.pathname;
      var lastSegment = url.split("/").pop().split(".").shift();
      var navMenu = document.querySelector(".navbar .menu");

      document.querySelectorAll("[data-url]").forEach((link) => {
        link.classList.remove("active");
        if (navMenu.querySelector(`[data-url='${lastSegment}']`))
          navMenu.querySelector(`[data-url='${lastSegment}']`).classList.add("active");
      });

      if (lastSegment == "index" || lastSegment == "index2") {
        navMenu.querySelector(`[data-url=indexs`).classList.add("active");
      } else if (lastSegment == "menuDetails") {
        navMenu.querySelector(`[data-url=menu`).classList.add("active");
      } else if (
        lastSegment == "ourChef" ||
        lastSegment == "chefSingle" ||
        lastSegment == "cartShopping" ||
        lastSegment == "ckeckOut" ||
        lastSegment == "aboutUs" ||
        lastSegment == "services" ||
        lastSegment == "bookTable"
      ) {
        if (navMenu)
          navMenu.querySelector(`[data-url=pages`).classList.add("active");
      }
    });
}

// selector 'head tag'
if ((headTitle = document.querySelector("head"))) {
  // 'domain site' to website
  const Domain = window.location.href.split("/").slice(0, -1).join("/");

  // the 'name page' [ main page ] don".html" like => 'index' , 'about us' , 'contact us'
  const name_File_HTML = window.location.pathname;
  const custom_File_Css = name_File_HTML.split("/").pop().split(".").shift();

  // create a new link style [ css ] in head tag
  const linkStyleCss = document.createElement("link");

  if (custom_File_Css == '' || custom_File_Css == 'index') {
    linkStyleCss.rel = "stylesheet", linkStyleCss.href = `./assets/css/index.css`;
  } else {
    linkStyleCss.rel = "stylesheet", linkStyleCss.href = `${srcPages}/assets/css/${custom_File_Css}.css`;
  }

  // create a new link font [ playball ] in head tag
  const linkFontPlayball = document.createElement("link");
  linkFontPlayball.rel = "stylesheet", linkFontPlayball.href = "https://fonts.googleapis.com/css2?family=Playball&family=Poppins:ital,wght@0,100;0,900;1,500;1,700&family=Roboto+Condensed:wght@300;700&display=swap";

  document.querySelector("head").appendChild(linkStyleCss);
  document.querySelector("head").appendChild(linkFontPlayball);

  // create a title tage and add in head tag
  const headTitle = document.createElement("title");
  document.querySelector("head").appendChild(headTitle);

  // convert title from lowercase to capital
  const result = custom_File_Css.split(/(?=[A-Z])/);

  for (var i = 0; i < result.length; i++)
    result[i] = result[i].charAt(0).toUpperCase() + result[i].slice(1);

  // set [ title text ] in 'title tag' in 'head'
  headTitle.innerHTML = result.join(" ");
}

/**
 * type '.html'
 * @index1
 */

// include the component [ slider our cheffs ] to home page
let sliderInner = document.querySelector(".section-slider");

// check the slider exist or no,
// [ So that we don't have a problem when it is not exist ]
if (sliderInner) {
  fetch(`${srcPages}/includes/components/sliderOurCheffs.html`)
    .then((result) => result.text())
    .then((data) => {
      sliderInner.innerHTML = data;

      // the index number to start slider
      var start_slider = 1;

      // select slide element
      var slide_number = document.querySelector(".slider .slide-number");

      // select cards
      var cards = document.querySelectorAll(".slider .cards .card");

      // select container slides
      var containerSlide = document.querySelector(".slider .cards");
      var slideWidth = containerSlide.clientWidth;

      // cards count automatic
      var cardsCount = cards.length;

      // next silde botton
      let nextBotton = document.getElementById("next");

      // prev silde botton
      let prevBotton = document.getElementById("prev");

      nextBotton.onclick = nextSlide;

      prevBotton.onclick = prevSlide;

      let bullets = document.querySelector(".slider .slider-controls .bullets");

      for (let i = 1; i <= cardsCount; i++) {
        bullets.innerHTML += `<span data-num="${i}"></span>`;
      }

      bullets.querySelectorAll("span").forEach((span) => {
        span.addEventListener("click", () => {
          var spanNum = span.dataset.num;
          containerSlide.style.transform = `translateX(-${(spanNum - 1) * slideWidth}px)`;

          // render check slide number function
          start_slider = spanNum;
          checkSlide();
        });
      });

      // render class active function
      classActive(bullets);

      // render check slide number function
      checkSlide();

      // next slide function
      function nextSlide() {
        start_slider++;
        checkSlide();
        containerSlide.style.transform += `translateX(-${containerSlide.clientWidth}px)`;
      }

      // prev slide function
      function prevSlide() {
        start_slider--;
        checkSlide();
        containerSlide.style.transform += `translateX(+${containerSlide.clientWidth}px)`;
      }

      // check slide number function
      function checkSlide() {
        slide_number.textContent = "slide " + start_slider + " of " + cardsCount;

        bullets.querySelectorAll("span").forEach((span) => {
          if (span.dataset.num == start_slider) span.classList.add("active");
          else span.classList.remove("active");
        });

        if (start_slider == 1) {
          prevBotton.classList.add("disabled");
        } else if (start_slider == cardsCount) {
          nextBotton.classList.add("disabled");
        } else {
          nextBotton.classList.remove("disabled");
          prevBotton.classList.remove("disabled");
        }
      }

      // add and remove class 'active' function
      function classActive(array) {
        array.querySelectorAll("span").forEach((element) => {
          element.addEventListener("click", () => {
            array.querySelectorAll("span").forEach((element) => element.classList.remove("active"));
            element.classList.add("active");
          });
        });
      }
    });
}


// include the component slider team cheff to home page
let sectionCounter = document.querySelector(".section-counter");

// check the slider exist or no,
// [ So that we don't have a problem when it is not exist ]
if (sectionCounter) {
  fetch(`${srcPages}/includes/components/counter.html`)
    .then((result) => result.text())
    .then((data) => {
      sectionCounter.innerHTML = data;

      // selector the elements counter
      // var sectionCounter = document.querySelector(".section-counter");
      var countElements = document.querySelectorAll(".section-counter .count-element");
      var started = false;
      var lastScrollTop = 0;

      // window events
      window.addEventListener("scroll", () => {
        // start counter with window scroll to section count
        if (sectionCounter)
          if (window.scrollY + 300 >= sectionCounter.offsetTop) {
            if (!started)
              countElements.forEach((ele) => startCount(ele))
            started = true;
          }

        // hide and show header with window scroll
        var scrollTop = window.pageXOffset || document.documentElement.scrollTop;

        scrollTop > lastScrollTop ?
          headerInner.classList.add("scroll") :
          headerInner.classList.remove("scroll");
        lastScrollTop = scrollTop;
      });
    })

  // start count function
  function startCount(ele) {
    var goal = ele.dataset.count,
      back;
    var count = setInterval(() => {
      ele.parentElement.querySelector("i").classList.add("count");

      // check if goal >= 1000 for add little 'k'
      if (goal >= 1000) {
        back = Math.floor(goal / 1000);
        ele.textContent++;
        if (ele.textContent == back) {
          ele.textContent += "k";
          clearInterval(count);
          ele.parentElement.querySelector("i").classList.remove("count");
        }
      } else {
        back = goal;
        ele.textContent++;
        if (ele.textContent == back) {
          clearInterval(count);
          ele.parentElement.querySelector("i").classList.remove("count");
        }
      }
    }, 1 / goal);
  }
}

// toggle class active ontabs discover menu
let discoverTabs = document.querySelector(".section-discover-menu");

// check the container exist or no,
// [ So that we don't have a problem when it is not exist ]
if (discoverTabs) {
  const tabs = discoverTabs.querySelectorAll('.tabs .tab');
  fetch(`./includes/tabs/${tabs[0].dataset.tab}.html`)
    .then((result) => result.text())
    .then((data) => {
      discoverTabs.querySelector('.random-recipe .cards').innerHTML = data
    })

  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      tabs.forEach(tab => tab.classList.remove('active'))
      tab.classList.add('active')

      fetch(`./includes/tabs/${tab.dataset.tab}.html`)
        .then((result) => result.text())
        .then((data) => {
          discoverTabs.querySelector('.random-recipe .cards').innerHTML = data
        })
    })
  })
}

/**
 * type '.html'
 * @aboutUs
 */

// include the component [ slider team cheffs ] team cheff to home page
let sliderTeamCheff = document.querySelector(".section-team-cheff");

// check the slider exist or no,
// [ So that we don't have a problem when it is not exist ]
if (sliderTeamCheff) {
  fetch(`${srcPages}/includes/components/sliderteamCheff.html`)
    .then((result) => result.text())
    .then((data) => {
      sliderTeamCheff.innerHTML = data;

      var slideControl = document.querySelector('.section-team-cheff .slider-controls');
      var cradslength = document.querySelectorAll('.section-team-cheff .cards .card').length;

      // select container slides
      var containerSlide = document.querySelector(".section-team-cheff .slider .cards");

      // select width the container slides
      var slideWidth = containerSlide.clientWidth;

      for (let i = 1; i <= cradslength; i++)
        slideControl.innerHTML += `<span data-num="${i}"></span>`;

      // selector all spans tag [ bullets ] in slider team
      var spansControl = slideControl.querySelectorAll('span');

      // set class active on fisrt element [ span ] tag 
      spansControl[0].classList.add('active')

      spansControl.forEach((span) => {
        span.addEventListener("click", () => {
          spansControl.forEach((span) => span.classList.remove('active'))
          span.classList.add('active')
          var spanNum = span.dataset.num;
          containerSlide.style.transform = `translateX(-${(spanNum - 1) * slideWidth}px)`;
        });
      });
    })
}

// include the component slider [ satisfaction ] team cheff to home page
let sliderSatisfaction = document.querySelector(".section-satisfaction");

// check the slider exist or no,
// [ So that we don't have a problem when it is not exist ]
if (sliderSatisfaction) {
  fetch(`${srcPages}/includes/components/slidersatisfaction.html`)
    .then((result) => result.text())
    .then((data) => {
      sliderSatisfaction.innerHTML = data;

      const satisfactionCards = document.querySelectorAll(".section-satisfaction .cards .card");

      satisfactionCards.forEach((card, index) => {
        card.setAttribute('data-order', `${index + 1}`)
      })

      document.querySelector("[data-order='1']").addEventListener('click', () => {
        document.querySelector("[data-order='1']").style.cssText = card3;
        document.querySelector("[data-order='2']").style.cssText = card4;
        document.querySelector("[data-order='3']").style.cssText = card5;
        document.querySelector("[data-order='4']").style.cssText = card1;
        document.querySelector("[data-order='5']").style.cssText = card2;
      })

      document.querySelector("[data-order='2']").addEventListener('click', () => {
        document.querySelector("[data-order='1']").style.cssText = card2;
        document.querySelector("[data-order='2']").style.cssText = card3;
        document.querySelector("[data-order='3']").style.cssText = card4;
        document.querySelector("[data-order='4']").style.cssText = card5;
        document.querySelector("[data-order='5']").style.cssText = card1;
      })

      document.querySelector("[data-order='3']").addEventListener('click', () => {
        document.querySelector("[data-order='1']").style.cssText = card1;
        document.querySelector("[data-order='2']").style.cssText = card2;
        document.querySelector("[data-order='3']").style.cssText = card3;
        document.querySelector("[data-order='4']").style.cssText = card4;
        document.querySelector("[data-order='5']").style.cssText = card5;
      })

      document.querySelector("[data-order='4']").addEventListener('click', () => {
        document.querySelector("[data-order='1']").style.cssText = card5;
        document.querySelector("[data-order='2']").style.cssText = card1;
        document.querySelector("[data-order='3']").style.cssText = card2;
        document.querySelector("[data-order='4']").style.cssText = card3;
        document.querySelector("[data-order='5']").style.cssText = card4;
      })

      document.querySelector("[data-order='5']").addEventListener('click', () => {
        document.querySelector("[data-order='1']").style.cssText = card4;
        document.querySelector("[data-order='2']").style.cssText = card5;
        document.querySelector("[data-order='3']").style.cssText = card1;
        document.querySelector("[data-order='4']").style.cssText = card2;
        document.querySelector("[data-order='5']").style.cssText = card3;
      })

      let card1 = `
        left: 0;
        z-index: 5;
        filter: blur(5px);
        transform: translateX(0) scale(.7) perspective(16px) rotateY(1deg);
        `;

      let card2 = `
        left: 35%;
        z-index: 7;
        filter: blur(3px);
        transform: translateX(-50%) scale(.9) perspective(16px) rotateY(.5deg);
        `;

      let card3 = `
        left: 50%;
        z-index: 9;
        filter: blur(0);
        transform: translateX(-50%) scale(1);
        `;

      let card4 = `
        left: 65%;
        z-index: 7;
        filter: blur(3px);
        transform: translateX(-50%) scale(.9) perspective(16px) rotateY(-.5deg);
        `;

      let card5 = `
        left: 100%;
        z-index: 5;
        filter: blur(5px);
        transform: translateX(-100%) scale(.7) perspective(16px) rotateY(-1deg);
        `;
    })
}

/**
 * type '.html'
 * @index2 and @chefSingle
 */

// include the component [ slider master cheff ] to home page
var masterChef = document.querySelector(".section-master-cheff");

// check the section master cheff exist or no,
// [ So that we don't have a problem when it is not exist ]
if (masterChef) {
  fetch(`${srcPages}/includes/components/sliderMasterCheff.html`)
    .then((result) => result.text())
    .then((data) => {
      masterChef.innerHTML = data;

      // selecter container cards
      var cards = document.querySelector(".section-master-cheff .cards");

      cards.querySelectorAll('.card').forEach(card => {
        var img = card.querySelector('.card-img img');

        var img_src = img.src.split('pages/').join('')
        img.src = img_src;
      })

      // selecter container slider controls and [ all cards ]
      var sliderControls = document.querySelector(".slider-controls");

      // selecter cards length
      var cardsLength = cards.querySelectorAll(".card").length;

      // selecter container cards width
      var containerCards = cards.clientWidth;

      for (let i = 1; i <= cardsLength; i++)
        sliderControls.innerHTML += `<span data-num="${i}"></span>`;

      // start card
      var start_card = 1;

      sliderControls.querySelectorAll("span").forEach((span) => {
        span.addEventListener("click", () => {
          var spanNum = span.dataset.num;

          cards.style.transform = `translateX(-${(spanNum - 1) * containerCards}px)`;

          start_card = spanNum;

          // render check slide number function
          theChecker();
        });
      });

      // render check slide number function
      theChecker();

      function theChecker() {
        // set active class on start bullets
        sliderControls.querySelectorAll("span").forEach((span) => {
          if (span.dataset.num == start_card) span.classList.add("active");
          else span.classList.remove("active");
        });
      }
    });
}

/**
 * type '.html'
 * @allPages not( @index1 )
 */

// include the component header to home page
let footerInner = document.querySelector(".footer.target");

// check the header exist or no,
// [ So that we don't have a problem when it is not exist ]
if (footerInner) {

  fetch(`${srcPages}/includes/components/footer.html`)
    .then((result) => result.text())
    .then((data) => footerInner.innerHTML = data);
}

/**
 * type '.html'
 * @blog and @deliveryPage
 */

// script the pagenations
if (document.querySelector(".pagenations")) {

  // select span elements [ total, start ] from tabs
  var total_pages_tabs = document.querySelector(".section-tabs .total .total_pages");
  var start_page_tabs = document.querySelector(".section-tabs .total .start_page");

  // select component the pagenations
  var pages = document.querySelector(".pagenations .pages");

  // get count the all pages from dataset 'total_pages' from [ HTML page ]
  var totalPages = parseInt(pages.dataset.total);

  // get start number page from dataset 'pages_start' from [ HTML page ]
  var activePage = parseInt(pages.dataset.start);

  if (total_pages_tabs && start_page_tabs) {
    // set total count page in title tabs in [ HTML page ]
    total_pages_tabs.innerHTML = totalPages < 9 ? "0" + totalPages : totalPages;

    // set start number page in title tabs in [ HTML page ]
    start_page_tabs.innerHTML = "0" + activePage;
  }

  // default the class active
  var active;

  // render the pageFunction
  pageFunction(totalPages, activePage);
}

// function previous, next the page
function pageFunction(totalPages, pageNumber) {
  var beforePages = pageNumber - 1;
  var afterPages = pageNumber + 1;
  var pageNum = "";

  // show, hide previuos botton after check the 'page number' equal '1'
  if (pageNumber > 1)
    pageNum += `<div class="btn prev" onclick="pageFunction(totalPages, ${pageNumber - 1})"><i class="fa-solid fa-angle-left fa-xs"></i> previuos</div>`;

  if (pageNumber > 2) {
    pageNum += `<a href="" class="page" onclick="pageFunction(totalPages, 1)">1</a>`;
    if (pageNumber > 3) pageNum += `<div class="dot">...</div>`;
  }

  for (var i = beforePages; i <= afterPages; i++) {
    if (i > totalPages) continue;
    if (i == 0) i = i + 1;
    i == pageNumber ? (active = " active") : (active = "");
    pageNum += `<a href="" class="page${active}" onclick="pageFunction(totalPages, ${i})">${i}</a>`;
  }

  if (pageNumber < totalPages - 1) {
    if (pageNumber < totalPages - 2) pageNum += `<div class="dot">...</div>`;

    pageNum += `<a href="" class="page" onclick="pageFunction(totalPages, ${totalPages})">${totalPages}</a>`;
  }

  // show, hide next botton after check the 'page number' equal 'total pages'
  if (pageNumber < totalPages)
    pageNum += `<div class="btn next" onclick="pageFunction(totalPages, ${pageNumber + 1})">
      next <i class="fa-solid fa-angle-right fa-xs"></i></div>`;

  // set pages buttons in the container pages
  pages.innerHTML = pageNum;
}

/**
 * type '.html'
 * @chefSingle
 */

// script [ plus, minus ] .. tutorial
// selector all groups
const exper_groups = document.querySelectorAll(".experiences .group");
if (document.querySelector(".experiences")) {
  document.addEventListener("click", (e) => {
    const old_i = e.target;
    const parent_Element = old_i.parentElement.parentElement;

    // When you press plus
    if (e.target.className == "fa-solid fa-plus") {
      // remove class active from all groups
      exper_groups.forEach((group) => group.classList.remove("active"));

      // set class active on main group
      parent_Element.classList.add("active");

      // [ remove all minus elements from all groups ] and [ add plus elements in all groups ]
      document.querySelectorAll(".experiences .group .title").forEach((title) => {
        if (title.querySelector(".fa-solid.fa-minus")) {
          title.querySelector(".fa-solid.fa-minus").classList.add("fa-plus");
          title.querySelector(".fa-solid.fa-minus.fa-plus").classList.remove("fa-minus");
        }
      });

      // [ add plus element in active groups ] and [ remove all minus elements from all groups ]
      document.querySelectorAll(".experiences .group.active .title").forEach((title) => {
        title.querySelector(".fa-solid.fa-plus").classList.add("fa-minus");
        title.querySelector(".fa-solid.fa-plus.fa-minus").classList.remove("fa-plus");
      });

      // When you press minus
    } else if (e.target.className == "fa-solid fa-minus") {
      // remove class active from all groups
      exper_groups.forEach((group) => group.classList.remove("active")
      );

      // [ add plus element in active groups ] and [ remove all minus elements from all groups ]
      document.querySelectorAll(".experiences .group .title").forEach((title) => {
        if (title.querySelector(".fa-solid.fa-minus")) {
          title.querySelector(".fa-solid.fa-minus").classList.add("fa-plus");
          title.querySelector(".fa-solid.fa-minus.fa-plus").classList.remove("fa-minus");
        }
      });
    }
  });

  const skills_groups = document.querySelectorAll(".skills .group span:nth-child(2)");
  skills_groups.forEach((span) => span.style.width = span.dataset.width);
}

/**
 * type '.html'
 * @menuSingle
 */

// script [ increment, descrement ] count produsts
if (document.querySelector(".section-details-menu")) {
  const minus = document.querySelector(".section-details-menu span.minus");
  const count_Product = document.querySelector(".section-details-menu input.count_Product");
  const plus = document.querySelector(".section-details-menu span.plus");
  const minValue = 1, maxValue = 21;
  let productValue;

  productValue = isNaN(count_Product.value) ? "01" : count_Product.value;

  // decrement value with click minus
  minus.addEventListener("click", () => {
    if (productValue != minValue) {
      productValue--;
      count_Product.value = productValue > 9 ? productValue : "0" + productValue;
    }
  });

  // increment value with click plus
  plus.addEventListener("click", () => {
    if (productValue != maxValue) {
      productValue++;
      count_Product.value = productValue > 9 ? productValue : "0" + productValue;
    }
  });
}

/**
 * type '.html'
 * @menuDetails
 */

// script innerHTML tabs
// include the components [ description, reviews ] to home page
let tab_Inner = document.querySelector(".section-details-menu .tab_inner");

// check the tab exist or no,
// [ So that we don't have a problem when it is not exist ]
if (tab_Inner) {
  // selector all tabs [ description, reviews ]
  let tabs = document.querySelectorAll(".section-details-menu .tabs .tab");

  // fetch default the description inner to site
  fetch(`${srcPages}/includes/components/description.html`)
    .then((result) => result.text())
    .then((data) => tab_Inner.innerHTML = data);

  // script [ description, reviews ]
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((tab) => {
        tab.classList.remove("active");
      });
      tab.classList.add("active");

      // fetch the description inner to site by click on [ description tab ]
      if (tab.dataset.tab == "description") {
        fetch(`${srcPages}/includes/components/description.html`)
          .then((result) => result.text())
          .then((data) => tab_Inner.innerHTML = data);

        // fetch the reviews inner to site by click on [ reviews tab ]
      } else if (tab.dataset.tab == "reviews") {
        fetch(`${srcPages}/includes/components/reviews.html`)
          .then((result) => result.text())
          .then((data) => {
            tab_Inner.innerHTML = data;

            const rate_star_Is = document.querySelectorAll(".tab_inner .form .rate_star i");
            const rate_value = document.querySelector(".tab_inner .form .rate .rating");
            rate_star_Is.forEach((i, index1) => {
              i.addEventListener("click", () => {
                rate_value.value = index1 + 1;
                rate_star_Is.forEach((i, index2) =>
                  index1 >= index2 ? i.classList.add("active") : i.classList.remove("active")
                );
              })
            });
          });
      }
    });
  });
}

/**
 * type '.html'
 * @deliveryPage
 */

// script type dishes [ all, breakfast, dinner, lunch and drinks]
// script [ add, remove ] class active from on all tabs
const tabs_sort = document.querySelectorAll(".section-tabs .tabs .tab");
const dishesFilter = document.querySelectorAll(".section-dishes .dishes .dish");

tabs_sort.forEach((tab) => {
  // function remove class active from all tabs
  tab.addEventListener("click", removeActive);

  // function do filter on all dishes [ show, hide]
  tab.addEventListener("click", manageDishes);
});

// function remove class active from all tabs
function removeActive() {
  tabs_sort.forEach((tab) => {
    tab.classList.remove("active");
    this.classList.add("active");
  });
}
// function do filter on all dishes [ show, hide]
function manageDishes() {
  // default hide all dishes
  dishesFilter.forEach((dish) => {
    dish.style.opacity = "0";
    dish.style.transform = "scale(.7)";
    setTimeout(() => {
      dish.style.display = "none";
    }, 250);
  });

  // show target dishes if dataset to target tab == class to dish
  document.querySelectorAll(this.dataset.toggle_filter).forEach((dish) => {
    dish.style.opacity = "1";
    dish.style.transform = "scale(1)";
    setTimeout(() => {
      dish.style.display = "block";
    }, 250);
  });
}

/**
 * type '.html'
 * @checkOut
 */

// show, hide to placeholder for input [ coupon ]
const label = document.querySelector(".billing-details .coupon label");
const input = document.querySelector(".billing-details .coupon input");

if (label && input) {
  input.addEventListener("keyup", () =>
    input.value == "" ? label.style.opacity = "1" : label.style.opacity = "0");
}

// script show, hide descriptionto alone payment
const labelS = document.querySelectorAll(".payment .pay .group label");
const descS = document.querySelectorAll(".payment .pay .desc");

if (labelS && descS) {
  labelS.forEach((label) => {
    label.addEventListener("click", () => {
      descS.forEach((desc) => (desc.style.display = "none"));
      label.parentElement.parentElement.querySelector(".desc").style.display = "block";
    });
  });
}
