let takimAdi1 = document.getElementById('takimAdi1');
let takimAdi2 = document.getElementById('takimAdi2');
let atilanGol1 = document.getElementById('atilanGol1');
let atilanGol2 = document.getElementById('atilanGol2');

let tablo = document.getElementById('tablo');
let tr = document.getElementById('tr');
let tablo2 = document.getElementById('tablo2');
let tr2 = document.getElementById('tr2');
let kaydetBtn = document.getElementById('kaydetBtn');

let siralama = [];

function kaydet() {
    const takimAdi1Value = takimAdi1.value;
    const atilanGol1Value = parseFloat(atilanGol1.value);
    const atilanGol2Value = parseFloat(atilanGol2.value);
    const takimAdi2Value = takimAdi2.value;

    // ===================>> Averaj 
    let averaj = atilanGol1Value - atilanGol2Value;
    let averaj2 = atilanGol2Value - atilanGol1Value;

    if (averaj < 0) {
        averaj = 0;
    }
    if (averaj2 < 0) {
        averaj2 = 0;
    }

    // ===================>> Puan 
    let puanValue = 0;
    if (atilanGol1Value > atilanGol2Value) {
        puanValue = 3;
    } else if (atilanGol1Value === atilanGol2Value) {
        puanValue = 1;
    }

    let puan2Value = 0;
    if (atilanGol2Value > atilanGol1Value) {
        puan2Value = 3;
    } else if (atilanGol1Value === atilanGol2Value) {
        puan2Value = 1;
    }

    // ==============>> ayni takim
    if (takimAdi1Value === takimAdi2Value) {
        alert('Aynı takımı 2 kere seçemezsiniz!');
        return;
    }

    // ============>> tablo guncelle
    let takim1Guncellendi = false;
    let takim2Guncellendi = false;

    siralama.forEach((item) => {
        if (item.takim === takimAdi1Value) {
            item.attigiGol += atilanGol1Value;
            item.yedigiGol += atilanGol2Value;
            item.averaj += averaj;
            if (item.averaj < 0) {
                item.averaj = 0;
            }
            item.puan += puanValue;
            takim1Guncellendi = true;
        } else if (item.takim === takimAdi2Value) {
            item.attigiGol += atilanGol2Value;
            item.yedigiGol += atilanGol1Value;
            item.averaj += averaj2;
            if (item.averaj < 0) {
                item.averaj = 0;
            }
            item.puan += puan2Value;
            takim2Guncellendi = true;
        }
    });

    if (!takim1Guncellendi) {
        const sira1 = {
            takim: takimAdi1Value,
            attigiGol: atilanGol1Value,
            yedigiGol: atilanGol2Value,
            averaj: averaj,
            puan: puanValue,
        };
        siralama.push(sira1);
    }

    if (!takim2Guncellendi) {
        const sira2 = {
            takim: takimAdi2Value,
            attigiGol: atilanGol2Value,
            yedigiGol: atilanGol1Value,
            averaj: averaj2,
            puan: puan2Value,
        };
        siralama.push(sira2);
    }

     // ==================>> Sıralama
     siralama.sort((a, b) => {
        if (b.puan !== a.puan) return b.puan - a.puan; 

        if (b.averaj !== a.averaj) return b.averaj - a.averaj; 

        return b.attigiGol - a.attigiGol; 
    });

    tablo.innerHTML = '';

    siralama.forEach((item) => {
        let yeniSatir = document.createElement('tr');
        yeniSatir.innerHTML = `
            <td>${item.takim}</td>
            <td>${item.attigiGol}</td>
            <td>${item.yedigiGol}</td>
            <td>${item.averaj}</td>
            <td>${item.puan}</td>
            
        `;
        tablo.appendChild(yeniSatir);
    });

        let yeniSatir2 = document.createElement('tr');
        yeniSatir2.innerHTML = `
            <td>${takimAdi1Value}</td>
            <td>${atilanGol1Value}</td>
            <td>---</td>
            <td>${atilanGol2Value}</td>
            <td>${takimAdi2Value}</td>
            
        `;
        tablo2.appendChild(yeniSatir2);

    takimAdi1.value = "";
    atilanGol1.value = "";
    atilanGol2.value = "";
    takimAdi2.value = "";

tr.style.display='';
tr2.style.display='';
}

kaydetBtn.addEventListener('click', kaydet);
