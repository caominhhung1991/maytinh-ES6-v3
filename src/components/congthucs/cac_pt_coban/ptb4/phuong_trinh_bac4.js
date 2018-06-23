import CacPTCoBanTemplate from './../cac_pt_coban.html';
import Service from './../../../../services/maytinh.service';
import math from 'mathjs';
import './phuong_trinh_bac4.scss';

let congtru = '&#8723;';
let ganbang = '&#8771;';
let khac = '&ne;';
let trituyetdoi = '&#8739;';
let delta_ = '&#8710;';
let suyra = '&rArr;';
let behonbang = '&le;';

export default class PhuongTrinhBac4 {
  constructor() {
    this.a; this.b; this.c; this.delta; this.b2a; this.S; this.P;
    this.X1; this.X2;
    this.x; this.x1; this.x2;
    this.loai;
    this.errorMessage;
    this.loiGiaiRutGon;
    this.btnXemBaiGiai;
    this.baigiai;
    this.bac4__TH2__x = Service.getTemplate(CacPTCoBanTemplate, 'span', 'bac4__TH2__x');
    this.bac4__TH3__x = Service.getTemplate(CacPTCoBanTemplate, 'span', 'bac4__TH3__x');
    this.bac4__TH4__x = Service.getTemplate(CacPTCoBanTemplate, 'span', 'bac4__TH4__x');
    this.bac4__TH5__x1 = Service.getTemplate(CacPTCoBanTemplate, 'span', 'bac4__TH5__x1');
    this.bac4__TH5__x2 = Service.getTemplate(CacPTCoBanTemplate, 'span', 'bac4__TH5__x2');
    this.TH2 = ['bac4__TH2__x'];
    this.TH3 = ['bac4__TH3__x'];
    this.TH4 = ['bac4__TH4__x'];
    this.TH5 = ['bac4__TH5__x1', 'bac4__TH5__x2'];
  }

  onInit(bac) {
    this.errorMessage = bac.querySelector('#error-message-bac4');
    this.loiGiaiRutGon = bac.querySelector('#debai-bac4');
    this.btnXemBaiGiai = bac.querySelector('#btnXemBaiGiai-bac4');
    this.baigiai = bac.querySelector('#baigiai-bac4');
  }

  onChange(inputElements) {
    let a = inputElements[0].value.trim();
    let b = inputElements[1].value.trim();
    let c = inputElements[2].value.trim();
    let TH = [];

    this.resetState();
    if (this.setValuesHandler(a, b, c) === false) { return 0; };

    if (this.a === 0) {
      this.errorHandler(true, 'Lỗi: a phải khác 0');
      return 0;
    } else {
      this.errorHandler(false, '');
      this.loiGiaiRutGon.innerHTML = '';
      this.baigiai.innerHTML = '';

      if (this.delta < 0 || (this.delta == 0 && this.b2a < 0) || (this.delta > 0 && this.S < 0 && this.P > 0)) { 
        console.log('TH1')
        this.loai = 1;  TH = this.TH1
      } // vô nghiệm
      else if (this.delta == 0 && this.b2a >= 0) { this.loai = 2; TH = this.TH2}
      else if (this.delta > 0 && this.X1 >= 0 && this.X2 < 0) { this.loai = 3; TH = this.TH3 }
      else if (this.delta > 0 && this.X1 < 0 && this.X2 >= 0) { 
        this.loai = 4; TH = this.TH4;
        console.log('TH4')
      }
      else if (this.delta > 0 && this.X1 >= 0 && this.X2 >= 0) { this.loai = 5; TH = this.TH5 }
      else {
        console.log("TH con lai")
      }
    }
    this.loiGiaiRutGon.appendChild(this.getLoiGiaiRutGon());
    this.baigiai.appendChild(this.getLoiGiaiChiTiet());
    if(this.loai !== 1) {
      TH // set mathjax to all
      .map(id => {
        let element = this.baigiai.querySelector(`#${id}`);
        return element;
      })
        .map(element => Service.setMathJax(element));
    }
  }
 
