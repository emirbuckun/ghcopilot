const MONTHS = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
]
const MONTH_LABELS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]
const USERNAME_PATTERN = /(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{5,}/

function toNumberOrZero(value) {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : 0
}

function readMonthlyValues(type) {
  return MONTHS.map((monthKey) => {
    const input = document.getElementById(`${type}-${monthKey}`)
    return input ? toNumberOrZero(input.value) : 0
  })
}

function initializeChart() {
  const canvas = document.getElementById('incomeExpenseChart')

  if (!canvas || typeof Chart === 'undefined') {
    return null
  }

  const income = readMonthlyValues('income')
  const expense = readMonthlyValues('expense')

  return new Chart(canvas, {
    type: 'bar',
    data: {
      labels: MONTH_LABELS,
      datasets: [
        {
          label: 'Income',
          data: income,
          backgroundColor: 'rgba(13, 110, 253, 0.75)',
          borderColor: 'rgba(13, 110, 253, 1)',
          borderWidth: 1,
        },
        {
          label: 'Expense',
          data: expense,
          backgroundColor: 'rgba(220, 53, 69, 0.75)',
          borderColor: 'rgba(220, 53, 69, 1)',
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          position: 'top',
        },
      },
    },
  })
}

function syncChart(chart) {
  if (!chart) {
    return
  }

  chart.data.datasets[0].data = readMonthlyValues('income')
  chart.data.datasets[1].data = readMonthlyValues('expense')
  chart.update()
}

function setupInputListeners(chart) {
  const inputs = document.querySelectorAll('input[data-type][data-month]')

  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      syncChart(chart)
    })
  })
}

function setupDownloadButton() {
  const downloadButton = document.getElementById('downloadChart')
  if (!downloadButton) {
    return
  }

  downloadButton.addEventListener('click', () => {
    const canvas = document.getElementById('incomeExpenseChart')
    if (!canvas) {
      return
    }

    const image = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = image
    link.download = 'income-expense-chart.png'
    document.body.appendChild(link)
    link.click()
    link.remove()
  })
}

function setupUsernameForm() {
  const form = document.getElementById('username-form')
  const usernameInput = document.getElementById('username')
  const feedback = document.getElementById('username-feedback')

  if (!form || !usernameInput || !feedback) {
    return
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault()

    const username = usernameInput.value.trim()
    const isValidUsername = USERNAME_PATTERN.test(username)

    if (isValidUsername) {
      feedback.textContent = `Success: "${username}" is a valid username.`
      feedback.className = 'small mt-2 mb-0 text-success'
      return
    }

    feedback.textContent =
      'Invalid username. Use at least 5 characters with 1 uppercase letter, 1 number, and 1 special character.'
    feedback.className = 'small mt-2 mb-0 text-danger'
  })
}

globalThis.addEventListener('DOMContentLoaded', () => {
  const chart = initializeChart()
  setupInputListeners(chart)
  setupDownloadButton()
  setupUsernameForm()
})
