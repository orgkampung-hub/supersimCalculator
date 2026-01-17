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
        
        let newRem = 0;
        if (res.price > p) {
            const priceDiff = res.price - p;
            const demandReduction = Math.round((priceDiff / p) * (d * 3));
            const newDemand = d - demandReduction;
            newRem = newDemand - c;
        } else {
            newRem = d - c;
        }

        const newRemEl = document.getElementById('res' + id + 'NewRem');
        if (newRemEl) {
            newRemEl.innerText = Math.max(0, newRem).toLocaleString();
        }
        grandTotal += res.turnover;
    });
    document.getElementById('grandTotal').innerText = 'Turnover: $' + grandTotal.toLocaleString();
    
    saveData();
}

function saveData() {
    const auditData = {
        prices: {
            eco: document.getElementById('ecoPrice').value,
            bus: document.getElementById('busPrice').value,
            fst: document.getElementById('fstPrice').value,
            crg: document.getElementById('crgPrice').value
        },
        demands: {
            eco: document.getElementById('ecoDemand').value,
            bus: document.getElementById('busDemand').value,
            fst: document.getElementById('fstDemand').value,
            crg: document.getElementById('crgDemand').value
        }
    };

    const fleetRows = [];
    document.querySelectorAll('.aircraft-row').forEach(row => {
        fleetRows.push({
            name: row.querySelector('input[type="text"]').value,
            eco: row.querySelector('.air-eco').value,
            bus: row.querySelector('.air-bus').value,
            fst: row.querySelector('.air-fst').value,
            crg: row.querySelector('.air-crg').value,
            freq: row.querySelector('.air-freq').value
        });
    });

    const fullData = { audit: auditData, fleet: fleetRows };
    localStorage.setItem('akulasData', JSON.stringify(fullData));
}

function loadData() {
    const saved = localStorage.getItem('akulasData');
    if (!saved) return;
    const data = JSON.parse(saved);

    if (data.audit) {
        document.getElementById('ecoPrice').value = data.audit.prices.eco;
        document.getElementById('busPrice').value = data.audit.prices.bus;
        document.getElementById('fstPrice').value = data.audit.prices.fst;
        document.getElementById('crgPrice').value = data.audit.prices.crg;
        document.getElementById('ecoDemand').value = data.audit.demands.eco;
        document.getElementById('busDemand').value = data.audit.demands.bus;
        document.getElementById('fstDemand').value = data.audit.demands.fst;
        document.getElementById('crgDemand').value = data.audit.demands.crg;
    }

    if (data.fleet && data.fleet.length > 0) {
        document.getElementById('fleetContainer').innerHTML = '';
        aircraftCount = 0;
        data.fleet.forEach(f => {
            addAircraft();
            const row = document.getElementById(`airRow_${aircraftCount}`);
            row.querySelector('input[type="text"]').value = f.name;
            row.querySelector('.air-eco').value = f.eco;
            row.querySelector('.air-bus').value = f.bus;
            row.querySelector('.air-fst').value = f.fst;
            row.querySelector('.air-crg').value = f.crg;
            row.querySelector('.air-freq').value = f.freq;
        });
        calculateFleetCap();
    }
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
    if (!confirm("Padam semua data yang disimpan?")) return;
    localStorage.removeItem('akulasData');
    const inputs = document.querySelectorAll('.m-input');
    inputs.forEach(i => i.value = '');
    document.getElementById('fleetContainer').innerHTML = '';
    aircraftCount = 0;
    addAircraft();
    calculateFleetCap();
}

// FUNGSI BARU: TOGGLE FULLSCREEN
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log(`Error attempting to enable full-screen mode: ${err.message}`);
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}
