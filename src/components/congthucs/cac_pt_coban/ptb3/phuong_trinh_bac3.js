import Service from './../../../../services/maytinh.service';
import CacPTCoBanTemplate from './../cac_pt_coban.html';
import math from 'mathjs';
import './phuong_trinh_bac3.scss';

let ganbang = '&#8771;';
let khac = '&ne;';
let trituyetdoi = '&#8739;';
let delta_ = '&#8710;';
let suyra = '&rArr;';
let behonbang = '&le;';

export default class PhuongTrinhBac3 {
  constructor() {
    this.mathjax = Service.getMathJaxElement();
    this.a; this.b; this.c; this.d;
    this.x1;
    this.x2;
    this.x3;
    this.delta; // delta = b^2 - 3ac
    this.k = 0;     // k = (9abc - 2b^3 - 27a^2d)/(2sqrt( |delta|^3 ))
    this.loai = 0;
    this.bac3__k = Service.getTemplate(CacPTCoBanTemplate, 'span', 'bac3__k');
    this.bac3__TH1__x1 = Service.getTemplate(CacPTCoBanTemplate, 'span', 'bac3__TH1__x1');
    this.bac3__TH1__x2 = Service.getTemplate(CacPTCoBanTemplate, 'span', 'bac3__TH1__x2');
    this.bac3__TH1__x3 = Service.getTemplate(CacPTCoBanTemplate, 'span', 'bac3__TH1__x3');
    this.bac3__TH2__x = Service.getTemplate(CacPTCoBanTemplate, 'span', 'bac3__TH2__x');
    this.bac3__TH3__x = Service.getTemplate(CacPTCoBanTemplate, 'span', 'bac3__TH3__x');
    this.bac3__TH4__x = Service.getTemplate(CacPTCoBanTemplate, 'span', 'bac3__TH4__x');
    this.TH1 = ['bac3__k', 'bac3__TH1__x1', 'bac3__TH1__x2', 'bac3__TH1__x3'];
    this.TH2 = ['bac3__k', 'bac3__TH2__x'];
    this.TH3 = ['bac3__TH3__x'];
    this.TH4 = ['bac3__TH4__x'];
    this.errorMessage;
    this.loiGiaiRutGon;
    this.btnXemBaiGiai;
    this.baigiai;
  }

  onInit(bac) {
    this.errorMessage = bac.querySelector('#error-message-bac3');
    this.loiGiaiRutGon = bac.querySelector('#debai-bac3');
    this.btnXemBaiGiai = bac.querySelector('#btnXemBaiGiai-bac3');
    this.baigiai = bac.querySelector('#baigiai-bac3');
  }

  resetState() {
    this.btnXemBaiGiai.textContent = 'Xem bài giải';
    this.baigiai.classList.remove('displayBlock');
  }

  xemBaiGiai() {
    this.baigiai.classList.toggle('displayBlock');
    Service.xemBaiGaiHandler(this.btnXemBaiGiai, this.loiGiaiRutGon, this.baigiai);
  }

  onChange(inputElements) {
    let a = inputElements[0].value.trim();
    let b = inputElements[1].value.trim();
    let c = inputElements[2].value.trim();
    let d = inputElements[3].value.trim();
    let TH = [];

    this.resetState();
    if (this.setValuesHandler(a, b, c, d) === false) { return 0; };

    if (this.a == 0) {
      this.errorHandler(true, 'Lỗi: a phải khác 0');
      return 0;
    } else {
      this.errorHandler(false, '');
      this.loiGiaiRutGon.innerHTML = '';
      this.baigiai.innerHTML = '';

      if (this.delta > 0 && Math.abs(this.k) <= 1) { this.loai = 1; TH = this.TH1; }
      else if (this.delta > 0 && Math.abs(this.k) > 1) { this.loai = 2; TH = this.TH2; }
      else if (this.delta == 0) { this.loai = 3; TH = this.TH3; }
      else if (this.delta < 0) { this.loai = 4; TH = this.TH4; }

      this.loiGiaiRutGon.appendChild(this.getLoiGiaiKhongChiTiet(this.loai, this.delta, this.k, this.a, this.b, this.c, this.d));
      this.baigiai.appendChild(this.getLoiGiaiChiTiet(this.loai, this.delta, this.k, this.a, this.b, this.c, this.d));

      TH // set mathjax to all
        .map(id => {
          let element = baigiai.querySelector(`#${id}`);
          return element;
        })
        .map(element => Service.setMathJax(element));
    }

  }

