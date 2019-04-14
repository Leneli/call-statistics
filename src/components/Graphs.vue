<template>
    <div>
        <v-chart :force-fit="true" :height="height" :data="data" :scale="scale">
            <v-tooltip />
            <v-axis />
            <v-legend />
            <v-line position="date*counter" color="call" />
            <v-point position="date*counter" color="call" :size="4" :v-style="style" :shape="'circle'" />
        </v-chart>
    </div>
</template>

<script>
import DataSet from '@antv/data-set'

export default {
    props: {
        sourceData: Array,
        fields: Array,
        dataKey: String
    },

    data () {
        return {
            data: null,
            scale: null,
            height: 400,
            style: {
                stroke: '#fff',
                lineWidth: 1
            }
        }
    },

    mounted () {
        this.main();
    },

    watch: {
        'sourceData': function (newData) {
            if (Array.isArray(newData)) this.main();
        }
    },

    methods: {
        main () {
            const dv = new DataSet.View().source(this.sourceData);

            dv.transform({
                type: 'fold',
                fields: this.fields,
                key: 'call',
                value: 'counter'
            });

            this.data = dv.rows;

            this.scale = [
                {
                    dataKey: this.data,
                    min: 0,
                    max: 100
                }
            ];
        }
    }
}
</script>
