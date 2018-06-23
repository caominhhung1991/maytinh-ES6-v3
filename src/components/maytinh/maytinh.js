import $ from 'jquery';
import CongThucsTemplate from './../congthucs/btn_congthucs_all/btn_congthucs_all.html';
import MayTinhTemplate from './maytinh_template.html';
import CacPTCoBan from './../congthucs/cac_pt_coban/cac_pt_coban';


let cacPTCoBan = new CacPTCoBan();

class MayTinh {
	constructor() {
		this.WIDTH_MY_DIV = 400;
		this.MARGIN = 0;
		this.timer;
		this.SHOW_MAYTINH_TOGGLE = true;
		this.SHOW_XEMTHEM_TOGGLE = 'down';
		this.faChevronDown = `<i class='fa fa-chevron-down' aria-hidden='true'></i>`;
		this.faChevronUp = `<i class='fa fa-chevron-up' aria-hidden='true'></i>`;
		this.ghimToggle = this.ghimToggle.bind(this);
		this.dragElement = this.dragElement.bind(this);
		this.showMayTinhToggle = this.showMayTinhToggle.bind(this);
		this.hideMayTinhContent_animate = this.hideMayTinhContent_animate.bind(this);
		this.checkWidthHeight_outsize = this.checkWidthHeight_outsize.bind(this);
		this.resetGhim = this.resetGhim.bind(this);
		this.getGHIM_TOGGLE = this.getGHIM_TOGGLE.bind(this);
		this.showXemThem = this.showXemThem.bind(this);
		this.showMayTinhContent_animate = this.showMayTinhContent_animate.bind(this);
		this.hideNangCao_animate = this.hideNangCao_animate.bind(this);
		this.showNangCao_animate = this.showNangCao_animate.bind(this);
		this.showCacPTCoBan = this.showCacPTCoBan.bind(this);
		// this.showCacPTCoBan();
	}

	/**
	 * https://www.w3schools.com/jsref/obj_touchevent.asp
	 * ontouchstart
	 * ontouchmove
	 * ontouchend
	 * ontouchecancel
	 */

	touchElement(element) {
		let touchedZone = element.querySelector('#maytinhheader');
		localStorage.setItem('GHIM_TOGGLE', 'true');
		let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

		touchedZone.ontouchstart = (event) => {
			pos3 = event.touches[0].clientX;
			pos4 = event.touches[0].clientY;
			touchedZone.ontouchmove = (e) => {
				pos1 = pos3 - e.changedTouches[0].clientX;
				pos2 = pos4 - e.changedTouches[0].clientY;
				pos3 = e.changedTouches[0].clientX;
				pos4 = e.changedTouches[0].clientY;
				element.style.top = (element.offsetTop - pos2) + 'px';
				element.style.left = (element.offsetLeft - pos1) + 'px';
				nangcaoPositionHandle()
			}
			if (localStorage.getItem('GHIM_TOGGLE') == 'true') {
				touchedZone.ontouchend = (e) => {
					let width = window.innerWidth;
					let left = element.offsetLeft + element.offsetWidth / 2;
					if (left <= width / 2) {
						element.style.left = '0px';
					} else {
						element.style.left = (width - element.offsetWidth - this.MARGIN) + 'px';
					}

					let topMayTinh = element.offsetTop;
					let leftMayTinh = element.offsetLeft;
					if (topMayTinh < this.MARGIN) {
						element.style.top = '0px';
					} else if (topMayTinh + element.offsetHeight + this.MARGIN > window.innerHeight) {
						element.style.top = (window.innerHeight - element.offsetHeight - this.MARGIN) + 'px';
					}

					if (leftMayTinh < this.MARGIN) {
						element.style.left = '0px';
					} else if (leftMayTinh + element.offsetWidth + this.MARGIN > window.innerWidth) {
						element.style.left = (window.innerWidth - element.offsetWidth - this.MARGIN) + 'px';
					}
					touchedZone.ontouchmove = null;
					touchedZone.ontouchend = null;
					nangcaoPositionHandle()
				} 
			} else {
				touchedZone.ontouchend = () => {
					touchedZone.ontouchmove = null;
					touchedZone.ontouchend = null;
					nangcaoPositionHandle()
				}
			}
		}
	}



