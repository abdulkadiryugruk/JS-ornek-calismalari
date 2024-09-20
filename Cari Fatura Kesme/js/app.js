

let container = document.querySelector('.container-fluid')
let unvanAra = document.getElementById('unvanAra');
const unvanEkle = document.getElementById('unvanEkle');
const acilir = document.getElementById('acilirBtn');
const inputs = document.querySelectorAll('input, button');
const acilirBtnElemanlari = document.querySelectorAll('#acilirBtn input, #acilirBtn button');
const carpiBtn = document.getElementById('carpiBtn');
const kaydetBtn = document.getElementById('kaydetBtn');

let unvanBilgileri = document.querySelector('.unvanBilgileri');
//======================================================
let unvanInp2 = document.getElementById('unvanInp2');
let telNo = document.getElementById('telNo');
let tcNo = document.getElementById('tcNo');
let email = document.getElementById('email');
let adress = document.getElementById('adress');
let il = document.getElementById('il');
let ilce = document.getElementById('ilce');
const zorunluYazi = document.querySelector('.zorunluYazi');
//======================================================
let faturaTarihi = document.getElementById('faturaTarihi');
let faturaSaati = document.getElementById('faturaSaati');
let vadeTarihi = document.getElementById('vadeTarihi');
let faturaSeri = document.getElementById('faturaSeri');
let faturaSiraNo = document.getElementById('faturaSiraNo');
//======================================================
let paraBirimi = document.getElementById('paraBirimi');
//======================================================
let faturaNot = document.getElementById('faturaNot');
//======================================================
let urunAra = document.getElementById('urunAra');
//======================================================
const kaydiTamamla = document.getElementById('kaydiTamamla');
//=====================================================
//===============>> URUN BILGILERI <<==================
let urunHizmet = document.getElementById('urunHizmet');
const urunEkle = document.getElementById('urunEkle');
let urunHizmetKismi = document.querySelector('.urunHizmetKismi');
let urunAciklama = document.getElementById('urunAciklama');
let urunMiktar = document.getElementById('urunMiktar');
let urunBirim = document.getElementById('urunBirim');
let urunKdv = document.getElementById('urunKdv');
let iskonto = document.getElementById('iskonto');
let urunOtv = document.getElementById('urunOtv');
let urunOiv = document.getElementById('urunOiv');
let urunFiyat = document.getElementById('urunFiyat');
let urunVergiliFiyat = document.getElementById('urunVergiliFiyat');
let urunToplam = document.getElementById('urunToplam');
const fiyatGuncelleBtn = document.getElementById('fiyatGuncelleBtn');
//=====================================================
let araToplam = document.getElementById('araToplam');
let toplamKdv = document.getElementById('toplamKdv');
let genelToplam = document.getElementById('genelToplam');


let faturaSiralari=[];

let urunMiktari = [];


unvanEkle.addEventListener('click',()=>{
    let unvanAraValue = unvanAra.value;
    
    acilir.style.display='flex';
    container.style.filter = 'brightness(50%)';

    inputs.forEach(function(element) {
        if (!Array.from(acilirBtnElemanlari).includes(element)) {
            element.disabled = true;
        }
        unvanInp2.value = unvanAraValue;
    });
});

kaydetBtn.addEventListener('click',()=>{
    let unvanInp2Value = unvanInp2.value;
    let telNoValue = telNo.value;
    let tcNoValue = tcNo.value;
    let emailValue = email.value;
    let adressValue = adress.value;
    let ilValue = il.value;
    let ilceValue = ilce.value;

     if( isNaN(telNoValue)){
         alert('lutfen 10 haneli gecerli bir telefon numarasi giriniz.')
         return;
     }
    if(isNaN(tcNoValue) ){
        alert('lutfen 11 haneli gecerli bir T.C. Kimlik numarasi giriniz.')
        return;
    }
    if (!emailValue.includes('@')) {
        alert('Geçerli bir mail adresi giriniz.');
        return;
    }

    function harf(string) {
        const harfRegex = /^[a-zA-Z]+$/;
        return harfRegex.test(string);
      }
      if(!harf(ilValue)){
        alert('gecerli bir il giriniz.');
        return;
      }
      if(!harf(ilceValue)){
        alert('gecerli bir ilce giriniz.')
        return;
      }

    if(unvanInp2Value === '' || ilValue === '' || ilceValue===''){
        zorunluYazi.style.display='';
        return;
    }else{
        zorunluYazi.style.display='none';
    }

    acilir.style.display='none';
    container.style.filter = '';

    unvanBilgileri.innerHTML=`
    <div class="row mb-2"><h5>Unvan Detaylari</h5></div>
    <div class="row">${unvanInp2Value}</div>
    <div class="row">${adressValue}</div>
    <div class="row">${telNoValue}</div>
    <div class="row">${ilValue}, ${ilceValue}</div>
    <div class="row">T.C. No: ${tcNoValue}</div>
    `
    inputs.forEach(function(element) {
        if (!Array.from(acilirBtnElemanlari).includes(element)) {
            element.disabled = false;
        }
    });
})



carpiBtn.addEventListener('click',()=>{
    acilir.style.display='none';
    container.style.filter = '';

    inputs.forEach(function(element) {
        if (!Array.from(acilirBtnElemanlari).includes(element)) {
            element.disabled = false;
        }
    });

})


urunEkle.addEventListener('click', ()=>{
const urunAraValue = urunAra.value;
if(urunAraValue !==''){
    urunHizmetKismi.style.display='';
    urunHizmet.value = urunAraValue;
}else{
alert('Urun adi giriniz');
return;
}
});

