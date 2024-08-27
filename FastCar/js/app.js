// JSON verisi
const cars = [
    {
        "BMW": {
            "baslangic": "1500",
            "yuzKM": "300"
        }
    },
    {
        "Honda": {
            "baslangic": "1250",
            "yuzKM": "250"
        }
    },
    {
        "Dacia": {
            "baslangic": "1000",
            "yuzKM": "200"
        }
    }
];

//===============>> inputlar <<=================
let kayitAdsoyad = document.getElementById('kayitAdsoyad');
let kayitMail = document.getElementById('kayitMail');
let kayitTel = document.getElementById('kayitTel');
let kayitArac = document.getElementById('kayitArac');
let odemeKM = document.getElementById('odemeKM');

//===============>> tablo kisimlari <<=================
let tablo = document.getElementById('tablo');
let tablo2 = document.getElementById('tablo2');
const tablo3 = document.getElementById('tablo3');

//===============>> butonlar <<=================
let btnEkle = document.getElementById('btnEkle');
let btnBitir = document.getElementById('btnBitir');
let btnOnayla = document.getElementById('btnOnayla');

const ucret = document.getElementById('ucret');

let kullanicilar = [];
let aracKullananlar = {}; 
let toplamKar = 0;

//===============>> btnEkle <<=================
btnEkle.addEventListener('click', () => {
    const kayitAdsoyadValue = kayitAdsoyad.value;
    const kayitMailValue = kayitMail.value;
    const kayitTelValue = kayitTel.value;
    const kayitAracValue = kayitArac.value;

    if(kayitAdsoyadValue === ''){
        alert('Ad Soyad kısmı boş bırakılamaz.');
        return;
    } 
    if(kayitMailValue === ''){
        alert('Mail kısmı boş bırakılamaz.');
        return;
    } 
    if (!kayitMailValue.includes('@')) {
        alert('Geçerli bir mail adresi giriniz.');
        return;
    }
    if(kayitTelValue.length !==10 || isNaN(kayitTelValue)){
        alert('10 haneli gecerli bir telefon numarasi giriniz');
        return;
    } 
    if(kayitTelValue === ''){
        alert('Telefon kısmı boş bırakılamaz.');
        return;
    } 
    if(kayitAracValue === ''){
        alert('Araç kısmı boş bırakılamaz.');
        return;
    }

    aracKullananlar = {
        kayitAdsoyad: kayitAdsoyadValue,
        kayitMail: kayitMailValue,
        kayitTel: kayitTelValue,
        kayitArac: kayitAracValue,
    };
    
    kullanicilar.push(aracKullananlar);
    
    //===============>> tabloya ekle <<=================
    const yeniSatir = document.createElement('tr');
    yeniSatir.innerHTML = `
        <td>${kayitAdsoyadValue}</td>
        <td>${kayitMailValue}</td>
        <td>${kayitTelValue}</td>
        <td>${kayitAracValue}</td>
        <td>
            <button class="btnBitir btn btn-success btn-sm">Bitir</button>
        </td>
    `;
    tablo.appendChild(yeniSatir);

    //===============>> inputları temizleme <<=================
    kayitAdsoyad.value = '';
    kayitMail.value = '';
    kayitTel.value = '';
    kayitArac.value = '';
});

//===============>> Hesap Kitap <<=================
function arabalar(carName, km) {
    for (let car of cars) {
        if (car[carName]) {
            const baslangic = parseInt(car[carName].baslangic);
            const yuzKM = parseInt(car[carName].yuzKM);

            let toplamFiyat;

            if (km <= 2000) {
                toplamFiyat = baslangic;
            } else {
                const fazlalik = km - 2000;
                const ekFiyat = Math.ceil(fazlalik / 100) * yuzKM;
                toplamFiyat = baslangic + ekFiyat;
            }

            return toplamFiyat; 
        }
    }
    return null; // Araç bulunmazsa
}

//===============>> Bitir Butonu <<=================
tablo.addEventListener('click', (e) => {
    if (e.target.classList.contains('btnBitir')) {
        const satir = e.target.closest('tr');
        if (satir) {
            const carName = satir.children[3].textContent; // araç adı

            //===============>> tabloya ekle <<=================
            const yeniSatir2 = document.createElement('tr');
            yeniSatir2.innerHTML = `
                <td>${satir.children[0].textContent}</td>
                <td>${satir.children[1].textContent}</td>
                <td>${satir.children[2].textContent}</td>
                <td>${satir.children[3].textContent}</td>
                <td>
                    <input
                        class="form-control"
                        style="width: 100px"
                        type="number"
                        placeholder="KM giriniz"
                    />
                </td>
                <td>
                    <button class="btnOnayla btn btn-success btn-sm">
                        ONAYLA
                    </button>
                </td>
            `;
            yeniSatir2.dataset.carName = carName; 
            tablo2.appendChild(yeniSatir2);

            satir.remove();

            //===============>> onayla Butonu <<=================
            yeniSatir2.querySelector('.btnOnayla').addEventListener('click', function() {
                const kmInput = yeniSatir2.querySelector('input').value;
                const km = parseInt(kmInput);

                const carName = yeniSatir2.dataset.carName;

                const totalFiyat = arabalar(carName, km);
                if (totalFiyat !== null) {
                    ucret.innerHTML = `${totalFiyat} TL`;

                    //===============>> tabloya ekle <<=================
                    const yeniSatir3 = document.createElement('tr');
                    yeniSatir3.innerHTML = `
                        <td>${satir.children[0].textContent}</td>
                        <td>${satir.children[1].textContent}</td>
                        <td>${satir.children[2].textContent}</td>
                        <td>${satir.children[3].textContent}</td>
                        <td>${km}</td>
                        <td>${totalFiyat} TL</td>
                        <td><button class="btn btn-success onaylaBtn">Onayla</button></td>
                    `;
                    
                    tablo3.appendChild(yeniSatir3);

                    toplamKar += totalFiyat;
                    const toplamCiro = document.getElementById('toplamCiro');
                    toplamCiro.innerHTML = `Toplam Kazanç: ${toplamKar} TL`;
                    yeniSatir2.remove();
                } else {
                    alert(`${carName} aracı bulunamadı.`);
                }
            });
        }
    }
});

//===============>> onayla Butonu2 <<=================
tablo3.addEventListener('click', (e) => {
    if (e.target.classList.contains('onaylaBtn')) {
        const satir = e.target.closest('tr');
        if (satir) {

            const butonKismi = e.target.closest('td');

            butonKismi.innerHTML = '<span class="text-success">Ödeme Gerçekleşti</span>';

            const ucret = document.getElementById('ucret');

            if (ucret) {
                ucret.innerHTML = '';
            }

            e.target.remove();
        }
    }
});

