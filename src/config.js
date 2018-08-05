import { Toast } from 'antd-mobile-rn'
import queryString from 'query-string'

export const config = {
    header: {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      },
      api: {
        base: 'http://plt.live-ctrl.com/aijukex/', // http://47.100.123.83/aijukex http://www.live-ctrl.com/aijukex
        websocket: 'www.live-ctrl.com/aijukex',
        getHouseInfo: 'we/we_queryHouseInfoByPid',
        queryHostDeviceByType:"we/we_queryHostDeviceByType",//主机信息
        queryHostScenes:"we/we_queryHostScenes",
        queryLightsStatus: "we/we_queryLightsStatus",
        smartHostControl:"we/we_smartHostControl",//控制
        querySmartDeviceWays:"we/we_querySmartDeviceWays",//获取路数信息
        queryDeviceType:"we/we_queryDeviceType",//获取设备类型
        queryTvDevices:"we/we_queryTvDevices", //获取电视信息
        modifyWaysStatus:"we/we_modifyWaysStatus", //上传灯的状态
        queryCurtains: "we/we_queryCurtains", // 获取窗帘数据
        whetherCanOperate: 'we/we_whetherCanOperate',  // 验证房间是否可以入住
        queryElevatorHost: 'we/we_queryElevatorHost',
        queryEnvDatas: 'we/we_queryEnvDatas', // 获取房间环境
        powerControl: 'we/we_powerControl',
        checkout: 'we/we_customerLeave'
      }
}

export const request = {
    get(url,params) {
      console.log( queryString.stringify(params))
      if(params) {
        url += '?operate=V1ZNeGNVeFhjM1JqTWpGb1kyNVNSR1JJU25NPQ==&' + queryString.stringify(params)
        console.log(url)
      }
      return fetch(url)
      .then((res)=>res.json())
      .then(res => {
        if(!res.success) {
            Toast.info(res.msg)
          } 
          return res
      })
    },
    post(url,body){
      const options = _.extend(config.header,{
        body: JSON.stringify(body)
      })
      return fetch(url,options)
        .then(res=>res.json())
    }
  }