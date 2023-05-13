const baslikBb = document.getElementById("baslik");
const aciklamaBb = document.getElementById("aciklama");
const firmaBb = document.getElementById("firma");
const yerBb = document.getElementById("yer");
const tarihBb = document.getElementById("tarih");
const ilpostaa = document.getElementById("eposta");
const firmayy = document.getElementById("firmay");
const epostayy = document.getElementById("epostay");
const deneyler = document.getElementById("London");
const deneyler2 = document.getElementById("Gecmis");
const deneyler3 = document.getElementById("Londonn");
const deneyler4 = document.getElementById("Gecmiss");
const ebaslikBb = document.getElementById("ebaslik");
const eaciklamaBb = document.getElementById("eaciklama");
const efirmaBb = document.getElementById("efirma");
const linkBb = document.getElementById("link");
const etarihBb = document.getElementById("etarih");

let resimm;
let eresimm;

function dlgHide(){
    var whitebg = document.getElementById("white-background");
    var dlg = document.getElementById("dlgbox");
    whitebg.style.display = "none";
    dlg.style.display = "none";
}

function showDialog(){
    var whitebg = document.getElementById("white-background");
    var dlg = document.getElementById("dlgbox");
    whitebg.style.display = "block";
    dlg.style.display = "block";

    var winWidth = window.innerWidth;

    dlg.style.left = (winWidth/2) - 480/2 + "px";
    dlg.style.top = "150px";
}

async function dlgOK(){
  dlgHide();
  let date = new Date(tarihBb.value);
  let res = await fetch("/veritabani", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: `{"baslik": "${baslikBb.value}", "aciklama": "${aciklamaBb.value}", "firma": "${firmaBb.value}", "tarih": "${date.getDate().toString() + "." + date.getMonth().toString() + "." + date.getFullYear().toString()}", "saat": "${date.getHours().toString() + ":" + date.getMinutes().toString()}", "yer": "${yerBb.value}", "resim": "${resimm}", "times": "${date.getTime().toString()}", "iletisim": "${epostayy.innerText}"}`,
});
  if(res.status != 200)
    {
      var link = prompt("Yüklediğiniz resim ile ilgili bir hata oluştu. Resim çok büyük. İsterseniz resmi url olarak yazabilirsiniz.");
      if(link.length > 1)
        {
      let res = await fetch("/veritabani", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: `{"baslik": "${baslikBb.value}", "aciklama": "${aciklamaBb.value}", "firma": "${firmaBb.value}", "tarih": "${date.getDate().toString() + "." + date.getMonth().toString() + "." + date.getFullYear().toString()}", "saat": "${date.getHours().toString() + ":" + date.getMinutes().toString()}", "yer": "${yerBb.value}", "resim": "${link}", "times": "${date.getTime().toString()}", "iletisim": "${epostayy.innerText}"}`,
});
        }
    }
  window.location.reload();

}

function edlgHide(){
    var whitebg = document.getElementById("white-background");
    var dlg = document.getElementById("edlgbox");
    whitebg.style.display = "none";
    dlg.style.display = "none";
}

function eshowDialog(){
    var whitebg = document.getElementById("white-background");
    var dlg = document.getElementById("edlgbox");
    whitebg.style.display = "block";
    dlg.style.display = "block";

    var winWidth = window.innerWidth;


    if (window.matchMedia("(max-width: 600px)").matches){
      dlg.style.left = "10%";
      dlg.style.width = "80%"
    }
    else{
      dlg.style.left = (winWidth/2) - 480/2 + "px";
    }
    dlg.style.top = "50%";
    dlg.style.transform = "translateY(-50%)"
}

async function edlgOK(){
  edlgHide();
  if(localStorage.getItem("girisb").includes("--sirket--")){
  let date = new Date(etarihBb.value);
  //https://turk-biyologlar-dernegi.glitch.me/onetkinlikekle
  let res = await fetch("/onetkinlikekle", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: `{"baslik": "${ebaslikBb.value}", "aciklama": "${eaciklamaBb.value}", "firma": "${efirmaBb.value}", "tarih": "${date.getDate().toString() + "." + date.getMonth().toString() + "." + date.getFullYear().toString()}", "saat": "${date.getHours().toString() + ":" + date.getMinutes().toString()}", "link": "${linkBb.value}", "resim": "${eresimm}", "times": "${date.getTime().toString()}", "iletisim": "${epostayy.innerText}"}`,
});
  if(res.status != 200)
    {
      var link = prompt("Yüklediğiniz resim ile ilgili bir hata oluştu. Resim çok büyük. İsterseniz resmi url olarak yazabilirsiniz.");
      if(link.length > 1)
        {
      let res = await fetch("/onetkinlikekle", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: `{"baslik": "${ebaslikBb.value}", "aciklama": "${eaciklamaBb.value}", "firma": "${efirmaBb.value}", "tarih": "${date.getDate().toString() + "." + date.getMonth().toString() + "." + date.getFullYear().toString()}", "saat": "${date.getHours().toString() + ":" + date.getMinutes().toString()}", "link": "${linkBb.value}", "resim": "${link}", "times": "${date.getTime().toString()}", "iletisim": "${epostayy.innerText}"}`,
});
        }
    }
  window.location.reload();
}
}

document.querySelector("#resim").addEventListener("change", function(){
  const reader = new FileReader();
  
  reader.addEventListener("load", function(){
    resimm = reader.result;
  });
  
  reader.readAsDataURL(this.files[0]);
});

document.querySelector("#eresim").addEventListener("change", function(){
  const reader = new FileReader();
  
  reader.addEventListener("load", function(){
    eresimm = reader.result;
  });
  
  reader.readAsDataURL(this.files[0]);
});

