const firebase = require('firebase/app');
require('firebase/auth');
const express = require("express");
const crypto = require('crypto');
const app = express();
const path = require("path");
const db = require("quick.db");
var nodemailer = require('nodemailer');

// our default array of dreams
const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

var bodyParser = require('body-parser')
app.use(express.json({ limit: '14mb' }));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/panel", (request, response) => {
  response.sendFile(__dirname + "/views/panel.html");
});

app.get("/giris", (request, response) => {
  response.sendFile(__dirname + "/views/login.html");
});

app.get("/sirketgiris", (request, response) => {
  response.sendFile(__dirname + "/views/sirketlogin.html");
});

app.get("/profil", (request, response) => {
  response.sendFile(__dirname + "/views/profil.html");
});

app.get("/sirketler/sirket/panel", (request, response) => {
  response.sendFile(__dirname + "/views/diagnotech.html");
});
app.get("/sirketler/diagnotech/detaylar", (request, response) => {
  response.sendFile(__dirname + "/views/sirketDetails.html");
});
app.get("/deneyler", (request, response) => {
  response.sendFile(__dirname + "/views/tümDeneyler.html");
});
app.get("/etkinlikler", (request, response) => {
  response.sendFile(__dirname + "/views/tümEtkinlikler.html");
});

app.get("/aaa", (request, response) => {
  response.send(db.get("df")[0]);
});

// send the default array of dreams to the webpage
app.get("/dreams", (request, response) => {
  // express helps us take JS objects and send them as JSON
  response.json(dreams);
});

app.get("/silsil", (request, response) => {
  db.delete("veriler");
  db.set("veriler.veri", []);
  db.set("veriler.basliklar", []);
  response.send("Silindi");
});

app.get("/kulsilsil", (request, response) => {
  db.delete("kullanicilar");
  db.set("kullanicilar", []);
  response.send("Silindi");
});

app.get("/bassilsil", (request, response) => {
  db.delete("basvurular");
  db.set("basvurular", []);
  response.send("Silindi");
});

app.get("/onsilsil", (request, response) => {
  db.delete("onlineetkinlik");
  db.set("onlineetkinlik.veri", []);
  db.set("onlineetkinlik.basliklar", []);
  response.send("Silindi");
});

app.post('/kullanicilarapi', function(req, res) {
    var kveri = req.body.veri;
  
    db.push("kullanicilar", kveri);

    res.json(dreams);
});

app.post('/basvurularapi', function(req, res) {
    var kveri = req.body.veri;
  
    db.push("basvurular", kveri);

    res.json(dreams);
});

app.post('/veritabani', function(req, res) {
    var baslik = req.body.baslik,
        aciklama = req.body.aciklama,
        firma = req.body.firma,
        tarih = req.body.tarih,
        saat = req.body.saat,
        yer = req.body.yer,
        resim = req.body.resim,
        times = req.body.times,
        iletisim = req.body.iletisim;
  
    db.push("veriler.basliklar", baslik);
    db.push("veriler.aciklamalar", aciklama);
    db.push("veriler.firmalar", firma);
    db.push("veriler.tarihler", tarih);
    db.push("veriler.saatler", saat);
    db.push("veriler.yerler", yer);
    db.push("veriler.resimler", resim);
    db.push("veriler.tsler", times);
    db.push("veriler.iletisimler", iletisim);
    db.push("veriler.veri", true);

    res.json(dreams);
});

app.post('/onetkinlikekle', function(req, res) {
    var baslik = req.body.baslik,
        aciklama = req.body.aciklama,
        firma = req.body.firma,
        tarih = req.body.tarih,
        saat = req.body.saat,
        link = req.body.link,
        resim = req.body.resim,
        times = req.body.times,
        iletisim = req.body.iletisim;
  
    db.push("onlineetkinlik.basliklar", baslik);
    db.push("onlineetkinlik.aciklamalar", aciklama);
    db.push("onlineetkinlik.firmalar", firma);
    db.push("onlineetkinlik.tarihler", tarih);
    db.push("onlineetkinlik.saatler", saat);
    db.push("onlineetkinlik.linkler", link);
    db.push("onlineetkinlik.resimler", resim);
    db.push("onlineetkinlik.tsler", times);
    db.push("onlineetkinlik.iletisimler", iletisim);
    db.push("onlineetkinlik.veri", true);

    res.json(dreams);
});

