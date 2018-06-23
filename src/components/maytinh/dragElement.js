function dragElement(element) {
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