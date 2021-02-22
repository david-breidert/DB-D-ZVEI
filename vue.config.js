const fixNedbForElectronRenderer = {
  apply(resolver) {
    resolver.getHook('beforeDescribed-relative').tapAsync('FixNedbForElectronRenderer', (request, resolveContext, callback) => {
      if (!request.descriptionFileData.name === 'nedb') {
        return callback();
      }

      let relativePath;
      if (request.path.startsWith(resolver.join(request.descriptionFileRoot, 'lib/storage'))) {
        relativePath = 'lib/storage.js';
      } else if (request.path.startsWith(resolver.join(request.descriptionFileRoot, 'lib/customUtils'))) {
        relativePath = 'lib/customUtils.js';
      } else {
        return callback();
      }

      const path = resolver.join(request.descriptionFileRoot, relativePath);
      const newRequest = Object.assign({}, request, { path });
      callback(null, newRequest);
    });
  }
};

module.exports = {
  chainWebpack: config => {
    config.resolve.plugin('fixNedbForElectronRenderer').use(fixNedbForElectronRenderer);
  },
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
