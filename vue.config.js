module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  pluginOptions: {
    s3Deploy: {
      overrideEndpoint: false,
      region: 'eu-west-2',
      bucket: process.env.VUE_APP_S3D_BUCKET,
      createBucket: true,
      staticHosting: true,
      staticIndexPage: 'index.html',
      staticErrorPage: 'index.html',
      assetPath: 'dist',
      assetMatch: '**',
      deployPath: '/' + process.env.VUE_APP_S3_DEPLOY_STAGE || '',
      acl: 'public-read',
      pwa: false,
      enableCloudfront: false,
      pluginVersion: '4.0.0-rc3'
    }
  }
}
