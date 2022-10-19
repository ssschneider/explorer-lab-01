import "../src/css/index.css";
import IMask from "imask";

const ccColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")

function setCardType(type) {
	const colors = {
		visa: ["#436D99", "#2D57F2"],
		mastercard: ["#DF6F29", "#C69347"],
		elo: ["#550101", "#575814"],
		americanExpress: ["#0E062E", "#17487A"],
		default: ["#0e0e0e", "#545454"],
	}

	ccColor01.setAttribute("fill", colors[type][0])
	ccColor02.setAttribute("fill", colors[type][1])
    ccLogo.setAttribute("src", `cc-${type}.svg`)
}

globalThis.setCardType = setCardType

const securityCode = document.querySelector("#security-code")
const securityCodePattern = {
	mask: "0000"
}
const securityCodeMasked = IMask(securityCode, securityCodePattern);

const expirationDate = document.querySelector("#expiration-date")
const expirationDatePattern = {
	mask: "MM{/}YY",
	blocks: {
		MM: {
			mask: IMask.MaskedRange,
			from: 1,
			to: 12,
		},
		YY: {
			mask: IMask.MaskedRange,
			from: String(new Date().getFullYear()).slice(2),
			to: String(new Date().getFullYear() + 10).slice(2),
		},
	},
}
const expirationDateMasked = IMask(expirationDate, expirationDatePattern)

const cardNumber = document.querySelector("#card-number")
const cardNumberPattern = {
	mask: [
		{
			mask: "0000 0000 0000 0000",
			regex: /^4\d{0,15}/,
			cardType: "visa",
		},
		{
			mask: "0000 0000 0000 0000",
			regex: /^(5[1-5]\d{0,2}|^22[2-9]\d{0,1}|^2[3-7]\d{0,2})\d{0,12}/,
			cardType: "mastercard",
		},
		{
			mask: "0000 0000 0000 0000",
			regex: /^3[47]\d{0,13}/,
			cardType: "americanExpress",
		},
		{
			mask: "0000 0000 0000 0000",
			regex: /^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})/,
			cardType: "elo",
		},
		{
			mask: "0000 0000 0000 0000",
			cardType: "default",
		},
	],
	dispatch: function (appended, dynamicMasked) {
		const number = (dynamicMasked.value + appended).replace(/\D/g, "")
		const foundMask = dynamicMasked.compiledMasks.find(function (item) {
			return number.match(item.regex)
		})

		console.log(foundMask)
		return foundMask
	},
}
const cardNumberMasked = IMask (cardNumber, cardNumberPattern)