module.exports = {
<<<<<<< Updated upstream
  transpileDependencies: ["vuetify"]
};
=======
  transpileDependencies: ['vuetify'],
  pluginOptions: {
    electronBuilder: {
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
        prependData: `@import "@/styles/_variables.scss";`
      }
    }
  }
}
>>>>>>> Stashed changes
