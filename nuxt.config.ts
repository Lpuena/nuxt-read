// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/content',
    '@vueuse/nuxt',
  ],
  css: [
    '@unocss/reset/tailwind.css',
    'heti/umd/heti.min.css',
  ],
  nitro: {
    preset: 'static',
  },
  eslint: {
    config: {
      standalone: false,
    },
  },
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
  },
  app: {
    baseURL: '/nuxt-read/',
    head: {
      viewport: 'width=device-width,initial-scale=1',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/apple-touch-icon.png' },
      ],
    },
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
})