	// init maytinh
	createMayTinh() {
		const div = document.createElement('div');
		div.innerHTML = MayTinhTemplate;
		const maytinh_template = div.querySelector('#maytinh_template');
		const maytinh_cloned = document.importNode(maytinh_template.content, true);
		let maytinh = maytinh_cloned.querySelector('#maytinh');

		let input = maytinh.querySelector(`input[type='checkbox']`);
		input.onclick = () => { this.showMayTinhToggle(); }

		// let hideToggle = maytinh.querySelector('#hideToggle');
		// hideToggle.onclick = (event) => {
		// 	console.log(event.target)
		// 	event.stopPropagation();
		// }

		let iGhim = maytinh.querySelector('#ghim');
		iGhim.onclick = () => {
			this.ghimToggle();
		}

		let drag = maytinh.querySelector('#redips-drag');
		drag.appendChild(this.getCongThucs());

		let btnXemThem = maytinh.querySelector('#btnShowXemThem');
		btnXemThem.onclick = () => { this.showXemThem(); }
		return maytinh;
	}

	getCongThucs() {
		let div = document.createElement('div');
		div.innerHTML = CongThucsTemplate;
		let template = div.querySelector('template');
		let clone = document.importNode(template.content, true);

		let ptb2 = clone.querySelector('#ptb2');
		ptb2.onclick = () => { this.showCacPTCoBan() } // mở nâng cao
		ptb2.ontouchend = () => { this.showCacPTCoBan() }

		let vedothi = clone.querySelector('#vedothi');
		vedothi.onclick = () => { window.open('https://www.desmos.com/calculator'); }
		vedothi.ontouchend = () => { window.open('https://www.desmos.com/calculator'); }

		let ghichu = clone.querySelector('#ghichu');
		ghichu.onclick = () => { window.open('http://localhost:3002'); }
		ghichu.ontouchend = () => { window.open('http://localhost:3002'); }

		return clone;
	}

	showCacPTCoBan() {
		if (this.timer) clearTimeout(this.timer);
		this.timer = setTimeout(() => {
			this.SHOW_NANGCAO_TOGGLE = !this.SHOW_NANGCAO_TOGGLE;
			if (this.SHOW_NANGCAO_TOGGLE == true) {
				let nangcao = document.getElementById('nangcao');
				let _cacPTCoBan = cacPTCoBan.getCacPTCoBan();
				let btnCloseNangCao = _cacPTCoBan.querySelector('#closeNangCao');
				btnCloseNangCao.onclick = () => { this.showCacPTCoBan() }
				if (nangcao.childNodes.length == 0) {
					nangcao.appendChild(_cacPTCoBan);
				} else {
					while (nangcao.firstChild) nangcao.removeChild(nangcao.firstChild);
					nangcao.appendChild(_cacPTCoBan);
				}
				this.showNangCao_animate();

			} else {
				this.hideNangCao_animate();
			}
			// console.log('SHow nang cao');
			nangcaoPositionHandle();
		}, 200);
	}

	showMayTinhToggle() {
		this.SHOW_MAYTINH_TOGGLE = !this.SHOW_MAYTINH_TOGGLE;
		let mt = document.getElementById('maytinh');
		if (this.SHOW_MAYTINH_TOGGLE == false) {
			// resetNangCao();
			if (this.SHOW_NANGCAO_TOGGLE == true) {
				this.hideNangCao_animate();
			}
			this.resetGhim();
			$('#ghim').css('display', 'none', 'important');
			$('#maytinh-content').css('display', 'none', 'important');
		} else {
			if (this.SHOW_NANGCAO_TOGGLE == true) {
				setTimeout(() => {
					this.showNangCao_animate();
				}, 500)
			}
			$('#ghim').css('display', 'block', 'important');
			// $('#maytinh-content').css('display', 'block', 'important');
			this.showMayTinhContent_animate();
		}

		$('#maytinh').toggleClass('transform');
		$('#maytinh').toggleClass('animate');

		setTimeout(() => {
			$('#maytinh').toggleClass('transform');
			this.checkWidthHeight_outsize(mt);
		}, 500);
	}

	ghimToggle() {
		let ghim_toggle = this.getGHIM_TOGGLE() == 'true' ? 'false' : 'true';
		this.setGHIM_TOGGLE(ghim_toggle);

		let ghim = document.getElementById('ghim');
		let tooltiptext_ghim = document.getElementById('tooltiptext-ghim');
		if (ghim_toggle == 'false') {
			ghim.classList.remove('ghimChecked');
			tooltiptext_ghim.innerHTML = 'Ghim';

		} else {
			ghim.classList.add('ghimChecked');
			tooltiptext_ghim.innerHTML = 'Bỏ ghim';
			_checkWidthHeight();
		}

	}

	showXemThem() {
		clearTimeout(this.timer);

		if (this.SHOW_XEMTHEM_TOGGLE == 'down') {
			this.SHOW_XEMTHEM_TOGGLE = 'up';
			$('#btnShowXemThem').html(this.faChevronUp);
			window.localStorage.setItem('btnShowXemThem', $('#btnShowXemThem').html());
		} else {
			this.SHOW_XEMTHEM_TOGGLE = 'down';
			$('#btnShowXemThem').html(this.faChevronDown);
			window.localStorage.setItem('btnShowXemThem', $('#btnShowXemThem').html());
		}

		$('#mini').toggleClass('displayBlock');
		window.localStorage.setItem('nangcao', $('#redips-drag').html());
	}

