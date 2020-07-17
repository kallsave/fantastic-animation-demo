const { src, series, parallel, watch } = require('gulp')
const nodemon = require('nodemon')
const browserSync = require('browser-sync').create()
const { HOST, PORT } = require('../config/index')

function debounce(time = 400, immediate = false) {
  let timer
  return function (fn) {
    if (immediate) {
      fn && fn()
      immediate = false
    }
    window.clearTimeout(timer)
    timer = window.setTimeout(() => {
      fn && fn()
    }, time)
  }
}

const delay = 1000
let delayTimer

const reload = () => {
  browserSync.reload()
}

function nodemonTask(next) {
  let isStart = false
  nodemon({
    script: 'bin/www.js',
  }).on('start', () => {
    if (!isStart) {
      isStart = true
      delayTimer = setTimeout(() => {
        next()
      }, delay)
    }
  }).on('restart', () => {
    clearTimeout(delayTimer)
    delayTimer = setTimeout(reload, delay)
  })
}

function serveTask(next) {
  browserSync.init({
    open: 'external',
    port: Number(PORT) + 1,
    proxy: `${HOST}${PORT}`,
    notify: false,
  })
  next()
}

const dev = series(
  parallel(nodemonTask),
  parallel(serveTask),
)

dev()
