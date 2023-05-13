const yonetEkran = document.getElementById("asdasd");
const tumDeneyEkran = document.getElementById("asdasda");
const tumEtkinlikEkran = document.getElementById("asdasdas");
const etkinlikEkran = document.getElementById("asdasdasd");
const mailV = document.getElementById("eposta");
const baslikV = document.getElementById("konu");
const icerikV = document.getElementById("icerik");
const isimV = document.getElementById("isim");
const bvrMail = document.getElementById("bvr_eposta");
const bvrIsim = document.getElementById("bvr_isim");
const bvrOkul = document.getElementById("bvr_okul");
const bvrBolum = document.getElementById("bvr_bolum");
const bvrSinif = document.getElementById("bvr_sinif");
const gonderbtn = document.getElementById("gonderbtn");
const basliktxt = document.getElementById("bvr-header");
const alttxt = document.getElementById("bvr-alt");
const bvrBilgi = document.getElementById("bvr_bilgi");
const bvrBilgiCon = document.getElementById("bvr_bilgicon");
const kullaniciIsim = document.getElementById("kulkaniciisim");

var mailci;
var deneyb;
var mailci_bvr;
var deneyb_bvr;

let jsonVeri;

async function GirisKontrol(){
await fetch("/kartlar")
            .then((response) => response.json())
            .then((json) => jsonVeri = json);
          
          
            let htmlCode =
    `
     <h3 class="etkinlik-header" style="margin-top: 50px; max-width: 100%; color: #7157d3">
          Deneyler
        </h3>
        <p class="">Deneyleri aşağıda görüntüleyebilirsiniz.</p>
        
        <button class="etkinlik-coll" id="hepsinigor">
          <a href="/deneyler">Hepsini Gör</a>
        </button>
                          <div class="etkinlik-content" style="width: 100%; grid-template-rows: auto auto auto; padding: 0; ">
                          
            
  `;
          jsonVeri.aciklamalar.forEach(function(singleElephantObjects) {
            let index = jsonVeri.aciklamalar.indexOf(singleElephantObjects)
    htmlCode =
    htmlCode +
    `   

<div class="card etkinlik-card">
          <div class="card__image-container">
            <img  
              src="${jsonVeri.resimler[index]}"
            />
          </div>
          <div class="card__content">
            <p class="card__title text--medium">
              <b>${jsonVeri.basliklar[index]}</b>
            </p>
            <div id="altacik${index}" style="display: none">
              <p class="card__aciklama" style="font-size:1.5rem; font-weight:500; margin-bottom:-1rem">Açıklama</p>
              <br>
              <p class="card__aciklama">${jsonVeri.aciklamalar[index]}</p>
              <div class="card__info">
                <div class="card__sec" style:"background-color: white;">
                  <p class="card__altbasliklar" style="font-size:1.25rem; font-weight:500;"><b>Firma</b></p>
                  <p class= card__altbasliklar" style="margin-top: -15px; color:white;">${jsonVeri.firmalar[index]}</p>
                </div>
                <div class="card__sec" style="margin-left: auto; white-space: initial;">
                  <p class="card__altbasliklar" style="font-size:1.25rem; font-weight:500"><b>Yer</b></p>
                  <p class="card__altbasliklar" style="margin-top: -15px">${jsonVeri.yerler[index]}</p>
                </div>
              </div>
              <div class = "card__info">
                <div class="card__sec">
                  <p class="card__altbasliklar" style="font-size:1.25rem; font-weight:500"><b>Tarih</b></p>
                  <p class="card__altbasliklar" style="margin-top: -15px">${jsonVeri.tarihler[index]}</p>
                </div>
                <div class="card__sec" style="margin-left: auto; word-wrap: break-word">
                  <p class="card__altbasliklar" style="font-size:1.25rem; font-weight:500"><b>Saat</b></p>
                  <p class="card__altbasliklar" style="margin-top: -15px">${jsonVeri.saatler[index]}</p>
                </div>
              </div>
            </div>
            <div class="card__info">
              <p class="text--medium" style="margin-left: auto"></p>
              <div id="${jsonVeri.iletisimler[index]}"> </div>
              <p class="card__iletisim text--medium iletisimm" id="iletisim${index}">İletişim</p>
              <div id="${jsonVeri.iletisimler[index]}"> </div>
              <p class="card__iletisim text--medium basvurr" id="basvur${index}">Başvur</p>
              <p class="card__price text--medium detayy" id="detay${index}">Detaylar</p>
            </div>
          </div>
        </div>
  `;

            
});
                    htmlCode = htmlCode + "</div>";

  if (yonetEkran) {
    yonetEkran.innerHTML = htmlCode;
  }




            let htmlCode2 =
    `  
    <h3 class="" style="margin-top: 50px; max-width: 100%; color: #7157d3">
          Deneyler
        </h3>
        <p class="">Deneyleri aşağıda görüntüleyebilirsiniz.</p>
        
                          <div class="etkinlik-content etkinlik-content-sayfa" style="width: 100%; grid-template-rows: auto auto auto; padding: 0; overflow: visible"; max-height: fit-content; background-color: red;>
                          
            
  `;
          jsonVeri.aciklamalar.forEach(function(singleElephantObjects) {
            let index = jsonVeri.aciklamalar.indexOf(singleElephantObjects)
    htmlCode2 =
    htmlCode2 +
    `   

<div style="display: inline-flex; flex-direction: column; word-wrap: break-word; background-color: #7157d3; margin-left: 1rem; margin-right: 1rem; max-height: 25rem; height:fit-content; margin-top:1rem; " class="card etkinlik-card etkinlik-card-sayfa etkinlik-card-sayfa">
          <div class="card__image-container">
            <img  
              src="${jsonVeri.resimler[index]}"
            />
          </div>
          <div class="card__content">
            <p class="card__title text--medium">
              <b>${jsonVeri.basliklar[index]}</b>
            </p>
            <div id="altacik${index}" style="display: none">
              <p class="card__aciklama" style="font-size:1.5rem; font-weight:500; margin-bottom:-1rem;">Açıklama</p>
              <br>
              <p class="card__aciklama">${jsonVeri.aciklamalar[index]}</p>
              <div class="card__info">
                <div class="card__sec" style:"background-color: white;">
                  <p class="card__altbasliklar" style="font-size:1.25rem; font-weight:500"><b>Firma</b></p>
                  <p class= card__altbasliklar" style="margin-top: -15px; color:white;">${jsonVeri.firmalar[index]}</p>
                </div>
                <div class="card__sec" style="margin-left: auto; white-space: initial;">
                  <p class="card__altbasliklar" style="font-size:1.25rem; font-weight:500"><b>Yer</b></p>
                  <p class="card__altbasliklar" style="margin-top: -15px">${jsonVeri.yerler[index]}</p>
                </div>
              </div>
              <div class = "card__info">
                <div class="card__sec">
                  <p class="card__altbasliklar" style="font-size:1.25rem; font-weight:500"><b>Tarih</b></p>
                  <p class="card__altbasliklar" style="margin-top: -15px">${jsonVeri.tarihler[index]}</p>
                </div>
                <div class="card__sec" style="margin-left: auto; word-wrap: break-word">
                  <p class="card__altbasliklar" style="font-size:1.25rem; font-weight:500"><b>Saat</b></p>
                  <p class="card__altbasliklar" style="margin-top: -15px">${jsonVeri.saatler[index]}</p>
                </div>
              </div>
            </div>
            <div class="card__info">
              <p class="text--medium" style="margin-left: auto"></p>
              <div id="${jsonVeri.iletisimler[index]}"> </div>
              <p class="card__iletisim text--medium iletisimm" id="iletisim${index}">İletişim</p>
              <div id="${jsonVeri.iletisimler[index]}"> </div>
              <p class="card__iletisim text--medium basvurr" id="iletisim${index}">Başvur</p>
              <p class="card__price text--medium detayyy" id="detay${index}">Detaylar</p>
            </div>
          </div>
        </div>
  `;

            
});

                    htmlCode2 = htmlCode2 + "</div>";

  if (tumDeneyEkran){
    tumDeneyEkran.innerHTML = htmlCode2;
  }
  
var coll = document.getElementsByClassName("detayy");
var i;
var content;
var concard;
var iletisim;
var basvur;
var etkinlikCard;
var etkinlikColl = document.getElementById("hepsinigor");
var etkinlikContent = etkinlikColl?.nextElementSibling;
var count = 0;

function sizeFunc(){
        if (window.matchMedia("(max-width: 1300px)").matches && !window.matchMedia("(max-width: 600px)").matches){
          etkinlikContent.style.maxHeight = "340px";
        }
        else if (window.matchMedia("(max-width: 600px)").matches){  
          etkinlikContent.style.maxHeight = "375px";
        }
        else{
          etkinlikContent.style.maxHeight = "450px"
        }
}

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    content = this.parentElement.previousElementSibling;
    basvur = this.previousElementSibling;
    iletisim = basvur.previousElementSibling.previousElementSibling;
    etkinlikCard = content.parentElement.parentElement;


    if (content.style.display === "block") {
      content.style.display = "none";
      iletisim.style.display = "none";
      basvur.style.display = "none";
      etkinlikContent.style.transition = "0s";
        count--
      if(etkinlikContent.style.maxHeight !== "fit-content" && count == 0) {
        sizeFunc()
        etkinlikCard.style.maxHeight = "25rem"
      }
    } else {
      content.style.display = "block";
      iletisim.style.display = "block";
      basvur.style.display = "block";
      concard = this.parentElement.previousElementSibling.parentElement;
      concard.style.transition = "all 0.9s ease 0s;";
      etkinlikContent.style.transition = "0.2s";
      count++
      etkinlikCard.style.maxHeight = "50rem"
      if(etkinlikContent.style.maxHeight !== "fit-content") {
        console.log(etkinlikContent.style.maxHeight)
        console.log(etkinlikCard.scrollHeight + "px")
        if (etkinlikContent.style.maxHeight <= etkinlikCard.scrollHeight + "px"){
          etkinlikContent.style.maxHeight = etkinlikCard.scrollHeight + "px"
        }
        console.log(etkinlikContent.style.maxHeight)
        console.log(etkinlikCard.scrollHeight)
      }
    }    
  });
}