  getLoiGiaiChiTiet() {
    let result = document.createElement('div');
    let s = `lời giải chi tiết.`;
    if(this.loai === 1) { //this.delta < 0 || (this.delta == 0 && this.b2a < 0
      if(this.delta < 0) {
        s = `
        <p class='nghiem-bac4'>* Phương trình có dạng: <strong>ax<sup>4</sup> + bx<sup>2</sup> + c = 0 <span class='color-red'>(1)</span></strong>, </p>
        <p class='nghiem-bac4'>nên đặt: <strong>t = x<sup>2</sup> (t ≥ 0)</strong> ta được phương trình mới: </p>
        <p class='nghiem-bac4'><strong>at<sup>2</sup> + bt + c = 0 <span class='color-red'>(2)</span></strong> <=> ${this.a}t<sup>2</sup> + ${this.b}t + ${this.c} = 0</p>
        <p class='nghiem-bac4'>* ${delta_} = b<sup>2</sup> - 4ac =  ${this.b}<sup>2</sup> - 4*${this.a}*${this.c} = ${this.delta}</p>
        <p class='nghiem-bac4'><strong>* Vì ${delta_} < 0 => <span class='color-red'>(2)</span> vô nghiệm => <span class='color-red'>(1)</span> vô nghiệm</strong></p>`;
      } else if (this.delta === 0 && this.b2a < 0) {
        s = `
        <p class='nghiem-bac4'>* Phương trình có dạng: <strong>ax<sup>4</sup> + bx<sup>2</sup> + c = 0 <span class='color-red'>(1)</span></strong>, </p>
        <p class='nghiem-bac4'>nên đặt: <strong>t = x<sup>2</sup> (t ≥ 0)</strong> ta được phương trình mới: </p>
        <p class='nghiem-bac4'><strong>at<sup>2</sup> + bt + c = 0 <span class='color-red'>(2)</span></strong> <=> ${this.a}t<sup>2</sup> + ${this.b}t + ${this.c} = 0</p>
        <p class='nghiem-bac4'>* ${delta_} = b<sup>2</sup> - 4ac =  ${this.b}<sup>2</sup> - 4*${this.a}*${this.c} = ${this.delta}</p>
        <p class='nghiem-bac4'><strong>* Vì ${delta_} = 0 => <span class='color-red'>(2)</span> có nghiệm kép</span></p>
        <p class='nghiem-bac4'><span id='bac4__TH2_b2a'>\\({t_1} = {t_2} = \\frac{{ - b}}{{2a}} = \\frac{${-this.b}}{${this.a}} ${Service.bang(this.b2a)} ${this.b2a}\\)</span></p>
        <p class='nghiem-bac4'>* Vì <span id='bac4__TH2_b2a_2'>\\(\\frac{{ - b}}{{2a}} < 0 \\Rightarrow\\)</span> <span class='color-red'>(1)</span> vô nghiệm</p>`
      } else if (this.delta > 0 && this.S < 0 && this.P > 0) {
        s = `
        <p class='nghiem-bac4'>* Phương trình có dạng: <strong>ax<sup>4</sup> + bx<sup>2</sup> + c = 0 <span class='color-red'>(1)</span></strong>, </p>
        <p class='nghiem-bac4'>nên đặt: <strong>t = x<sup>2</sup> (t ≥ 0)</strong> ta được phương trình mới: </p>
        <p class='nghiem-bac4'><strong>at<sup>2</sup> + bt + c = 0 <span class='color-red'>(2)</span></strong> <=> ${this.a}t<sup>2</sup> + ${this.b}t + ${this.c} = 0</p>
        <p class='nghiem-bac4'>* ${delta_} = b<sup>2</sup> - 4ac =  ${this.b}<sup>2</sup> - 4*${this.a}*${this.c} = ${this.delta}</p>
        <p class='nghiem-bac4'><strong>* Vì ${delta_} > 0 và S = -b/a ${Service.bang(this.S)} ${this.S} < 0 và P = c/a ${Service.bang(this.P)} ${this.P} > 0 => <span class='color-red'>(1)</span> vô nghiệm</p>`;
      }
     
    } else if(this.loai === 2) { //this.delta == 0 && this.b2a >= 0
      s = `
      <p class='nghiem-bac4'>* Phương trình có dạng: <strong>ax<sup>4</sup> + bx<sup>2</sup> + c = 0 <span class='color-red'>(1)</span></strong>, </p>
      <p class='nghiem-bac4'>nên đặt: <strong>t = x<sup>2</sup> (t ≥ 0)</strong> ta được phương trình mới: </p>
      <p class='nghiem-bac4'><strong>at<sup>2</sup> + bt + c = 0 <span class='color-red'>(2)</span></strong> <=> ${this.a}t<sup>2</sup> + ${this.b}t + ${this.c} = 0</p>
      <p class='nghiem-bac4'>* ${delta_} = b<sup>2</sup> - 4ac =  ${this.b}<sup>2</sup> - 4*${this.a}*${this.c} = ${this.delta}</p>
      <p class='nghiem-bac4'><strong>* Vì ${delta_} = 0 => <span class='color-red'>(2)</span> có nghiệm kép</span></p>
      <p class='nghiem-bac4'><span id='bac4__TH2_b2a'>\\({t_1} = {t_2} = \\frac{{ - b}}{{2a}} = \\frac{${-this.b}}{${this.a}} = ${this.b2a}\\)</span></p>
      <p class='nghiem-bac4'>* Vì <span id='bac4__TH2_b2a_2'>\\(\\frac{{ - b}}{{2a}} \\ge 0 \\Rightarrow\\)</span> <span class='color-red'>(1)</span> có nghiệm là:</p>
      <p class='nghiem-bac4'><span id='bac4__TH2_b2a_3'>\\(x =  \\pm \\sqrt {\\frac{{ - b}}{{2a}}}  =  \\pm \\sqrt {\\frac{{${-this.b}}}{{${2*this.a}}}} ${Service.bang(this.x)} \\pm ${this.x}\\)</span></p>
      `;
    } else if(this.loai === 3) { // this.delta > 0 && this.X1 >= 0 && this.X2 < 0
      s = `
        <p class='nghiem-bac4'>* Phương trình có dạng: <strong>ax<sup>4</sup> + bx<sup>2</sup> + c = 0 <span class='color-red'>(1)</span></strong>, </p>
        <p class='nghiem-bac4'>nên đặt: <strong>t = x<sup>2</sup> (t ≥ 0)</strong> ta được phương trình mới: </p>
        <p class='nghiem-bac4'><strong>at<sup>2</sup> + bt + c = 0 <span class='color-red'>(2)</span></strong> <=> ${this.a}t<sup>2</sup> + ${this.b}t + ${this.c} = 0</p>
        <p class='nghiem-bac4'>* ${delta_} = b<sup>2</sup> - 4ac =  ${this.b}<sup>2</sup> - 4*${this.a}*${this.c} = ${this.delta}</p>
        <p class='nghiem-bac4'><strong>* Vì ${delta_} > 0 => <span class='color-red'>(2)</span> có 2 nghiệm phân biệt:</strong></p>
        <p class='nghiem-bac4'>\\({t_1} = \\frac{{ - b - \\sqrt \\Delta  }}{{2a}} = \\frac{{ ${-this.b} - \\sqrt ${this.delta} }}{{${2*this.a}}} ${Service.bang(this.X1)} ${this.X1}\\)</p>
        <p class='nghiem-bac4'>\\({t_2} = \\frac{{ - b + \\sqrt \\Delta  }}{{2a}} = \\frac{{ ${-this.b} + \\sqrt ${this.delta} }}{{${2*this.a}}} ${Service.bang(this.X2)} ${this.X2}\\)</p>
        <p class='nghiem-bac4'>* Vì \\(\\frac{{ - b - \\sqrt \\Delta  }}{{2a}} \\ge 0\\) và \\(\\frac{{ - b - \\sqrt \\Delta  }}{{2a}} < 0 \\Rightarrow\\) <span class='color-red'>(1)</span> có nghiệm:</p>
        <p class='nghiem-bac4'>
        \\(x =  \\pm \\sqrt {\\frac{{ - b - \\sqrt \\Delta  }}{{2a}}}  =  \\pm \\sqrt {\\frac{{ ${-this.b} - \\sqrt ${this.delta}  }}{{${2*this.a}}}} ${Service.bang(this.x)} \\pm ${this.x}\\)</p>`;
    } else if(this.loai === 4) { // this.delta > 0 && this.X1 < 0 && this.X2 >= 0
      s = `
        <p class='nghiem-bac4'>* Phương trình có dạng: <strong>ax<sup>4</sup> + bx<sup>2</sup> + c = 0 <span class='color-red'>(1)</span></strong>, </p>
        <p class='nghiem-bac4'>nên đặt: <strong>t = x<sup>2</sup> (t ≥ 0)</strong> ta được phương trình mới: </p>
        <p class='nghiem-bac4'><strong>at<sup>2</sup> + bt + c = 0 <span class='color-red'>(2)</span></strong> <=> ${this.a}t<sup>2</sup> + ${this.b}t + ${this.c} = 0</p>
        <p class='nghiem-bac4'>* ${delta_} = b<sup>2</sup> - 4ac =  ${this.b}<sup>2</sup> - 4*${this.a}*${this.c} = ${this.delta}</p>
        <p class='nghiem-bac4'><strong>* Vì ${delta_} > 0 => <span class='color-red'>(2)</span> có 2 nghiệm phân biệt:</strong></p>
        <p class='nghiem-bac4'>\\({t_1} = \\frac{{ - b - \\sqrt \\Delta  }}{{2a}} = \\frac{{ ${-this.b} - \\sqrt {${this.delta}} }}{{${2*this.a}}} ${Service.bang(this.X1)} ${this.X1}\\)</p>
        <p class='nghiem-bac4'>\\({t_2} = \\frac{{ - b + \\sqrt \\Delta  }}{{2a}} = \\frac{{ ${-this.b} + \\sqrt {${this.delta}} }}{{${2*this.a}}} ${Service.bang(this.X2)} ${this.X2}\\)</p>
        <p class='nghiem-bac4'>* Vì \\(\\frac{{ - b - \\sqrt \\Delta  }}{{2a}} < 0\\) và \\(\\frac{{ - b - \\sqrt \\Delta  }}{{2a}} \\ge 0 \\Rightarrow\\) <span class='color-red'>(1)</span> có nghiệm:</p>
        <p class='nghiem-bac4'>
        \\(x =  \\pm \\sqrt {\\frac{{ - b + \\sqrt \\Delta  }}{{2a}}}  =  \\pm \\sqrt {\\frac{{ ${-this.b} + \\sqrt {${this.delta}}  }}{{${2*this.a}}}} ${Service.bang(this.x)} \\pm ${this.x}\\)</p>`;
    } else if (this.loai === 5) { // this.delta > 0 && this.X1 >= 0 && this.X2 >= 0
      s = `
      <p class='nghiem-bac4'>* Phương trình có dạng: <strong>ax<sup>4</sup> + bx<sup>2</sup> + c = 0 <span class='color-red'>(1)</span></strong>, </p>
      <p class='nghiem-bac4'>nên đặt: <strong>t = x<sup>2</sup> (t ≥ 0)</strong> ta được phương trình mới: </p>
      <p class='nghiem-bac4'><strong>at<sup>2</sup> + bt + c = 0 <span class='color-red'>(2)</span></strong> <=> ${this.a}t<sup>2</sup> + ${this.b}t + ${this.c} = 0</p>
      <p class='nghiem-bac4'>* ${delta_} = b<sup>2</sup> - 4ac =  ${this.b}<sup>2</sup> - 4*${this.a}*${this.c} = ${this.delta}</p>
      <p class='nghiem-bac4'><strong>* Vì ${delta_} > 0 => <span class='color-red'>(2)</span> có 2 nghiệm phân biệt:</strong></p>
      <p class='nghiem-bac4'>\\({t_1} = \\frac{{ - b - \\sqrt \\Delta  }}{{2a}} = \\frac{{ ${-this.b} - \\sqrt ${this.delta} }}{{${2*this.a}}} ${Service.bang(this.X1)} ${this.X1}\\)</p>
      <p class='nghiem-bac4'>\\({t_2} = \\frac{{ - b + \\sqrt \\Delta  }}{{2a}} = \\frac{{ ${-this.b} + \\sqrt ${this.delta} }}{{${2*this.a}}} ${Service.bang(this.X2)} ${this.X2}\\)</p>
      <p class='nghiem-bac4'>* Vì \\(\\frac{{ - b - \\sqrt \\Delta  }}{{2a}} \\ge 0\\) và \\(\\frac{{ - b - \\sqrt \\Delta  }}{{2a}} \\ge 0 \\Rightarrow\\) <span class='color-red'>(1)</span> có nghiệm:</p>
      <p class='nghiem-bac4'>
      \\(x1 =  \\pm \\sqrt {\\frac{{ - b - \\sqrt \\Delta  }}{{2a}}}  =  \\pm \\sqrt {\\frac{{ ${-this.b} - \\sqrt {${this.delta}}  }}{{${2*this.a}}}} ${Service.bang(this.x1)} \\pm ${Service.round(this.x1, 7)}\\)</p>
      <p class='nghiem-bac4'>
        \\(x2 =  \\pm \\sqrt {\\frac{{ - b + \\sqrt \\Delta  }}{{2a}}}  =  \\pm \\sqrt {\\frac{{ ${-this.b} + \\sqrt {${this.delta}}  }}{{${2*this.a}}}} ${Service.bang(this.x2)} \\pm ${Service.round(this.x2, 7)}\\)</p>`;
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

      if(Number.isNaN(this.a) || Number.isNaN(this.b) || Number.isNaN(this.c)) {
        this.errorHandler(true, 'Lỗi: a, b, c phải là số');
        return false;
      }
      
      this.delta = (this.b * this.b - (4 * this.a * this.c));
      this.delta = Service.round(this.delta, 7);
      this.b2a = ((-this.b) / (2 * this.a));
      this.S = ((-this.b) / this.a);
      this.S = Service.round(this.S, 7);
      this.P = this.c / this.a;
      this.P = Service.round(this.P, 7);
      console.log('delta:' + this.delta + ' b2a:' + this.b2a + ' S:' + this.S +' P:' + this.P);

      if (Number(this.delta) > 0) {
        this.X1 = Number(math.eval(`(-${this.b} - sqrt(${this.delta}))/(2*${this.a})`))
        this.X1 = Service.round(this.X1, 7);
        this.X2 = Number(math.eval(`(-${this.b} + sqrt(${this.delta}))/(2*${this.a})`))
        this.X2 = Service.round(this.X2, 7);
        console.log('X1: ' + this.X1 + ' X2: ' + this.X2)
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
    this.baigiai.innerHTML = '';
    this.errorMessage.innerHTML = message;
  }

  getLoiGiaiRutGon() {
    let result = document.createElement('div');
    let s = '';
    let kq = '';
    if (this.loai == 1) {
      kq = 'Phương trình vô nghiệm.';
      s = `<hr>
          <p class='nghiem-bac4'><b class='color-red'>Đề bài:</b> (${this.a})x<sup>4</sup> + (${this.b})x<sup>2</sup> + (${this.c}) = 0</p>
          <p class='nghiem-bac4'><b class='color-red'>Kết quả:</b> ${kq}</p>`;
    } else if (this.loai == 2) {
      let _x = `sqrt(-${this.b}/(2*${this.a}))`;
      this.x = Number(math.eval(_x));
      this.x = Service.round(this.x, 7);
      kq = 'Phương trình có nghiệm là:';
      s = `<hr>
          <p class='nghiem-bac4'><b class='color-red'>Đề bài:</b> (${this.a})x<sup>4</sup> + (${this.b})x<sup>2</sup> + (${this.c}) = 0</p>
          <p class='nghiem-bac4'><b class='color-red'>Kết quả:</b> ${kq}</p>
          <p class='nghiem-bac4'>x ${Service.bang(this.x)} ±${this.x}</p>
          `;
    } else if (this.loai == 3) {
      let _x = `sqrt((-${this.b}-sqrt(${this.delta}))/(2*${this.a}))`;
      this.x = Number(math.eval(_x));
      this.x = Service.round(this.x, 7);
      kq = 'Phương trình có nghiệm là:';
      s = `<hr>
          <p class='nghiem-bac4'><b class='color-red'>Đề bài:</b> (${this.a})x<sup>4</sup> + (${this.b})x<sup>2</sup> + (${this.c}) = 0</p>
          <p class='nghiem-bac4'><b class='color-red'>Kết quả:</b> ${kq}</p>
          <p class='nghiem-bac4'>x ${Service.bang(this.x)} ±${this.x}</p>`;
    } else if (this.loai == 4) {
      console.log('b: ' + this.b)
      console.log('delta: ' + this.delta)
      console.log('a: ' + this.a)
      console.log((-this.b + Math.sqrt(this.delta)) / 2*this.a)
      let _x = `sqrt((-${this.b}+sqrt(${this.delta}))/(2*${this.a}))`;
      this.x = Number(math.eval(_x));
      this.x = Service.round(this.x, 7);
      console.log(this.x)
      kq = 'Phương trình có nghiệm là:';
      s = `<hr>
          <p class='nghiem-bac4'><b class='color-red'>Đề bài:</b> (${this.a})x<sup>4</sup> + (${this.b})x<sup>2</sup> + (${this.c}) = 0</p>
          <p class='nghiem-bac4'><b class='color-red'>Kết quả:</b> ${kq}</p>
          <p class='nghiem-bac4'>x ${Service.bang(this.x)} ±${this.x}</p>`;
    } else if (this.loai == 5) {
      let _x1 = `sqrt((-${this.b}-sqrt(${this.delta}))/(2*${this.a}))`;
      let _x2 = `sqrt((-${this.b}+sqrt(${this.delta}))/(2*${this.a}))`;
      this.x1 = Number(math.eval(_x1));
      this.x1 = Service.round(this.x1, 7);
      this.x2 = Number(math.eval(_x2));
      this.x2 = Service.round(this.x2, 7);
      kq = 'Phương trình có nghiệm là:';
      s = `<hr>
          <p class='nghiem-bac4'><b class='color-red'>Đề bài:</b> (${this.a})x<sup>4</sup> + (${this.b})x<sup>2</sup> + (${this.c}) = 0</p>
          <p class='nghiem-bac4'><b class='color-red'>Kết quả:</b> ${kq}</p>
          <p class='nghiem-bac4'>${this.bac4__TH5__x1.outerHTML}${this.x1}</p>
          <p class='nghiem-bac4'>${this.bac4__TH5__x2.outerHTML}${this.x2}</p>`;
    }
    result.innerHTML = s;
    return result;
  }
}