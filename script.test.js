/** @jest-environment jsdom */

describe('setupUsernameForm', () => {
  beforeAll(() => {
    jest.resetModules()
    require('./script.js')
  })

  test('returns early when form elements are missing', () => {
    document.body.innerHTML = '<div id="app"></div>'

    expect(() => {
      globalThis.dispatchEvent(new Event('DOMContentLoaded'))
    }).not.toThrow()
  })

  test('shows success feedback for a valid username and prevents submit default', () => {
    document.body.innerHTML = `
			<form id="username-form">
				<input id="username" />
				<p id="username-feedback"></p>
			</form>
		`

    globalThis.dispatchEvent(new Event('DOMContentLoaded'))

    const form = document.getElementById('username-form')
    const usernameInput = document.getElementById('username')
    const feedback = document.getElementById('username-feedback')

    usernameInput.value = 'Abc1!'
    const submitEvent = new Event('submit', { bubbles: true, cancelable: true })
    form.dispatchEvent(submitEvent)

    expect(submitEvent.defaultPrevented).toBe(true)
    expect(feedback.textContent).toBe('Success: "Abc1!" is a valid username.')
    expect(feedback.className).toBe('small mt-2 mb-0 text-success')
  })

  test('shows error feedback for an invalid username', () => {
    document.body.innerHTML = `
			<form id="username-form">
				<input id="username" />
				<p id="username-feedback"></p>
			</form>
		`

    globalThis.dispatchEvent(new Event('DOMContentLoaded'))

    const form = document.getElementById('username-form')
    const usernameInput = document.getElementById('username')
    const feedback = document.getElementById('username-feedback')

    usernameInput.value = 'abcde'
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))

    expect(feedback.textContent).toBe(
      'Invalid username. Use at least 5 characters with 1 uppercase letter, 1 number, and 1 special character.',
    )
    expect(feedback.className).toBe('small mt-2 mb-0 text-danger')
  })

  test('trims username before validation and in success message', () => {
    document.body.innerHTML = `
			<form id="username-form">
				<input id="username" />
				<p id="username-feedback"></p>
			</form>
		`

    globalThis.dispatchEvent(new Event('DOMContentLoaded'))

    const form = document.getElementById('username-form')
    const usernameInput = document.getElementById('username')
    const feedback = document.getElementById('username-feedback')

    usernameInput.value = '   Abc1!   '
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))

    expect(feedback.textContent).toBe('Success: "Abc1!" is a valid username.')
    expect(feedback.className).toBe('small mt-2 mb-0 text-success')
  })
})
