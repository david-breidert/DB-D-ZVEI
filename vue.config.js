module.exports = {
  pages: {
    index: {
      entry: 'src/renderer/main.js'
    }
  },
  transpileDependencies: ['vuetify'],
  pluginOptions: {
    electronBuilder: {
      mainProcessFile: 'src/main/background.js',
      productName: 'ZVEI-Decoder',
      builderOptions: {
        publish: ['github'],
        generateUpdatesFilesForAllChannels: true
      },
      nodeIntegration: true
    }
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/renderer/styles/_variables.scss";`
      }
    }
  }
}
