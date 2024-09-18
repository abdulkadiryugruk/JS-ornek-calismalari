const meslekSec = document.getElementById('meslekSec');
const kisiSec = document.getElementById('kisiSec');

const garsonlar1 = document.querySelector('.garsonlar1');
const garsonlar2 = document.querySelector('.garsonlar2');
const ascilar1 = document.querySelector('.ascilar1');
const ascilar2 = document.querySelector('.ascilar2');
const bulasikcilar1 = document.querySelector('.bulasikcilar1');
const bulasikcilar2 = document.querySelector('.bulasikcilar2');

const onayla1 = document.getElementById('onayla1');
const onayla2 = document.getElementById('onayla2');

const tumPersonel = document.querySelectorAll('#kisiler option');





const personeller = {
    garson: ["Ahmet", "Ali"],
    asci: ["Batu", "Burak"],
    bulasikci: ["Cahit", "Cevahir"]
};

onayla1.addEventListener('click', () => {
    const meslekSecValue = meslekSec.value;
    const kisiler = personeller[meslekSecValue] || [];
    
    kisiSec.innerHTML = '';
    kisiSec.disabled = true;
    onayla2.disabled = true;

    // Seçilen mesleğe uygun personel seçeneklerini ekle
    kisiler.forEach(personel => {
        const option = document.createElement('option');
        option.value = personel;
        option.textContent = personel;
        kisiSec.appendChild(option);
    });

    // Kişi seçimini aktif hale getir
    if (kisiler.length > 0) {
        kisiSec.disabled = false;
        onayla2.disabled = false;
    }
});

onayla2.addEventListener('click', () => {
    const personel = kisiSec.value;
    
    if (personel) {
        window.location.href = `${personel.toLowerCase()}.html`;
    }
});




