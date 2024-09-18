let odenecekUcret = document.getElementById('odenecekUcret');
let maasYeri = document.getElementById('maas');
let duzenleGun = document.querySelector('.duzenleGun');
let gun = document.querySelector('.gun');
let giris = document.getElementById('giris');
let cikis = document.getElementById('cikis');
const bitirBtn = document.getElementById('bitirBtn');
const duzenlemeyiBitirBtn = document.getElementById('duzenlemeyiBitirBtn');
let tablo = document.getElementById('tablo');
let sonucDetay = document.getElementById('sonucDetay');

let maas = 17000;
let gunSayaci = 1;
gun.innerHTML = `${gunSayaci}. gun`;

let saatToplam = 0;
let currentEditRow = null; 
let currentEditRowIndex = null;

bitirBtn.addEventListener('click', () => {
    const girisValue = giris.value;
    const cikisValue = cikis.value;

    let [saatGiris, dakikaGiris] = girisValue.split(":").map(Number);
    let [saatCikis, dakikaCikis] = cikisValue.split(":").map(Number);

    let toplamDakikaGiris = saatGiris * 60 + dakikaGiris;
    let toplamDakikaCikis = saatCikis * 60 + dakikaCikis;

    let kalinanDakika = toplamDakikaCikis - toplamDakikaGiris;

    if(kalinanDakika < 0){
        alert('giris cikis saatlerinizi kontrol ediniz');
        return;
    }

    if (isNaN(kalinanDakika) || kalinanDakika === 0) {
        maas -= 566;
        kalinanDakika = 0; 
        saatToplam += kalinanDakika;

        const yeniSatir = document.createElement('tr');
        yeniSatir.innerHTML = `
            <td>${gunSayaci}. gun</td>
            <td>--:--</td>
            <td>--:--</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>- 566 TL</td>
            <td><button class="btn btn-warning duzenleBtn" data-id="${gunSayaci}">Duzenle</button></td>
        `;
        tablo.appendChild(yeniSatir);
    } else {
        saatToplam += kalinanDakika;

        let saat = Math.floor(kalinanDakika / 60);
        let dakika = kalinanDakika % 60;

        if (kalinanDakika < 540 && kalinanDakika > 0) {
            let eksiSaat = (540 - kalinanDakika) / 60;
            let eksikSaat = Math.floor(eksiSaat);
            let eksikDakika = (eksiSaat % 1) * 60;

            maas -= (eksikSaat + eksikDakika / 60) * 100;

            let eksikSure = eksikSaat + (eksikDakika / 60); 
            const yeniSatir = document.createElement('tr');
            yeniSatir.innerHTML = `
                <td>${gunSayaci}. gun</td>
                <td>${girisValue}</td>
                <td>${cikisValue}</td>
                <td>${saat}:${dakika < 10 ? '0' + dakika : dakika} Saat</td>
                <td>0</td>
                <td>${eksikSaat}:${eksikDakika.toFixed(0).padStart(2, '0')} Saat</td>
                <td>- ${(eksikSure * 100).toFixed(2)} TL</td>
                
                <td><button class="btn btn-warning duzenleBtn" data-id="${gunSayaci}">Duzenle</button></td>
            `;
            tablo.appendChild(yeniSatir);

        } else if (kalinanDakika > 540) {
            let artiSaat = (kalinanDakika - 540) / 60;
            let fazlaSaat = Math.floor(artiSaat);
            let fazlaDakika = (artiSaat % 1) * 60;

            maas += (fazlaSaat + fazlaDakika / 60) * 200;

            let fazlaSure = fazlaSaat + (fazlaDakika / 60); 
            const yeniSatir = document.createElement('tr');
            yeniSatir.innerHTML = `
                <td>${gunSayaci}. gun</td>
                <td>${girisValue}</td>
                <td>${cikisValue}</td>
                <td>${saat}:${dakika < 10 ? '0' + dakika : dakika} Saat</td>
                <td>${fazlaSaat}:${fazlaDakika.toFixed(0).padStart(2, '0')} Saat</td>
                <td>0</td>
                <td>+ ${(fazlaSure * 200).toFixed(2)} TL</td>
                
                <td><button class="btn btn-warning duzenleBtn" data-id="${gunSayaci}">Duzenle</button></td>
            `;
            tablo.appendChild(yeniSatir);

        } else if (kalinanDakika === 540) {
            const yeniSatir = document.createElement('tr');
            yeniSatir.innerHTML = `
                <td>${gunSayaci}. gun</td>
                <td>${girisValue}</td>
                <td>${cikisValue}</td>
                <td>${saat}:${dakika < 10 ? '0' + dakika : dakika} Saat</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                
                <td><button class="btn btn-warning duzenleBtn" data-id="${gunSayaci}">Duzenle</button></td>
            `;
            tablo.appendChild(yeniSatir);
        }
    }

    gunSayaci += 1;
    gun.innerHTML = `${gunSayaci}. gun`;
    sonucDetay.innerHTML = `Odenecek Maas: ${maas.toFixed(2)} TL`;
});

