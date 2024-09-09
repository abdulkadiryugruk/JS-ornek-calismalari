const soru1 = document.querySelector('#soru1');
const soru2 = document.querySelector('#soru2');
const soru3 = document.querySelector('#soru3');
const soru4 = document.querySelector('#soru4');
const soru5 = document.querySelector('#soru5');
const soru6 = document.querySelector('#soru6');
const soru7 = document.querySelector('#soru7');
const soru8 = document.querySelector('#soru8');
const soru9 = document.querySelector('#soru9');
const soru10 = document.querySelector('#soru10');

const btnBitir = document.querySelector('#btnBitir');

let puan = document.getElementById('puan');
let dogru = document.getElementById('dogru');
let yanlis = document.getElementById('yanlis');
let bos = document.getElementById('bos');

const sorular = [soru1, soru2, soru3, soru4, soru5, soru6, soru7, soru8, soru9, soru10];

let puanlama = 0;
let dogrular = 0;
let yanlislar = 0;
let boslar = 0;

function bitir() {

    sorular.forEach((soru) => {

        const secilenCevap = soru.querySelector('input[type="radio"]:checked');

        if (secilenCevap) {
            const kontrol = secilenCevap.parentElement;

            if (kontrol.classList.contains('cevap')) {
                kontrol.style.backgroundColor = 'green';
                puanlama +=10;
                dogrular +=1;
                
            } else {
                kontrol.style.backgroundColor = 'red'; 
                yanlislar +=1;
            }
        }else{
            const dogruCevap = soru.querySelector('label.cevap');

            if(dogruCevap){
                dogruCevap.style.backgroundColor = 'blue';
                boslar +=1;
            }
        }
    });
puan.innerHTML=`
<div class="bg-primary text-white">Puaniniz: ${puanlama}</div>
`;
dogru.innerHTML=`
<div class="bg-primary text-white">dogru: ${dogrular}</div>
`;
yanlis.innerHTML=`
<div class="bg-primary text-white">yanlis: ${yanlislar}</div>
`;
bos.innerHTML=`
<div class="bg-primary text-white">bos: ${boslar}</div>
`;

btnBitir.removeEventListener('click', bitir);
};
btnBitir.addEventListener('click', bitir);