<template>
    <v-card height="100%" class="resource d-flex flex-column justify-space-between">
        <div class="d-flex flex-no-wrap align-center">
            <img v-if="img.src" class="ma-3 res-img" :src="display(img.src)" :alt="img.alt"/>
            <div class="text-left">
                <v-card-title class="headline" v-text="doc.name"/>
                <v-card-subtitle class="content"  v-html="doc.content"/>
            </div>
        </div>
        <v-card-actions>
            <v-btn
              role="button"
              class="success"
              :href="doc.moreInfoUrl"
              v-if="doc.moreInfoUrl"
              target="_blank">
                Continue to website<v-icon>mdi-open-in-new</v-icon>
            </v-btn>  
        </v-card-actions>
    </v-card>
</template>

<script>
import image from '@/js/image.js'
import {mapGetters} from 'vuex'

export default {
    name: "Resource",
    props: ['doc'],
    computed: {
      img() {
        if (this.doc.img)
          return this.doc.img
        return {
          src: null,
          alt: null
        }
      }
    },
    methods: {
      display(filename) {
        return image(this.apiEndpoint(),filename)
      },
      ...mapGetters(['apiEndpoint'])
    }
};
</script>

<style scoped>
  .res-img {
    max-width: 175px;
    max-height: 175px;
  }
</style>
