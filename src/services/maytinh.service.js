
function ucln(a, b) {
    if(a < 0 || b < 0) {
        a = Math.abs(a);
        b = Math.abs(b);
    }
    if(Number.isInteger(a) == false || Number.isInteger(b) == false) {
        return 1;
    }
    // if(a == 1 || b == 1) return 1;
    return (b ? ucln(b, a%b) : a);
}

function rutGonCanThuc(n) {
    let factor = [];
    let power = [];
    let rs = {
        phanRutGon: 1,
        phanConLai: 1
    }
    for (let i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            factor.push(i);
            let p;
            for (p = 0; n % i == 0; p++) {
                n /= i;
            }
            power.push(p);
        }
    }
    if (n > 1) {
        factor.push(n);
        power.push(1);
    }

    for (let i = 0; i < factor.length; i++) {
        if (parseInt(power[i] / 2) > 0) {
            rs.phanRutGon *= factor[i] * parseInt(power[i] / 2);
        }
        if (power[i] % 2 != 0) {
            rs.phanConLai *= factor[i] * (power[i] % 2);
        }
    }
    return rs;
}

function round(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
}

function checkValidation(item) {
    if (isNaN(item) == true) {
        console.log(item)
        return true;
    }
    return false;
}

function getMathJaxElement() {
    let mathjax = document.getElementById("mathjax");
    return mathjax;
}

function getTemplate(template, tagName, id) {
    let node = document.createElement("div");
    node.innerHTML= template;
    
    let queryTemplate = node.querySelector(`#${id}`);
    let clone = document.importNode(queryTemplate.content, true);

    let tagElement = document.createElement(tagName);
    tagElement.id = id;
    tagElement.appendChild(clone);
    return tagElement;
} 

function setMathJax(element) {
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, element]);
}

function getPhuongTrinh(template, tagName, templateId, phuongTrinhId, phuongTrinhClass, biensId, btnId) {
    let pt = getTemplate(template, tagName, templateId);
    let bac = pt.querySelector(phuongTrinhId);
    phuongTrinhClass.onInit(bac);

    let bienElement = biensId.map(bienId => { return pt.querySelector(`#${bienId}`); });
    bienElement.map(element => { element.onchange = () => { phuongTrinhClass.onChange(bienElement); } });

    let btnXemBaiGiai = bac.querySelector(btnId);
    btnXemBaiGiai.onclick = () => { phuongTrinhClass.xemBaiGiai();}
    return bac;
}

function bang(number) {
    const ganbang = '&#8771;';
    const length = String(number).length;
    if(length > 6) {
        return ganbang;
    }
    return '=';
}

function xemBaiGaiHandler(btnXemBaiGiai, loiGiaiRutGon, baigiai) {
    // console.log(btnXemBaiGiai, loiGiaiRutGon, baigiai)
    const isClicked = btnXemBaiGiai.textContent === 'Xem bài giải' ? false : true;
    if(isClicked === false) {
        btnXemBaiGiai.textContent = 'Đóng';
        loiGiaiRutGon.style.display = 'none';
        
    } else {
        btnXemBaiGiai.textContent = 'Xem bài giải';
        loiGiaiRutGon.style.display = 'block';
    }
}

function toggleHandler(currentElement, parentElement) {
    const detailsList = parentElement.querySelectorAll('details');
    for(let details of detailsList) {
        if(details.hasAttribute('open') && details !== currentElement) {
            details.removeAttribute('open');
        }
    }
}

export default { 
    ucln, 
    rutGonCanThuc, 
    round, 
    checkValidation, 
    getMathJaxElement, 
    getTemplate, 
    setMathJax, 
    getPhuongTrinh,
    bang,
    xemBaiGaiHandler,
    toggleHandler
};