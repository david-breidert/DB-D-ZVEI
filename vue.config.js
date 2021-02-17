module.exports = {
  pages: {
    index: {
      entry: 'src/main.ts'
    }
  },
  transpileDependencies: ['vuetify'],
  pluginOptions: {
    electronBuilder: {
      mainProcessFile: 'src/background.ts',
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
        additionalData: `@import "@/styles/_variables.scss";`
      }
    }
  }
};