var coll2 = document.getElementsByClassName("detayyy");
var i;
var content;
var concard;
var iletisim;
var basvur;
var etkinlikCard;
var count = 0;

for (i = 0; i < coll2.length; i++) {
  coll2[i].addEventListener("click", function() {
    content = this.parentElement.previousElementSibling;
    basvur = this.previousElementSibling;
    iletisim = basvur.previousElementSibling.previousElementSibling;
    etkinlikCard = content.parentElement.parentElement;
    var etkinlikContent = etkinlikCard.parentElement;


    if (content.style.display === "block") {
      content.style.display = "none";
      iletisim.style.display = "none";
      basvur.style.display = "none";
      etkinlikContent.style.transition = "0s";
        count--
    } else {
      content.style.display = "block";
      iletisim.style.display = "block";
      basvur.style.display = "block";
      concard = this.parentElement.previousElementSibling.parentElement;
      concard.style.transition = "all 0.9s ease 0s;";
      etkinlikContent.style.transition = "0.2s";
      count++
      etkinlikCard.style.maxHeight = "50rem"
    }    
  });
}
var colll = document.getElementsByClassName("iletisimm");
var ii;

for (ii = 0; ii < colll.length; ii++) {
  colll[ii].addEventListener("click", function() {
    mailci = this.previousElementSibling.id;
    deneyb = this.parentElement.previousElementSibling.previousElementSibling.innerText;
    showDialog();
  });
}
  
