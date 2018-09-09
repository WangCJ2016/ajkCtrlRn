import { request, config} from '../config'

const initailState = {
    airs: []
}

export function air(state=initailState,action) {
    switch (action.type) {
      case DATASUCCESS: {
        return {...state, ...action.payload}
      }
      default:
        return state
    }
  }

  const DATASUCCESS = '[AIR] DATASUCCESS'

  export function dataSuccess(data) {
    return {
      type: DATASUCCESS,
      payload: data
    }
  }

  export function getAirInfo(info) {
    return async (dispatch, getState) => {
        const serverId = getState().app.serverId
        const deviceTypeRes = await request.get(config.api.base + config.api.queryDeviceType, info)
        if(deviceTypeRes && deviceTypeRes.success) {
            const  houseId = info.houseId,
                   deviceType = deviceTypeRes.dataObject
            const airData = await request.get(config.api.base + config.api.queryHostDeviceByType, { houseId: houseId, deviceType: deviceType }) 
            console.log(airData)
            if (airData && airData.success) {
                let airs = []
                const data = airData.dataObject.devices
                if (deviceType === 'VIRTUAL_AIR_REMOTE') {
                    for(let i= 0; i<data.length; i++) {
                        let air = data[i]
                    
                        const switchStatus = await getTvAirStatus(serverId, air.deviceId)
                        
                        let airInfo = {},
                            coolWays, warmWays
                        
                        airInfo.switchStatus = switchStatus
                        if (air.ways) {
                            let coolName =  ''
                            let warmName = ''
                            coolWays = air.ways.filter(way => {
                                if (way.remoteKey.indexOf('COOL') > -1) {
                                    return way;
                                }else{
                                    return null
                                }
                            }).map(way => {
                                coolName = way.remoteKey.slice(0,-2)
                                return way.remoteKey.slice(-2);
                            }).sort((a,b)=>a-b).map(way => coolName + way)
                            warmWays = air.ways.filter(way => {
                                if (way.remoteKey.indexOf('WARM') > -1) {
                                    return way;
                                }else{
                                    return null
                                }
                            }).map(way => {
                                warmName = way.remoteKey.slice(0, -2)
                                return way.remoteKey.slice(-2);
                            }).sort((a,b)=>a-b).map(way => warmName + way);
                        }
                        airInfo.deviceId = air.deviceId
                        airInfo.coolWays = coolWays
                        airInfo.warmWays = warmWays
                        airInfo.name = air.name
                        
                        airs.push(airInfo)
                }   
                            
                } else {
                    for(let i=0;i<data.length;i++) {
                        let air = data[i] 
                        const switchStatus = await getTvAirStatus(serverId, air.deviceId)
                        let airInfo = {},
                        coolWays, warmWays
                        coolWays = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 28, 29, 30]
                        warmWays = [20, 21, 22, 23, 24, 25, 26, 28, 29, 30]
                        airInfo.switchStatus = switchStatus
                        airInfo.deviceId = air.deviceId
                        airInfo.coolWays = coolWays
                        airInfo.warmWays = warmWays
                        airInfo.name = air.name
                    
                        airs.push(airInfo)
                    }
             
                }
                const newArray = airs.map(air => ({...air, title: air.name}))
                dispatch(dataSuccess({airs: newArray, deviceType: deviceType}))
            }
        }
       
    }
  }
  

  // 获取 空调 状态
 function  getTvAirStatus(serverId, deviceId) {
     console.log(serverId, deviceId)
    return request.get(config.api.base + config.api.getTvAirStatus, {
             serverId: serverId,
             deviceId: deviceId,
         })
         .then(res => {
             console.log(res)
             return res.dataObject
         })
 
}
  export function smartHostControl(info) {
    return function(dispatch) {
      request.get(config.api.base + config.api.smartHostControl, info)
        .then((res) => {
            console.log(info,res)
          if (res && res.success) {
           // dispatch(changelightstatus(info.wayId))
          }
        })
    }
  }