  setValuesHandler(a, b, c, d) {
    if (a === '' || b === '' || c === '' || d === '') {
      this.errorHandler(true, 'a, b, c, d không được để trống');
      return false;
    }

    try {
      this.a = Number(math.eval(a));
      this.b = Number(math.eval(b));
      this.c = Number(math.eval(c));
      this.d = Number(math.eval(d));

      if(Number.isNaN(this.a) || Number.isNaN(this.b) || Number.isNaN(this.c) || Number.isNaN(this.d)) {
        this.errorHandler(true, 'Lỗi: a, b, c, d phải là số');
        return false;
      }
    
      this.delta = (this.b * this.b - 3 * this.a * this.c);
      if (Number(this.delta) !== 0) {
        let _k = `(9*${this.a}*${this.b}*${this.c} - 2*(${this.b}^3) - 27*(${this.a}^2)*${this.d})/(2*sqrt((${Math.abs(this.delta)}^3)))`;
        this.k = Number(math.eval(_k));
      }
 
      return true;
    } catch (error) {
      // console.log(error);
      this.errorHandler(true, 'Lỗi: a, b, c, d phải là số');
    }
    return false;
  }

  getLoiGiaiChiTiet(loai, delta, k, a, b, c, d) {
    // bac3__k
    let result = document.createElement('div');
    let s = ``;
    if (loai == 1) {
      s = `
        <p class='nghiem-bac3'>* Phương trình có dạng: ax<sup>3</sup> + bx<sup>2</sup> + cx + d = 0 (a ≠ 0)</p>
        <p class='nghiem-bac3'>* Với a = ${a} ≠ 0</p>
        <p class='nghiem-bac3'>* ${delta_} = b<sup>2</sup> - 3ac = (${b})<sup>2</sup> - 3*(${a})*(${c}) ${Service.bang(delta)} <span class='color-red'>${Service.round(delta, 7)}</span></p>
        <p class='nghiem-bac3'>* k = ${this.bac3__k.outerHTML} ${Service.bang(k)} <span class='color-red'>${Service.round(k, 7)}</span></p>
        <p class='nghiem-bac3'>* Vì ${delta_} > 0 và |k| ${behonbang} 1 ${suyra} Phương trình có 3 nghiệm phân biệt là:</p>
        <p class='nghiem-bac3'>* <span class='color-red'>x1 = ${this.bac3__TH1__x1.outerHTML} ${Service.bang(this.x1)} ${this.x1}</span></p>
        <p class='nghiem-bac3'>* <span class='color-red'>x2 = ${this.bac3__TH1__x2.outerHTML} ${Service.bang(this.x2)} ${this.x2}</span></p>
        <p class='nghiem-bac3'>* <span class='color-red'>x3 = ${this.bac3__TH1__x3.outerHTML} ${Service.bang(this.x3)} ${this.x3}</span></p>
        <p class='nghiem-bac3'>* <span class='color-red'>Chú ý:</span> Công thức tính ∆ trong phương trình bậc 3 khác trong phương trình bậc 2</p>
        `;
    } else if (loai == 2) {
      s = `
      <p class='nghiem-bac3'>* Phương trình có dạng: ax<sup>3</sup> + bx<sup>2</sup> + cx + d = 0 (a ≠ 0)</p>
      <p class='nghiem-bac3'>* Với a = ${a} ≠ 0</p>
      <p class='nghiem-bac3'>* ${delta_} = b<sup>2</sup> - 3ac = (${b})<sup>2</sup> - 3*(${a})*(${c}) ${Service.bang(delta)} <span class='color-red'>${Service.round(delta, 7)}</span></p>
      <p class='nghiem-bac3'>* k = ${this.bac3__k.outerHTML} ${Service.bang(k)} <span class='color-red'>${Service.round(k, 7)}</span></p>
      <p class='nghiem-bac3'>* Vì ${delta_} > 0 và |k| > 1 ${suyra} Phương trình có 1 nghiệm thực là:</p>
      <p class='nghiem-bac3'>${this.bac3__TH2__x.outerHTML}</p>
      <p class='nghiem-bac3'><=> <span class='color-red'>x ${Service.bang(this.x)} ${this.x}</span></p>
      <p class='nghiem-bac3'>* <span class='color-red'>Chú ý:</span> Công thức tính ∆ trong phương trình bậc 3 khác trong phương trình bậc 2</p>
      `;
    } else if (loai == 3) {
      s = `
      <p class='nghiem-bac3'>* Phương trình có dạng: ax<sup>3</sup> + bx<sup>2</sup> + cx + d = 0 (a ≠ 0)</p>
      <p class='nghiem-bac3'>* Với a = ${a} ≠ 0</p>
      <p class='nghiem-bac3'>* ${delta_} = b<sup>2</sup> - 3ac = (${b})<sup>2</sup> - 3*(${a})*(${c}) ${Service.bang(delta)} <span class='color-red'>${Service.round(delta, 7)}</span></p>
      <p class='nghiem-bac3'>* Vì ${delta_} = 0 ${suyra} Phương trình có 1 nghiệm thực là:</p>
      <p class='nghiem-bac3'>* <span class='color-red'>x = ${this.bac3__TH3__x.outerHTML} ${Service.bang(this.x)} ${this.x}</span></p>
      <p class='nghiem-bac3'><span class='color-red'>* Chú ý:</span> Công thức tính ∆ trong phương trình bậc 3 khác trong phương trình bậc 2</p>
      `;
    } else if (loai === 4) {
      s = `
      <p class='nghiem-bac3'>* Phương trình có dạng: ax<sup>3</sup> + bx<sup>2</sup> + cx + d = 0 (a ≠ 0)</p>
      <p class='nghiem-bac3'>* Với a = ${a} ≠ 0</p>
      <p class='nghiem-bac3'>* ${delta_} = b<sup>2</sup> - 3ac = (${b})<sup>2</sup> - 3*(${a})*(${c}) ${Service.bang(delta)} <span class='color-red'>${Service.round(delta, 7)}</span></p>
      <p class='nghiem-bac3'>* Vì ${delta_} < 0 ${suyra} Phương trình có 1 nghiệm thực là:</p>
      <p class='nghiem-bac3'>${this.bac3__TH4__x.outerHTML}</p>
      <p class='nghiem-bac3'><=> <span class='color-red'>x ${Service.bang(this.x)} ${this.x}</span></p>
      <p class='nghiem-bac3'>* <span class='color-red'>Chú ý:</span> Công thức tính ∆ trong phương trình bậc 3 khác trong phương trình bậc 2</p>
      `
    }
    result.innerHTML = s;
    return result;
  }

