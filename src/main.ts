import './style.css'
import { createViewer, updateBlank } from './viewer'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="page">
    <h1>Attachable Clicker Blank Generator</h1>

    <div class="controls">
      <label>
        Width
        <input id="width" type="number" value="40" />
      </label>

      <label>
        Height
        <input id="height" type="number" value="25" />
      </label>

      <label>
        Thickness
        <input id="thickness" type="number" value="4" />
      </label>

      <button id="generate">Generate Blank</button>
    </div>

    <div id="viewer" class="preview"></div>
  </div>
`

createViewer()

const widthInput = document.querySelector<HTMLInputElement>('#width')!
const heightInput = document.querySelector<HTMLInputElement>('#height')!
const thicknessInput = document.querySelector<HTMLInputElement>('#thickness')!
const generateButton = document.querySelector<HTMLButtonElement>('#generate')!

generateButton.addEventListener('click', () => {
  const width = Number(widthInput.value)
  const height = Number(heightInput.value)
  const thickness = Number(thicknessInput.value)

  updateBlank(width, height, thickness)
})