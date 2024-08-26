// urun ekleme
let eklemeAdi = document.getElementById("eklemeAdi");
let eklemeSatisFiyati = document.getElementById("eklemeSatisFiyati");
let eklemeBtn = document.getElementById("eklemeBtn");
//urun listesi
let tabloUrun = document.getElementById("tabloUrun");
let trUrun = document.getElementById("trUrun");
// toptanci islemleri
let toptAdi = document.getElementById("toptAdi");
let toptAdedi = document.getElementById("toptAdedi");
let toptAlis = document.getElementById("toptAlis");
let toptToplam = document.getElementById("toptToplam");
let toptOdenen = document.getElementById("toptOdenen");
let toptKalan = document.getElementById("toptKalan");
// stok listesi
let stokAdi = document.getElementById("stokAdi");
let stokAdedi = document.getElementById("stokAdedi");
let stokBtn = document.getElementById("stokBtn");
//stok listesi
let tabloStok = document.getElementById("tabloStok");
let trStok = document.getElementById("trStok");
// satis islemleri
let satisAdi = document.getElementById("satisAdi");
let satisAdedi = document.getElementById("satisAdedi");
let satisTopFiyat = document.getElementById("satisTopFiyat");
let satisBtn = document.getElementById("satisBtn");
// gunluk kazanc
let gunlukCiro = document.getElementById("gunlukCiro");
let gunlukKar = document.getElementById("gunlukKar");
let tabloToptanci = document.getElementById("tabloToptanci");

let tabloSat = document.getElementById("tabloSat");

let urunListesi = [];
let toptListesi = [];
let stokListesi = [];
let satisListesi = [];
let urunler = -1;

function toptIslemiEkleme() {
  // toptanci islemleri kismi
  const toptAdiValue = toptAdi.querySelector("input").value;
  const toptAdediValue = toptAdedi.querySelector("input").value;
  // const toptToplamValue = parseFloat(toptToplam.querySelector('input').value);
  const toptOdenenValue = parseFloat(toptOdenen.querySelector("input").value);

  const toptAlisValue = parseFloat(toptAlis.querySelector("input").value);

  toplamFiyat = toptAlisValue * toptAdediValue;

  // Kalan bakiye hesaplama
  const kalanBakiye = toplamFiyat - toptOdenenValue;

  const topt = {
    toptAdi: toptAdiValue,
    toptAdedi: toptAdediValue,
    toptAlis: toptAlisValue,
    toptToplam: toplamFiyat,
    toptOdenen: toptOdenenValue,
    kalanBakiye: kalanBakiye,
  };

  toptListesi.push(topt);

  // Yeni ürün için tablo satırı oluşturma
  const yeniSatir2 = document.createElement("tr");
  yeniSatir2.innerHTML = `
    <td>${topt.toptAdi}</td>
    <td>${topt.toptAdedi}</td>
    <td>${topt.toptAlis.toFixed(2)} TL</td>
    <td>${topt.toptToplam.toFixed(2)} TL</td>
    <td>${topt.toptOdenen.toFixed(2)} TL</td>
    <td>${topt.kalanBakiye.toFixed(2)} TL</td>
    <td><button class="btn btn-warning btn-sm" onclick="duzenle(${
      toptListesi.length - 1
    })">Düzenle</button></td>
    `;

  tabloToptanci.appendChild(yeniSatir2);

  console.log(toptListesi);

  //mevcut stok listesi kismi
  const stok = {
    stokAdi: toptAdiValue,
    stokAdedi: toplamFiyat,
  };
  toptListesi.push(stok);

  const yeniSatir3 = document.createElement("tr");
  yeniSatir3.innerHTML = `
        <td>${topt.toptAdi}</td>
        <td>${topt.toptAdedi}</td>
    `;

  tabloStok.appendChild(yeniSatir3);

  console.log(toptListesi);

  // Formu temizle
  toptAdi.querySelector("input").value = "";
  toptAdedi.querySelector("input").value = "";
  //toptToplam.querySelector('input').value = '';
  toptOdenen.querySelector("input").value = "";
}

