gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CustomEase);

const lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(16);

const images = document.querySelectorAll(".ukiyo");
new Ukiyo(images);

const vezier = "M0,0 C0,0 0.187,-0.022 0.301,0.089 0.469,0.258 0.522,0.723 0.7,0.9 0.826,1.025 1,1 1,1 ";
let isActive = false;

const headerMove = () => {
    const header = document.querySelector("header");
    const nav = document.querySelector(".header--inner > nav >  ul");
    const navMenu = document.querySelectorAll(".navmenu")
    const navSubmenu = document.querySelectorAll(".submenu")
    navMenu.forEach((ele, i) => {
        ele.addEventListener("mouseenter", () => {
            navSubmenu[i].classList.add('active')
        })
        ele.addEventListener("mouseleave", () => {
            navSubmenu[i].classList.remove('active')
        })
    })
    window.addEventListener("scroll", () => {
        if (window.scrollY >= 300) {
            header.classList.add("active");
            nav.classList.add("active");
        } else {
            header.classList.remove("active");
            nav.classList.remove("active");
        }
    });
};
const bannerSecTrigger = () => {
    gsap.from(".bannerSection--background", { duration: 1, scale: 0.85, opacity: 0, ease: CustomEase.create("custom", vezier) });
    gsap.from(".bannerSection--inner--head > h2", { delay: 0.5, duration: 1, yPercent: 100, ease: CustomEase.create("custom", vezier) });
    gsap.from(".bannserSection--inner--detail__wrapper > p", { delay: 0.7, duration: 1, yPercent: 100, ease: CustomEase.create("custom", vezier) });
    gsap.from(".bannerSection--button > a", { delay: 0.7, duration: 1, yPercent: 100, ease: CustomEase.create("custom", vezier) });
};
const aboutSecTrigger = () => {
    const aboutDisc = new SplitType("#about-discription", { type: "chars" });
    const aboutDisc2 = new SplitType("#abouttext", { type: "lines" });
    const contents = document.querySelectorAll(".aboutSection--contents");
    const leftcontents = document.querySelectorAll(".conLeft");
    const rightcontents = document.querySelectorAll(".conRight");
    gsap.from("#about", {
        scrollTrigger: { trigger: ".aboutSection--titles__wrap", start: "top bottom" },
        duration: 1,
        yPercent: 100,
        ease: CustomEase.create("custom", vezier),
    });
    gsap.from(aboutDisc.chars, {
        scrollTrigger: { trigger: "#about-discription", start: "top bottom", end: "top 70%", scrub: 2 },
        yPercent: 100,
        ease: CustomEase.create("custom", vezier),
    });
    gsap.from(aboutDisc2.lines, {
        scrollTrigger: { trigger: "#abouttext", start: "top bottom", end: "top 70%", scrub: 2 },
        stagger: 0.02,
        yPercent: 200,
        ease: CustomEase.create("custom", vezier),
    });
    contents.forEach((content, i) => {
        gsap.from(leftcontents[i], { scrollTrigger: { trigger: content, start: "top bottom", end: "top 50%", scrub: 2 }, xPercent: 100, opacity: 0 });
        gsap.from(rightcontents[i], { scrollTrigger: { trigger: content, start: "top bottom", end: "top 50%", scrub: 2 }, xPercent: -100, opacity: 0 });
    });
};

const campaignSecTrigger = () => {
    const changeSectionTrigger = { trigger: ".services", start: "bottom bottom", end: "bottom 50%", scrub: 1 };
    gsap.fromTo("body", { backgroundColor: "#0B0B0B" }, { scrollTrigger: changeSectionTrigger, backgroundColor: "#fcfcfc" });
    // gsap.fromTo ('.services', {backgroundColor: "#fcfcfc"}, {scrollTrigger:changeSectionTrigger, backgroundColor:"#0B0B0B"})
    gsap.from("#campaign", { scrollTrigger: { trigger: "#campaign", start: "top 90%", end: "top 70%", scrub: 2 }, yPercent: 100 });
    gsap.from("#campaignSub", { scrollTrigger: { trigger: "#campaignSub", start: "top 90%", end: "top 70%", scrub: 2 }, yPercent: 100 });
    gsap.from(".contentsSection", {scrollTrigger:{trigger:".contentsSection", start :"top 80%", end:"top 50%", scrub: 2}, maxWidth:"80%", y:200})
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        autoplay : {
            delay : 2500,
            disableOnInteraction: false
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
};

const serviceSecTrigger = () => {
    const ele = document.querySelectorAll(".supportSection--title--ele");
    const items = gsap.utils.toArray(".supportSection--item");
    const programs = gsap.utils.toArray(".programSection--item");
    gsap.from("body", {
        scrollTrigger: { trigger: ".services", start: "top 85%", end: "top 70%", scrub: 2 },
        backgroundColor: "#fcfcfc",
        ease: CustomEase.create("custom", vezier),
        onStart: () => {
            if (!isActive) {
                campaignSecTrigger();
            }
            isActive = true;
        },
    });
    gsap.to(".services", {
        scrollTrigger: { trigger: ".services", start: "top 75%", end: "top 55%", scrub: 3.5 },
        maxWidth: "100%",
        borderRadius: "80px",
        backgroundColor: "#fcfcfc",
        ease: CustomEase.create("custom", vezier),
    });
    gsap.to(".supportSection--title--line", {
        scrollTrigger: { trigger: ".services", start: "top 75%", end: "top 55%", scrub: 3.5 },
        backgroundColor: "#333333",
    });
    ele.forEach((element) => {
        gsap.to(element, { scrollTrigger: { trigger: ".services", start: "top 75%", end: "top 55%", scrub: 3.5 }, color: "#333333" });
    });
    gsap.from(items, { scrollTrigger: { trigger: items, start: "top bottom", end: "top 70%", scrub: 2 }, y: 200, stagger: 0.1 });
    gsap.from("#programSecTitle", { scrollTrigger: { trigger: "#programSecTitle", start: "top bottom", end: "top 75%", scrub: 2 }, y: 200 });
    gsap.from("#programSecSubtitle", { scrollTrigger: { trigger: "#programSecTitle", start: "top bottom", end: "top 55%", scrub: 2 }, y: 200 });
    gsap.from(programs, { scrollTrigger: { trigger: "#programSecTitle", start: "top 50%", end: "top top-=10%", scrub: 1 }, yPercent: 100, stagger: 0.1 });
};

const footerFnc = () => {
    gsap.from('footer', {scrollTrigger:{trigger:"footer", start:"top 95%", end :"top 75%", scrub:2}, maxWidth:"90%", y:250})
}
const functionInit = () => {
    headerMove();
    bannerSecTrigger();
    aboutSecTrigger();
    serviceSecTrigger();
    footerFnc();
};

functionInit();