var collll = document.getElementsByClassName("basvurr");
var iii;

for (iii = 0; iii < collll.length; iii++) {
  collll[iii].addEventListener("click", function() {
    mailci = this.previousElementSibling.id;
    deneyb = this.parentElement.previousElementSibling.previousElementSibling.innerText;
    bvrBilgiCon.style.display = 'block';
    gonderbtn.innerHTML = 'Gönder';
    basliktxt.innerHTML = 'Başvuru Yap';
    alttxt.innerHTML = 'Aşağıdaki bilgileri doldurun.';
    BasvuruyuYap();
  });
}
}

EtkinlikKontrol();
GirisKontrol();

async function EtkinlikKontrol(){
  //https://turk-biyologlar-dernegi.glitch.me/etkinlikkartlari
await fetch("/etkinlikkartlari")
            .then((response) => response.json())
            .then((json) => jsonVeri = json);
          
          
            let htmlCode =
    `
     <h3 class="w3-border-black etkinlik-header" style="margin-top: 50px; max-width: 100%; color: #7157d3;">
              Online Etkinlikler
            </h3>
            <p class=" ">Online etkinlikleri aşağıda görüntüleyebilirsiniz.</p>

        
                          <button class="etkinlik-coll" id="hepsinigor2">
                            <a href="/etkinlikler">Hepsini Gör</a>
                          </button>
                          <div class="etkinlik-content">
            
  `;
          jsonVeri.aciklamalar.forEach(function(singleElephantObjects) {
            let index = jsonVeri.aciklamalar.indexOf(singleElephantObjects)
    htmlCode =
    htmlCode +
    `   
    
<div  class="card etkinlik-card">
          <div class="card__image-container">
            <img
              src="${jsonVeri.resimler[index]}"
            />
          </div>
          <div class="card__content">
            <p class="card__title text--medium">
            <b>${jsonVeri.basliklar[index]}</b>
            </p>
            <div id="altacik${index}" style="display: none">
              <p class="card__aciklama" style="font-size:1.5rem; font-weight:500;">Açıklama</p>
              <p class="card__aciklama">${jsonVeri.aciklamalar[index]}</p>
              <div class="card__info">
                <div class="card__sec" style:"background-color: white;white-space: initial;">
                  <p class="card__altbasliklar" style="font-size:1.25rem; font-weight:500"><b>Firma</b></p>
                  <p class= card__altbasliklar" style="margin-top: -15px; color:white;">${jsonVeri.firmalar[index]}</p>
                </div>
                <div class="card__sec" style="" >
                  <p class="card__altbasliklar" style="font-size:1.25rem; font-weight:500"><b>Tarih</b></p>
                  <p class="card__altbasliklar" style="margin-top: -15px">${jsonVeri.tarihler[index]}</p>
                </div>
              </div>
              <div class="card__info">
                <div class="card__sec" style="">
                  <p class="card__altbasliklar" style="font-size:1.25rem; font-weight:500"><b>Saat</b></p>
                  <p class="card__altbasliklar" style="margin-top: -15px">${jsonVeri.saatler[index]}</p>
                </div>
                <div class="card__sec" style=" word-wrap: break-word">
                  <p class="card__altbasliklar" style="font-size:1.25rem; font-weight:500"><b>Zoom Linki</b></p>
                  <p class="card__altbasliklar" style="margin-top: -15px"><a href="${jsonVeri.linkler[index]}">Toplantıya Katıl</a></p>
                </div>
              </div>
            </div>
            <div class="card__info">
              <p class="text--medium" style="margin-left: auto"></p>
              <div id="${jsonVeri.iletisimler[index]}"> </div>
              <p class="card__iletisim text--medium eiletisimm" id="iletisim${index}">İletişim</p>
              <p class="card__price text--medium edetayyyy" id="detay${index}">Detaylar</p>
            </div>
          </div>
        </div>
  `;

            
});
                    htmlCode = htmlCode + "</div>";

  if(etkinlikEkran){
    etkinlikEkran.innerHTML = htmlCode;
  }


              let htmlCode3 =
    `
     <h3 class=" w3-border-black " style="margin-top: 50px; max-width: 100%; color: #7157d3;">
              Online Etkinlikler
            </h3>
            <p class=" ">Online etkinlikleri aşağıda görüntüleyebilirsiniz.</p>

        
                          <div class="etkinlik-content etkinlik-card-sayfa" style="width: 100%; grid-template-rows: auto auto auto; padding: 0;">
            
  `;
          jsonVeri.aciklamalar.forEach(function(singleElephantObjects) {
            let index = jsonVeri.aciklamalar.indexOf(singleElephantObjects)
    htmlCode3 =
    htmlCode3 +
    `   
    
<div style="display: inline-flex; flex-direction: column; word-wrap: break-word; background-color: #7157d3; margin-left: 1rem; margin-right: 1rem; max-height: 25rem; height:fit-content; margin-top:1rem; " class="card etkinlik-card etkinlik-card-sayfa">
          <div class="card__image-container">
            <img
              src="${jsonVeri.resimler[index]}"
            />
          </div>
          <div class="card__content">
            <p class="card__title text--medium">
            <b>${jsonVeri.basliklar[index]}</b>
            </p>
            <div id="altacik${index}" style="display: none">
              <p class="card__aciklama" style="font-size:1.5rem; font-weight:500;">Açıklama</p>
              <p class="card__aciklama">${jsonVeri.aciklamalar[index]}</p>
              <div class="card__info">
                <div class="card__sec" style:"background-color: white;white-space: initial;">
                  <p class="card__altbasliklar" style="font-size:1.25rem; font-weight:500"><b>Firma</b></p>
                  <p class= card__altbasliklar" style="margin-top: -15px; color:white">${jsonVeri.firmalar[index]}</p>
                </div>
                <div class="card__sec" style="" >
                  <p class="card__altbasliklar" style="font-size:1.25rem; font-weight:500"><b>Tarih</b></p>
                  <p class="card__altbasliklar" style="margin-top: -15px">${jsonVeri.tarihler[index]}</p>
                </div>
              </div>
              <div class="card__info">
                <div class="card__sec" style="">
                  <p class="card__altbasliklar" style="font-size:1.25rem; font-weight:500"><b>Saat</b></p>
                  <p class="card__altbasliklar" style="margin-top: -15px">${jsonVeri.saatler[index]}</p>
                </div>
                <div class="card__sec" style=" word-wrap: break-word">
                  <p class="card__altbasliklar" style="font-size:1.25rem; font-weight:500"><b>Zoom Linki</b></p>
                  <p class="card__altbasliklar" style="margin-top: -15px"><a href="${jsonVeri.linkler[index]}">Toplantıya Katıl</a></p>
                </div>
              </div>
            </div>
            <div class="card__info">
              <p class="text--medium" style="margin-left: auto"></p>
              <div id="${jsonVeri.iletisimler[index]}"> </div>
              <p class="card__iletisim text--medium eiletisimm" id="iletisim${index}">İletişim</p>
              <p class="card__price text--medium edetayy" id="detay${index}">Detaylar</p>
            </div>
          </div>
        </div>
  `;

            
});
                    htmlCode3 = htmlCode3 + "</div>";

    if(tumEtkinlikEkran){
        tumEtkinlikEkran.innerHTML = htmlCode3;
    }

var coll3 = document.getElementsByClassName("edetayyyy");
var i;
var content;
var concard;
var iletisim;
var basvur;
var etkinlikCard;
var etkinlikColl = document.getElementById("hepsinigor2");
var etkinlikContent = etkinlikColl?.nextElementSibling;
var count = 0;

  
function sizeFunc(){
        if (window.matchMedia("(max-width: 1300px)").matches && !window.matchMedia("(max-width: 600px)").matches){
          etkinlikContent.style.maxHeight = "340px";
        }
        else if (window.matchMedia("(max-width: 600px)").matches){  
          etkinlikContent.style.maxHeight = "375px";
        }
        else{
          etkinlikContent.style.maxHeight = "400px"
        }
}
  
for (i = 0; i < coll3.length; i++) {
  coll3[i].addEventListener("click", function() {
    content = this.parentElement.previousElementSibling;
    basvur = this.previousElementSibling;
    iletisim = basvur.previousElementSibling.previousElementSibling;
    etkinlikCard = content.parentElement.parentElement;


    if (content.style.display === "block") {
      content.style.display = "none";
      iletisim.style.display = "none";
      basvur.style.display = "none";
      etkinlikContent.style.transition = "0s";
        count--
      if(etkinlikContent.style.maxHeight !== "fit-content" && count == 0) {
        sizeFunc()
        etkinlikCard.style.maxHeight = "25rem"
      }
    } else {
      content.style.display = "block";
      iletisim.style.display = "block";
      basvur.style.display = "block";
      concard = this.parentElement.previousElementSibling.parentElement;
      concard.style.transition = "all 0.9s ease 0s;";
      etkinlikContent.style.transition = "0.2s";
      count++
      etkinlikCard.style.maxHeight = "100rem"
      if(etkinlikContent.style.maxHeight !== "fit-content") {
        console.log(etkinlikContent.style.maxHeight)
        console.log(etkinlikCard.scrollHeight + "px")
        if (etkinlikContent.style.maxHeight <= etkinlikCard.scrollHeight + "px"){
          etkinlikContent.style.maxHeight = etkinlikCard.scrollHeight + "px"
        }
        console.log(etkinlikContent.style.maxHeight)
        console.log(etkinlikCard.scrollHeight)
      }
    } 
  });
}

  
var coll = document.getElementsByClassName("edetayy");
var i;
var content;
var concard;
var iletisim;
var basvur;
var etkinlikCard;
var count = 0;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    content = this.parentElement.previousElementSibling;
    basvur = this.previousElementSibling;
    iletisim = basvur.previousElementSibling.previousElementSibling;
    etkinlikCard = content.parentElement.parentElement;
    var etkinlikContent = etkinlikCard.parentElement;


    if (content.style.display === "block") {
      content.style.display = "none";
      iletisim.style.display = "none";
      basvur.style.display = "none";
      etkinlikContent.style.transition = "0s";
        count--
      if(etkinlikContent.style.maxHeight !== "fit-content" && count == 0) {
        etkinlikCard.style.maxHeight = "fit-content"
      }
    } else {
      content.style.display = "block";
      iletisim.style.display = "block";
      basvur.style.display = "block";
      concard = this.parentElement.previousElementSibling.parentElement;
      concard.style.transition = "all 0.9s ease 0s;";
      etkinlikContent.style.transition = "0.2s";
      count++
      etkinlikCard.style.maxHeight = "fit-content"
    }    
  });
}



