export default defineNuxtConfig({
  extends: 'docus',
  css: ['~/assets/css/theme.css'],
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      ],
      script: [
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=G-6NMJBP6SS8',
          async: true,
        },
        {
          children:
            "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-6NMJBP6SS8');",
        },
      ],
    },
  },
})