app.post('/silsilsil', function(req, res) {
    var index = req.body.index;
  
  var basliklar = db.get("veriler.basliklar")
  var aciklamalar = db.get("veriler.aciklamalar")
  var firmalar = db.get("veriler.firmalar")
  var tarihler = db.get("veriler.tarihler")
  var saatler = db.get("veriler.saatler")
  var yerler = db.get("veriler.yerler")
  var resimler = db.get("veriler.resimler")
  var timestamplar = db.get("veriler.tsler")
  var iletisimler = db.get("veriler.iletisimler")
  
  basliklar.splice(index, 1);
  aciklamalar.splice(index, 1);
  firmalar.splice(index, 1);
  tarihler.splice(index, 1);
  saatler.splice(index, 1);
  yerler.splice(index, 1);
  resimler.splice(index, 1);
  timestamplar.splice(index, 1);
  iletisimler.splice(index, 1);
  
  
    db.set("veriler.basliklar", basliklar);
    db.set("veriler.aciklamalar", aciklamalar);
    db.set("veriler.firmalar", firmalar);
    db.set("veriler.tarihler", tarihler);
    db.set("veriler.saatler", saatler);
    db.set("veriler.yerler", yerler);
    db.set("veriler.resimler", resimler);
    db.set("veriler.tsler", timestamplar);
    db.set("veriler.iletisimler", iletisimler);
  
  if(basliklar.length < 1)
    {
  db.delete("veriler");
  db.set("veriler.veri", []);
  db.set("veriler.basliklar", []);
  res.send(".str");
    }
  
    res.json(dreams);
});

app.post('/onsilsilsil', function(req, res) {
    var index = req.body.index;
  
  var basliklar = db.get("onlineetkinlik.basliklar")
  var aciklamalar = db.get("onlineetkinlik.aciklamalar")
  var firmalar = db.get("onlineetkinlik.firmalar")
  var tarihler = db.get("onlineetkinlik.tarihler")
  var saatler = db.get("onlineetkinlik.saatler")
  var linkler = db.get("onlineetkinlik.linkler")
  var resimler = db.get("onlineetkinlik.resimler")
  var timestamplar = db.get("onlineetkinlik.tsler")
  var iletisimler = db.get("onlineetkinlik.iletisimler")
  
  basliklar.splice(index, 1);
  aciklamalar.splice(index, 1);
  firmalar.splice(index, 1);
  tarihler.splice(index, 1);
  saatler.splice(index, 1);
  linkler.splice(index, 1);
  resimler.splice(index, 1);
  timestamplar.splice(index, 1);
  iletisimler.splice(index, 1);
  
  
    db.set("onlineetkinlik.basliklar", basliklar);
    db.set("onlineetkinlik.aciklamalar", aciklamalar);
    db.set("onlineetkinlik.firmalar", firmalar);
    db.set("onlineetkinlik.tarihler", tarihler);
    db.set("onlineetkinlik.saatler", saatler);
    db.set("onlineetkinlik.linkler", linkler);
    db.set("onlineetkinlik.resimler", resimler);
    db.set("onlineetkinlik.tsler", timestamplar);
    db.set("onlineetkinlik.iletisimler", iletisimler);
  
  if(basliklar.length < 1)
    {
  db.delete("onlineetkinlik");
  db.set("onlineetkinlik.veri", []);
  db.set("onlineetkinlik.basliklar", []);
  res.send(".str");
    }
  
    res.json(dreams);
});

