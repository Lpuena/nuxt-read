export function useSectionToJson() {
  const textToJson = (text: string) => {
    // 使用正则表达式分割文本，根据段落进行分割
    const paragraphs = text.split(/\s{2,}/).map(paragraph => paragraph.trim()).filter(paragraph => paragraph.length > 0)

    // 返回 JSON 格式的数组
    return JSON.stringify(paragraphs)
  }

  return {
    textToJson,
  }
}
