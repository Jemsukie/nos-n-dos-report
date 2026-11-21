function shortName(file) {
  return file.replace(/\..*$/, '')
}

function Slots({ files }) {
  return (
    <div className="slots">
      {[0, 1, 2].map((n) => {
        const file = files[n]
        return (
          <div className={file ? 'slot filled' : 'slot'} key={n} title={file || ''}>
            {file ? <i className="folder" /> : null}
          </div>
        )
      })}
    </div>
  )
}

export default function Computer({ name, files, mode, place, nodeRef, children, actions }) {
  return (
    <article className={place ? `comp ${place}` : 'comp'} ref={nodeRef}>
      <div className="who">{name}</div>
      <div className="machine">
        <div className="bezel">
          <div className="glass">
            {mode === 'nos' ? files.map((file) => <span key={file}>{shortName(file)}</span>) : null}
          </div>
        </div>
        <div className="neck" />
        <div className="foot" />
        <div className="keys" />
      </div>
      {mode === 'dos' ? <Slots files={files} /> : null}
      <div className="actions">{actions}</div>
      {children}
    </article>
  )
}
