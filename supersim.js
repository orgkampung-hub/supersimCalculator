function calculateSuperSim(B3, B4, B5) {
    if (!B3 || !B4 || B3 <= 0 || B4 <= 0) return { price: 0, turnover: 0, remDem: 0 };
    let price = B3;
    if (B5 > 0) {
        if (B5 < B4) {
            price = Math.floor(B3 * (1 - (B5 - B4) / (3 * B4)));
        } else { price = B3; }
    }
    const turnover = Math.min(B4, B5) * price;
    const remDem = B4 - B5;
    return { price, turnover, remDem };
}
function calcAll() {
    const classes = ['eco', 'bus', 'fst', 'crg'];
    let grandTotal = 0;
    const capData = window.fleetCap || { eco: 0, bus: 0, fst: 0, crg: 0 };
    classes.forEach(cls => {
        const p = parseFloat(document.getElementById(cls + 'Price').value) || 0;
        const d = parseFloat(document.getElementById(cls + 'Demand').value) || 0;
        const c = capData[cls] || 0;
        const res = calculateSuperSim(p, d, c);
        const id = cls.charAt(0).toUpperCase() + cls.slice(1);
        document.getElementById('res' + id + 'Price').innerText = res.price;
        document.getElementById('res' + id + 'RemDem').innerText = res.remDem.toLocaleString();
        grandTotal += res.turnover;
    });
    document.getElementById('grandTotal').innerText = 'Turnover: $' + grandTotal.toLocaleString();
}
function copyVal(id) {
    const val = document.getElementById(id).innerText;
    if (val === "0" || val === "") return;
    navigator.clipboard.writeText(val).then(() => {
        const toast = document.getElementById('toast');
        toast.style.display = 'block';
        setTimeout(() => { toast.style.display = 'none'; }, 1000);
    });
}
function resetAll() {
    const inputs = document.querySelectorAll('.m-input');
    inputs.forEach(i => i.value = '');
    document.getElementById('fleetContainer').innerHTML = '';
    aircraftCount = 0;
    addAircraft();
    calculateFleetCap();
}
