import CacPTCoBanTemplate from './../cac_pt_coban.html';
import Service from './../../../../services/maytinh.service';
import './axbyc.scss';
import math from 'mathjs';

let congtru = '&#8723;';
let ganbang = '&#8771;';
let trituyetdoi = '&#8739;';
let delta_ = '&#8710;';
let suyra = '&rArr;';
let behonbang = '&le;';
let thuoc = '&isin;';
let khac = '&ne;';

export default class PhuongTrinhAxByC {
  constructor() {
    this.a; this.b; this.c;
    this.loai;
    this.tru_ba; this.ca; this.cb;
    this.errorMessage;
    this.loiGiaiRutGon;
    this.btnXemBaiGiai;
    this.baigiai;
    this.TH1 = ['axbyc__TH1__rutgon'];
    this.TH2 = ['axbyc__TH2__rutgon'];
    this.axbyc__TH1__rutgon = Service.getTemplate(CacPTCoBanTemplate, 'span', 'axbyc__TH1__rutgon');
    this.axbyc__TH2__rutgon = Service.getTemplate(CacPTCoBanTemplate, 'span', 'axbyc__TH2__rutgon');
  }

  onInit(bac) {
    this.errorMessage = bac.querySelector('#error-message-axbyc');
    this.loiGiaiRutGon = bac.querySelector('#debai-axbyc');
    this.btnXemBaiGiai = bac.querySelector('#btnXemBaiGiai-axbyc');
    this.baigiai = bac.querySelector('#baigiai-axbyc');
  }

  onChange(inputElements) {
    let a = inputElements[0].value.trim();
    let b = inputElements[1].value.trim();
    let c = inputElements[2].value.trim();
    let TH = [];
    this.resetState();
    if (this.setValuesHandler(a, b, c) === false) { return 0; };

    if ((this.a * this.a) + (this.b * this.b) === 0) {
      this.errorHandler(true, 'Lỗi: a<sup>2</sup> + b<sup>2</sup> phải khác 0');
      return 0;
    } else {
      this.errorHandler(false, '');
      this.loiGiaiRutGon.innerHTML = '';
      this.baigiai.innerHTML = '';
      if (this.a !== 0 && this.b !== 0) { this.loai = 1; TH = this.TH1; }
      else if (this.a === 0 && this.b !== 0) { this.loai = 2; TH = this.TH2; }
      else if (this.a !== 0 && this.b === 0) { this.loai = 3; TH = this.TH1; }
    }

    this.loiGiaiRutGon.appendChild(this.getLoiGiaiRutGon());
    this.baigiai.appendChild(this.getLoiGiaiChiTiet());

    console.log(TH);
    TH // set mathjax to all
      .map(id => {
        let element = this.loiGiaiRutGon.querySelector(`#${id}`);
        console.log(element)
        return element;
      })
      .map(element => Service.setMathJax(element));
  }

  getLoiGiaiChiTiet() {
    let result = document.createElement('div');
    let s = '';
    const a = Service.round(this.a, 7);
    const b = Service.round(this.b, 7);
    const c = Service.round(this.c, 7);

    if (this.loai === 1) {
      const ucln_ba = Service.ucln(b, a);
      const ucln_ca = Service.ucln(c, a);
      s = `
      <p class='nghiem-axbyc'>* Phương trình có dạng: <strong>ax + by = c <span class='color-red'>(1)</span></strong></p>
      <p class='nghiem-axbyc'>* Vì a = ${a} ${khac} 0 nên <span class='color-red'><strong>(1)</strong></span> có vô số nghiệm thoả:</p>
      <p class='nghiem-axbyc'>
        \\(\\left\\{ \\begin{array}{l} x = \\frac{${-b}}{${a}}y + \\frac{${c}}{${a}}\\\\ y \\in R \\end{array} \\right. \\Leftrightarrow\\) 
        \\(\\left\\{ \\begin{array}{l} x = \\frac{${-b / ucln_ba}}{${a / ucln_ba}}y + \\frac{${c / ucln_ca}}{${a / ucln_ca}}\\\\ y \\in R \\end{array} \\right. \\Leftrightarrow\\)
        \\(\\left\\{ \\begin{array}{l} x = ${this.tru_ba}y + ${this.ca}\\\\ y \\in R \\end{array} \\right.\\)</p>
      `;
    } else if (this.loai === 2) {
      const ucln_cb = Service.ucln(c, b);
      s = `
      <p class='nghiem-axbyc'>* Phương trình có dạng: <strong>ax + by = c <span class='color-red'>(1)</span></strong></p>
      <p class='nghiem-axbyc'>* Vì a = 0 và b = ${b} # 0 nên <span class='color-red'><strong>(1)</strong></span> có vô số nghiệm thoả:</p>
      <p class='nghiem-axbyc'>
        \\(\\left\\{ \\begin{array}{l} x \\in R\\\\ y = \\frac{${-a}}{${b}}x + \\frac{${c}}{${b}} \\end{array} \\right. \\Leftrightarrow\\) 
        \\(\\left\\{ \\begin{array}{l} x \\in R\\\\ y = \\frac{${c / ucln_cb}}{${b / ucln_cb}} \\end{array} \\right. \\Leftrightarrow\\) 
        \\(\\left\\{ \\begin{array}{l} x \\in R\\\\ y = ${this.cb}\\end{array} \\right.\\)</p>
      `;
    } else if (this.loai === 3) {
      const ucln_ca = Service.ucln(c, a);
      s = `
      <p class='nghiem-axbyc'>* Phương trình có dạng: <strong>ax + by = c <span class='color-red'>(1)</span></strong></p>
      <p class='nghiem-axbyc'>* Vì a = ${a} ${khac} 0 nên <span class='color-red'><strong>(1)</strong></span> có vô số nghiệm thoả:</p>
      <p class='nghiem-axbyc'>
        \\(\\left\\{ \\begin{array}{l} x = \\frac{${-b}}{${a}}y + \\frac{${c}}{${a}}\\\\ y \\in R \\end{array} \\right. \\Leftrightarrow\\) 
        \\(\\left\\{ \\begin{array}{l} x = \\frac{${c / ucln_ca}}{${a / ucln_ca}}\\\\ y \\in R \\end{array} \\right. \\Leftrightarrow\\)
        \\(\\left\\{ \\begin{array}{l} x = ${this.ca}\\\\ y \\in R \\end{array} \\right.\\)</p>
      `;
    }
    result.innerHTML = s;
    return result;
  }

