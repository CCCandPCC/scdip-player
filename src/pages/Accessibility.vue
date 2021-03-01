<template>
    <v-container>
        <v-card>
            <div v-if="a11y" class='text-left'>
                <v-container>
                    <div role="heading" aria-level="3" class="text-h3 mb-2" v-text="a11y.title" tabindex="0"></div>
                </v-container>
                <v-divider/>
                <v-container id='a11y-content' class='content text-left' v-html="a11y.content">
                </v-container>
            </div>
            <div v-else>We're sorry, but we're unable to find this at the moment.</div>
        </v-card>
    </v-container>
</template>

<script>

export default {
    name: "a11y",
    computed: {
        a11y() {
            return this.$store.getters.staticContent("A11Y");
        }
    }
}
</script>

