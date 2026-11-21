import { useRef, useState } from 'react'
import Computer from './Computer.jsx'
import Picker from './Picker.jsx'
import { fly } from '../fly.js'

const NAMES = ['agenda.txt', 'scores.csv', 'readme.txt']

export default function DosLab() {
  const rootRef = useRef(null)
  const nodeRefs = useRef([])
  const [files, setFiles] = useState(['agenda.txt'])
  const [picker, setPicker] = useState(null)
  const [status, setStatus] = useState('Upload or delete on any computer. Max 3 files. All three screens follow.')

  function upload(index) {
    setPicker(null)
    if (files.length >= 3) {
      setStatus('Three files is the limit. Delete one before uploading another.')
      return
    }
    const name = NAMES.find((item) => !files.includes(item))
    setFiles((prev) => [...prev, name])
    setStatus(`${name} was uploaded on PC ${index + 1}. All three computers show it.`)
    ;[0, 1, 2]
      .filter((j) => j !== index)
      .forEach((j) => fly(rootRef.current, nodeRefs.current[index], nodeRefs.current[j], name))
  }

  function askDelete(index) {
    if (files.length === 0) {
      setPicker({ index, empty: 'Nothing to delete.', rows: [] })
      return
    }
    setPicker({
      index,
      empty: '',
      rows: files.map((file) => ({ label: file, file })),
    })
  }

  function remove(row) {
    const index = picker.index
    setPicker(null)
    setFiles((prev) => prev.filter((file) => file !== row.file))
    setStatus(`${row.file} was deleted on PC ${index + 1}. It is gone from all three screens.`)
  }

  return (
    <section className="lab" ref={rootRef}>
      <h2>DOS · one shared set of files</h2>
      <div className="bus-wrap">
        <svg className="buswire" viewBox="0 0 300 40" preserveAspectRatio="none" aria-hidden="true">
          <path d="M48 8 H252 M48 8 V40 M150 8 V40 M252 8 V40" fill="none" stroke="#2c3e50" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="row3">
          {[0, 1, 2].map((i) => (
            <Computer
              key={i}
              name={`PC ${i + 1}`}
              files={files}
              mode="dos"
              nodeRef={(el) => { nodeRefs.current[i] = el }}
              actions={(
                <>
                  <button type="button" onClick={() => upload(i)}>Upload</button>
                  <button type="button" onClick={() => askDelete(i)}>Delete</button>
                </>
              )}
            >
              {picker?.index === i ? (
                <Picker title="Delete from every computer" rows={picker.rows} empty={picker.empty} onPick={remove} />
              ) : null}
            </Computer>
          ))}
        </div>
      </div>
      <p className="status">{status}</p>
    </section>
  )
}
