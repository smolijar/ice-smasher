export const COLORS = [
  '#1abc9c',
  '#f1c40f',
  '#2c3e50',
  '#95a5a6',
  '#e67e22',
  '#2980b9',
  '#2ecc71',
  '#9b59b6',
  '#d35400',
  '#3498db',
  '#f39c12',
  '#34495e',
  '#c0392b',
  '#16a085',
  '#7f8c8d',
  '#e74c3c',
  '#8e44ad',
  '#27ae60',
]

export const shuffleArray = <T>(array: T[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}