var colll = document.getElementsByClassName("eiletisimm");
var ii;

for (ii = 0; ii < coll.length; ii++) {
  colll[ii].addEventListener("click", function() {
    mailci = this.previousElementSibling.id;
    deneyb = this.parentElement.previousElementSibling.previousElementSibling.innerText;
    showDialog();
  });
}
}

let cv2;
async function BilgiyiAl(){
  let eposta = localStorage.getItem("girisb")
  await fetch('/bilgiapi', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: `{"eposta": "${eposta}"}`
})
.then(response => response.json())
.then(hash => {
    localStorage.setItem("isim", hash.isim)
    localStorage.setItem("okul", hash.okul)
    localStorage.setItem("bolum", hash.bolum)
    localStorage.setItem("sinif", hash.sinif)
    cv2 = hash.cv
  })
}

BilgiyiAl();

async function BasvuruyuYap(){
      if(localStorage.getItem("sonbas"))
      {
        if(localStorage.getItem("sonbas") == deneyb)
          {return;}
      }
  
if(!localStorage.getItem("girisb") || !localStorage.getItem("girisb").includes("@") && !localStorage.getItem("girisb").includes(".")  && localStorage.getItem("girisb").includes("--sirket--"))
  {
  return;
  }    
    showYukleniyor();
    let index = jsonVeri.basliklar.indexOf(deneyb)
    let res = await fetch("/basvurularapi", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: `{"veri": {
    "deney": "${deneyb}",
    "firma": "${jsonVeri.firmalar[index]}",
    "yer": "${jsonVeri.yerler[index]}",
    "zaman": "${jsonVeri.tarihler[index]} -- ${jsonVeri.saatler[index]}",
    "durum": "Onay Bekliyor",
    "times": "${jsonVeri.tsler[index]}",
    "girisb": "${localStorage.getItem("girisb")}"
    }}`,
});
    let ress = await fetch("/basvuruat", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sinif: localStorage.getItem("sinif"), okul: localStorage.getItem("okul"), bolum: localStorage.getItem("bolum"), mail: mailci, isim: localStorage.getItem("isim"), kmail: localStorage.getItem("girisb"), deneyb: deneyb, dosyaadi: cv2.filename, dosyaturu: cv2.filetype, dosyacontent: cv2.data })
});
  localStorage.setItem("sonbas", deneyb)
  window.location.reload();
}

