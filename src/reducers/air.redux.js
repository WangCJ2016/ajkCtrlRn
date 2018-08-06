import { request, config} from '../config'
import { encode64 } from '../utils'

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
    return dispatch => {
        request.get(config.api.base + config.api.queryDeviceType, info)
        .then(res => {
            console.log(res)
            if(res.success) {
               return {
                   houseId: info.houseId,
                   deviceType: res.dataObject
               }
            }
            throw new Error(res.msg)
        })
        .then(params => {
           return request.get(config.api.base + config.api.queryHostDeviceByType, params)
             .then(res=> {
                if(res.success) {
                    console.log(res)
                    const deviceType  = params.deviceType
                    let airs = []
                    if (res && res.success) {
                        if (deviceType === 'VIRTUAL_AIR_REMOTE') {
                            res.dataObject.devices.forEach((air) => {
                                let airInfo = {},
                                    coolWays, warmWays
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
                            })
                        } 
                        else {
                            res.dataObject.devices.forEach((air) => {
                                let airInfo = {},
                                    coolWays, warmWays
                                coolWays = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 28, 29, 30]
                                warmWays = [20, 21, 22, 23, 24, 25, 26, 28, 29, 30]
                                airInfo.deviceId = air.deviceId
                                airInfo.coolWays = coolWays
                                airInfo.warmWays = warmWays
                                airInfo.name = air.name
                                airs.push(airInfo)
                            })
                        }
                        const newArray = airs.map(air => ({...air, title: air.name}))
                        dispatch(dataSuccess({airs: newArray, deviceType: params.deviceType}))
                    }
                }
             })
        })
       
        .catch(res=> {
            alert(res)
        })
    }
  }

 
  export function smartHostControl(info) {
    return function(dispatch) {
      request.get(config.api.base + config.api.smartHostControl, info)
        .then((res) => {
            console.log(res)
          if (res && res.success) {
           // dispatch(changelightstatus(info.wayId))
          }
        })
    }
  }