app.post('/mailat', async function(req, res) {
    var baslik = req.body.baslik,
        aciklama = req.body.aciklama,
        gmail = req.body.mail,
        isim = req.body.isim,
        kmail = req.body.kmail,
        deneyb = req.body.deneyb;


    var transporter = nodemailer.createTransport({
     service: 'hotmail',
     auth: {
       user: 'tekbiyo@hotmail.com',
       pass: 'tek123biyo'
     }
   });

   var mailOptions = {
     from: 'tekbiyo@hotmail.com',
     to: gmail,
     subject: baslik,
     html: `
     <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<!--[if gte mso 9]>
<xml>
  <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
</xml>
<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
  <title></title>
  
    <style type="text/css">
      @media only screen and (min-width: 620px) {
  .u-row {
    width: 600px !important;
  }
  .u-row .u-col {
    vertical-align: top;
  }

  .u-row .u-col-100 {
    width: 600px !important;
  }

}

@media (max-width: 620px) {
  .u-row-container {
    max-width: 100% !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  .u-row .u-col {
    min-width: 320px !important;
    max-width: 100% !important;
    display: block !important;
  }
  .u-row {
    width: 100% !important;
  }
  .u-col {
    width: 100% !important;
  }
  .u-col > div {
    margin: 0 auto;
  }
}
body {
  margin: 0;
  padding: 0;
}

table,
tr,
td {
  vertical-align: top;
  border-collapse: collapse;
}

p {
  margin: 0;
}

.ie-container table,
.mso-container table {
  table-layout: fixed;
}

* {
  line-height: inherit;
}

a[x-apple-data-detectors='true'] {
  color: inherit !important;
  text-decoration: none !important;
}

table, td { color: #000000; } @media (max-width: 480px) { #u_content_heading_6 .v-container-padding-padding { padding: 20px 10px 40px !important; } #u_content_heading_6 .v-font-size { font-size: 20px !important; } #u_content_text_deprecated_7 .v-container-padding-padding { padding: 30px 10px 10px !important; } #u_content_text_deprecated_8 .v-container-padding-padding { padding: 10px 10px 30px !important; } #u_content_text_deprecated_9 .v-container-padding-padding { padding: 10px 10px 20px !important; } }
    </style>
  
  

<!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap" rel="stylesheet" type="text/css"><!--<![endif]-->

</head>

<body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f8f8fc;color: #000000">
  <!--[if IE]><div class="ie-container"><![endif]-->
  <!--[if mso]><div class="mso-container"><![endif]-->
  <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f8f8fc;width:100%" cellpadding="0" cellspacing="0">
  <tbody>
  <tr style="vertical-align: top">
    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f8f8fc;"><![endif]-->
    

<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" style="background-color: #bdd1f9;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="background-color: #bdd1f9;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table id="u_content_heading_6" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:25px 10px 50px;font-family:'Open Sans',sans-serif;" align="left">
        
  <h1 class="v-font-size" style="margin: 0px; line-height: 140%; text-align: center; word-wrap: break-word; font-size: 22px; "><strong>Kullanıcı iletişim formu üzerinden size ulaştı.</strong></h1>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" style="background-color: #ffffff;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="background-color: #ffffff;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table id="u_content_text_deprecated_7" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:50px 50px 0px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-font-size" style="line-height: 140%; text-align: justify; word-wrap: break-word;">
    <p style="line-height: 140%;"><span style="font-size: 16px; line-height: 22.4px;"><strong>Kullanıcı: ${isim}</strong></span></p>
<p style="line-height: 140%; font-size: 14px;"><span style="font-size: 16px; line-height: 22.4px;"><strong>Kullanıcı E-Posta Adresi: ${kmail}</strong></span></p>
<p style="line-height: 140%; font-size: 14px;"><span style="font-size: 16px; line-height: 22.4px;"><strong>Deney: ${deneyb}</strong></span></p>
<p style="line-height: 140%; font-size: 14px;"> </p>
<p style="line-height: 140%; font-size: 14px;"><span style="font-size: 18px; line-height: 25.2px;"><strong>Konu: ${baslik}</strong></span></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table id="u_content_text_deprecated_8" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:25px 10px 50px 50px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-font-size" style="line-height: 160%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 18px; line-height: 28.8px;"><strong>İçerik;</strong></span></p>
<p style="font-size: 14px; line-height: 160%;"><span style="font-size: 14px; line-height: 28.8px;">${aciklama}</span></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table id="u_content_text_deprecated_9" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 100px 20px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-font-size" style="line-height: 170%; text-align: center; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 170%;"> </p>
<p style="font-size: 14px; line-height: 170%;"> </p>
<p style="font-size: 14px; line-height: 170%;"> </p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:'Open Sans',sans-serif;" align="left">
        
  <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
          <span>&#160;</span>
        </td>
      </tr>
    </tbody>
  </table>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>


    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
    </td>
  </tr>
  </tbody>
  </table>
  <!--[if mso]></div><![endif]-->
  <!--[if IE]></div><![endif]-->
</body>

</html>`
   };

   await transporter.sendMail(mailOptions, function(error, info){
   if (error) {
       console.log(error);
     } else {
       console.log('Email sent: ' + info.response);
     }
   });
  
    res.json(dreams);
});