function dlgHide(){
    enableScroll();
    var whitebg = document.getElementById("white-background");
    var dlg = document.getElementById("dlgbox");
    whitebg.style.display = "none";
    dlg.style.display = "none";
}

function showDialog(){
    disableScroll();
    var whitebg = document.getElementById("white-background");
    var dlg = document.getElementById("dlgbox");
    whitebg.style.display = "block";
    dlg.style.display = "block";

    var winWidth = window.innerWidth;


    if (window.matchMedia("(max-width: 600px)").matches){
      dlg.style.left = "10%";
    }
    else{
      dlg.style.left = (winWidth/2) - 480/2 + "px";
    }
    dlg.style.top = "50%";
    dlg.style.transform = "translateY(-50%)"
}

function bvrHide(){
    enableScroll();
    var whitebg = document.getElementById("white-background");
    var dlg = document.getElementById("basvurdialog");
    whitebg.style.display = "none";
    dlg.style.display = "none";
}

function showBasvur(){
    disableScroll();
    var whitebg = document.getElementById("white-background");
    var dlg = document.getElementById("basvurdialog");
    whitebg.style.display = "block";
    dlg.style.display = "block";

    var winWidth = window.innerWidth;


    if (window.matchMedia("(max-width: 600px)").matches){
      dlg.style.left = "10%";
    }
    else{
      dlg.style.left = (winWidth/2) - 480/2 + "px";
    }
    dlg.style.top = "50%";
    dlg.style.transform = "translateY(-50%)"
  
    if (typeof(Storage) !== "undefined") {
  		bvrIsim.value = localStorage.getItem("isim");
      bvrMail.value = localStorage.getItem("eposta");
  		bvrOkul.value = localStorage.getItem("okul");
  		bvrBolum.value = localStorage.getItem("bolum");
  		bvrSinif.value = localStorage.getItem("sinif");
		}
}

