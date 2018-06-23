import './phuong_trinh_bac1.scss';
import Service from './../../../../services/maytinh.service';
import math from 'mathjs';

let ganbang = '&#8771;';
let khac = '&ne;';

export default class PhuongTrinhBac1 {
  constructor() {
    this.a; this.b; this.x; this.kq;
    this.errorMessage;
    this.loiGiaiRutGon;
  }

  onInit(bac) {
    this.errorMessage = bac.querySelector('#error-message-bac1');
    this.loiGiaiRutGon = bac.querySelector('#debai-bac1');
  }

  onChange(inputElements) {
    let a = inputElements[0].value.trim();
    let b = inputElements[1].value.trim();
    let TH = ['tadatate'];
    if (this.setValuesHandler(a, b) === false) { return 0; };

    this.errorHandler(false, '');
    this.loiGiaiRutGon.innerHTML = '';
    if(this.a !== 0) { this.loai = 1; }
    else if(this.a === 0 && this.b !== 0) { this.loai = 2; }
    else if(this.a === 0 && this.b === 0) { this.loai = 3; }

    this.loiGiaiRutGon.appendChild(this.getLoiGiaiRutGon());

    TH // set mathjax to all
      .map(id => {
        let element = this.loiGiaiRutGon.querySelector(`#${id}`);
        return element;
      })
      .map(element => Service.setMathJax(element));
  }

  getLoiGiaiRutGon() {
    let result = document.createElement('div');
    let s = 'loai giai k chi tiet';

    if(this.loai === 1) {
      this.kq = -this.b / this.a;
      s = `<hr>
        <p class='nghiem-bac1'><b class='color-red'>Đề bài:</b> <strong>(${this.a})x + (${this.b}) = 0</strong></p>
        <p class='nghiem-bac1'>* Phương trình có dạng: <strong>ax + b = 0</strong></p>
        <p class='nghiem-bac1'>* Vì a = ${this.a} ${khac} 0 => phương trình có 1 nghiệm</p>
        <p class='nghiem-bac1'>* x = \\( \\frac{${-this.b}}{${this.a}}\\) ${Service.bang(this.kq)} ${Service.round(this.kq, 7)}</strong></p>
        <p class='nghiem-bac1'><b class='color-red'>Kết quả:</b> <strong>x ${Service.bang(this.kq)} ${Service.round(this.kq, 7)}</strong></p>
      `;
    } else if (this.loai === 2) {
      s = `<hr>
      <p class='nghiem-bac1'><b class='color-red'>Đề bài:</b> <strong>(${this.a})x + (${this.b}) = 0</strong></p>
      <p class='nghiem-bac1'>* Phương trình có dạng: <strong>ax + b = 0</strong></p>
      <p class='nghiem-bac1'>* Vì a = 0 và b = ${this.b} ${khac} 0 => Phương trình vô nghiệm</p>
      <p class='nghiem-bac1'><strong class='color-red'>Kết quả:</strong> <strong>Phương trình vô nghiệm</strong></p>
    `;
    } else if (this.loai === 3) {
      s = `<hr>
      <p class='nghiem-bac1'><b class='color-red'>Đề bài:</b> <strong>(${this.a})x + (${this.b}) = 0</strong></p>
      <p class='nghiem-bac1'>* Phương trình có dạng: <strong>ax + b = 0</strong></p>
      <p class='nghiem-bac1'>* Vì a = 0 và b = 0 => Phương trình vô số nghiệm</p>
      <p class='nghiem-bac1'><strong class='color-red'>Kết quả:</strong> <strong>Phương trình vô số nghiệm &forall;x &isin; R</strong></p>
    `;
    }

    result.innerHTML = s;
    return result;
  }

  setValuesHandler(a, b) {
    console.log(a, b, a)
    if (a === '' || b === '') {
      this.errorHandler(true, 'a, b không được để trống');
      return false;
    }

    try {
      this.a = Number(math.eval(a));
      this.b = Number(math.eval(b));

      if (Number.isNaN(this.a) || Number.isNaN(this.b)) {
        this.errorHandler(true, 'Lỗi: a, b phải là số');
        return false;
      }
      return true;
    } catch (error) {
      console.log(error)
      this.errorHandler(true, 'Lỗi: a, b phải là số');
    }
    return false;
  }

  errorHandler(type, message) {
      this.loiGiaiRutGon.style.display = type === true ? 'none' : 'block';
      // this.btnXemBaiGiai.style.display = type === true ? 'none' : 'block';
      this.errorMessage.style.display = type === true ? 'block' : 'none';
      this.errorMessage.innerHTML = message;
  }
}