import './style.css'
import { createViewer, updateBlank } from './renderer/viewer'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="page">
    <h1>ClickForge</h1>

    <div class="controls">
      <label>
        Shape
        <select id="shape">
          <option value="rectangle">Rectangle</option>
          <option value="circle">Circle</option>
          <option value="heart">Heart</option>
        </select>
      </label>

      <label>
        Width
        <input id="width" type="number" value="60" />
      </label>

      <label>
        Height
        <input id="height" type="number" value="55" />
      </label>

      <label>
        Thickness
        <input id="thickness" type="number" value="4" />
      </label>

      <label>
        Switch Hole
        <label>
  Connector Length
  <input id="connectorLength" type="number" value="6" />
</label>

<label>
  Connector Height
  <input id="connectorHeight" type="number" value="12" />
</label>

<label>
  Clearance
  <input id="clearance" type="number" value="0.25" step="0.05" />
</label>
        <input id="switchHole" type="number" value="14.2" />
      </label>
    </div>

    <div id="viewer" class="preview"></div>
  </div>
`

createViewer()

const shapeInput = document.querySelector<HTMLSelectElement>('#shape')!
const widthInput = document.querySelector<HTMLInputElement>('#width')!
const heightInput = document.querySelector<HTMLInputElement>('#height')!
const thicknessInput = document.querySelector<HTMLInputElement>('#thickness')!
const switchHoleInput = document.querySelector<HTMLInputElement>('#switchHole')!
const connectorLengthInput = document.querySelector<HTMLInputElement>('#connectorLength')!
const connectorHeightInput = document.querySelector<HTMLInputElement>('#connectorHeight')!
const clearanceInput = document.querySelector<HTMLInputElement>('#clearance')!

function refresh() {
  updateBlank({
    id: 'part-1',
    name: 'Main Blank',
    shape: shapeInput.value as any,
    width: Number(widthInput.value),
    height: Number(heightInput.value),
    thickness: Number(thicknessInput.value),
    switchMount: {
      type: 'mx',
      cutoutSize: Number(switchHoleInput.value),
      tolerance: 0.2,
      plateThickness: 1.5,
    },
    connectors: [],
    connectorSettings: {
  length: Number(connectorLengthInput.value),
  height: Number(connectorHeightInput.value),
  clearance: Number(clearanceInput.value),
},
  })
}

shapeInput.addEventListener('change', refresh)
widthInput.addEventListener('input', refresh)
heightInput.addEventListener('input', refresh)
thicknessInput.addEventListener('input', refresh)
switchHoleInput.addEventListener('input', refresh)
connectorLengthInput.addEventListener('input', refresh)
connectorHeightInput.addEventListener('input', refresh)
clearanceInput.addEventListener('input', refresh)

refresh()