let jsonVeriii;
let jsonVeriiii;
let posta = localStorage.getItem("sirketmail")
async function Load(){
  await fetch("/kartlar")
            .then((response) => response.json())
            .then((json) => jsonVeriii = json);
          
          
            let htmlCode =
    `
<table class="w3-table w3-bordered w3-border">
<tbody><tr>
<th >Deney</th>
<th >Yer</th>
<th >Zaman</th>
</tr>
            
  `;
          jsonVeriii.aciklamalar.forEach(function(singleElephantObjects) {
            let index = jsonVeriii.aciklamalar.indexOf(singleElephantObjects)
            if(jsonVeriii.iletisimler[index] != posta)
             {
               return;
             }
    htmlCode =
    htmlCode +
    `   
<tr><td>${jsonVeriii.basliklar[index]}</td><td>${jsonVeriii.yerler[index]}</td><td>${jsonVeriii.tarihler[index]} - ${jsonVeriii.saatler[index]}</td><td><a id="${index}" class="w3-btn btnsmall w3-red w3-round-large w3-right silici" style="margin: 4px;">Sil</a></td></tr>

  `;

            
});

 htmlCode = htmlCode + "</tbody></table> ";

  deneyler.innerHTML = htmlCode;
  
              let htmlCode2 =
    `
<table class="w3-table w3-bordered w3-border">
<tbody><tr>
<th >Deney</th>
<th >Yer</th>
<th >Zaman</th>
</tr>
            
  `;
          jsonVeriii.aciklamalar.forEach(function(singleElephantObjects) {
            let index = jsonVeriii.aciklamalar.indexOf(singleElephantObjects)
            if(jsonVeriii.iletisimler[index] != posta)
             {
               return;
             }
            if(jsonVeriii.tsler[index] > Date.now())
						{
  						return;
						}

    htmlCode2 =
    htmlCode2 +
    `   
<tr><td>${jsonVeriii.basliklar[index]}</td><td>${jsonVeriii.yerler[index]}</td><td>${jsonVeriii.tarihler[index]} - ${jsonVeriii.saatler[index]}</td><td><a id="${index}" class="w3-btn btnsmall w3-red w3-round-large w3-right silici" style="margin: 4px;">Sil</a></td></tr>

  `;

            
});

 htmlCode2 = htmlCode2 + "</tbody></table> ";

  deneyler2.innerHTML = htmlCode2;
  
  var coll = document.getElementsByClassName("silici");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    var indexx = this.id;
    silsil(indexx);
  });
}
  
  
  await fetch("/etkinlikkartlari")
            .then((response) => response.json())
            .then((json) => jsonVeriiii = json);
          
          
            let htmlCode3 =
    `
<table class="w3-table w3-bordered w3-border">
<tbody><tr>
<th >Deney</th>
<th >Link</th>
<th >Zaman</th>
</tr>
            
  `;
          jsonVeriiii.aciklamalar.forEach(function(singleElephantObjects) {
            let index = jsonVeriiii.aciklamalar.indexOf(singleElephantObjects)
            if(jsonVeriiii.iletisimler[index] != posta)
             {
               return;
             }
    htmlCode3 =
    htmlCode3 +
    `   
<tr><td>${jsonVeriiii.basliklar[index]}</td><td><a href="${jsonVeriiii.linkler[index]}">Toplantıya Linki</a></td><td>${jsonVeriiii.tarihler[index]} - ${jsonVeriiii.saatler[index]}</td><td><a id="${index}" class="w3-btn btnsmall w3-red w3-round-large w3-right esilici" style="margin: 4px;">Sil</a></td></tr>

  `;

            
});

 htmlCode3 = htmlCode3 + "</tbody></table> ";

  deneyler3.innerHTML = htmlCode3;
  
              let htmlCode4=
    `
<table class="w3-table w3-bordered w3-border">
<tbody><tr>
<th >Deney</th>
<th >Link</th>
<th >Zaman</th>
</tr>
            
  `;
          jsonVeriiii.aciklamalar.forEach(function(singleElephantObjects) {
            let index = jsonVeriiii.aciklamalar.indexOf(singleElephantObjects)
            if(jsonVeriiii.iletisimler[index] != posta)
             {
               return;
             }
            if(jsonVeriiii.tsler[index] > Date.now())
						{
  						return;
						}

    htmlCode4=
    htmlCode4+
    `   
<tr><td>${jsonVeriiii.basliklar[index]}</td><td><a href="${jsonVeriiii.linkler[index]}">Toplantıya Linki</a></td><td>${jsonVeriiii.tarihler[index]} - ${jsonVeriiii.saatler[index]}</td><td><a id="${index}" class="w3-btn btnsmall w3-red w3-round-large w3-right esilici" style="margin: 4px;">Sil</a></td></tr>

  `;

            
});

 htmlCode4= htmlCode4+ "</tbody></table> ";

  deneyler4.innerHTML = htmlCode4
  
  var coll = document.getElementsByClassName("esilici");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    var indexx = this.id;
    onsilsil(indexx);
  });
}
}

Load();


async function silsil(ind){
    let res = await fetch("https://turk-biyologlar-dernegi.glitch.me/silsilsil", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: `{"index": "${ind}"}`,
});
    window.location.reload();
}

async function onsilsil(ind){
  //https://turk-biyologlar-dernegi.glitch.me/onsilsilsil
    let res = await fetch("/onsilsilsil", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: `{"index": "${ind}"}`,
});
    window.location.reload();
}