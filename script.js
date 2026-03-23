var pasek = document.createElement("div");
pasek.id = "pasek-postepu";
document.body.prepend(pasek);

window.addEventListener("scroll", function () {
  var scrollTop = window.scrollY;
  var wysokosc = document.documentElement.scrollHeight - window.innerHeight;
  var procent = (scrollTop / wysokosc) * 100;
  pasek.style.width = procent + "%";
});

var karty = document.querySelectorAll(".karta");

karty.forEach(function (karta, index) {
  setTimeout(function () {
    karta.classList.add("widoczna");
  }, index * 100);
});

function animujLiczbe(element, doWartosci, czas) {
  var aktualna = 0;
  var krok = Math.max(10, Math.floor(czas / doWartosci));
  var timer = setInterval(function () {
    aktualna += 1;
    element.innerText = "👁 Liczba odwiedzin tej strony: " + aktualna;
    if (aktualna >= doWartosci) {
      clearInterval(timer);
    }
  }, krok);
}

var przyciskGora = document.createElement("button");
przyciskGora.innerText = "▲ Góra";
przyciskGora.style.cssText =
  "position: fixed;" +
  "bottom: 30px;" +
  "right: 30px;" +
  "background-color: #e94560;" +
  "color: white;" +
  "border: none;" +
  "padding: 12px 18px;" +
  "font-size: 15px;" +
  "border-radius: 6px;" +
  "cursor: pointer;" +
  "display: none;" +
  "transition: transform 0.2s ease;";
document.body.appendChild(przyciskGora);

przyciskGora.addEventListener("mouseover", function () {
  przyciskGora.style.transform = "scale(1.1)";
});
przyciskGora.addEventListener("mouseout", function () {
  przyciskGora.style.transform = "scale(1)";
});

window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    przyciskGora.style.display = "block";
  } else {
    przyciskGora.style.display = "none";
  }
});

przyciskGora.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

if (karty.length > 0) {
  var main = document.querySelector("main");

  var wyszukiwarka = document.createElement("input");
  wyszukiwarka.type = "text";
  wyszukiwarka.placeholder = "🔍 Szukaj...";
  wyszukiwarka.style.cssText =
    "width: 100%;" +
    "padding: 12px;" +
    "font-size: 16px;" +
    "border: 2px solid #e94560;" +
    "border-radius: 6px;" +
    "margin-bottom: 20px;" +
    "box-sizing: border-box;" +
    "transition: box-shadow 0.3s ease;";

  wyszukiwarka.addEventListener("focus", function () {
    wyszukiwarka.style.boxShadow = "0 0 8px rgba(233, 69, 96, 0.4)";
  });
  wyszukiwarka.addEventListener("blur", function () {
    wyszukiwarka.style.boxShadow = "none";
  });

  main.insertBefore(wyszukiwarka, main.firstChild);

  wyszukiwarka.addEventListener("keyup", function () {
    var szukanyTekst = wyszukiwarka.value.toLowerCase();
    karty.forEach(function (karta) {
      var tekstKarty = karta.innerText.toLowerCase();
      if (tekstKarty.includes(szukanyTekst)) {
        karta.style.display = "block";
      } else {
        karta.style.display = "none";
      }
    });
  });
}

karty.forEach(function (karta) {
  karta.style.cursor = "pointer";
  karta.addEventListener("click", function () {
    if (karta.style.backgroundColor === "rgb(230, 230, 230)") {
      karta.style.backgroundColor = "white";
    } else {
      karta.style.backgroundColor = "#e6e6e6";
    }
  });
});

var odwiedziny = localStorage.getItem("licznik-odwiedzin");
if (odwiedziny === null) {
  odwiedziny = 0;
}
odwiedziny = parseInt(odwiedziny) + 1;
localStorage.setItem("licznik-odwiedzin", odwiedziny);

