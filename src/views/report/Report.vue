<template>
  <div class=''>
    <breadcrumb :menu="$store.state.menuList[4]" :item="0"></breadcrumb>
    <el-card>
      <div id="main" style="width: 600px;height:400px;"></div>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from '../../components/common/breadcrumb/Breadcrumb'
import echarts from 'echarts'
import { getReports } from '../../network/report.js'
export default {
  data () {
    return {
      options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
    }
  },
  components: {
    Breadcrumb
  },
  async mounted () {
    var myChart = echarts.init(document.getElementById('main'))
    const res = await getReports()
    if (res.meta.status !== 200) {
      return this.$message.error(res.meta.msg)
    }
    // 指定图表的配置项和数据
    // var option = {
    //   title: {
    //     text: 'ECharts 入门示例'
    //   },
    //   tooltip: {},
    //   legend: {
    //     data: ['销量']
    //   },
    //   xAxis: {
    //     data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    //   },
    //   yAxis: {},
    //   series: [{
    //     name: '销量',
    //     type: 'bar',
    //     data: [5, 20, 36, 10, 10, 20]
    //   }]
    // }

    // 使用刚指定的配置项和数据显示图表。
    const lll = Object.assign({}, this.options, res.data)
    myChart.setOption(lll)
  }

}
</script>
<style scoped>

</style>
