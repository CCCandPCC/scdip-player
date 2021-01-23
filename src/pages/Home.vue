<template>
  <v-container>
    <v-row>
      <v-col>
        <v-banner two-line v-model="showConsent">
          <v-avatar slot="icon" color="primary">
            <v-icon color="white">
              mdi-lock
            </v-icon>
          </v-avatar>
          <span>
            This website uses cookies, is this ok?
          </span>
          <template v-slot:actions>
            <v-btn text @click="setConsent(false)">
              Decline
            </v-btn>
            <v-btn @click="setConsent(true)" color="primary">
              Accept
            </v-btn>
          </template>
        </v-banner>
      </v-col>
    </v-row> 
    <v-row style="max-width:1100px; margin:auto">
      <v-col class="content" v-html="content">
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-xl-center">
        <v-btn role="button" x-large color="success" id="btn-home-start-assessment" to="/select">Start</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'home',
    data () {
      return {
        showConsent: !localStorage.ga_consent
      }
    },
    computed: {
        content() {
          return this.$store.getters.staticContent("LANDING").content
        }
    },
    methods: {
      setConsent(enableConsent) {
        this.showConsent = false
        localStorage.ga_consent = enableConsent
        if (enableConsent)
          this.$gtag.optIn()
        else
          this.$gtag.optOut()

        this.$gtag.set('allowAdFeatures', enableConsent)
        this.$gtag.set('anonymizeIp', !enableConsent)
      }
    }
  }
</script>