app.post('/basvuruat', async function(req, res) {
    var gmail = req.body.mail,
        isim = req.body.isim,
        kmail = req.body.kmail,
        okul = req.body.okul,
        bolum = req.body.bolum,
        sinif = req.body.sinif,
        deneyb = req.body.deneyb,
        dosyaadi = req.body.dosyaadi,
        dosyaturu = req.body.dosyaturu,
        dosyacontent = req.body.dosyacontent;

    var transporter = nodemailer.createTransport({
     service: 'hotmail',
     auth: {
       user: 'tekbiyo@hotmail.com',
       pass: 'tek123biyo'
     }
   });

   var mailOptions = {
     from: 'tekbiyo@hotmail.com',
     to: gmail,
     subject: "Bir kullanıcı bir deney için başvuruda bulundu.",
     html: `
     <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<!--[if gte mso 9]>
<xml>
  <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
</xml>
<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
  <title></title>
  
    <style type="text/css">
      @media only screen and (min-width: 620px) {
  .u-row {
    width: 600px !important;
  }
  .u-row .u-col {
    vertical-align: top;
  }

  .u-row .u-col-100 {
    width: 600px !important;
  }

}

@media (max-width: 620px) {
  .u-row-container {
    max-width: 100% !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  .u-row .u-col {
    min-width: 320px !important;
    max-width: 100% !important;
    display: block !important;
  }
  .u-row {
    width: 100% !important;
  }
  .u-col {
    width: 100% !important;
  }
  .u-col > div {
    margin: 0 auto;
  }
}
body {
  margin: 0;
  padding: 0;
}

table,
tr,
td {
  vertical-align: top;
  border-collapse: collapse;
}

p {
  margin: 0;
}

.ie-container table,
.mso-container table {
  table-layout: fixed;
}

* {
  line-height: inherit;
}

a[x-apple-data-detectors='true'] {
  color: inherit !important;
  text-decoration: none !important;
}

table, td { color: #000000; } @media (max-width: 480px) { #u_content_heading_6 .v-container-padding-padding { padding: 20px 10px 40px !important; } #u_content_heading_6 .v-font-size { font-size: 20px !important; } #u_content_text_deprecated_7 .v-container-padding-padding { padding: 30px 10px 10px !important; } #u_content_text_deprecated_8 .v-container-padding-padding { padding: 10px 10px 30px !important; } #u_content_text_deprecated_9 .v-container-padding-padding { padding: 10px 10px 20px !important; } }
    </style>
  
  

<!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap" rel="stylesheet" type="text/css"><!--<![endif]-->

</head>

<body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f8f8fc;color: #000000">
  <!--[if IE]><div class="ie-container"><![endif]-->
  <!--[if mso]><div class="mso-container"><![endif]-->
  <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f8f8fc;width:100%" cellpadding="0" cellspacing="0">
  <tbody>
  <tr style="vertical-align: top">
    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f8f8fc;"><![endif]-->
    

<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" style="background-color: #bdd1f9;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="background-color: #bdd1f9;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table id="u_content_heading_6" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:25px 10px 50px;font-family:'Open Sans',sans-serif;" align="left">
        
  <h1 class="v-font-size" style="margin: 0px; line-height: 140%; text-align: center; word-wrap: break-word; font-size: 22px; "><strong>Bir Kullanıcı Bir Deneye Başvurdu.</strong></h1>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" style="background-color: #ffffff;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="background-color: #ffffff;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table id="u_content_text_deprecated_7" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:50px 50px 0px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-font-size" style="line-height: 140%; text-align: justify; word-wrap: break-word;">
    <p style="line-height: 140%;"><span style="font-size: 16px; line-height: 22.4px;"><strong>Kullanıcı: </strong>${isim}</span></p>
<p style="line-height: 140%; font-size: 14px;"><span style="font-size: 16px; line-height: 22.4px;"><strong>Kullanıcı E-Posta Adresi: </strong>${kmail}</span></p>
<p style="line-height: 140%; font-size: 14px;"><span style="font-size: 16px; line-height: 22.4px;"><strong>Okuduğu Okul: </strong>${okul}</span></p>
<p style="line-height: 140%; font-size: 14px;"><span style="font-size: 16px; line-height: 22.4px;"><strong>Okuduğu Bölüm: </strong>${bolum}</span></p>
<p style="line-height: 140%; font-size: 14px;"><span style="font-size: 16px; line-height: 22.4px;"><strong>Okuduğu Sınıf: </strong>${sinif}</span></p>
<p style="line-height: 140%; font-size: 14px;"><span style="font-size: 16px; line-height: 22.4px;"><strong>Deney: </strong>${deneyb}</span></p>
<p style="line-height: 140%; font-size: 14px;"> </p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table id="u_content_text_deprecated_8" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:25px 10px 50px 50px;font-family:'Open Sans',sans-serif;" align="left">

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table id="u_content_text_deprecated_9" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 100px 20px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-font-size" style="line-height: 170%; text-align: center; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 170%;"> </p>
<p style="font-size: 14px; line-height: 170%;"> </p>
<p style="font-size: 14px; line-height: 170%;"> </p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:'Open Sans',sans-serif;" align="left">
        
  <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
          <span>&#160;</span>
        </td>
      </tr>
    </tbody>
  </table>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>


    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
    </td>
  </tr>
  </tbody>
  </table>
  <!--[if mso]></div><![endif]-->
  <!--[if IE]></div><![endif]-->
</body>

</html>`,
      attachments: [{
        filename: dosyaadi,
        content: dosyacontent,
        contentType: dosyaturu,
        encoding: 'base64'
        }]
   };

   await transporter.sendMail(mailOptions, function(error, info){
   if (error) {
       console.log(error);
     } else {
       console.log('Email sent: ' + info.response);
     }
   });
  
    res.json(dreams);
});

