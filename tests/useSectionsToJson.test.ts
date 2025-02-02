import { describe, expect, it } from 'vitest'
import { useSectionToJson } from '../composables/useSectionToJson'

describe('useSectionToJson', () => {
  const { textToJson } = useSectionToJson()

  it('should convert a single paragraph text to JSON', () => {
    const result = textToJson('This is a single paragraph.')

    expect(result).toBe('["This is a single paragraph."]')
  })

  it('should convert multiple paragraphs text to JSON', () => {
    const result = textToJson('First paragraph.\n\nSecond paragraph.\n\nThird paragraph.')
    console.log(result)
    expect(result).toBe('["First paragraph.","Second paragraph.","Third paragraph."]')
  })

  it('全文转JSON', () => {
    const result = textToJson(``)
    console.log(result)
    expect(result).toBe('["全文转JSON"]')
  })

  it('should handle empty string input', () => {
    const result = textToJson('')
    expect(result).toBe('[]')
  })
})
