import { defineConfig, presetAttributify, presetIcons, presetUno, presetWind, transformerAttributifyJsx } from 'unocss'

export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-1 border-0 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600 !outline-none'],
    ['flex-center', 'flex items-center justify-center'],
    ['border-album', 'border-20 border-black border-dark shadow-current shadow-lg shadow-dark:black'],
    [
      'pre-next-link',
      'cursor-pointer block text-gray-400 text-hover:gray-5 text-hover:dark:gray-3 font-thin transition-all duration-300 opacity-0 mt-[-1.5rem] group-hover:opacity-100 group-hover:mt-0',
    ],

    ['custom-link-nav', 'fixed bottom-3 right-2 font-mono group text-right'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetWind(),
  ],
  transformers: [transformerAttributifyJsx()],
})
