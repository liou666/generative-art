export function suffix<T>(arr: T[]): T[] {
  for (let i = 0; i < arr.length; i++) {
    const j = Math.floor(arr.length * Math.random());
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export function random(max = 1, min = 0) {
  return Math.random() * (max - min) + min
}
