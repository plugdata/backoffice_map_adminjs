import { LitElement, html, css } from 'lit'

export class DatePickerNative extends LitElement {
  static properties = {
    value: { type: String },
  }

  static styles = css`
    :host {
      display: inline-block;
      font-family: system-ui, sans-serif;
    }
    input {
      padding: 0.4rem;
      font-size: 1rem;
    }
  `

  constructor() {
    super()
    this.value = ''
  }

  #onChange(e) {
    this.value = e.target.value
    this.dispatchEvent(new CustomEvent('change', { detail: this.value }))
  }

  render() {
    return html`
      <label>วันเกิด: </label>
      <input 
        type="date" 
        lang="th-TH"  <!-- 👈 บังคับ locale ไทย -->
        .value=${this.value}
        @change=${this.#onChange}
      />
    `
  }
}

customElements.define('date-picker-native', DatePickerNative)
