const unvanKismi = document.querySelector('.unvanKismi');
const adresKismi = document.querySelector('.adresKismi');
const telKismi = document.querySelector('.telKismi');
const ililceKismi = document.querySelector('.ililceKismi');
const tcKismi = document.querySelector('.tcKismi');
const email = document.getElementById('email');

const duzenlemeTarihi = document.querySelector('.duzenlemeTarihi');
const vadeTarihi = document.querySelector('.vadeTarihi');
const siraNo = document.querySelector('.siraNo');
const faturaNot = document.querySelector('.faturaNot');
const odemeDurumu = document.querySelector('.odemeDurumu');

let tr = document.getElementById('tr');
let fiyatBilgileri = document.querySelector('.fiyatBilgileri');

let fiyatYazi = document.querySelector('.fiyatYazi');

window.addEventListener('DOMContentLoaded', () => {

    const faturaVerileri = JSON.parse(localStorage.getItem('faturaVerileri'));


unvanKismi.innerHTML = faturaVerileri.musteriBilgileri.unvan;

adresKismi.innerHTML = faturaVerileri.musteriBilgileri.adres;

telKismi.innerHTML = `Tel No : <span class="" style="font-weight:500;">${faturaVerileri.musteriBilgileri.telNo}</span>`;

email.innerHTML = `E-posta : <span class="" style="font-weight:500;">${faturaVerileri.musteriBilgileri.email}`

ililceKismi.innerHTML = `<span class="" style="font-weight:500;">${faturaVerileri.musteriBilgileri.il}, <span class="" style="font-weight:500;">${faturaVerileri.musteriBilgileri.ilce}`;


duzenlemeTarihi.innerHTML = `Duzenleme Tarihi: <span class="" style="font-weight:500;">${faturaVerileri.faturaBilgileri.faturaTarihi}  <span class="" style="font-weight:500;">${faturaVerileri.faturaBilgileri.faturaSaati}`;


siraNo.innerHTML=`Seri/Sira : <span class="" style="font-weight:500;">${faturaVerileri.faturaBilgileri.faturaSiraNo}`;

faturaNot.innerHTML=`NOT : <span class="" style="font-weight:500;">${faturaVerileri.faturaBilgileri.faturaNot}`

tr.innerHTML=`
<td>1</td>
<td>${faturaVerileri.urunKismi.urunAdi}<br>${faturaVerileri.urunKismi.urunAciklama}</td>
<td>ANA DEPO</td>
<td>${faturaVerileri.urunKismi.urunMiktar} ${faturaVerileri.urunKismi.urunBirim}</td>
<td>${faturaVerileri.urunKismi.urunFiyat}₺</td>
<td>%${faturaVerileri.urunKismi.iskonto}</td>
<td>${faturaVerileri.urunKismi.urunKdv}</td>
<td>${faturaVerileri.urunKismi.urunVergiliFiyat}₺</td>
<td>${faturaVerileri.urunKismi.urunFiyat}₺</td>
`
let fark = faturaVerileri.urunKismi.urunVergiliFiyat - faturaVerileri.urunKismi.urunFiyat;

fiyatBilgileri.innerHTML = `
    <div class="row ">
        <div class="col-md-12 d-flex justify-content-end" style="font-weight:500;">Ara Toplam ${faturaVerileri.urunKismi.urunFiyat}₺</div>
        <hr>
    </div>
    <div class="row ">
        <div class="col-md-12 d-flex justify-content-end" style="font-weight:500;">KDV Toplam ${fark.toFixed(2)}₺</div>
        <hr>
    </div>
    <div class="row ">
        <div class="col-md-12 d-flex justify-content-end" style="font-weight:500;">Vergiler Dahil Toplam Tutar ${faturaVerileri.urunKismi.urunVergiliFiyat}₺</div>
        <hr>
    </div>
    <div class="row ">
        <div class="col-md-12 d-flex justify-content-end" style="font-weight:500;">Ödenecek Tutar ${faturaVerileri.urunKismi.urunVergiliFiyat}₺</div>
        <hr>
    </div>
`;


 const urunVergiliFiyat = parseFloat(faturaVerileri.urunKismi.urunVergiliFiyat.replace(',', '.'));

 const tamSayiKismi = Math.floor(urunVergiliFiyat);  
 const ondalikKismi = Math.round((urunVergiliFiyat - tamSayiKismi) * 100);
 const tamSayiYazi = money2Text(tamSayiKismi).replace("Türk Lirası", "");
 const ondalikYazi = money2Text(ondalikKismi).replace("Türk Lirası", "");
 
 fiyatYazi.innerHTML = `<span style="font-weight:500;">YALNIZ : ${tamSayiYazi} Türk Lirası ${ondalikYazi} Kuruş</span>`;
});

