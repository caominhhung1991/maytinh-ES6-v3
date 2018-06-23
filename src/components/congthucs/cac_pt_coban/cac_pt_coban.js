import CacPTCoBanTemplate from './cac_pt_coban.html';
// import Service from './../../../services/maytinh.service';
import Service from './../../../services/maytinh.service';
import math from 'mathjs';
import PhuongTrinhBac2 from './ptb2/phuong_trinh_bac2';
import PhuongTrinhBac3 from './ptb3/phuong_trinh_bac3';
import PhuongTrinhBac4 from './ptb4/phuong_trinh_bac4';
import PhuongTrinhBac1 from './ptb1/phuong_trinh_bac1';
import PhuongTrinhAxByC from './axbyc/axbyc';

math.config({
    number: 'BigNumber',
    precision: 20
})

let phuongTrinhBac1 = new PhuongTrinhBac1();
let phuongTrinhBac2 = new PhuongTrinhBac2();
let phuongTrinhBac3 = new PhuongTrinhBac3();
let phuongTrinhBac4 = new PhuongTrinhBac4();
let phuongTrinhAxByC = new PhuongTrinhAxByC();

export default class CacPTCoBan {
    constructor() {
    }

    getCacPTCoBan() {
        let div = document.createElement('div');
        div.innerHTML = CacPTCoBanTemplate;
        let cacPTCoBan = Service.getTemplate(CacPTCoBanTemplate, 'div', 'cac-dang-pt-co-ban');

        /** Phương trình bậc 1 */
        let bienPTB1 = ['a-bac1', 'b-bac1'];
        let bac1 = Service.getPhuongTrinh(CacPTCoBanTemplate, 'div', 'ptb1', '#bac1', phuongTrinhBac1, bienPTB1, '#btnXemBaiGiai-bac1');
        bac1.onclick = () => { Service.toggleHandler(bac1, cacPTCoBan)}

        /** Phương trình bậc 2 */
        let _ptb2 = div.querySelector('#ptb2');
        let ptb2 = document.importNode(_ptb2.content, true);
        ptb2 = ptb2.querySelector('#bac2');
        ptb2.onclick = () => { Service.toggleHandler(ptb2, cacPTCoBan)}
        let bienPTB2 = ['a', 'b', 'c'];
        let bienElementPTB2 = bienPTB2.map(bienId => { return ptb2.querySelector(`#${bienId}`); });
        bienElementPTB2.map(element => { element.onchange = () => { phuongTrinhBac2.onChangePTB2(); } });
        let btnXemBaiGiaiPTB2 = ptb2.querySelector('#btnXemBaiGiai');
        btnXemBaiGiaiPTB2.onclick = () => { phuongTrinhBac2.xemBaiGiaiPTB2() };

        /** Phương trình bậc 3 */
        let bienPTB3 = ['a-bac3', 'b-bac3', 'c-bac3', 'd-bac3'];
        let bac3 = Service.getPhuongTrinh(CacPTCoBanTemplate, 'div', 'ptb3', '#bac3', phuongTrinhBac3, bienPTB3, '#btnXemBaiGiai-bac3');
        bac3.onclick = () => { Service.toggleHandler(bac3, cacPTCoBan)}
        /** Phương trình bậc 4 */        
        let bienPTB4 = ['a-bac4', 'b-bac4', 'c-bac4'];
        let bac4 = Service.getPhuongTrinh(CacPTCoBanTemplate, 'div', 'ptb4', '#bac4', phuongTrinhBac4, bienPTB4, '#btnXemBaiGiai-bac4');
        bac4.onclick = () => { Service.toggleHandler(bac4, cacPTCoBan)}
        /** Phương trình ax + by = c */
        let bienAxByC = ['a-axbyc', 'b-axbyc', 'c-axbyc'];
        let axbyc = Service.getPhuongTrinh(CacPTCoBanTemplate, 'div', 'axbyc_template', '#axbyc', phuongTrinhAxByC, bienAxByC, '#btnXemBaiGiai-axbyc');
        axbyc.onclick = () => { Service.toggleHandler(axbyc, cacPTCoBan)}


        cacPTCoBan.appendChild(bac1);
        cacPTCoBan.appendChild(ptb2);
        cacPTCoBan.appendChild(bac3);
        cacPTCoBan.appendChild(bac4);
        cacPTCoBan.appendChild(axbyc);

        return cacPTCoBan;
    }

}