function urunEkle() {
  const eklemeAdiValue = eklemeAdi.querySelector("input").value;
  const eklemeSatisFiyatiValue = eklemeSatisFiyati.querySelector("input").value;

  const urun = {
    eklemeAdi: eklemeAdiValue,
    eklemeSatisFiyati: eklemeSatisFiyatiValue,
  };

  urunListesi.push(urun);

  // Yeni ürün için tablo satırı oluşturma
  const yeniSatir = document.createElement("tr");
  yeniSatir.innerHTML = `
            <td>${urun.eklemeAdi}</td>
            <td>${urun.eklemeSatisFiyati} TL</td>
            <td><button class="btn btn-warning btn-sm" onclick="duzenle(${
              urunListesi.length - 1
            })">Duzenle</button></td>
        `;

  tabloUrun.appendChild(yeniSatir);

  console.log(urunListesi);

  // Formu temizle
  eklemeAdi.querySelector("input").value = "";
  eklemeSatisFiyati.querySelector("input").value = "";
}

function satisIslemi() {
  let satisAdiValue = satisAdi.querySelector("input").value;
  let satisAdediValue = satisAdedi.querySelector("input").value;

  const urun = urunListesi.find((item) => item.eklemeAdi === satisAdiValue);

  let toplamFiyat = 0;
  if (urun) {
    toplamFiyat = urun.eklemeSatisFiyati * satisAdediValue;
  }

  const sat = {
    satisAdi: satisAdiValue,
    satisAdedi: satisAdediValue,
    satToplam: toplamFiyat,
  };
  satisListesi.push(sat);

  const yeniSatir4 = document.createElement("tr");
  yeniSatir4.innerHTML = `
        <td>${sat.satisAdi}</td>
        <td>${sat.satisAdedi}</td>
        <td>${sat.satToplam} TL</td>
        <td><button class="btn btn-warning btn-sm" onclick="sat(${
          satisListesi.length - 1
        })">Düzenle</button></td>
    `;

  tabloSat.appendChild(yeniSatir4);

  console.log(satisListesi);

  satisAdi.querySelector("input").value = "";
  satisAdedi.querySelector("input").value = "";

  // Güncelleeeeee
  guncelleStok(satisAdiValue, satisAdediValue);
  guncelleKar();
  guncelleCiro();
}

function guncelleStok(urunAdi, satilanAdet) {
  const stokSatir = Array.from(tabloStok.getElementsByTagName("tr")).find(
    (row) => row.cells[0].textContent.trim() === urunAdi.trim()
  );

  if (stokSatir) {
    let mevcutAdet = parseInt(stokSatir.cells[1].textContent.trim(), 10);
    let yeniAdet = mevcutAdet - parseInt(satilanAdet, 10);

    stokSatir.cells[1].textContent = yeniAdet;
  }
}



function guncelleCiro() {
  let toplamCiro = 0;

  for (let i = 0; i < satisListesi.length; i++) {
    toplamCiro += satisListesi[i].satToplam;
  }

  gunlukCiro.textContent = `${toplamCiro.toFixed(2)} TL`;
  return toplamCiro;
}




function guncelleKar() {
  const toplamCiro = guncelleCiro();
  let toplamMaliyet = 0;

  for (let i = 0; i < satisListesi.length; i++) {
    const sat = satisListesi[i];

    const urunIndex = urunListesi.findIndex(
      (urun) => urun.eklemeAdi === sat.satisAdi
    );

    const topt = toptListesi[urunIndex];
    const toptAlis = topt ? topt.toptAlis : 0;

    toplamMaliyet += sat.satisAdedi * toptAlis;
  }

  const toplamKar = toplamCiro - toplamMaliyet;
  gunlukKar.textContent = `${toplamKar.toFixed(2)} TL`;
}
