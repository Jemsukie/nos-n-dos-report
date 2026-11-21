import DosLab from './components/DosLab.jsx'
import NosLab from './components/NosLab.jsx'
import './App.css'

export default function App() {
  return (
    <main className="deck">
      <p className="kicker">MIT102 · Module 11</p>
      <h1>Who sees the file?</h1>
      <div className="labs">
        <NosLab />
        <DosLab />
      </div>
      <p className="point">Left: only the computers you chose change. Right: one action changes every screen.</p>
    </main>
  )
}
