<template>
  <div class="pie-echart">
    <z-echarts :options="options"></z-echarts>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed, withDefaults } from 'vue'
import ZEcharts from '@/components/echarts'
import { IDataType } from '../types'
import { convertData } from '../utils/convertData-data'
const props = withDefaults(
  defineProps<{
    title?: string
    mapData: IDataType[]
  }>(),
  {
    title: ''
  }
)

const options = computed(() => {
  return {
    backgroundColor: '#ffffff',
    title: {
      text: '全国销量统计',
      left: 'center',
      textStyle: {
        color: '#fff'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: function (params: any) {
        return params.name + ' : ' + params.value[2]
      }
    },
    visualMap: {
      min: 0,
      max: 60000,
      left: 20,
      bottom: 20,
      calculable: true,
      text: ['高', '低'],
      inRange: {
        color: ['rgb(70, 240, 252)', 'rgb(250, 220, 46)', 'rgb(245, 38, 186)']
      },
      textStyle: {
        color: '#fff'
      }
    },
    geo: {
      map: 'china',
      roam: 'scale',
      itemStyle: {
        areaColor: '#eeeeee',
        borderColor: 'rgb(9, 54, 95)'
      },
      emphasis: {
        itemStyle: {
          areaColor: '#f4cccc'
        },
        label: {
          show: false
        }
      }
    },
    series: [
      {
        name: '销量',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: convertData(props.mapData),
        symbolSize: 12,
        emphasis: {
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1
          }
        }
      },
      {
        type: 'map',
        map: 'china',
        geoIndex: 0,
        aspectScale: 0.75,
        tooltip: {
          show: false
        }
      }
    ]
  }
})
</script>

<style scoped></style>