app.get("/kartlar", (request, response) => {
  response.send(db.get("veriler"));
});

app.get("/tumkullanici", (request, response) => {
  response.send(db.get("kullanicilar"));
});

app.get("/tumbasvuru", (request, response) => {
  response.send(db.get("basvurular"));
});

app.get("/etkinlikkartlari", (request, response) => {
  response.send(db.get("onlineetkinlik"));
});

/*app.get("/test", (request, response) => {
  var d = new Date("2008-06-23T10:10");
  var y = d.getHours();
  response.send(y.toString());
});*/

app.post('/api/hash', (req, res) => {
  const password = req.body.sifre;

  const hash = crypto.createHash('sha256');
  hash.update(password);
  const passwordHash = hash.digest('hex');

  // Hash değerini istemciye gönder
  res.send(passwordHash);
});

app.post('/girisapi', (req, res) => {
  const password = req.body.sifre;
  const eposta = req.body.eposta
  
  let kullanicilar = db.get("kullanicilar")
  let kullanici = kullanicilar.find(k => k.eposta === eposta);
  
  let kullaniciHash = kullanici ? kullanici.sifre : "yok";
  if(kullaniciHash == password)
    {
      res.send("evet")
    }
  else{
    res.send("hayir")
  }
  // Hash değerini istemciye gönder
});

