export function windowMixin() {
  const width = window.innerWidth
  const height = window.innerHeight
  return width
}

window.addEventListener('resize', windowMixin)
