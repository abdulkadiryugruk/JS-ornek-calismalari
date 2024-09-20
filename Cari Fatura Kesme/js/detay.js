const unvanKismi = document.querySelector('.unvanKismi');
const adresKismi = document.querySelector('.adresKismi');
const telKismi = document.querySelector('.telKismi');
const ililceKismi = document.querySelector('.ililceKismi');
const tcKismi = document.querySelector('.tcKismi');

const duzenlemeTarihi = document.querySelector('.duzenlemeTarihi');
const vadeTarihi = document.querySelector('.vadeTarihi');
const siraNo = document.querySelector('.siraNo');
const faturaNot = document.querySelector('.faturaNot');
const odemeDurumu = document.querySelector('.odemeDurumu');

let tr = document.getElementById('tr');
let fiyatBilgileri = document.querySelector('.fiyatBilgileri');

 const duzenleBtn = document.getElementById('duzenleBtn');
window.addEventListener('DOMContentLoaded', () => {

    const faturaVerileri = JSON.parse(localStorage.getItem('faturaVerileri'));




unvanKismi.innerHTML = faturaVerileri.musteriBilgileri.unvan;

adresKismi.innerHTML = faturaVerileri.musteriBilgileri.adres;

telKismi.innerHTML = `Tel No : <span class="col-md" style="font-weight:500;">${faturaVerileri.musteriBilgileri.telNo}</span>`;

ililceKismi.innerHTML = `<span class="col-md" style="font-weight:500;">${faturaVerileri.musteriBilgileri.il}, <span class="col-md" style="font-weight:500;">${faturaVerileri.musteriBilgileri.ilce}`;

tcKismi.innerHTML = `T.C. No : <span class="col-md" style="font-weight:500;">${faturaVerileri.musteriBilgileri.tcNo}`;

duzenlemeTarihi.innerHTML = `Duzenleme Tarihi: <span class="col-md" style="font-weight:500;">${faturaVerileri.faturaBilgileri.faturaTarihi}  <span class="col-md" style="font-weight:500;">${faturaVerileri.faturaBilgileri.faturaSaati}`;

vadeTarihi.innerHTML=`Vade Tarihi : <span class="col-md" style="font-weight:500;">${faturaVerileri.faturaBilgileri.vadeTarihi}`;

siraNo.innerHTML=`Seri/Sira : <span class="col-md" style="font-weight:500;">${faturaVerileri.faturaBilgileri.faturaSiraNo}`;

faturaNot.innerHTML=`Odeme/Tahsilat Durumu : <span class="col-md" style="font-weight:500;">Acik Fatura`

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
            <div class="row ">Ara Toplam <span class="col-md d-flex justify-content-end " style="font-weight:500;">${faturaVerileri.urunKismi.urunFiyat}₺</span></div>
            <div class="row ">KDV Toplam <span class="col-md d-flex justify-content-end " style="font-weight:500;">${fark}₺</span></div>
            <div class="row ">Vergiler Dahil Toplam Tutar <span class="col-md d-flex justify-content-end " style="font-weight:500;">${faturaVerileri.urunKismi.urunVergiliFiyat}₺</span></div>
            <div class="row ">Ödenecek Tutar <span class="col-md d-flex justify-content-end " style="font-weight:500;">${faturaVerileri.urunKismi.urunVergiliFiyat}₺</span></div>
        `;


});


document.getElementById('yazdirBtn').addEventListener('click', () => {
    const newWindow = window.open('pdf.html');
    newWindow.onload = function() {
        newWindow.print();
    };
});


duzenleBtn.addEventListener('click', () => {

    window.history.back(); 
});