var stopka = document.querySelector("footer");
if (stopka) {
  var licznikInfo = document.createElement("p");
  licznikInfo.style.cssText = "font-size: 13px; color: #aaaaaa; margin-top: 8px;";
  licznikInfo.innerText = "👁 Liczba odwiedzin tej strony: 0";
  stopka.appendChild(licznikInfo);
  animujLiczbe(licznikInfo, odwiedziny, 800);
}

var formularz = document.getElementById("formularz");
if (formularz) {
  var przyciskWyslij = document.getElementById("przycisk-wyslij");

  przyciskWyslij.addEventListener("click", function () {
    var imie   = document.getElementById("pole-imie");
    var email  = document.getElementById("pole-email");
    var temat  = document.getElementById("pole-temat");
    var tresc  = document.getElementById("pole-tresc");
    var sukces = document.getElementById("sukces");

    var bladImie  = document.getElementById("blad-imie");
    var bladEmail = document.getElementById("blad-email");
    var bladTemat = document.getElementById("blad-temat");
    var bladTresc = document.getElementById("blad-tresc");

    bladImie.innerText  = "";
    bladEmail.innerText = "";
    bladTemat.innerText = "";
    bladTresc.innerText = "";

    imie.classList.remove("trzesienie");
    email.classList.remove("trzesienie");
    temat.classList.remove("trzesienie");
    tresc.classList.remove("trzesienie");

    var poprawny = true;

    if (imie.value.trim() === "") {
      bladImie.innerText = "⚠ Wpisz swoje imię lub nick.";
      void imie.offsetWidth;
      imie.classList.add("trzesienie");
      poprawny = false;
    }

    if (email.value.trim() === "" || !email.value.includes("@")) {
      bladEmail.innerText = "⚠ Wpisz poprawny adres e-mail.";
      void email.offsetWidth;
      email.classList.add("trzesienie");
      poprawny = false;
    }

    if (temat.value === "") {
      bladTemat.innerText = "⚠ Wybierz temat wiadomości.";
      void temat.offsetWidth;
      temat.classList.add("trzesienie");
      poprawny = false;
    }

    if (tresc.value.trim().length < 10) {
      bladTresc.innerText = "⚠ Wiadomość musi mieć co najmniej 10 znaków.";
      void tresc.offsetWidth;
      tresc.classList.add("trzesienie");
      poprawny = false;
    }

    if (poprawny) {
      sukces.style.display = "block";
      imie.value  = "";
      email.value = "";
      temat.value = "";
      tresc.value = "";
    }
  });
}

var przelacznik = document.createElement("button");
przelacznik.className = "przelacznik-tryb";

var zapisanyTryb = localStorage.getItem("tryb");
if (zapisanyTryb === "ciemny") {
  document.body.classList.add("ciemny");
  przelacznik.innerText = "☀️ Jasny";
} else {
  przelacznik.innerText = "🌙 Ciemny";
}

var nav = document.querySelector("nav");
nav.appendChild(przelacznik);

przelacznik.addEventListener("click", function () {
  document.body.classList.toggle("ciemny");
  if (document.body.classList.contains("ciemny")) {
    przelacznik.innerText = "☀️ Jasny";
    localStorage.setItem("tryb", "ciemny");
  } else {
    przelacznik.innerText = "🌙 Ciemny";
    localStorage.setItem("tryb", "jasny");
  }
});

var nazwaGry = document.getElementById("nazwa-gry");
if (nazwaGry) {
  var gry = [
    "The Witcher 3",
    "Minecraft",
    "Elden Ring",
    "Fortnite",
    "Counter-Strike 2",
    "Cyberpunk 2077",
    "God of War: Ragnarök",
    "Diablo IV",
    "League of Legends"
  ];
  var losowa = gry[Math.floor(Math.random() * gry.length)];
  nazwaGry.innerText = losowa;
}

