import { useRef, useState } from 'react'
import Computer from './Computer.jsx'
import Picker from './Picker.jsx'
import { fly } from '../fly.js'

const START = [
  { name: 'PC 1', files: ['lab-notes.txt'] },
  { name: 'PC 2', files: ['budget.txt'] },
  { name: 'PC 3', files: ['photo.txt'] },
]
const PLACE = ['top', 'bl', 'br']

export default function NosLab() {
  const rootRef = useRef(null)
  const nodeRefs = useRef([])
  const [pcs, setPcs] = useState(START)
  const [picker, setPicker] = useState(null)
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState('Get or send names one other computer. The third does not change.')

  function open(index, action) {
    if (busy) return
    if (picker?.index === index && picker.action === action) {
      setPicker(null)
      return
    }
    if (action === 'send' && pcs[index].files.length === 0) {
      setPicker({ index, action, rows: [], empty: 'This computer has no file to send.' })
      return
    }
    const rows = []
    pcs.forEach((pc, j) => {
      if (j === index) return
      if (action === 'get') {
        if (pc.files.length === 0) rows.push({ label: `${pc.name} · no files`, disabled: true })
        pc.files.forEach((file) => rows.push({ label: `${pc.name} · ${file}`, j, file }))
      } else {
        pcs[index].files.forEach((file) => rows.push({ label: `Send ${file} to ${pc.name}`, j, file }))
      }
    })
    setPicker({ index, action, rows, empty: '' })
  }

  async function transfer(row) {
    const { index, action } = picker
    setPicker(null)
    const dest = action === 'get' ? index : row.j
    const src = action === 'get' ? row.j : index
    if (pcs[dest].files.includes(row.file)) {
      setStatus(`${pcs[dest].name} already has ${row.file}.`)
      return
    }
    if (pcs[dest].files.length >= 3) {
      setStatus(`${pcs[dest].name} already has 3 files.`)
      return
    }
    setBusy(true)
    setStatus(`${row.file} is moving from ${pcs[src].name} to ${pcs[dest].name}.`)
    await fly(rootRef.current, nodeRefs.current[src], nodeRefs.current[dest], row.file)
    setPcs((prev) => prev.map((pc, i) => (i === dest ? { ...pc, files: [...pc.files, row.file] } : pc)))
    const idle = pcs.find((_, k) => k !== src && k !== dest)
    setStatus(`${pcs[dest].name} now has ${row.file}. ${idle.name} did not change.`)
    setBusy(false)
  }

  return (
    <section className="lab" ref={rootRef}>
      <h2>NOS · each computer keeps its own files</h2>
      <div className="tri-wrap">
        <svg className="wires" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 Z" fill="#2c3e50" />
            </marker>
          </defs>
          <line x1="50" y1="30" x2="22" y2="64" stroke="#2c3e50" strokeWidth="2" vectorEffect="non-scaling-stroke" markerStart="url(#ah)" markerEnd="url(#ah)" />
          <line x1="50" y1="30" x2="78" y2="64" stroke="#2c3e50" strokeWidth="2" vectorEffect="non-scaling-stroke" markerStart="url(#ah)" markerEnd="url(#ah)" />
          <line x1="28" y1="76" x2="72" y2="76" stroke="#2c3e50" strokeWidth="2" vectorEffect="non-scaling-stroke" markerStart="url(#ah)" markerEnd="url(#ah)" />
        </svg>
        <div className="tri">
          {pcs.map((pc, i) => (
            <Computer
              key={pc.name}
              name={pc.name}
              files={pc.files}
              mode="nos"
              place={PLACE[i]}
              nodeRef={(el) => { nodeRefs.current[i] = el }}
              actions={(
                <>
                  <button type="button" onClick={() => open(i, 'get')}>Get</button>
                  <button type="button" onClick={() => open(i, 'send')}>Send</button>
                </>
              )}
            >
              {picker?.index === i ? (
                <Picker
                  title={picker.action === 'get' ? 'Get from' : 'Send to'}
                  rows={picker.rows}
                  empty={picker.empty}
                  onPick={transfer}
                />
              ) : null}
            </Computer>
          ))}
        </div>
      </div>
      <p className="status">{status}</p>
    </section>
  )
}
