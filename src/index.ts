import { unparse } from 'papaparse'
import { utils } from 'ethers'

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

function mapMaybe<T, R>(value: T | undefined, mapper: (value: T) => R) {
  if (value == null) return value
  return mapper(value)
}

async function downloadCsv() {
  try {
    const address = window.account.value
    const txsRaw: Record<string, any>[] = await (await fetch(`https://api.oasismonitor.com/data/transactions?limit=10000&offset=0&account_id=${encodeURIComponent(address)}`)).json()
    const txs = txsRaw.map((tx) => {
      return {
        timestamp_iso: mapMaybe(tx.timestamp, v => new Date(v * 1000).toISOString()),
        amount_rose: mapMaybe(tx.amount, v => utils.formatUnits(v, 9)),
        escrow_amount_rose: mapMaybe(tx.escrow_amount, v => utils.formatUnits(v, 9)),
        reclaim_escrow_amount_rose: mapMaybe(tx.reclaim_escrow_amount, v => utils.formatUnits(v, 9)),
        ...tx,
      }
    })
    downloadFile('transactions.csv', toCsv(txs))

    const rewardsRaw: Record<string, any>[] = await (await fetch(`https://api.oasismonitor.com/data/accounts/${encodeURIComponent(address)}/rewards?limit=10000&offset=0`)).json()
    const rewards = rewardsRaw.map((reward) => {
      return {
        created_at_iso: mapMaybe(reward.created_at, v => new Date(v * 1000).toISOString()),
        amount_rose: mapMaybe(reward.amount, v => utils.formatUnits(v, 9)),
        ...reward,
      }
    })
    downloadFile('staking-rewards.csv', toCsv(rewards))
  } catch (error) {
    showError(error)
  }
}
document.querySelector('#request-form').addEventListener('submit', (event) => {
  event.preventDefault()
  downloadCsv()
})
