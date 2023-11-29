// Icons
const githubIcon = document.getElementById("github-icon");
const linkedinIcon = document.getElementById("linkedin-icon");
const instagramIcon = document.getElementById("instagram-icon");
const emailIcon = document.getElementById("email-icon");

// Container
const container = document.querySelector(".horizontal-container");

// Mobile Menu
const menuSmall = document.querySelector(".mobile-menu--items");
const menuSmallCheckbox = document.getElementById("hamb-check");

// Scroll Links
const scrollLinks = document.querySelectorAll(".menu-link");

// Animation Elements
const jelly = document.querySelector('.jelly');
const jellyAnimation = document.querySelector('.jelly-animation');
const animatedElements = document.querySelectorAll(".anim");

// Sections
const firstSection = document.querySelector(".h-s-1-c");

document.addEventListener('DOMContentLoaded', () => {
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (prefersDarkMode) {
        document.body.classList.toggle('dark-theme');
        githubIcon.src = "images/github-light.svg";
        linkedinIcon.src = "images/linkedin-light.svg";
        instagramIcon.src = "images/insta-light.svg";
        emailIcon.src = "images/email-light.svg";
    }
});

document.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const viewHeight = window.innerHeight;
    const scrollPercentage = (scrollY / viewHeight);

    firstSection.style.opacity = 1 - scrollPercentage;
    firstSection.style.transform = `translateY(-${scrollPercentage * 70}px)`
})


const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains("fade-u")) {
                entry.target.classList.add("fade-up");
            }
            if (entry.target.classList.contains("fade-d")) {
                entry.target.classList.add("fade-down");
            }
        }
    })
})

animatedElements.forEach((element) => {
    animationObserver.observe(element);
});

document.getElementById("theme-btn").addEventListener('click', () => {
    document.body.classList.toggle("dark-theme");

    if (document.body.classList.contains("dark-theme")) {
        githubIcon.src = "images/github-light.svg";
        linkedinIcon.src = "images/linkedin-light.svg";
        instagramIcon.src = "images/insta-light.svg";
        emailIcon.src = "images/email-light.svg";
    } else {
        githubIcon.src = "images/github.svg";
        linkedinIcon.src = "images/linkedin.svg";
        instagramIcon.src = "images/insta.svg";
        emailIcon.src = "images/email.svg";
    }
});

menuSmallCheckbox.addEventListener('click', () => {
    menuSmall.classList.toggle('active');
})


scrollLinks.forEach((link) => {
    link.addEventListener("click", () => {
        const targetId = link.getAttribute('href');


        if (targetId == "#intro") {
            goToY(0);
        } else {

        }

        if (link.classList.contains('mobile-menu--link')) {
            menuSmall.classList.toggle('active');
            menuSmallCheckbox.checked = !menuSmallCheckbox.checked;
        }

    });
});


const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

const lastSection = document.getElementById("last-h-section");
const scrollContainer = document.querySelector('.wrapper');
const content = document.querySelector('.horizontal-container');
const horizontalSections = [...content.querySelectorAll('.horizontal-section')];

let scrollX = 0;
let isTransitioning = false;

nextBtn.addEventListener('click', (e) => handlePrevNextBtn(e));
prevBtn.addEventListener('click', (e) => handlePrevNextBtn(e));

function handlePrevNextBtn(e) {
    let direction = 1;
    if (e.target.getAttribute('id') == "prevBtn")
        direction = -1;


    if (isTransitioning)
        return;
    isTransitioning = true;

    currentSectionIndex = Math.floor(scrollX / content.clientWidth);
    targetSectionIndex = currentSectionIndex + direction;

    if (targetSectionIndex >= 0 && targetSectionIndex < horizontalSections.length) {
        targetX = targetSectionIndex * content.clientWidth;
        goToY(targetX);
    } else if (currentSectionIndex === 0) {
        goToY(2 * content.clientWidth);
    } else {
        goToY(0);
    }

    setTimeout(() => {
        isTransitioning = false;

    }, 1800);
}

async function fetchRepos() {
    const API_URL = "https://api.github.com/users/joatansampaio/repos";
    let repoDiv = document.getElementById("github-repositories");

    fetch(API_URL)
        .then(response => {
            if (!response.ok)
                repoDiv.innerHTML = "Failed to Connect to Github";

            return response.json();
        })
        .then(data => {

            data.forEach(async repo => {
                let repoLanguagesAPI_URL = repo.languages_url;
                let languages = await fetch(repoLanguagesAPI_URL)
                    .then(response => {
                        if (!response.ok)
                            return null;

                        return response.json();
                    });

                let languagesDiv = document.createElement('div');
                languagesDiv.classList.add('repo-description')
                languagesDiv.innerHTML = "Languages used: <br>";
                let total = 0;

                for (const key in languages) {
                    total += languages[key];
                }

                for (const key in languages) {
                    let language = key;
                    let languageValue = languages[key];
                    let languagePercentage = (languageValue / total) * 100;
                    languagePercentage = languagePercentage == 100 ? 100 : languagePercentage.toFixed(2);
                    languagesDiv.innerHTML += " " + language + ": " + languagePercentage + "% <br>";
                }

                let newRepo = document.createElement('div');
                newRepo.classList.add('gh-repos');


                let repoTitle = document.createElement('a');

                repoTitle.classList.add('repo-title');
                repoTitle.innerHTML = repo.name;
                repoTitle.setAttribute('href', repo.html_url);

                newRepo.appendChild(repoTitle);
                newRepo.appendChild(languagesDiv);

                repoDiv.appendChild(newRepo);
            })
        })



}

fetchRepos()

