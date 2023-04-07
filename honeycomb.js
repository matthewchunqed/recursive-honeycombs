const SVG_NS = "http://www.w3.org/2000/svg";

const MAX_HEIGHT = 160;
const MAX_WIDTH = 30;
const MAX_DEPTH = 12;

const svg = document.querySelector("#svg");
const group = document.querySelector("#group");
const defs = document.querySelector("#defs");

const combTemplate = document.createElementNS(SVG_NS, "line");
combTemplate.setAttributeNS(null, "id", "template");
combTemplate.setAttributeNS(null, "class", "comb");
combTemplate.setAttributeNS(null, "x1", "0");
combTemplate.setAttributeNS(null, "y1", "0");
combTemplate.setAttributeNS(null, "x2", "0");
combTemplate.setAttributeNS(null, "y2", `${MAX_HEIGHT}`);
combTemplate.setAttributeNS(null, "stroke-width", `${MAX_WIDTH}`);
defs.appendChild(combTemplate);

let make = function (x, y, depth, height) {
    let trans = `translate(${x}, ${y}) scale(${height/MAX_HEIGHT})`;
    let comb = document.createElementNS(SVG_NS, "use");
    comb.setAttributeNS(null, "href", "#template");
    comb.setAttributeNS(null, "transform", trans);
    comb.setAttributeNS(null, "transform", trans);
    return comb;
}

let drawIteration = function (x, y, height, depth, parentGroup, left, right) {    
    let comb = make(x, y, depth, height);
    comb.setAttributeNS(null, "stroke", "rgb(" + 20*depth + "," + 20*left + "," + 20*right + ")");
    parentGroup.appendChild(comb);

    if (depth < MAX_DEPTH) {

	let leftGroup = document.createElementNS(SVG_NS, "g");
	leftGroup.setAttributeNS(null, "transform", `translate(${x}, ${y + height}) rotate(${60})`);
	parentGroup.appendChild(leftGroup);
	drawIteration(0, 0, height * 0.85, depth+1, leftGroup, left+1, right);

	let rightGroup = document.createElementNS(SVG_NS, "g");
	rightGroup.setAttributeNS(null, "transform", `translate(${x}, ${y + height}) rotate(${-60})`);
	parentGroup.appendChild(rightGroup);
	drawIteration(0, 0, height * 0.85, depth+1, rightGroup, left, right+1);

    }
}


drawIteration(350, 50, MAX_HEIGHT, 0, group, 0, 0);








