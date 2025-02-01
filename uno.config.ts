import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    presetWebFonts({
      fonts: {
        // ...
      },
    }),
  ],
  theme: {
    colors: {
      // ...
    },
  },
  shortcuts: [
    {
      titleColor: 'text-[#3c2f2f] dark:text-[#d4c29c]',
      textColor2: 'text-[#8a7a7a] dark:text-[#b3aea5]',
      textColor: 'text-[#5e4b4b] dark:text-[#e6e1d8]',
    },
    {
      // 背景颜色
      bgc: 'bg-[#f5f2e9] dark:bg-[#1a1814]',
    },
    {
      tgc: 'text-gray-600 dark:text-gray-500',
    },
    {
      // 卡片背景
      cardBg: 'bg-white dark:bg-[#2d2921]',
    },
    {
      // 边框
      brc: 'border border-[#e0d8c8]',
    },
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