function dlgCancel(){
    dlgHide();
}

async function dlgOK(){

  dlgHide();
  let date = new Date();
  let icicerik = icerikV.value.replace(/(?:\r\n|\r|\n)/g, '<br />');
  //https://turk-biyologlar-dernegi.glitch.me/mailat
  let res = await fetch("/mailat", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: `{"baslik": "${baslikV.value}", "aciklama": "${icicerik}", "mail": "${mailci}", "isim": "${isimV.value}", "kmail": "${mailV.value}", "deneyb": "${deneyb}"}`,
});
}

function bvrCancel(){
    bvrHide();
}

async function bvrOK(){
    if(gonderbtn.innerText == "Kaydet" || bvrBilgi.checked)
    {
      if (typeof(Storage) !== "undefined") {
  			localStorage.setItem("isim", bvrIsim.value);
        localStorage.setItem("eposta", bvrMail.value);
  			localStorage.setItem("okul", bvrOkul.value);
  			localStorage.setItem("bolum", bvrBolum.value);
  			localStorage.setItem("sinif", bvrSinif.value);
            let ress = await fetch("/bilgiguncelle", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ eposta: localStorage.getItem("girisb"), isim: bvrIsim.value, okul: bvrOkul.value, bolum: bvrBolum.value, sinif: bvrSinif.value})
});
        bvrHide();
        window.location.reload();
			}
    }
  else
    {
  bvrHide();
  let date = new Date();
  let icicerik = icerikV.value.replace(/(?:\r\n|\r|\n)/g, '<br />');
  //https://turk-biyologlar-dernegi.glitch.me/basvuruat
  let res = await fetch("/basvuruat", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: `{"sinif": "${bvrSinif.value}", "okul": "${bvrOkul.value}", "bolum": "${bvrBolum.value}", "mail": "${mailci}", "isim": "${bvrIsim.value}", "kmail": "${bvrMail.value}", "deneyb": "${deneyb}"}`,
});
}
}
function disableScroll() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop; 
    let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    window.onscroll = function() {
      window.scrollTo(scrollLeft, scrollTop);
    };
   }
   
