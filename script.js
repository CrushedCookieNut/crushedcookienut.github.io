//to je da se expanda glasba sekcija
document.getElementById("gumbek").addEventListener("click", function() {
    const wolfAlice = document.querySelector(".wolf-alice");
    const gracie = document.querySelector(".gracie");

    const isHidden = window.getComputedStyle(wolfAlice).display === "none";

    if (isHidden) {
        wolfAlice.style.display = "flex";
        gracie.style.display = "flex";
        this.textContent = "Pokaži manj";
    } else {
        wolfAlice.style.display = "none";
        gracie.style.display = "none";
        this.textContent = "Pokaži več";
    }
});

//to je da se expanda knjige sekcija
document.getElementById("gumbek2").addEventListener("click", function() {
    const ifilwh = document.querySelector(".ifilwh");
    const nlmg = document.querySelector(".nlmg");
    const punpun = document.querySelector(".punpun");

    const isHidden = window.getComputedStyle(ifilwh).display === "none";

    if (isHidden) {
        ifilwh.style.display = "flex";
        nlmg.style.display = "flex";
        punpun.style.display = "flex";
        this.textContent = "Pokaži manj";
    } else {
        ifilwh.style.display = "none";
        nlmg.style.display = "none";
        punpun.style.display = "none";
        this.textContent = "Pokaži več";
    }
});

//to je preloader
window.addEventListener("load", function() {
    const preloader = document.getElementById("preloader");
    preloader.style.display = "none";
});

//spreminjanje teme
const sprememba = document.getElementById('sprememba-teme');
const ikonica = document.getElementById('ikonica');

window.addEventListener('load', () => {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        ikonica.src = './images/moon-icon-sm-2075566368.png';
        ikonica.alt = 'Dark Mode';
    }
});

sprememba.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');

    ikonica.src = isDarkMode 
    ? `./images/moon-icon-sm-2075566368.png?${new Date().getTime()}` 
    : `./images/sun-icon-md-953167610.png?${new Date().getTime()}`;

    ikonica.alt = isDarkMode ? 'Dark Mode' : 'Light Mode';

    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});

//to je, da se na mobile nav-bar spremeni v tri črtice
const hamburger = document.getElementById('hamburger');
const navList = document.getElementById('nav-list');

hamburger.addEventListener('click', () => {
    navList.classList.toggle('show');
});

//to je, da se poscrolla dol, ko expandamo glasba
document.getElementById('gumbek').addEventListener('click', function() {
    const kamPojdem = document.getElementById('wolf-alice');
    kamPojdem.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

//to je, da se poscrolla fol, ko expandamo knjige
document.getElementById('gumbek2').addEventListener('click', function() {
    const kamPojdem = document.getElementById('ifilwh');
    kamPojdem.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

//tuki je, da se pokaže uno oknce, ko pritisnemo bea slikico
document.getElementById('bea-zbirka').addEventListener('click', function() {
    document.getElementById('zbirka').style="display: block;";
})

//to je, da izgine moja bea kolekcija :/
document.getElementById('close').addEventListener('click', function() {
    document.getElementById('zbirka').style="display: none;";
})
  
  