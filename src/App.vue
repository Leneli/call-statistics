<template lang="pug">
    #app(v-loading="!calls")
        el-container
            el-header
                h1 {{ title }}

            el-main
                el-row(:gutter="20" class="filters")
                    el-col(:span="16" )
                        FilterPeriods(
                            @current-period="currentPeriod = $event",
                            :list="allPeriods",
                            :current="currentPeriod")

                    el-col(:span="8")
                        FilterDates(@range-date="datesEvent")

                el-row(:gutter="20")
                    Graphs(
                        v-if="calls"
                        :sourceData="calls"
                        :fields="preset"
                        :dataKey="callKey")

            Footer
</template>

<script>
import getCallData from './assets/js/createTestCallData.js'

import FilterPeriods from './components/FilterPeriods.vue'
import FilterDates from './components/FilterDates.vue'
import Footer from './components/Footer.vue'
import Graphs from './components/Graphs.vue'

export default {
    name: 'app',

    components: {
        FilterPeriods,
        FilterDates,
        Footer,
        Graphs
    },

    data () {
        return {
            title: 'Статистика по входящим звонкам',

            allPeriods: null,
            currentPeriod: null,

            dateFrom: new Date(),
            dateTo: new Date(),

            calls: null,
            preset: null,
            callKey: null
        }
    },

    watch: {
        'currentPeriod': function () {
            this.setDates();
            this.getCalls();
        },

        'dateFrom': function (from) {
            if (this.moreOneDay(from, this.dateFrom)) {
                this.dateFrom = from;
                this.getCalls();
            }
        },

        'dateTo': function (to) {
            if (this.moreOneDay(to, this.dateTo)) {
                this.dateTo = to;
                this.getCalls();
            }
        }
    },

    mounted () {
        this.main();
    },

    methods: {
        main () {
            new Promise((resolve, reject) => {
                resolve();
            })
                .then(() => {
                    this.getData('./period.json')
                        .then(data => {
                            this.allPeriods = data;
                            this.currentPeriod = data[0].value;
                        })
                        .then(() => {
                            var filterFromdata;
                            var filterToData;

                            if (window.location.search) {
                                try {
                                    if (new Date(this.getQueryDates('filter.dateFrom'))) {
                                        filterFromdata = new Date(this.getQueryDates('filter.dateFrom'));
                                    }

                                    if (new Date(this.getQueryDates('filter.dateTo'))) {
                                        filterToData = new Date(this.getQueryDates('filter.dateTo'));
                                    }
                                } catch (error) {
                                    console.error(error);
                                }
                            }

                            this.setDates(filterFromdata, filterToData);
                        })
                        .then(() => this.getCalls())
                })
                .catch(error => console.error(error));
        },

        getData (url) {
            return fetch(url)
                .then(response => {
                    if (response.status !== 200) {
                        console.warn(`We have a problem! Fetch status: ${response.status}`)

                        return
                    }

                    return response.json()
                })
                .catch(error => console.error(error))
        },

        getCalls () {
            let callsResponseData = getCallData(this.dateFrom, this.dateTo);

            this.calls = callsResponseData.sourceData;
            this.preset = callsResponseData.fields;
            this.callKey = callsResponseData.dataKey;
        },

        datesEvent (arr) {
            this.dateFrom = new Date(arr[0]);
            this.dateTo = new Date(arr[1]);

            this.getCalls();
        },

        setDates (from, to = new Date()) {
            if (!from) {
                from = new Date(new Date().getTime() - (3600 * 1000 * 24 * (30 * this.currentPeriod || 1)));
            }

            if (this.moreOneDay(to, this.dateTo)) this.dateTo = to;
            if (this.moreOneDay(from, this.dateFrom)) this.dateFrom = from;

        },

        moreOneDay (newDate, oldDate) {
            var delta = Math.abs(newDate - oldDate);

            return Math.round(delta / (3600 * 1000 * 24)) > 1;
        },

        getQueryDates (variable = 'date') {
            var query = window.location.search.substring(1);
            var vars = query.split('&');

            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split('=');

                if (decodeURIComponent(pair[0]) == variable) {
                    return decodeURIComponent(pair[1]);
                }
            }
        }
    }
}
</script>

<style lang="scss">
html,
body {
    width: 100%;
    margin: 0;
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

.filters {
    margin-bottom: 30px;
}
</style>
