<template lang="pug">
    div.dates
        el-date-picker(
            v-model="date"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="по"
            start-placeholder="Дата начала"
            end-placeholder="Дата окончания"
            :picker-options="options"
            @change="$emit('range-date', date)"
        )
</template>

<script>
export default {
    data () {
        return {
            options: {
                shortcuts: [
                    {
                        text: 'Последняя неделя',
                        onClick (picker) {
                            const end = new Date();
                            const start = new Date();

                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: 'Последний месяц',
                        onClick (picker) {
                            const end = new Date();
                            const start = new Date();

                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: 'Последние 3 месяца',
                        onClick (picker) {
                            const end = new Date();
                            const start = new Date();

                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }
                ]
            },

            date: ''
        }
    }
}
</script>
