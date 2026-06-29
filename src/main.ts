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

function refresh() {
  updateBlank({
    shape: shapeInput.value,
    width: Number(widthInput.value),
    height: Number(heightInput.value),
    thickness: Number(thicknessInput.value),
    switchHole: Number(switchHoleInput.value),
  })
}

shapeInput.addEventListener('change', refresh)
widthInput.addEventListener('input', refresh)
heightInput.addEventListener('input', refresh)
thicknessInput.addEventListener('input', refresh)
switchHoleInput.addEventListener('input', refresh)

refresh()