var cytaty = [
  '"Życie jest za krótkie, żeby grać w złe gry." - Unknown',
  '"Nie przegrywasz. Uczysz się." - Unknown',
  '"Każdy poziom trudności to szansa, nie przeszkoda." - Unknown',
  '"Gry to sztuka opowiadana przez gracza." - Unknown',
  '"Wciśnij start i zacznij przygodę." - Unknown',
  '"Najlepsza gra to ta, w którą grasz z przyjaciółmi." - Unknown',
  '"Game over to nie koniec. To dopiero początek." - Unknown'
];

var losowyCytat = cytaty[Math.floor(Math.random() * cytaty.length)];

var pasekCytatu = document.createElement("div");
pasekCytatu.innerText = "🎮 " + losowyCytat;
pasekCytatu.style.cssText =
  "background-color: #1a1a2e;" +
  "color: #ffffff;" +
  "text-align: center;" +
  "padding: 10px 20px;" +
  "font-size: 14px;" +
  "font-style: italic;" +
  "animation: wjazd-dol 0.6s ease both;";

var navElement = document.querySelector("nav");
navElement.insertAdjacentElement("afterend", pasekCytatu);

var premieraData = new Date("2025-12-31T00:00:00");

var licznikDiv = document.createElement("div");
licznikDiv.id = "licznik-premiery";
licznikDiv.style.cssText =
  "background-color: #e94560;" +
  "color: white;" +
  "text-align: center;" +
  "padding: 14px 20px;" +
  "font-size: 15px;" +
  "font-weight: bold;";

pasekCytatu.insertAdjacentElement("afterend", licznikDiv);

function aktualizujLicznik() {
  var teraz = new Date();
  var roznica = premieraData - teraz;

  if (roznica <= 0) {
    licznikDiv.innerText = "🎉 GTA VI już jest dostępne!";
    return;
  }

  var dni     = Math.floor(roznica / (1000 * 60 * 60 * 24));
  var godziny = Math.floor((roznica % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minuty  = Math.floor((roznica % (1000 * 60 * 60)) / (1000 * 60));
  var sekundy = Math.floor((roznica % (1000 * 60)) / 1000);

  licznikDiv.innerText =
    "🚀 Premiera GTA VI za: " +
    dni + "d " +
    godziny + "h " +
    minuty + "m " +
    sekundy + "s";
}

aktualizujLicznik();
setInterval(aktualizujLicznik, 1000);

var canvas = document.createElement("canvas");
canvas.style.cssText =
  "position: fixed;" +
  "top: 0;" +
  "left: 0;" +
  "width: 100%;" +
  "height: 100%;" +
  "pointer-events: none;" +
  "z-index: 0;";
document.body.appendChild(canvas);

var ctx = canvas.getContext("2d");
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", function () {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
});

var symbole = ["🎮", "🕹️", "⚔️", "🏆", "⭐"];
var czasteczki = [];

for (var i = 0; i < 18; i++) {
  czasteczki.push({
    x:       Math.random() * window.innerWidth,
    y:       Math.random() * window.innerHeight,
    rozmiar: Math.random() * 16 + 12,
    predkosc: Math.random() * 0.6 + 0.2,
    bujanie:  Math.random() * 2,
    kat:      Math.random() * Math.PI * 2,
    symbol:   symbole[Math.floor(Math.random() * symbole.length)]
  });
}

function rysuj() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  czasteczki.forEach(function (c) {
    c.y       += c.predkosc;
    c.kat     += 0.01;
    c.x       += Math.sin(c.kat) * c.bujanie;

    if (c.y > canvas.height + 30) {
      c.y = -30;
      c.x = Math.random() * canvas.width;
    }

    ctx.globalAlpha = 0.18;
    ctx.font = c.rozmiar + "px Arial";
    ctx.fillText(c.symbol, c.x, c.y);
    ctx.globalAlpha = 1;
  });

  requestAnimationFrame(rysuj);
}

rysuj();