const ekleButonlar = document.querySelectorAll('.ekle');
const sepetim = document.getElementById('sepetim');
const sepetUL = document.getElementById('sepetUL');
const sepetiOnaylaLi = document.getElementById('sepetiOnaylaLi');
const sepetiOnaylaBtn = document.getElementById('sepetiOnaylaBtn');
const collapse = document.querySelector('.collapse');
const sepetcont = document.getElementById('sepetcont');
const urunOnaylaBtn = document.getElementById('urunOnaylaBtn');
const input = document.getElementById('input');
const sepetUrunler = document.getElementById('sepetUrunler');
const sonDurum = document.querySelector('.sonDurum');
const odeBtn = document.getElementById('odeBtn');
const sonDurumDiv = document.querySelector('.sonDurumDiv');

let sepetsayaci = 0;
let sepettekiler = [];
let odemedekiler = [];

ekleButonlar.forEach(buton => {
    buton.addEventListener('click', event => {
        const urunDiv = event.target.closest('.urun');
        const urunBilgileri = {
            isim: urunDiv.getAttribute('data-isim'),
            fiyat: urunDiv.getAttribute('data-fiyat'),
            resim: urunDiv.getAttribute('data-resim')
        };

        sepettekiler.push(urunBilgileri);
        odemedekiler.push(urunBilgileri);
        sepetsayaci = sepettekiler.length;

        sepetim.innerHTML = `
        <i class="fa fa-shopping-cart"></i>
        <span class="position-absolute top-0 start-100 translate-middle badge bg-primary">${sepetsayaci}</span>`;

        const li = document.createElement('li');
        li.className = 'mt-2 nav-item d-flex justify-content-end';
        li.innerHTML = `
            <div class="row col-md-8">
                <div class="col-md-3"><img src="${urunBilgileri.resim}" alt="" style="width: 100px;"></div>
                <div class="col-md-3 d-flex align-items-center"><p class="text-capitalize my-1" style="font-size: 20px;">${urunBilgileri.isim}</p></div>
                <div class="col-md-3 d-flex align-items-center"><span class="fw-bold" style="font-size: 20px;">${urunBilgileri.fiyat} ₺</span></div>
                <div class="col-md-3 d-flex align-items-center"><button class="btn sil">Sil</button></div>
            </div>`;
        
        sepetUL.appendChild(li);
        sepetiOnaylaLi.style.display = 'flex';

        li.querySelector('.sil').addEventListener('click', () => {
            li.remove();
            sepettekiler = sepettekiler.filter(item => item.isim !== urunBilgileri.isim);
            sepetsayaci = sepettekiler.length;

            sepetim.innerHTML = `
                <i class="fa fa-shopping-cart"></i>
                <span class="position-absolute top-0 start-100 translate-middle badge bg-primary">${sepetsayaci}</span>`;
        });
    });
});

sepetiOnaylaBtn.addEventListener('click', () => {
    if (sepettekiler.length > 0) {

        sepetcont.style.display = '';

        sepettekiler.forEach(urunBilgileri => {
            const kdvsiz = parseFloat(urunBilgileri.fiyat) / 1.2;
            const kdv = parseFloat(urunBilgileri.fiyat) - kdvsiz;

            const yeniSatir = document.createElement('tr');
            yeniSatir.innerHTML = `
                <td><img src="${urunBilgileri.resim}" style="height:100px;"></td>
                <td>${urunBilgileri.isim}</td>
                <td>${kdvsiz.toFixed(2)} ₺</td>
                <td>${kdv.toFixed(2)} ₺</td>
                <td>${urunBilgileri.fiyat} ₺</td>
                <td><button class="btn sil">Sil</button></td>`;
            
            sepetUrunler.appendChild(yeniSatir);

            yeniSatir.querySelector('.sil').addEventListener('click', () => {
                yeniSatir.remove();
                odemedekiler = odemedekiler.filter(item => item.isim !== urunBilgileri.isim);
                sepetsayaci = odemedekiler.length;
            });
        });

        sepetUL.innerHTML = '';
        sepettekiler = [];
        sepetsayaci = 0;


        sepetim.innerHTML = `
            <i class="fa fa-shopping-cart"></i>
            <span class="position-absolute top-0 start-100 translate-middle badge bg-primary"></span>`;
        
        // Gizle yerine display: none yap
        sepetiOnaylaLi.style.display = 'none';
        collapse.style.margin = '0';
        collapse.style.padding = '0';
    }
});
urunOnaylaBtn.addEventListener('click', () => {
    const inputValue = input.value.trim();
    const sayiValue = parseInt(inputValue);

    if (isNaN(sayiValue) || sayiValue < 0 || sayiValue > 99) {
        alert('Lutfen 0 ile 99 arasi bir indirim degeri giriniz');
    } else {
        console.log('Odemedekiler Dizisi:', odemedekiler);

        // hesap kitap
        const toplamFiyat = odemedekiler.reduce((toplam, urun) => {
            const fiyat = parseFloat(urun.fiyat);
            if (!isNaN(fiyat)) {
                return toplam + fiyat;
            }
            return toplam;
        }, 0);

        const yuzdeFiyat = toplamFiyat * (sayiValue / 100);

        sonDurum.innerHTML = `
            <p>Toplam Fiyat: ${toplamFiyat.toFixed(2)} ₺</p>
            <p>İndirim: -${yuzdeFiyat.toFixed(2)} ₺</p>
            <p>Ödenecek Tutar:</p>
            <p style="font-size: 25px; font-weight: 700;">
                <span>${(toplamFiyat - yuzdeFiyat).toFixed(2)} ₺</span>
            </p>`;
        
        sonDurumDiv.style.display = 'flex';

        odeBtn.addEventListener('click', () => {
            alert('Ödeme Tamamlandi');
            odemedekiler = [];
            sepetUrunler.innerHTML = '';
            sonDurumDiv.style.display = 'none';
            sepetsayaci = 0;
        });
        
    }
});