app.post('/bilgiapi', (req, res) => {
  const eposta = req.body.eposta
  
  let kullanicilar = db.get("kullanicilar")
  let kullanici = kullanicilar.find(k => k.eposta === eposta);
  
  let kullaniciIsim = kullanici ? kullanici.isim : "";
  let kullaniciPosta = kullanici ? kullanici.eposta : "";
  let kullaniciOkul = kullanici ? kullanici.okul : "";
  let kullaniciSinif = kullanici ? kullanici.sinif : "";
  let kullaniciBolum = kullanici ? kullanici.bolum : "";
  let kullaniciCV = kullanici ? kullanici.cv : {"filename": "", "type": "", "data": ""};
  
  let veri = 
      {
        "isim": kullaniciIsim,
        "eposta": kullaniciPosta,
        "okul": kullaniciOkul,
        "sinif": kullaniciSinif,
        "bolum": kullaniciBolum,
        "cv": kullaniciCV
      }
  
  res.send(veri);
  // Hash değerini istemciye gönder
});

app.post('/bilgiguncelle', (req, res) => {
  const eposta = req.body.eposta
  const isim = req.body.isim
  const okul = req.body.okul
  const bolum = req.body.bolum
  const sinif = req.body.sinif
  
  let kullanicilar = db.get("kullanicilar")
  let kullanici = kullanicilar.find(k => k.eposta === eposta);
  
	if (kullanici) {
  	kullanici.isim = isim;
    kullanici.okul = okul;
    kullanici.bolum = bolum;
    kullanici.sinif = sinif;
	}
  
  db.set("kullanicilar", kullanicilar)
  res.send("tamam");
  // Hash değerini istemciye gönder
});

app.post('/cvguncelle', (req, res) => {
  const eposta = req.body.eposta
  const cv = req.body.cv
  
  let kullanicilar = db.get("kullanicilar")
  let kullanici = kullanicilar.find(k => k.eposta === eposta);
  
	if (kullanici) {
  	kullanici.cv = JSON.parse(cv);
	}
  
  db.set("kullanicilar", kullanicilar)
  res.send("tamam");
  // Hash değerini istemciye gönder
});

app.post('/basvurusilapi', (req, res) => {
  const deney = req.body.deney
  const bilgi = req.body.bilgi
  
  let basvurular = db.get("basvurular")
  let kullanici = basvurular.find(k => k.deney === deney && k.girisb === bilgi);
  
	if (kullanici) {
    const indexxx = basvurular.indexOf(kullanici);
if (indexxx > -1) { // only splice array when item is found
  basvurular.splice(indexxx, 1); // 2nd parameter means remove one item only
}
	}
  
  db.set("basvurular", basvurular)
  res.send("tamam");
  // Hash değerini istemciye gönder
});

// listen for requests :)
const listener = app.listen(3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

const firebaseConfig = {
  apiKey: "AIzaSyDPuMRLCdcb4tTkIENv0SHNzD34fgc-Oxs",
  authDomain: "bibioformfb-e7e04.firebaseapp.com",
  projectId: "bibioformfb-e7e04",
  storageBucket: "bibioformfb-e7e04.appspot.com",
  messagingSenderId: "844053678394",
  appId: "1:844053678394:web:b1e64674672b5e6a082803"
};

firebase.initializeApp(firebaseConfig)