fiyatGuncelleBtn.addEventListener('click', () => {
    const urunKdvValue = parseInt(urunKdv.value.replace('%', ''));
    const urunFiyatValue = parseFloat(urunFiyat.value); 

    let kdvDegeri = (urunFiyatValue * urunKdvValue) / 100;
    let kdvli = kdvDegeri + urunFiyatValue;

    urunVergiliFiyat.value = kdvli.toFixed(2); 
    urunToplam.value = urunFiyatValue.toFixed(2); 

    araToplam.innerHTML = `${urunFiyatValue.toFixed(2)} ₺`;
    toplamKdv.innerHTML = `${kdvDegeri.toFixed(2)} ₺`;
    genelToplam.innerHTML = `${kdvli.toFixed(2)} ₺`;

});


kaydiTamamla.addEventListener('click', (event) => {


    // ========================>> Value Kismi
    let unvanInp2Value = unvanInp2.value;
    let telNoValue = telNo.value;
    let tcNoValue = tcNo.value;
    let adressValue = adress.value;
    let ilValue = il.value;
    let ilceValue = ilce.value;
    let emailValue = email.value;



    const faturaTarihiValue = faturaTarihi.value;
    const faturaSaatiValue = faturaSaati.value;
    const vadeTarihiValue = vadeTarihi.value;
    const faturaSeriValue = faturaSeri.value;
    const faturaSiraNoValue = faturaSiraNo.value;
    const paraBirimiValue = paraBirimi.value;
    const faturaNotValue = faturaNot.value;
    const urunAraValue = urunAra.value;

    const urunHizmetValue = urunHizmet.value;
    const urunAciklamaValue = urunAciklama.value;
    const urunMiktarValue = urunMiktar.value;
    const urunBirimValue = urunBirim.value;
    let urunKdvValue = urunKdv.value;
    const iskontoValue = iskonto.value;
    const urunOtvValue = urunOtv.value;
    const urunOivValue = urunOiv.value;
    let urunFiyatValue = urunFiyat.value;
    const urunVergiliFiyatValue = urunVergiliFiyat.value;
    const urunToplamValue = urunToplam.value;

    // ===============================

    const faturaVerileri = {
        musteriBilgileri: {
            unvan: unvanInp2Value,
            adres: adressValue,
            telNo: telNoValue,
            email: emailValue,
            il: ilValue,
            ilce: ilceValue,
            tcNo: tcNoValue
        },
        faturaBilgileri: {
            faturaTarihi: faturaTarihiValue,
            faturaSaati: faturaSaatiValue,
            vadeTarihi: vadeTarihiValue,
            faturaSeri: faturaSeriValue,
            faturaSiraNo: faturaSiraNoValue,
            paraBirimi: paraBirimiValue,
            faturaNot: faturaNotValue
        },
        urunKismi: {
            urunAdi: urunHizmetValue,
            urunAciklama: urunAciklamaValue,
            urunMiktar: urunMiktarValue,
            urunBirim: urunBirimValue,
            urunKdv: urunKdvValue,
            iskonto: iskontoValue,
            urunOtv: urunOtvValue,
            urunOiv: urunOivValue,
            urunFiyat: urunFiyatValue,
            urunVergiliFiyat: urunVergiliFiyatValue,
            urunToplam: urunToplamValue,
        }
    };

    localStorage.setItem('faturaVerileri', JSON.stringify(faturaVerileri));

    window.location.href = 'detay.html';

let isValid = true;













if(unvanInp2Value === '' || ilValue === '' || ilceValue===''){
    alert('il ilce bilgilerini doldurunuz');
    isValid = false;
     if (!isValid) {
        event.preventDefault();
    }
}
if(faturaTarihiValue ===''){
    alert('Lutfen fatura tarihi giriniz');
     isValid = false;
     if (!isValid) {
        event.preventDefault();
    }
}
if(faturaSaatiValue ===''){
    alert('Lutfen fatura saati giriniz');
     isValid = false;
     if (!isValid) {
        event.preventDefault();
    }
}
if(vadeTarihiValue ===''){
    alert('Lutfen vade tarihi giriniz');
     isValid = false;
     if (!isValid) {
        event.preventDefault();
    }
}
if(faturaSiraNoValue ===''){
    alert('Lutfen fatura sira numarasi giriniz');
     isValid = false;
     if (!isValid) {
        event.preventDefault();
    }
}
if(paraBirimiValue ===''){
    alert('Lutfen para numarasi seciniz');
     isValid = false;
     if (!isValid) {
        event.preventDefault();
    }
}

if(urunAraValue ===''){
    alert('lutfen urun ismi giriniz');
     isValid = false;
     if (!isValid) {
        event.preventDefault();
    }
}
if(urunMiktarValue ===''){
    alert('lutfen urun miktari giriniz');
     isValid = false;
     if (!isValid) {
        event.preventDefault();
    }
}
if(iskontoValue ===''){
    alert('iskonto degeri giriniz');
     isValid = false;
     if (!isValid) {
        event.preventDefault();
    }
}
if(urunOtvValue ===''){
    alert('OTV degeri giriniz');
     isValid = false;
     if (!isValid) {
        event.preventDefault();
    }
}
if(urunOivValue ===''){
    alert('OIV degeri giriniz');
     isValid = false;
     if (!isValid) {
        event.preventDefault();
    }
}
if(urunFiyatValue ==='' || urunFiyatValue === 0){
    alert('lutfen urun fiyati giriniz');
     isValid = false;
     if (!isValid) {
        event.preventDefault();
    }
}

});

