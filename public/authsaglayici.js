const isim = document.getElementById("isim");
const eposta = document.getElementById("eposta");
const sifre = document.getElementById("sifre");
const okul = document.getElementById("okul");
const sinif = document.getElementById("sinif");
const bolum = document.getElementById("bolum");
const cv = document.getElementById("cv");
const gsifre = document.getElementById("gsifre");
const geposta = document.getElementById("geposta");
const termCon = document.getElementById("termCon");


let cvData;
let passData = "";
cv.addEventListener('change', (event) => {
    const file = event.target.files[0];

    // Dosyayı base64 kodlu bir string'e dönüştürme
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result.split(',')[1];

      // Base64 kodlu string'i JSON objesinde saklama
      const fileObj = {
        filename: file.name,
        type: file.type,
        data: base64String
      };

      // JSON objesini yerel depolamaya kaydetme
      cvData = JSON.stringify(fileObj); 
}});

async function Sifrele(sifrelenecek = ""){
  await fetch('/api/hash', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: `{"sifre": "${sifrelenecek}"}`
})
.then(response => response.text())
.then(hash => {
    passData = hash;
  })
}

async function KayitOl(){
  if(!termCon.checked) {
    alert("Kullanım Şartlarını Kabul Edin.")
    return;
  }
  if(isim.value && eposta.value && sifre.value && okul.value && bolum.value && cvData)
    {
    showYukleniyor();
    await Sifrele(sifre.value)
    let res = await fetch("https://turk-biyologlar-dernegi.glitch.me/kullanicilarapi", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: `{"veri": {
    "isim": "${isim.value}",
    "eposta": "${eposta.value}",
    "sifre": "${passData}",
    "okul": "${okul.value}",
    "sinif": "${sinif.value}",
    "bolum": "${bolum.value}",
    "cv": ${cvData}
    }}`,
});
    window.location.reload();
}
  else{
    alert("Lütfen tüm bilgileri doldurun.")
  }
}

async function GirisYap(){
  await Sifrele(gsifre.value)
  await fetch('/girisapi', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: `{"sifre": "${passData}", "eposta": "${geposta.value}"}`
})
.then(response => response.text())
.then(hash => {
    if(hash == "evet")
      {
        localStorage.setItem("girisb", geposta.value)
        window.location.href = "/profil"
      }
    else{
      alert("Hatalı Şifre veya E-Posta Adresi")
    }
  })
}

function showYukleniyor(){
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