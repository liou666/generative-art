export interface PageInfo {
  name: string
  no: string
}
export const info = [
  {
    name: 'TiledLine1',
  },
  {
    name: 'TiledLine2',
  },
  {
    name: 'TiledLine3',
  },
]

export default info.map((info, idx) => {
  return {
    ...info,
    no: `${idx + 1}`.padStart(3, '0'),
  }
})
