import slides from './data/slides.json'

const FIGURES = {
  'Windows Server': 'windows',
  'A distributed operating system': 'ssi',
  'HDFS: one name, many disks': 'hdfs',
}

export function buildDeck() {
  const pieces = []
  for (const slide of slides) {
    if (slide.title === 'Client–server and peer-to-peer') {
      pieces.push({
        type: 'figure',
        id: 'roles',
        section: slide.section,
        title: slide.title,
        point: slide.point,
        source: slide.source,
        notes: slide.notes,
        question: slide.question,
        answer: slide.answer,
      })
      continue
    }
    pieces.push({ type: 'slide', slide })
    const figure = FIGURES[slide.title]
    if (figure) pieces.push({ type: 'figure', id: figure })
    if (slide.title === 'A distributed operating system') pieces.push({ type: 'sim' })
  }
  return pieces
}

export const FIGURE_META = {
  windows: {
    section: 'FIGURE 2 · A NOS ENVIRONMENT',
    title: 'Windows Server domain',
    point: 'Each client keeps its own operating system. The servers supply shared accounts and services.',
    source: 'Module 11 · Figure 2',
  },
  ssi: {
    section: 'FIGURE 3 · NOS BESIDE DOS',
    title: 'Separate machines, or one system image',
    point: 'A NOS keeps an operating system on every machine. A DOS lays one system image over all of them.',
    source: 'Module 11 · Figure 3',
  },
  hdfs: {
    section: 'FIGURE 4 · HDFS',
    title: 'One file name, blocks on many machines',
    point: 'Three copies: the writer’s node, one node in a remote rack, and a second node in that same rack.',
    source: 'Module 11 · Figure 4',
  },
}
