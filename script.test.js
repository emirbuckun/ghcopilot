/** @jest-environment jsdom */

function setupUsernameDom() {
  document.body.innerHTML = `
		<form id="username-form">
			<input id="username" type="text" />
			<p id="username-feedback"></p>
		</form>
	`

  return {
    form: document.getElementById('username-form'),
    usernameInput: document.getElementById('username'),
    feedback: document.getElementById('username-feedback'),
  }
}

function initializeScript() {
  jest.isolateModules(() => {
    require('./script.js')
  })

  window.dispatchEvent(new Event('DOMContentLoaded'))
}

describe('username validation', () => {
  beforeEach(() => {
    jest.resetModules()
    document.body.innerHTML = ''
  })

  test('accepts a valid username', () => {
    const { form, usernameInput, feedback } = setupUsernameDom()
    initializeScript()

    usernameInput.value = 'Abcd1!'
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))

    expect(feedback.textContent).toBe('Success: "Abcd1!" is a valid username.')
    expect(feedback.className).toContain('text-success')
  })

  test('rejects username without uppercase letter', () => {
    const { form, usernameInput, feedback } = setupUsernameDom()
    initializeScript()

    usernameInput.value = 'abcd1!'
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))

    expect(feedback.textContent).toBe(
      'Invalid username. Use at least 5 characters with 1 uppercase letter, 1 number, and 1 special character.',
    )
    expect(feedback.className).toContain('text-danger')
  })

  test('rejects username shorter than 5 characters', () => {
    const { form, usernameInput, feedback } = setupUsernameDom()
    initializeScript()

    usernameInput.value = 'A1!a'
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))

    expect(feedback.textContent).toBe(
      'Invalid username. Use at least 5 characters with 1 uppercase letter, 1 number, and 1 special character.',
    )
    expect(feedback.className).toContain('text-danger')
  })

  test('trims whitespace before validating username', () => {
    const { form, usernameInput, feedback } = setupUsernameDom()
    initializeScript()

    usernameInput.value = '  Abcd1!  '
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))

    expect(feedback.textContent).toBe('Success: "Abcd1!" is a valid username.')
    expect(feedback.className).toContain('text-success')
  })
})
