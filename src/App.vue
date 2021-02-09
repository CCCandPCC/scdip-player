<template>
  <div v-if="loading" id="loading">
    <v-progress-circular indeterminate size="100" width="10" color="#dddddd"/>
  </div>
  <v-app v-else-if="error">
    <h1 class="text-center mt-6">Something's gone wrong :(</h1>
    <br/>
    <p class="text-center">Try reloading the page and check your internet connection. 
      If the problem continues, there could be a problem with the site.</p>
  </v-app>
  <v-app v-else>
    <toolbar :title="title" :header="pageTitle" />
    <v-main>
      <v-container fluid>
        <router-view id="router-view"/>
      </v-container>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
import Toolbar from '@/components/Toolbar';
import Footer from '@/components/Footer';
import {mapGetters} from 'vuex'


export default {
  name: 'App',
  created() {
    Promise.all([
      fetch(this.apiEndpoint + '/theme')
      .then(x => x.json())
      .then( x => {
        document.title = x.title
        this.title = x.title
        this.$vuetify.theme.themes.light.primary = x.primary
        this.$vuetify.theme.themes.light.secondary = x.secondary
        this.$store.commit('setAccountId', x.accountId || '')
      }),
      fetch(this.apiEndpoint + '/content')
      .then(x => x.json())
      .then(x => {
        this.$store.commit('setPageContent', x)
      }),
      fetch(this.apiEndpoint + '/journey-parents')
      .then(x => x.json())
      .then(x => {
        this.$store.commit('setJourneyParents', x)
      })
    ])
    .catch((err) => {
      this.error = true
      throw err
    })
    .finally(()=> {
      this.loading = false
    })    
  },
  components: {
    Toolbar, 
    Footer
  },
  
  data: () => ({
    loading: true,
    error: false,
    title: "loading..."
  }),
  computed: {
    pageTitle() {return this.$route.meta ? this.$route.meta.title : ''},
    ...mapGetters(['apiEndpoint'])
  }
};
</script>

<style>
  main {
    background-color: #f7f7f7;
  }

  #router-view {
    margin-left: auto;
    margin-right: auto;
  }

  #loading {
    text-align: center;
    padding-top: 30vh;
  }
  
  .v-btn:focus{
      outline: -webkit-focus-ring-color auto 1px;
  }
  
  .v-card__title {
    word-break:normal !important;
  }

  .v-card__subtitle, .v-card__text {
    font-size: 1.2rem;
  }

  .caption-image {
    display: flex;
    justify-content: start;
    align-items: center;
    font-size: larger;
    margin: 20px 0;
  }

  .caption-image img {
    margin-right: 10px;
    max-height: 100px;
  }


  .content .video {
    width: 640px;
    height: 480px;
  }

  .resource .content .video {
    width: 320px;
    height: 240px;
  }
</style>