<template lang="pug">
    .periods
        span.periods__title {{title }}

        el-tag(
            v-for="(period, index) in list"
            :key="index"
            :type="setType(period.value)"
            class="periods__tag"
            @click="$emit('current-period', period.value)"
        ) {{ period.label }}

</template>

<script>
export default {
    props: ['list', 'current'],

    data () {
        return {
            title: 'Период'
        }
    },

    methods: {
        setType (val) {
            if (val === this.current) return 'success'
            else return 'info'
        }
    }
}
</script>

<style lang="scss">
.periods {
    text-align: left;
}

.periods__title {
    margin-right: 10px;
}

.periods__tag.el-tag {
    border-radius: 0;
    cursor: pointer;
}
</style>