function enableScroll() {
    window.onscroll = function() {};
}

function BasvuruBilgisi(){
  bvrBilgiCon.style.display = 'none';
  gonderbtn.innerHTML = 'Kaydet';
  basliktxt.innerHTML = 'Başvuru Bilgileri';
  alttxt.innerHTML = 'Başvuru Bilgilerinizi önceden kaydedin.';
  if(localStorage.getItem("girisb") || localStorage.getItem("girisb").includes("@") && localStorage.getItem("girisb").includes(".")  && !localStorage.getItem("girisb").includes("--sirket--"))
    {
        window.location.href = "/profil"
    }
  else if(localStorage.getItem("girisb") || localStorage.getItem("girisb").includes("--sirket--"))
    {
      window.location.href = "/sirketler/sirket/panel"
    }
  else{
      window.location.href = "/giris"
  }
}

function BasvuruBilgisi2(){
  bvrBilgiCon.style.display = 'none';
  gonderbtn.innerHTML = 'Kaydet';
  basliktxt.innerHTML = 'Başvuru Bilgileri';
  alttxt.innerHTML = 'Başvuru Bilgilerinizi önceden kaydedin.';
  showBasvur();
}

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

if(localStorage.getItem("isim")){
  kullaniciIsim.innerText = localStorage.getItem("isim")
}
else if(localStorage.getItem("girisb") || localStorage.getItem("girisb").includes("--sirket--"))
  {
      kullaniciIsim.innerText = localStorage.getItem("sirketad")
  }


function showYukleniyor(){
    disableScroll();
    var whitebg = document.getElementById("white-background");
    var dlg = document.getElementById("yukleniyor");
    whitebg.style.display = "block";
    dlg.style.display = "block";

    var winWidth = window.innerWidth;


    if (window.matchMedia("(max-width: 600px)").matches){
      dlg.style.left = "10%";
    }
    else{
      dlg.style.left = (winWidth/2) - 480/2 + "px";
    }
    dlg.style.top = "50%";
    dlg.style.transform = "translateY(-50%)"
}