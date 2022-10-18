import "./css/index.css"

const ccColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")

function setCardType(type) {
	const colors = {
		visa: ["#436D99", "#2D57F2"],
		mastercard: ["#DF6F29", "#C69347"],
		elo: ["#550101", "#575814"],
		americanExpress: ["#0E062E", "#17487A"],
		creditSuisse: ["#B690FF", "#1A3781"],
		default: ["#000", "#545454"],
	}

	ccColor01.setAttribute("fill", colors[type][0])
	ccColor02.setAttribute("fill", colors[type][1])
    ccLogo.setAttribute("src", `cc-${type}.svg`)
}

globalThis.setCardType = setCardType