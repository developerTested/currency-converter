const country_list = {
    "AED": "AE",
    "AFN": "AF",
    "XCD": "AG",
    "ALL": "AL",
    "AMD": "AM",
    "ANG": "AN",
    "AOA": "AO",
    "AQD": "AQ",
    "ARS": "AR",
    "AUD": "AU",
    "AZN": "AZ",
    "BAM": "BA",
    "BBD": "BB",
    "BDT": "BD",
    "XOF": "BE",
    "BGN": "BG",
    "BHD": "BH",
    "BIF": "BI",
    "BMD": "BM",
    "BND": "BN",
    "BOB": "BO",
    "BRL": "BR",
    "BSD": "BS",
    "NOK": "BV",
    "BWP": "BW",
    "BYR": "BY",
    "BZD": "BZ",
    "CAD": "CA",
    "CDF": "CD",
    "XAF": "CF",
    "CHF": "CH",
    "CLP": "CL",
    "CNY": "CN",
    "COP": "CO",
    "CRC": "CR",
    "CUP": "CU",
    "CVE": "CV",
    "CYP": "CY",
    "CZK": "CZ",
    "DJF": "DJ",
    "DKK": "DK",
    "DOP": "DO",
    "DZD": "DZ",
    "ECS": "EC",
    "EEK": "EE",
    "EGP": "EG",
    "ETB": "ET",
    "EUR": "FR",
    "FJD": "FJ",
    "FKP": "FK",
    "GBP": "GB",
    "GEL": "GE",
    "GGP": "GG",
    "GHS": "GH",
    "GIP": "GI",
    "GMD": "GM",
    "GNF": "GN",
    "GTQ": "GT",
    "GYD": "GY",
    "HKD": "HK",
    "HNL": "HN",
    "HRK": "HR",
    "HTG": "HT",
    "HUF": "HU",
    "IDR": "ID",
    "ILS": "IL",
    "INR": "IN",
    "IQD": "IQ",
    "IRR": "IR",
    "ISK": "IS",
    "JMD": "JM",
    "JOD": "JO",
    "JPY": "JP",
    "KES": "KE",
    "KGS": "KG",
    "KHR": "KH",
    "KMF": "KM",
    "KPW": "KP",
    "KRW": "KR",
    "KWD": "KW",
    "KYD": "KY",
    "KZT": "KZ",
    "LAK": "LA",
    "LBP": "LB",
    "LKR": "LK",
    "LRD": "LR",
    "LSL": "LS",
    "LTL": "LT",
    "LVL": "LV",
    "LYD": "LY",
    "MAD": "MA",
    "MDL": "MD",
    "MGA": "MG",
    "MKD": "MK",
    "MMK": "MM",
    "MNT": "MN",
    "MOP": "MO",
    "MRO": "MR",
    "MTL": "MT",
    "MUR": "MU",
    "MVR": "MV",
    "MWK": "MW",
    "MXN": "MX",
    "MYR": "MY",
    "MZN": "MZ",
    "NAD": "NA",
    "XPF": "NC",
    "NGN": "NG",
    "NIO": "NI",
    "NPR": "NP",
    "NZD": "NZ",
    "OMR": "OM",
    "PAB": "PA",
    "PEN": "PE",
    "PGK": "PG",
    "PHP": "PH",
    "PKR": "PK",
    "PLN": "PL",
    "PYG": "PY",
    "QAR": "QA",
    "RON": "RO",
    "RSD": "RS",
    "RUB": "RU",
    "RWF": "RW",
    "SAR": "SA",
    "SBD": "SB",
    "SCR": "SC",
    "SDG": "SD",
    "SEK": "SE",
    "SGD": "SG",
    "SKK": "SK",
    "SLL": "SL",
    "SOS": "SO",
    "SRD": "SR",
    "STD": "ST",
    "SVC": "SV",
    "SYP": "SY",
    "SZL": "SZ",
    "THB": "TH",
    "TJS": "TJ",
    "TMT": "TM",
    "TND": "TN",
    "TOP": "TO",
    "TRY": "TR",
    "TTD": "TT",
    "TWD": "TW",
    "TZS": "TZ",
    "UAH": "UA",
    "UGX": "UG",
    "USD": "US",
    "UYU": "UY",
    "UZS": "UZ",
    "VEF": "VE",
    "VND": "VN",
    "VUV": "VU",
    "YER": "YE",
    "ZAR": "ZA",
    "ZMK": "ZM",
    "ZWD": "ZW"
}

const form = document.getElementById('currencyForm');

const select_from = document.getElementById("from")
const select_to = document.getElementById("to")

const swap = document.querySelector(".swap");

const result = document.querySelector('.results');
const selectBox = document.querySelectorAll('select');

for (let i = 0; i < selectBox.length; i++) {
    let selected;

    const element = selectBox[i];

    for (const currency_code in country_list) {

        if (i == 0) {
            selected = currency_code === "USD" ? "selected" : ""
        } else if (i == 1) {
            selected = currency_code === "INR" ? "selected" : ""
        }

        const option = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;

        element.insertAdjacentHTML("beforeend", option)

        element.addEventListener('change', (e) => {
            loadFlag(e.target);
        })
    }
}

form.addEventListener("submit", handleSubmitForm)

swap.addEventListener('click', toggle)

/**
 * Functions
 */
function toggle(e) {
    e.preventDefault();

    const temp = select_from.value;

    select_from.value = select_to.value;
    select_to.value = temp;

    loadFlag(select_from)
    loadFlag(select_to)
}

async function handleSubmitForm(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const amount = formData.get('amount');
    const fromValue = formData.get('from');
    const toValue = formData.get('to');

    result.textContent = "Fetching Exchange rates"

    const out = await fetchExchangeAPI(fromValue.toLowerCase(), toValue.toLowerCase());

    const exchange = out * amount;

    result.textContent = `${amount} ${fromValue} = ${toValue} ${exchange}`
}


function loadFlag(element) {
    for (const currency_code in country_list) {
        if (currency_code === element.value) {
            const img = element.parentElement.querySelector('img');
            img.src = `https://flagsapi.com/${country_list[currency_code]}/flat/32.png`
        }
    }
}

async function fetchExchangeAPI(source, dest) {

    const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${source}.json`

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }

        const data = await response.json();

        const out = (data[source][dest] || 0).toFixed(2);

        return out;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return null; // Return null in case of an error
    }
}