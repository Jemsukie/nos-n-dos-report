export default function Picker({ title, rows, empty, onPick }) {
  return (
    <div className="picker">
      <p>{title}</p>
      {empty ? <p className="empty">{empty}</p> : null}
      {rows.map((row) => (
        <button
          key={row.label}
          type="button"
          disabled={row.disabled}
          onClick={() => onPick(row)}
        >
          {row.label}
        </button>
      ))}
    </div>
  )
}