  getLoiGiaiRutGon() {
    let result = document.createElement('div');
    let s = '';
    if (this.loai === 1) {
      s = `<hr>
          <p class='nghiem-axbyc'><b class='color-red'>Đề bài:</b> (${this.a})x + (${this.b})y = (${this.c})</p>
          <p class='nghiem-axbyc'><b class='color-red'>Kết quả:</b> Phương trình có vô số nghiệm thỏa</p>
          <p class='nghiem-axbyc'><strong>\\(\\left\\{ \\begin{array}{l} x = ${this.tru_ba}y + ${this.ca}\\\\ y \\in R \\end{array} \\right.\\)</strong></p>
          `;
    } else if (this.loai === 2) {
      s = `<hr>
          <p class='nghiem-axbyc'><b class='color-red'>Đề bài:</b> (${this.a})x + (${this.b})y = (${this.c})</p>
          <p class='nghiem-axbyc'><b class='color-red'>Kết quả:</b> Phương trình có vô số nghiệm thỏa</p>
          <p class='nghiem-axbyc'><strong>\\(\\left\\{ \\begin{array}{l} x \\in R\\\\ y = ${this.cb} \\end{array} \\right.\\)</strong></p>
          `;
    } else if (this.loai === 3) {
      s = `<hr>
          <p class='nghiem-axbyc'><b class='color-red'>Đề bài:</b> (${this.a})x + (${this.b})y = (${this.c})</p>
          <p class='nghiem-axbyc'><b class='color-red'>Kết quả:</b> Phương trình có vô số nghiệm thỏa</p>
          <p class='nghiem-axbyc'><strong>\\(\\left\\{ \\begin{array}{l} x = ${this.ca}\\\\ y \\in R \\end{array} \\right.\\)</strong></p>
          `;
    }
    result.innerHTML = s;
    return result;
  }
  
  resetState() {
    this.btnXemBaiGiai.textContent = 'Xem bài giải';
    this.baigiai.classList.remove('displayBlock');
  }

  xemBaiGiai() {
    this.baigiai.classList.toggle('displayBlock');
    Service.xemBaiGaiHandler(this.btnXemBaiGiai, this.loiGiaiRutGon, this.baigiai);
  }

  setValuesHandler(a, b, c) {
    if (a === '' || b === '' || c === '') {
      this.errorHandler(true, 'a, b, c không được để trống');
      return false;
    }

    try {
      this.a = Number(math.eval(a));
      this.b = Number(math.eval(b));
      this.c = Number(math.eval(c));

      if (Number.isNaN(this.a) || Number.isNaN(this.b) || Number.isNaN(this.c)) {
        this.errorHandler(true, 'Lỗi: a, b, c phải là số');
        return false;
      }

      if(this.a !== 0) {
        this.tru_ba = Service.round((-this.b) / this.a, 7);
        this.ca = Service.round(this.c / this.a, 7);
      }

      if(this.b !== 0) {
        this.cb = Service.round(this.c / this.b, 7);
      }

      return true;
    } catch (error) {
      this.errorHandler(true, 'Lỗi: a, b, c phải là số');
    }
    return false;
  }

  errorHandler(type, message) {
    this.loiGiaiRutGon.style.display = type === true ? 'none' : 'block';
    this.btnXemBaiGiai.style.display = type === true ? 'none' : 'block';
    this.errorMessage.style.display = type === true ? 'block' : 'none';
    this.errorMessage.innerHTML = message;
  }
} 