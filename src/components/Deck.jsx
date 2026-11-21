import { useEffect, useState } from 'react'
import DosLab from './DosLab.jsx'
import Figure from './Figures.jsx'
import NosLab from './NosLab.jsx'
import { FIGURE_META, buildDeck } from '../deck.js'

const pieces = buildDeck()

function Lines({ text }) {
  return String(text).split('\n').map((line, i) => (
    <span key={i}>{i > 0 ? <br /> : null}{line}</span>
  ))
}

function Body({ slide }) {
  const { kind, items } = slide
  if (kind === 'hero') {
    return (
      <div className="hero">
        {items.map(([title, text]) => (
          <article className="hero-card" key={title}>
            <h2>{title}</h2>
            <p><Lines text={text} /></p>
          </article>
        ))}
      </div>
    )
  }
  if (kind === 'four') {
    return (
      <div className="grid4">
        {items.map(([title, text]) => (
          <article className="quad" key={title}>
            <h2>{title}</h2>
            <p><Lines text={text} /></p>
          </article>
        ))}
      </div>
    )
  }
  if (kind === 'table') {
    const headers = slide.headers || ['Feature', 'Client–server', 'Peer-to-peer']
    return (
      <table>
        <thead>
          <tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr>
        </thead>
        <tbody>
          {items.map(([feature, left, right]) => (
            <tr key={feature}>
              <th>{feature}</th>
              <td>{left}</td>
              <td>{right}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
  if (kind === 'rows') {
    return (
      <div className="rows">
        {items.map(([title, text]) => (
          <div className="row" key={title}>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
        ))}
      </div>
    )
  }
  return (
    <div className="cards">
      {items.map(([title, text], i) => (
        <article className="card" key={title}>
          <b>{String(i + 1).padStart(2, '0')}</b>
          <h2>{title}</h2>
          <p><Lines text={text} /></p>
        </article>
      ))}
    </div>
  )
}

function frameFor(piece) {
  if (piece.type === 'slide') {
    const { slide } = piece
    return {
      section: slide.section,
      title: slide.title,
      point: slide.point,
      source: slide.source,
      question: slide.question,
      answer: slide.answer,
      notes: slide.notes,
      body: <Body slide={slide} />,
    }
  }
  if (piece.type === 'figure') {
    const meta = piece.id === 'roles'
      ? piece
      : FIGURE_META[piece.id]
    return {
      ...meta,
      body: <Figure id={piece.id} />,
      notes: piece.notes || 'Diagram from Module 11.',
      question: piece.question,
      answer: piece.answer,
    }
  }
  return {
    section: 'TRY IT · AFTER THE NOS / DOS PICTURE',
    title: 'Who sees the file?',
    point: 'Left: only the computers you chose change. Right: one action changes every screen.',
    source: 'Module 11 · simulator',
    notes: 'The left side is a peer-to-peer workgroup, which is still a NOS. The right side is a single system image.',
    body: (
      <div className="labs">
        <NosLab />
        <DosLab />
      </div>
    ),
  }
}

export default function Deck() {
  const [index, setIndex] = useState(0)
  const [notesOn, setNotesOn] = useState(false)
  const total = pieces.length
  const frame = frameFor(pieces[index])

  useEffect(() => {
    const fit = () => {
      document.documentElement.style.setProperty(
        '--s',
        String(Math.min(window.innerWidth / 1280, window.innerHeight / 720)),
      )
    }
    const onKey = (event) => {
      if (event.target.closest && event.target.closest('button')) return
      if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') {
        setIndex((n) => (n + 1) % total)
      }
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        setIndex((n) => (n - 1 + total) % total)
      }
      if (event.key === 'Home') setIndex(0)
      if (event.key === 'End') setIndex(total - 1)
      if (event.key === 'n' || event.key === 'N') setNotesOn((on) => !on)
    }
    fit()
    window.addEventListener('resize', fit)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('resize', fit)
      window.removeEventListener('keydown', onKey)
    }
  }, [total])

  return (
    <section className="slide">
      <div className="kicker"><i />{frame.section}</div>
      <h1>{frame.title}</h1>
      <div className="fit">{frame.body}</div>
      <div className="point">{frame.point}</div>
      <footer>
        <span>{frame.source}</span>
        <span>{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
      </footer>
      {notesOn ? (
        <aside className="notes">
          {frame.question ? <p><strong>Ask. </strong>{frame.question}</p> : null}
          {frame.answer ? <p><strong>Answer. </strong>{frame.answer}</p> : null}
          <p>{frame.notes}</p>
        </aside>
      ) : null}
      <p className="hint">← → move · N notes</p>
    </section>
  )
}
