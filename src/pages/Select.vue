<template>
    <div>
        <v-sheet max-width="1200" class="mx-auto" elevation=4>
            <v-progress-linear value="0" height=8></v-progress-linear>
            <v-container class="v-stepper__items">
                <v-container class="v-stepper__content">
                    <v-skeleton-loader v-if="loading && showJourneys" type="card" />

                    <v-form 
                        role="form" 
                        aria-label="Your journey" 
                        ref="categories"
                        v-else-if="!showJourneys"
                        id="parent-selection"
                    >
                        <v-row>
                            <v-col class="pt-0">
                                <item
                                    key="categories_item0"
                                    ref="categories_item0"
                                    title="Where do you need support?"
                                    subtitle="Please select one or more"
                                    :items="categories"
                                    itemLabelKey="label"
                                    type="category"
                                />
                            </v-col>
                        </v-row>
                        <v-row class="text-center">
                            <v-col>
                                <v-btn large
                                    role="button" 
                                    aria-label="next" 
                                    color="success" 
                                    @click="selectCategories"
                                    name="btn-continue"
                                >
                                    Next
                                    <v-icon>mdi-arrow-right-bold-circle</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-form>

                    <v-form 
                        role="form" 
                        aria-label="Your journey" 
                        ref="journeys"
                        v-else-if="!loading && showJourneys"
                        id="journey-selection"
                    >
                        <v-row>
                            <v-col class="pt-0">
                                <item
                                    key="journeys_item0"
                                    ref="journeys_item0"
                                    title="Where do you need support?"
                                    subtitle="Please select one or more"
                                    :items="possibleJourneys"
                                    itemLabelKey="label"
                                    type="journey"
                                />
                            </v-col>
                        </v-row>
                        <v-row class="text-center">
                            <v-col>
                                <v-btn large class="mr-5"
                                    role="button" 
                                    aria-label="back"
                                    name="btn-back"
                                    @click="selectCategories(false)"
                                >
                                    <v-icon left>mdi-arrow-left-bold-circle</v-icon>
                                    Back
                                </v-btn>
                                <v-btn large
                                    name="btn-begin"
                                    role="button" 
                                    aria-label="next" 
                                    color="success" 
                                    @click="beginAssessment"
                                >
                                    Next
                                    <v-icon right>mdi-arrow-right-bold-circle</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-container>
            </v-container>
        </v-sheet>
    </div>
</template>

<script>
import Item from "@/components/Item.vue";
import {mapGetters} from 'vuex'

export default {
    components: {
        Item,
    },
    name: "Selection",
    data() {
        return {
            loading: true,
            categoriesSelected: false,
            categories: [],
            journeys: [],
        };
    },
    created() {
        this.categories = this.$store.state.journeyParents.map((c) => ({ ...c, selected: false }));

        fetch(this.apiEndpoint + "/journeys")
            .then(res => res.json())
            .then(x => { 
                this.journeys = x.map((j) => ({ ...j, selected: false }));
                this.loading = false;
                this.doFocus();
            })
    },
    computed: {
        showJourneys() {
            return this.categoriesSelected || this.categories.length <= 0;
        },
        ...mapGetters(['apiEndpoint']),
        selectedCats() {
            return this.categories.filter((x) => x.selected).map((x) => x.journeys);
        },
        possibleJourneys() {
            if (this.categories.length <= 1 || this.selectedCats.length === 0)
                return this.journeys;
            return this.journeys.filter((x) =>
                this.selectedCats.flat().includes(x.id)
            );
        },
        selectedJourneys() {
            //   if (this.possibleJourneys.length <= 1)
            //     return this.possibleJourneys
            return this.possibleJourneys
                .filter((x) => x.selected)
                .map((x) => x.id);
        },
    },
    methods: {
        beginAssessment() {
            if (!this.$refs.journeys.validate()) {
                return false;
            }
            this.$router.push({
                name: "Assessment",
                query: { journeys: this.selectedJourneys },
            });
        },
        selectCategories(selected = true) {
            if (selected && !this.$refs.categories.validate()) {
                return false;
            }
            this.categoriesSelected = !!selected;
        },
        doFocus(){
            window.scrollTo(0,0);
            this.$nextTick(()=> {
                let f = this.showJourneys ? this.$refs[`journeys_item0`] : this.$refs[`categories_item0`]
                if (f)
                    f.focus()
            })
        }
    }
};
</script>
