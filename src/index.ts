import { unparse } from 'papaparse'

function showError(status) {
  document.querySelector('#error-display-text').textContent = status;
}

function downloadFile(filename: string, content: string) {
  const url = window.URL.createObjectURL(new Blob([content], { type: 'text/plain' }))
  const a = document.createElement('a')
  a.style.display = 'none'
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  window.URL.revokeObjectURL(url)
}

async function downloadCsv() {
  try {
    const address = window.account.value
    const txs = await (await fetch(`https://api.oasismonitor.com/data/transactions?limit=10000&offset=0&account_id=${encodeURIComponent(address)}`)).json()
    const txsCsv = unparse(txs, {header: true})
    downloadFile('transactions.csv', txsCsv)

    const rewards = await (await fetch(`https://api.oasismonitor.com/data/accounts/${encodeURIComponent(address)}/rewards?limit=10000&offset=0`)).json()
    const rewardsCsv = unparse(rewards, {header: true})
    downloadFile('staking-rewards.csv', rewardsCsv)
  } catch (error) {
    showError(error)
  }
}
document.querySelector('#request-form').addEventListener('submit', (event) => {
  event.preventDefault()
  downloadCsv()
})