tablo.addEventListener('click', (event) => {
    
    duzenlemeyiBitirBtn.style.display = '';
    duzenleGun.style.display = '';
    bitirBtn.style.display = 'none';
    gun.style.display = 'none';

    if (event.target && event.target.classList.contains('duzenleBtn')) {
        const satirID = event.target.getAttribute('data-id');
        const satirlar = Array.from(tablo.querySelectorAll('tr'));

        const satir = satirlar.find(tr => {
            const td = tr.querySelector('td:first-child');
            return td && td.textContent.split('.')[0] === satirID;
        });

        if (satir) {
            currentEditRow = satir;
            const girisValue = satir.querySelector('td:nth-child(2)').textContent;
            const cikisValue = satir.querySelector('td:nth-child(3)').textContent;

            giris.value = girisValue;
            cikis.value = cikisValue;

            giris.style.border = '2px solid blue';
            cikis.style.border = '2px solid blue';
            satir.style.border = '1px solid blue';

            duzenleGun.innerHTML = `${satirID}. gün düzenleniyor`;
        } else {
            console.error('Satır bulunamadı.');
        }
    }
});

duzenlemeyiBitirBtn.addEventListener('click', () => {
    duzenlemeyiBitirBtn.style.display = 'none';
    duzenleGun.style.display = 'none';
    gun.style.display = '';
    bitirBtn.style.display = '';
    currentEditRow.style.border = '1px solid yellow';

    if (currentEditRow) {
        const girisValue = giris.value;
        const cikisValue = cikis.value;

        let [saatGiris, dakikaGiris] = girisValue.split(":").map(Number);
        let [saatCikis, dakikaCikis] = cikisValue.split(":").map(Number);

        if (isNaN(saatGiris) || isNaN(dakikaGiris) || isNaN(saatCikis) || isNaN(dakikaCikis)) {
            console.error('Giriş veya çıkış saati hatalı.');
            return;
        }

        let toplamDakikaGiris = saatGiris * 60 + dakikaGiris;
        let toplamDakikaCikis = saatCikis * 60 + dakikaCikis;

        let kalinanDakika = toplamDakikaCikis - toplamDakikaGiris;

        let eskiEksikSaat = parseFloat(currentEditRow.querySelector('td:nth-child(6)').textContent.split(':')[0]) || 0;
        let eskiEksikDakika = parseFloat(currentEditRow.querySelector('td:nth-child(6)').textContent.split(':')[1]) || 0;

        let eskiFazlaSaat = parseFloat(currentEditRow.querySelector('td:nth-child(5)').textContent.split(':')[0]) || 0;
        let eskiFazlaDakika = parseFloat(currentEditRow.querySelector('td:nth-child(5)').textContent.split(':')[1]) || 0;

        let eskiEksikSure = eskiEksikSaat + (eskiEksikDakika / 60);
        let eskiFazlaSure = eskiFazlaSaat + (eskiFazlaDakika / 60);

        let saat = Math.floor(kalinanDakika / 60);
        let dakika = kalinanDakika % 60;

        if(kalinanDakika < 0){
            alert('giris cikis saatlerinizi kontrol ediniz');
            return;
        }
        
        if (isNaN(kalinanDakika) || kalinanDakika === 0) {
            maas -= 566;
            kalinanDakika = 0;

            currentEditRow.innerHTML = `
                <td>${currentEditRow.querySelector('td:first-child').textContent}</td>
                <td>${girisValue}</td>
                <td>${cikisValue}</td>
                <td>0 Saat</td>
                <td>0</td>
                <td>0</td>
                <td>- 566 TL</td>
                <td><button class="btn btn-warning duzenleBtn" data-id="${currentEditRow.querySelector('td:first-child').textContent.split('.')[0]}">Duzenle</button></td>
            `;
        } else {
            saatToplam += kalinanDakika;

            if (kalinanDakika < 540 && kalinanDakika > 0) {
                let eksiSaat = (540 - kalinanDakika) / 60;
                let eksikSaat = Math.floor(eksiSaat);
                let eksikDakika = (eksiSaat % 1) * 60;

                maas -= (eksikSaat + eksikDakika / 60) * 100;

                let eksikSure = eksikSaat + (eksikDakika / 60); 
                currentEditRow.innerHTML = `
                    <td>${currentEditRow.querySelector('td:first-child').textContent}</td>
                    <td>${girisValue}</td>
                    <td>${cikisValue}</td>
                    <td>${saat}:${dakika < 10 ? '0' + dakika : dakika} Saat</td>
                    <td>0</td>
                    <td>${eksikSaat}:${eksikDakika.toFixed(0).padStart(2, '0')} Saat</td>
                    <td>- ${(eksikSure * 100).toFixed(2)} TL</td>
                    <td><button class="btn btn-warning duzenleBtn" data-id="${currentEditRow.querySelector('td:first-child').textContent.split('.')[0]}">Duzenle</button></td>
                `;
            } else if (kalinanDakika > 540) {
                let artiSaat = (kalinanDakika - 540) / 60;
                let fazlaSaat = Math.floor(artiSaat);
                let fazlaDakika = (artiSaat % 1) * 60;

                maas += (fazlaSaat + fazlaDakika / 60) * 200;

                let fazlaSure = fazlaSaat + (fazlaDakika / 60); 
                currentEditRow.innerHTML = `
                    <td>${currentEditRow.querySelector('td:first-child').textContent}</td>
                    <td>${girisValue}</td>
                    <td>${cikisValue}</td>
                    <td>${saat}:${dakika < 10 ? '0' + dakika : dakika} Saat</td>
                    <td>${fazlaSaat}:${fazlaDakika.toFixed(0).padStart(2, '0')} Saat</td>
                    <td>0</td>
                    <td>+ ${(fazlaSure * 200).toFixed(2)} TL</td>
                    <td><button class="btn btn-warning duzenleBtn" data-id="${currentEditRow.querySelector('td:first-child').textContent.split('.')[0]}">Duzenle</button></td>
                `;
            } else if (kalinanDakika === 540) {
                currentEditRow.innerHTML = `
                    <td>${currentEditRow.querySelector('td:first-child').textContent}</td>
                    <td>${girisValue}</td>
                    <td>${cikisValue}</td>
                    <td>${saat}:${dakika < 10 ? '0' + dakika : dakika} Saat</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td><button class="btn btn-warning duzenleBtn" data-id="${currentEditRow.querySelector('td:first-child').textContent.split('.')[0]}">Duzenle</button></td>
                `;
            }
        }

        maas -= (eskiFazlaSure ) * 200; 
        maas += (eskiEksikSure) * 100; 
        sonucDetay.innerHTML = `Odenecek Maas: ${maas.toFixed(2)} TL`;

        currentEditRow = null;

        giris.value = '';
        cikis.value = '';
        giris.style.border = '';
        cikis.style.border = '';
    } 
});
