const isDev = process.env.NODE_ENV === 'development'

const localhost = 'http://localhost:13333'
const serverhost = 'http://textgames.cn'

export default defineNuxtConfig({
  srcDir: 'src/client',
  ssr: true,
  devtools: { enabled: true },

  router: {
    options: {
      strict: true,
    },
  },

  app: {
    pageTransition: { name: 'pages', mode: 'out-in' },
    layoutTransition: { name: 'layouts', mode: 'out-in' },
    head: {
      meta: [
        { hid: 'google-site-verification', name: "google-site-verification", content: "***" }
      ],
      title: `***`,
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  },

  css: ['@/assets/css/index.scss'],

  modules: [
    '@nuxtjs/color-mode',
    'nuxt-icon',
    '@unocss/nuxt',
    '@nuxt/ui',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',

    ['@nuxtjs/i18n', {
      vueI18n: './i18n.config.ts',
      // baseUrl:'',
      strategy: 'no_prefix',
      defaultLocale: 'en',

      // lazy: true,
      // langDir: 'assets/lang',
      locales: [
        {
          code: 'en',
          iso: 'en-US',
          name: 'English(US)',
          // file: 'en_us/lazy.ts'
        },
        {
          code: 'zh',
          iso: 'zh-Hans',
          name: '简体中文',
          // file: 'zh_cn/lazy.ts'
        }
      ],
      detectBrowserLanguage: {
        useCookie: true,
        cookieKey: 'lang'
      }
    }],
  ],

  build: {
    transpile: ['pinia-plugin-persistedstate'],
  },

  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '-mode',
    storageKey: 'nuxt-color-mode'
  },

  unocss: {
    uno: false,
    preflight: false,
    icons: true
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        strict: true,
        types: ['@pinia/nuxt', './src/client/types/type.d.ts'],
      },
    },
  },

  postcss: {
    plugins: {
      // tailwindcss: {},
    },
  },

  pinia: {
    disableVuex: true,
  },

  piniaPersistedstate: {
    storage: 'sessionStorage',
  },

  nitro: {
    esbuild: {
      options: {
        target: 'esnext'
      }
    },
    
    prerender: {
      routes: []
    }
  },

  components: true,
  compatibilityDate: '2024-07-13',
})