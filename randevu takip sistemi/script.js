let poliklinikSec = document.getElementById('poliklinikSec');
let tarih = document.getElementById('tarih');
let tc = document.getElementById('tc');
let adSoyad = document.getElementById('adSoyad');
let telefon = document.getElementById('telefon');

const kaydetBtn = document.getElementById('kaydetBtn');

const liste = document.getElementById('liste');
const trUst = document.getElementById('trUst');

const tablo = document.getElementById('tablo');
const tr = document.getElementById('tr');

let randevusuOlanlar = [];
let randevular = {};
let randevuSayi = 0;

const bugun = new Date();
const gun15 = new Date();
gun15.setDate(bugun.getDate() + 15);

const formatTarih = (date) => {
    const yil = date.getFullYear();
    const ay = String(date.getMonth() + 1).padStart(2, '0'); 
    const gun = String(date.getDate()).padStart(2, '0');
    return `${gun}-${ay}-${yil}`;
};

tarih.setAttribute('min', formatTarih(bugun));
tarih.setAttribute('max', formatTarih(gun15));

tarih.addEventListener('change', () => {
    const poliklinikSecValue = poliklinikSec.value;
    const tarihValue = tarih.value;
    
    const gunSec = new Date(tarihValue);
    const gunler = gunSec.getDay();

    if (gunler === 6 || gunler === 0) {
        tarih.style.backgroundColor = 'red';
        tarih.style.color = 'white';
        alert('Hafta sonu tarihleri seçilemez, lütfen başka bir tarih seçiniz.');
        tarih.value = '';
    } else {
        const ayniRandevu = randevusuOlanlar.find(randevu => randevu.poliklinikSec === poliklinikSecValue && randevu.tarih === tarihValue);

        if (ayniRandevu) {
            tarih.style.backgroundColor = 'red';
            tarih.style.color = 'white';
            alert('Bu tarih dolu, lütfen başka bir tarih seçiniz.');
            tarih.value = ''; 
        } else {
            tarih.style.backgroundColor = 'green';
            tarih.style.color = 'white';
        }
    }
});

kaydetBtn.addEventListener('click', () => {

    liste.style.display = '';
    trUst.style.display = '';

    const poliklinikler = ['Kardiyoloji', 'Ortopedi', 'Goz Hastaliklari'];

    const poliklinikSecValue = poliklinikSec.value;
    const tarihValue = tarih.value;
    const tcValue = tc.value;
    const adSoyadValue = adSoyad.value;
    const telefonValue = telefon.value;

    if (poliklinikSecValue === '') {
        alert('Lütfen bir poliklinik seçiniz.');
        return;
    } 
    if (!poliklinikler.includes(poliklinikSecValue)) {
        alert('Lütfen mevcut polikliniklerden birini seçiniz.');
        return;
    }
    if (tarihValue === '') {
        alert('Lütfen bir tarih seçiniz.');
        return;
    } 

    const gunSec = new Date(tarihValue);

    if (gunSec < bugun || gunSec > gun15) {
        alert('Lütfen bugünden itibaren 15 gün içinde bir tarih seçiniz.');
        return;
    }

    const ayniRandevu = randevusuOlanlar.find(randevu => randevu.poliklinikSec === poliklinikSecValue && randevu.tarih === tarihValue);

    if (ayniRandevu) {
        alert('Bu tarih dolu, lütfen başka bir tarih seçiniz.');
        return;
    }

    if (tcValue.length !== 11 || isNaN(tcValue)) {
        alert('Lütfen 11 haneli T.C. Kimlik Numaranızı giriniz.');
        return;
    } 

    const mevcutRandevu = randevusuOlanlar.find(randevu => randevu.tc === tcValue && randevu.poliklinikSec === poliklinikSecValue);

    if (mevcutRandevu) {
        alert(`Zaten bu poliklinik için ${mevcutRandevu.tarih} tarihinde randevunuz var.`);
        return;
    }

    if (adSoyadValue === '') {
        alert('Lütfen bir Ad-Soyad bilgisi giriniz.');
        return;
    }
    if (telefonValue.length !== 10 || isNaN(telefonValue)) {
        alert('10 haneli geçerli bir telefon numarası giriniz.');
        return;
    } 

    randevular = {
        sira: randevuSayi + 1,
        poliklinikSec: poliklinikSecValue,
        tarih: tarihValue, 
        tc: tcValue,
        adSoyad: adSoyadValue,
        telefon: telefonValue,
    };
    
    randevusuOlanlar.push(randevular);
    randevuSayi = randevusuOlanlar.length;

    const yeniSatir = document.createElement('tr');
    yeniSatir.innerHTML = `
        <td>${randevuSayi}</td>
        <td>${poliklinikSecValue}</td>
        <td>${tarihValue}</td>
        <td>${tcValue}</td>
        <td>${adSoyadValue}</td>
        <td>${telefonValue}</td>
        <td>
            <button class="btn btn-warning duzenle">Düzenle</button>
            <button class="btn btn-danger sil">Sil</button>
        </td>`;
            
    tablo.appendChild(yeniSatir);

    poliklinikSec.value = '';
    tarih.value = '';
    tarih.style.backgroundColor = '';
    tarih.style.color = ''
    tc.value = '';
    adSoyad.value = '';
    telefon.value = '';

    yeniSatir.querySelector('.sil').addEventListener('click', () => {
        yeniSatir.remove();
        randevusuOlanlar = randevusuOlanlar.filter(item => item.tc !== tcValue || item.tarih !== tarihValue);
        randevuSayi = randevusuOlanlar.length;

        if (randevusuOlanlar.length === 0) {
            liste.style.display = 'none';
            trUst.style.display = 'none';
        }
    });

    yeniSatir.querySelector('.duzenle').addEventListener('click', () => {

        poliklinikSec.value = poliklinikSecValue;
        tarih.value = tarihValue;
        tc.value = tcValue;
        adSoyad.value = adSoyadValue;
        telefon.value = telefonValue;

        yeniSatir.remove();
        randevusuOlanlar = randevusuOlanlar.filter(item => item.tc !== tcValue || item.tarih !== tarihValue);
        randevuSayi = randevusuOlanlar.length;
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const tarihInput = document.getElementById('tarih');

    const bugun = new Date();
    const gun15Sonra = new Date();
    gun15Sonra.setDate(bugun.getDate() + 15);

    const minDate = bugun.toISOString().split('T')[0];
    const maxDate = gun15Sonra.toISOString().split('T')[0];

    tarihInput.setAttribute('min', minDate);
    tarihInput.setAttribute('max', maxDate);
});
