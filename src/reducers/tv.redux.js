import { request, config} from '../config'

const initialState = {
    tvs: []
}
export function tv(state=initialState,action) {
    switch (action.type) {
      case DATASUCCESS: {
        return {...state, ...action.payload}
      }
      default:
        return state
    }
  }

  const DATASUCCESS = '[TV] DATASUCCESS'

  export function dataSuccess(data) {
    return {
      type: DATASUCCESS,
      payload: data
    }
  }

  export function getTvInfo(info) {
    return  (dispatch, getState) => {
      const serverId = getState().app.serverId
      request.get( config.api.base + config.api.queryTvDevices, info)
      .then(async res => {
       
        if(res.success) {
            let arry = []
            for(let i in res.dataObject){
              arry.push({...res.dataObject[i], title: '电视机' + i})
            }
            
            for(let i in arry){
              const tvStatus = await getTvAirStatus(serverId, getTvId(arry[i]))||'OFF'
              const tvBoxStatus = await getTvAirStatus(serverId, getTvBoxId(arry[i])) || 'OFF'
              arry[i].tvStatus = tvStatus
              arry[i].tvBoxStatus = tvBoxStatus
            }
            
            dispatch(dataSuccess({tvs: arry}))
        }
      })
    }
  }

  function getTvId (obj) {
    for(let i in obj) {
      if(i.indexOf('电视机') > -1) {
        return obj[i]
      }
    }
  }
  function getTvBoxId (obj) {
    for(let i in obj) {
      if(i.indexOf('机顶盒') > -1) {
        return obj[i]
      }
    }
  } 
  // 获取 空调 状态
 function  getTvAirStatus(serverId, deviceId) {
  return request.get(config.api.base + config.api.getTvAirStatus, {
           serverId: serverId,
           deviceId: deviceId,
       })
       .then(res => {
          
           return res.dataObject
       })

}

  export function smartHostControl(info) {
    return function(dispatch) {
      request.get(config.api.base + config.api.smartHostControl, info)
        .then((res) => {
           
          
        })
    }
  }