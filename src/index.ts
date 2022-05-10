import { unparse } from 'papaparse'

function showError(status: string) {
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

function toCsv(objects: Record<string, any>[]) {
  const allHeaders = new Set<string>()
  objects.forEach((obj) => Object.keys(obj).forEach(k => allHeaders.add(k)))

  return unparse(objects, {header: true, columns: [...allHeaders]})
}

async function downloadCsv() {
  try {
    const address = window.account.value
    const txs: Record<string, any>[] = await (await fetch(`https://api.oasismonitor.com/data/transactions?limit=10000&offset=0&account_id=${encodeURIComponent(address)}`)).json()
    downloadFile('transactions.csv', toCsv(txs))

    const rewardsRaw: Record<string, any>[] = await (await fetch(`https://api.oasismonitor.com/data/accounts/${encodeURIComponent(address)}/rewards?limit=10000&offset=0`)).json()
    downloadFile('staking-rewards.csv', toCsv(rewardsRaw))
  } catch (error) {
    showError(error)
  }
}
document.querySelector('#request-form').addEventListener('submit', (event) => {
  event.preventDefault()
  downloadCsv()
})
