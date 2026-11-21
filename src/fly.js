export function fly(root, fromEl, toEl, label) {
  return new Promise((resolve) => {
    if (!root || !fromEl || !toEl) {
      resolve()
      return
    }
    const a = fromEl.getBoundingClientRect()
    const b = toEl.getBoundingClientRect()
    const r = root.getBoundingClientRect()
    const chip = document.createElement('div')
    chip.className = 'packet'
    chip.textContent = label
    root.appendChild(chip)
    const x1 = a.left + a.width / 2 - r.left
    const y1 = a.top + a.height / 2 - r.top
    const x2 = b.left + b.width / 2 - r.left
    const y2 = b.top + b.height / 2 - r.top
    const anim = chip.animate(
      [
        { left: `${x1}px`, top: `${y1}px` },
        { left: `${x2}px`, top: `${y2}px` },
      ],
      { duration: 700, easing: 'ease-in-out', fill: 'forwards' },
    )
    anim.onfinish = () => {
      chip.remove()
      resolve()
    }
  })
}
