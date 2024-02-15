let arrImg = document.getElementsByTagName("img");
let arrControlElem = document.getElementsByClassName("controlElem");
let container = null;
let X, Y, activeImg, 
    originalActiveImgWidth, originalActiveImgHeight, 
    originalActiveImgLeft, originalActiveImgTop, 
    activeControlElem;

for (let elem of arrImg) {
    elem.addEventListener("click", imageControl);
    elem.addEventListener("mousedown", mouseDownForMove);
    elem.addEventListener("mouseup", mouseUpForMove);
}

function imageControl(eo) {
    eo=eo||window.event;
    eo.stopPropagation();

    activeImg =  eo.target;
    
    setControlElem();
    setCoordinatesControlElem();

    for(let elem of arrControlElem) {
        elem.addEventListener("click", stopProp);
        elem.addEventListener("mousedown", mousedownFunc);
    }
    window.addEventListener("mouseup", ()=>{mouseupFunc(activeControlElem);});
}


function mouseDownForMove(eo) {
    eo=eo||window.event;

    eo.preventDefault();
    
    activeImg =  eo.target;
    X = eo.pageX - eo.target.offsetLeft;
    Y = eo.pageY - eo.target.offsetTop;
    window.addEventListener("mousemove", mouseMoveForMove);
}

function mouseMoveForMove(eo) {
    eo=eo||window.event;

    activeImg.style.left = `${eo.pageX - X}px`;
    activeImg.style.top = `${eo.pageY - Y}px`;
    setControlElem();
    setCoordinatesControlElem();
}

function mouseUpForMove () {
    window.removeEventListener("mousemove", mouseMoveForMove);
}


function setControlElem() {
    if ( !container ) {
        container = document.createElement("div");
        container.id = "container";
        document.body.appendChild(container);
        for(let i=0; i<8; i++) {
            if (arrControlElem.length < 8) {
                let controlElem = document.createElement("div");
                controlElem.className = "controlElem";
                container.appendChild(controlElem);
            }
        }
    }
}

function setCoordinatesControlElem() {
    arrControlElem[0].style.left = `${activeImg.offsetLeft - arrControlElem[1].offsetWidth/2}px`;
    arrControlElem[0].style.top = `${activeImg.offsetTop - arrControlElem[1].offsetHeight/2}px`;

    arrControlElem[1].style.left = `${activeImg.offsetWidth/2 + activeImg.offsetLeft - arrControlElem[1].offsetWidth/2}px`;
    arrControlElem[1].style.top = `${activeImg.offsetTop - arrControlElem[1].offsetHeight/2}px`;

    arrControlElem[2].style.left = `${activeImg.offsetWidth + activeImg.offsetLeft - arrControlElem[2].offsetWidth/2}px`;
    arrControlElem[2].style.top = `${activeImg.offsetTop - arrControlElem[2].offsetHeight/2}px`;

    arrControlElem[3].style.left = `${activeImg.offsetWidth + activeImg.offsetLeft - arrControlElem[3].offsetWidth/2}px`;
    arrControlElem[3].style.top = `${activeImg.offsetHeight/2 + activeImg.offsetTop - arrControlElem[3].offsetHeight/2}px`;

    arrControlElem[4].style.left = `${activeImg.offsetWidth + activeImg.offsetLeft - arrControlElem[4].offsetWidth/2}px`;
    arrControlElem[4].style.top = `${activeImg.offsetHeight + activeImg.offsetTop - arrControlElem[4].offsetHeight/2}px`;

    arrControlElem[5].style.left = `${activeImg.offsetWidth/2 + activeImg.offsetLeft - arrControlElem[1].offsetWidth/2}px`;
    arrControlElem[5].style.top = `${activeImg.offsetHeight + activeImg.offsetTop - arrControlElem[5].offsetHeight/2}px`;
        
    arrControlElem[6].style.left = `${activeImg.offsetLeft - arrControlElem[6].offsetWidth/2}px`;
    arrControlElem[6].style.top = `${activeImg.offsetHeight + activeImg.offsetTop - arrControlElem[6].offsetHeight/2}px`;

    arrControlElem[7].style.left = `${activeImg.offsetLeft - arrControlElem[7].offsetWidth/2}px`;
    arrControlElem[7].style.top = `${activeImg.offsetHeight/2 + activeImg.offsetTop - arrControlElem[7].offsetHeight/2}px`;
}

window.addEventListener("click", removeControlElem);
function removeControlElem() {
    if (container) {
        container.remove();
        container = null;
    }
} 


function stopProp(eo) {
    eo=eo||window.event;
    eo.stopPropagation();
}


