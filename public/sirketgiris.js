const gsifre = document.getElementById("gsifre");
const geposta = document.getElementById("geposta");
let passData;

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

async function SirketVerileri(){
  await Sifrele(gsifre.value)
  await fetch('./sirketler.json')
    .then((response) => response.json())
    .then((json) => SirketMail(json));
}

async function SirketMail(json){
  let sirket = json.sirketler.find(k => k.eposta === geposta.value);
  
  let kullaniciHash = sirket ? sirket.sifre : "yok";
  
  if(passData == kullaniciHash)
    {
        window.location.href = "/sirketler/sirket/panel"
        localStorage.setItem("girisb", "----sirket----")
        localStorage.setItem("sirketad", sirket.isim)
        localStorage.setItem("sirketmail", sirket.eposta)
        if(localStorage.getItem("isim"))
          {
       		 	localStorage.removeItem("isim");
   					localStorage.removeItem("okul");
    				localStorage.removeItem("sinif");
    				localStorage.removeItem("bolum");
          }
    }
  else{
    alert("Hatalı E-Posta veya Şifre")
  }
}