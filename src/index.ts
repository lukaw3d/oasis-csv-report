import { unparse } from 'papaparse'

async function downloadCsv() {
  const address = window.account.value
  const txs = await (await fetch(`https://api.oasismonitor.com/data/transactions?limit=10000&offset=0&account_id=${encodeURIComponent(address)}`)).json()
  const txsCsv = unparse(txs, {header: true})

  const rewards = await (await fetch(`https://api.oasismonitor.com/data/accounts/${encodeURIComponent(address)}/rewards?limit=10000&offset=0`)).json()
  const rewardsCsv = unparse(rewards, {header: true})
}
document.querySelector('#request-form').addEventListener('submit', (event) => {
  event.preventDefault()
  downloadCsv()
})