function mousedownFunc(eo) {
    eo=eo||window.event;
    eo.preventDefault();
 
    X = eo.pageX;
    Y = eo.pageY;
    originalActiveImgWidth = activeImg.offsetWidth;
    originalActiveImgHeight = activeImg.offsetHeight;
    originalActiveImgLeft = activeImg.offsetLeft;
    originalActiveImgTop = activeImg.offsetTop;
    activeControlElem = eo.target;

    if (activeControlElem === arrControlElem[0]) {
        window.addEventListener("mousemove", mousemoveFuncLT);
    }
    if (activeControlElem === arrControlElem[1]) {
        window.addEventListener("mousemove", mousemoveFuncT);
    }
    if (activeControlElem === arrControlElem[2]) {
        window.addEventListener("mousemove", mousemoveFuncRT);
    }
    if (activeControlElem === arrControlElem[3]) {
        window.addEventListener("mousemove", mousemoveFuncR);
    }
    if (activeControlElem === arrControlElem[4]) {
        window.addEventListener("mousemove", mousemoveFuncRB);
    } 
    if (activeControlElem === arrControlElem[5]) {
        window.addEventListener("mousemove", mousemoveFuncB);
    }  
    if (activeControlElem === arrControlElem[6]) {
        window.addEventListener("mousemove", mousemoveFuncLB);
    } 
    if (activeControlElem === arrControlElem[7]) {
        window.addEventListener("mousemove", mousemoveFuncL);
    } 
}


function mousemoveFuncLT(eo) {
    eo=eo||window.event;
    let currentWidthImg, currentHeightImg;

    currentWidthImg = originalActiveImgWidth + X - eo.pageX;
    currentHeightImg = Math.round(originalActiveImgHeight * currentWidthImg / originalActiveImgWidth);

    activeImg.style.width = `${currentWidthImg}px`;
    activeImg.style.height = `${currentHeightImg}px`;
    activeImg.style.left = `${originalActiveImgLeft - (X - eo.pageX)}px`;
    activeImg.style.top = `${originalActiveImgTop - (currentHeightImg - originalActiveImgHeight)}px`;

    setCoordinatesControlElem();
}

function mousemoveFuncT(eo) {
    eo=eo||window.event;
 
    activeImg.style.width = `${originalActiveImgWidth}px`;
    activeImg.style.height = `${originalActiveImgHeight + Y - eo.pageY}px`;
    activeImg.style.top = `${originalActiveImgTop - (Y - eo.pageY)}px`;

    setCoordinatesControlElem();
}

function mousemoveFuncRT(eo) {
    eo=eo||window.event;
    let currentWidthImg, currentHeightImg;

    currentWidthImg = originalActiveImgWidth + eo.pageX - X;
    currentHeightImg = Math.round(originalActiveImgHeight * currentWidthImg / originalActiveImgWidth);

    activeImg.style.width = `${currentWidthImg}px`;
    activeImg.style.height = `${currentHeightImg}px`;
    activeImg.style.top = `${originalActiveImgTop - (currentHeightImg - originalActiveImgHeight)}px`;

    setCoordinatesControlElem();
}

function mousemoveFuncR(eo) {
    eo=eo||window.event;

    activeImg.style.width = `${originalActiveImgWidth + eo.pageX - X}px`;
    activeImg.style.height = `${originalActiveImgHeight}px`;

    setCoordinatesControlElem();
}

function mousemoveFuncRB(eo) {
    eo=eo||window.event;
    let currentWidthImg, currentHeightImg;

    currentWidthImg = originalActiveImgWidth + eo.pageX - X;
    currentHeightImg = Math.round(originalActiveImgHeight * currentWidthImg / originalActiveImgWidth);

    activeImg.style.width = `${currentWidthImg}px`;
    activeImg.style.height = `${currentHeightImg}px`;

    setCoordinatesControlElem();
}

function mousemoveFuncB(eo) {
    eo=eo||window.event;
 
    activeImg.style.width = `${originalActiveImgWidth}px`;
    activeImg.style.height = `${originalActiveImgHeight + eo.pageY - Y}px`;

    setCoordinatesControlElem();
}

function mousemoveFuncLB(eo) {
    eo=eo||window.event;
    let currentWidthImg, currentHeightImg;

    currentWidthImg = originalActiveImgWidth + X - eo.pageX;
    currentHeightImg = Math.round(originalActiveImgHeight * currentWidthImg / originalActiveImgWidth);

    activeImg.style.width = `${currentWidthImg}px`;
    activeImg.style.height = `${currentHeightImg}px`;
    activeImg.style.left = `${originalActiveImgLeft - (X - eo.pageX)}px`;

    setCoordinatesControlElem();
}

function mousemoveFuncL(eo) {
    eo=eo||window.event;

    activeImg.style.width = `${originalActiveImgWidth + X - eo.pageX}px`;
    activeImg.style.height = `${originalActiveImgHeight}px`;
    activeImg.style.left = `${originalActiveImgLeft - (X - eo.pageX)}px`;

    setCoordinatesControlElem();
}


function mouseupFunc(elem) {

    if (elem === arrControlElem[0]) {
        window.removeEventListener("mousemove", mousemoveFuncLT);
    }
    if (elem === arrControlElem[1]) {
        window.removeEventListener("mousemove", mousemoveFuncT);
    }
    if (elem === arrControlElem[2]) {
        window.removeEventListener("mousemove", mousemoveFuncRT);
    }
    if (elem === arrControlElem[3]) {
        window.removeEventListener("mousemove", mousemoveFuncR);
    }
    if (elem === arrControlElem[4]) {
        window.removeEventListener("mousemove", mousemoveFuncRB);
    }
    if (elem === arrControlElem[5]) {
        window.removeEventListener("mousemove", mousemoveFuncB);
    }
    if (elem === arrControlElem[6]) {
        window.removeEventListener("mousemove", mousemoveFuncLB);
    }
    if (elem === arrControlElem[7]) {
        window.removeEventListener("mousemove", mousemoveFuncL);
    }
}