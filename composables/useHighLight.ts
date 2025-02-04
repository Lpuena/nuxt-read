/** 高亮函数 */
export function useHighLight(text: string, indices?: [number, number]) {
  if (!indices)
    return text
  const [start, end] = indices
  return `${text.slice(0, start)}<mark class="bg-yellow-200 dark:bg-yellow-600">${
    text.slice(start, end + 1)}</mark>${text.slice(end + 1)}`
}