	getGHIM_TOGGLE() {
		return localStorage.getItem('GHIM_TOGGLE');;
	}

	setGHIM_TOGGLE(value) {
		localStorage.setItem('GHIM_TOGGLE', value);
	}

	dragElement(element) {
		localStorage.setItem('GHIM_TOGGLE', 'true');

		let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
		let header = element.id + 'header';
		let MARGIN = this.MARGIN;

		// let header = 'maytinhheader';
		if (document.getElementById(header)) {
			document.getElementById(header).onmousedown = dragMouseDown;
		} else {
			element.onmousedown = dragMouseDown;
		}

		function dragMouseDown(e) {
			let maytinh = new MayTinh();
			e = e || window.event;
			pos3 = e.clientX;
			pos4 = e.clientY;
			if (localStorage.getItem('GHIM_TOGGLE') == 'true') {
				document.onmouseup = closeDragElementWithGhim;
			} else {
				document.onmouseup = closeDragElementWithoutGhim;
			}

			document.onmousemove = elementDrag;
			nangcaoPositionHandle();
		}

		function elementDrag(e) {
			e = e || window.event;
			pos1 = pos3 - e.clientX;
			pos2 = pos4 - e.clientY;
			pos3 = e.clientX;
			pos4 = e.clientY;

			element.style.top = (element.offsetTop - pos2) + 'px';
			element.style.left = (element.offsetLeft - pos1) + 'px';
			nangcaoPositionHandle();
		}

		function closeDragElementWithGhim() {
			let width = window.innerWidth;
			let left = element.offsetLeft + element.offsetWidth / 2;

			if (left <= width / 2) {
				element.style.left = '0px';
			} else {
				element.style.left = (width - element.offsetWidth - MARGIN) + 'px';
			}
			checkWidthHeight();
			document.onmouseup = null;
			document.onmousemove = null;
		}

		function closeDragElementWithoutGhim() {
			checkWidthHeight();
			document.onmouseup = null;
			document.onmousemove = null;
		}

		function checkWidthHeight() {
			// element.offsetTop: toạ độ phía trên máy tính 
			// element.offsetLeft: toạ độ bên trái của máy tính 
			let top = element.offsetTop;
			let left = element.offsetLeft;

			if (top < MARGIN) {
				element.style.top = '0px';

			} else if (top + element.offsetHeight + MARGIN > window.innerHeight) {
				// toạ độ trên + tổng chiều cao của máy tính + 10 so với chiều cao của browser 
				// thì toạ độ trên của máy tính = (chiều cao của sổ - chiều cao máy tinh - margin)
				element.style.top = (window.innerHeight - element.offsetHeight - MARGIN) + 'px';
			}

			if (left < MARGIN) {
				element.style.left = '0px';
			} else if (left + element.offsetWidth + MARGIN > window.innerWidth) {
				// toạ độ trái + tổng chiều dài của máy tính + 10 so với chiều dài của browser 
				// thì toạ độ trái = (chiều dài của sổ - chiều dài máy tính - margin)
				element.style.left = (window.innerWidth - element.offsetWidth - MARGIN) + 'px';
			}
			nangcaoPositionHandle();
		}
	}

	showMayTinhContent_animate() {
		setTimeout(function () {
			$('#maytinh-content').css('display', 'block');
			$('#maytinh-content').toggleClass('fadeIn');
			setTimeout(function () {
				$('#maytinh-content').toggleClass('fadeIn');
			}, 500)
		}, 500)
	}

	hideMayTinhContent_animate() {
		$('#maytinh-content').toggleClass('fadeOut');
		setTimeout(function () {
			$('#maytinh-content').toggleClass('fadeOut');
			$('#maytinh-content').css('display', 'none');
		}, 500)
	}

