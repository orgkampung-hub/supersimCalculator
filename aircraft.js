let aircraftCount = 0;
function addAircraft() {
    aircraftCount++;
    const container = document.getElementById('fleetContainer');
    if(container.children.length === 0) {
        const labels = document.createElement('div');
        labels.className = 'label-row';
        labels.innerHTML = `<div>PLANE</div><div>ECO</div><div>BUS</div><div>1ST</div><div>CRG</div><div>FRQ</div><div></div>`;
        container.appendChild(labels);
    }
    const row = document.createElement('div');
    row.className = 'aircraft-row';
    row.id = `airRow_${aircraftCount}`;
    row.innerHTML = `
        <input type="text" placeholder="A388" onfocus="this.select()">
        <input type="number" class="air-eco" oninput="calculateFleetCap()" onfocus="this.value=''; calculateFleetCap();" placeholder="0">
        <input type="number" class="air-bus" oninput="calculateFleetCap()" onfocus="this.value=''; calculateFleetCap();" placeholder="0">
        <input type="number" class="air-fst" oninput="calculateFleetCap()" onfocus="this.value=''; calculateFleetCap();" placeholder="0">
        <input type="number" class="air-crg" oninput="calculateFleetCap()" onfocus="this.value=''; calculateFleetCap();" placeholder="0">
        <input type="number" class="air-freq" oninput="calculateFleetCap()" onfocus="this.value=''; calculateFleetCap();" value="1">
        <button class="btn-del" onclick="removeAircraft(${aircraftCount})">×</button>
    `;
    container.appendChild(row);
}
function removeAircraft(id) {
    const row = document.getElementById(`airRow_${id}`);
    if (row) row.remove();
    calculateFleetCap();
}
function calculateFleetCap() {
    let totals = { eco: 0, bus: 0, fst: 0, crg: 0 };
    const rows = document.querySelectorAll('.aircraft-row');
    rows.forEach(row => {
        const f = parseFloat(row.querySelector('.air-freq').value) || 0;
        totals.eco += (parseFloat(row.querySelector('.air-eco').value) || 0) * 2 * f;
        totals.bus += (parseFloat(row.querySelector('.air-bus').value) || 0) * 2 * f;
        totals.fst += (parseFloat(row.querySelector('.air-fst').value) || 0) * 2 * f;
        totals.crg += (parseFloat(row.querySelector('.air-crg').value) || 0) * 2 * f;
    });
    document.getElementById('dispTotalEco').innerText = totals.eco;
    document.getElementById('dispTotalBus').innerText = totals.bus;
    document.getElementById('dispTotalFst').innerText = totals.fst;
    document.getElementById('dispTotalCrg').innerText = totals.crg;
    window.fleetCap = totals;
    if (typeof calcAll === "function") calcAll();
}
window.onload = () => { if(aircraftCount === 0) addAircraft(); };
