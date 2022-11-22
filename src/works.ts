export interface PageInfo {
  name: string
  no: string
}
export const info = [
  {
    name: 'TiledLine',
  },
  {
    name: 'Wave',
  },
  {
    name: 'TriangularMesh',
  },
  {
    name: 'CubicDisarray',
  },
]

export default info.map((info, idx) => {
  return {
    ...info,
    no: `${idx + 1}`.padStart(3, '0'),
  }
})