	checkWidthHeight_outsize(element) {
		let MARGIN = this.MARGIN;
		// element.offsetTop: toạ độ phía trên máy tính 
		// element.offsetLeft: toạ độ bên trái của máy tính 
		let top = element.offsetTop;
		let left = element.offsetLeft;

		let width = window.innerWidth;
		let left_check = element.offsetLeft + element.offsetWidth / 2;
		if (left_check <= width / 2) {
			element.style.left = '0px';
		} else {
			element.style.left = (width - element.offsetWidth - MARGIN) + 'px';
		}

		if (top < MARGIN) {
			element.style.top = '0px';
		} else if (top + element.offsetHeight + MARGIN > window.innerHeight) {
			// toạ độ trên + tổng chiều cao của máy tính + 10 so với chiều cao của browser 
			// thì toạ độ trên của máy tính = (chiều cao của sổ - chiều cao máy tinh - margin)
			element.style.top = (window.innerHeight - element.offsetHeight - MARGIN) + 'px';
		}

		if (left < MARGIN) {
			element.style.left = '0px';
		} else if (left + element.offsetWidth + MARGIN > window.innerWidth) {
			// toạ độ trái + tổng chiều dài của máy tính + 10 so với chiều dài của browser 
			// thì toạ độ trái = (chiều dài của sổ - chiều dài máy tính - margin)
			element.style.left = (window.innerWidth - element.offsetWidth - MARGIN) + 'px';
		}
		nangcaoPositionHandle();
	}

	showNangCao_animate() {
		$('#nangcao').css('display', 'block');
		$('#nangcao').toggleClass('fadeIn');
		setTimeout(function () {
			$('#nangcao').toggleClass('fadeIn');
		}, 200)
	}

	hideNangCao_animate() {
		$('#nangcao').toggleClass('bounceOut');
		setTimeout(function () {
			$('#nangcao').toggleClass('bounceOut');
			$('#nangcao').css('display', 'none');
		}, 300)
	}

	resetGhim() {
		localStorage.setItem('GHIM_TOGGLE', 'true');

		let ghim = document.getElementById('ghim');
		ghim.classList.add('ghimChecked');

		let tooltiptext_ghim = document.getElementById('tooltiptext-ghim');
		tooltiptext_ghim.innerHTML = 'Bỏ ghim';
	}
}

export default MayTinh;

function nangcaoPositionHandle() {
	let maytinh = document.getElementById('maytinh');
	let nangcao = document.getElementById('nangcao');

	// Kiểm tra maytinh trái, phải, trên, dưới để đặt nangcao;
	let mt_left = maytinh.offsetLeft;
	let mt_top = maytinh.offsetTop;
	let mt_width = maytinh.offsetWidth;
	let mt_height = maytinh.offsetHeight;
	let mt_where_width = mt_left + mt_width / 2;
	let mt_where_height = mt_top + mt_height / 2;
	let nc_heifht = nangcao.offsetHeight;

	// console.log('mt top: ' + mt_top, 'mt top: ' + mt_left)
	// console.log('mt width: ' + mt_width, 'mt height: ' + mt_height);

	// trường hợp width của browser quá nhỏ
	if (window.innerWidth > 767.98) {
		// trường hợp > 767.98 - medium size 
		nangcao.style.top = mt_top + 'px';
		if (mt_where_width <= window.innerWidth / 2) {
			nangcao.style.left = mt_left + mt_width + 'px';
			// console.log('left');
		} else {
			nangcao.style.left = mt_left - mt_width + 'px';
			// console.log('right')
		}
	} else {
		// trường hợp <= 767.98 - medium size 
		nangcao.style.left = mt_left + 'px';
		if (mt_where_height <= window.innerHeight / 2) {
			nangcao.style.top = mt_top + mt_height + 'px';
			// console.log('May tinh on top')
		} else {
			nangcao.style.top = mt_top - nc_heifht + 'px';
			// console.log('May tinh on bottom')
		}
	}
}

function _checkWidthHeight() {
	let MARGIN = 0;
	// element.offsetTop: toạ độ phía trên máy tính 
	// element.offsetLeft: toạ độ bên trái của máy tính 
	let element = document.getElementById('maytinh');
	let top = element.offsetTop;
	let left = element.offsetLeft;

	let width = window.innerWidth;
	let left_check = element.offsetLeft + element.offsetWidth / 2;
	if (left_check <= width / 2) {
		element.style.left = '0px';
	} else {
		element.style.left = (width - element.offsetWidth - MARGIN) + 'px';
	}

	if (top < MARGIN) {
		element.style.top = '0px';
	} else if (top + element.offsetHeight + MARGIN > window.innerHeight) {
		// toạ độ trên + tổng chiều cao của máy tính + 10 so với chiều cao của browser 
		// thì toạ độ trên của máy tính = (chiều cao của sổ - chiều cao máy tinh - margin)
		element.style.top = (window.innerHeight - element.offsetHeight - MARGIN) + 'px';
	}

	if (left < MARGIN) {
		element.style.left = '0px';
	} else if (left + element.offsetWidth + MARGIN > window.innerWidth) {
		// toạ độ trái + tổng chiều dài của máy tính + 10 so với chiều dài của browser 
		// thì toạ độ trái = (chiều dài của sổ - chiều dài máy tính - margin)
		element.style.left = (window.innerWidth - element.offsetWidth - MARGIN) + 'px';
	}
	nangcaoPositionHandle();
}