  getLoiGiaiKhongChiTiet(loai, delta, k, a, b, c, d) {
    let result = document.createElement('div');
    let s = '';
    let kq = '';
    if (loai == 1) {
      kq = 'Phương trình có 3 nghiệm phân biệt là:';
      let _x1 = `(2*sqrt(${delta})*cos(acos(${k})/3)-${b})/(3*${a})`;
      let _x2 = `(2*sqrt(${delta})*cos(acos(${k})/3 - (2*pi/3))-${b})/(3*${a})`;
      let _x3 = `(2*sqrt(${delta})*cos(acos(${k})/3 + (2*pi/3))-${b})/(3*${a})`;
      this.x1 = Service.round(Number(math.eval(_x1)), 7);
      this.x2 = Service.round(Number(math.eval(_x2)), 7);
      this.x3 = Service.round(Number(math.eval(_x3)), 7);
      s = `<hr>
              <p class='nghiem-bac3'><b class='color-red'>Đề bài:</b> (${a})x<sup>3</sup> + (${b})x<sup>2</sup> + (${c})x + (${d}) = 0</p>
              <p class='nghiem-bac3'><b class='color-red'>Kết quả:</b> ${kq}</p>
              <p class='nghiem-bac3'>x<sub>1</sub> ${Service.bang(this.x1)} ${this.x1}</p>
              <p class='nghiem-bac3'>x<sub>2</sub> ${Service.bang(this.x2)} ${this.x2}</p>
              <p class='nghiem-bac3'>x<sub>3</sub> ${Service.bang(this.x3)} ${this.x3}</p>`;
    } else if (loai == 2) {
      kq = 'Phương trình có 1 nghiệm thực là:';
      let _x = `((sqrt(${delta})*${Math.abs(k)})/(3*${a}*${k}))*(((abs(${k})+sqrt(${k * k}-1))^(1/3))+(((abs(${k})-sqrt(${k * k}-1))^(1/3))))-(${b}/(3*${a}))`;
      this.x = Service.round(Number(math.eval(_x)),7);
      s = `<hr>
              <p class='nghiem-bac3'><b class='color-red'>Đề bài:</b> (${a})x<sup>3</sup> + (${b})x<sup>2</sup> + (${c})x + (${d}) = 0</p>
              <p class='nghiem-bac3'><b class='color-red'>Kết quả:</b> ${kq}</p>
              <p class='nghiem-bac3'>x ${Service.bang(this.x)} ${this.x}</p>`;
    } else if (loai == 3) {
      kq = 'Phương trình có 1 nghiệm thực là:';
      let nhap1 = (b * b * b - 27 * a * a * d);
      let _x = `(-${b} + ${nhap1}^(1/3)) / (3*${a})`;
      this.x = Service.round(Number(math.eval(_x)), 7);
      console.log(this.x);
      s = `<hr>
              <p class='nghiem-bac3'><b class='color-red'>Đề bài:</b> (${a})x<sup>3</sup> + (${b})x<sup>2</sup> + (${c})x + (${d}) = 0</p>
              <p class='nghiem-bac3'><b class='color-red'>Kết quả:</b> ${kq}</p>
              <p class='nghiem-bac3'>x ${Service.bang(this.x)} ${this.x}</p>`;
    } else if (loai == 4) {
      kq = 'Phương trình có 1 nghiệm thực là:';

      let _p1 = `((sqrt(${Math.abs(delta)}))/(3*${a}))`;
      let _p2_1 = `(${k}+sqrt(${k * k}+1))^(1/3)`;
      let _p2_2 = `${k}-sqrt(${k * k}+1)`;
      let _p3 = `-(${b}/(3*${a}))`;

      let p1 = Number(math.eval(_p1));
      let p2_1 = Number(math.eval(_p2_1));
      let p2_2 = Number(math.eval(_p2_2));
      let p3 = Number(math.eval(_p3));
      p2_2 = Number(math.eval(`${p2_2}^(1/3)`));

      this.x = Service.round((p1 * (p2_1 + p2_2)) + p3, 7);
      s = `<hr>
            <p class='nghiem-bac3'><b class='color-red'>Đề bài:</b> (${a})x<sup>3</sup> + (${b})x<sup>2</sup> + (${c})x + (${d}) = 0</p>
            <p class='nghiem-bac3'><b class='color-red'>Kết quả:</b> ${kq}</p>
            <p class='nghiem-bac3'>x ${Service.bang(this.x)} ${this.x}</p>`;
    }
    result.innerHTML = s;
    return result;
  }

  errorHandler(type, message) {
    this.loiGiaiRutGon.style.display = type === true ? 'none' : 'block';
    this.btnXemBaiGiai.style.display = type === true ? 'none' : 'block';
    this.baigiai.innerHTML = '';
    this.errorMessage.style.display = type === true ? 'block' : 'none';
    this.errorMessage.innerHTML = message;
  }

  resetState() {
    this.btnXemBaiGiai.textContent = 'Xem bài giải';
    this.baigiai.classList.remove('displayBlock');
  }

  xemBaiGiai() {
    this.baigiai.classList.toggle('displayBlock');
    Service.xemBaiGaiHandler(this.btnXemBaiGiai, this.loiGiaiRutGon, this.baigiai);
  }
}