import { request, config} from '../config'
import { encode64 } from '../utils'

const initailState = {}
export function service(state=initailState,action) {
    switch (action.type) {
      case DATASUCCESS: {
        return {...state, ...action.payload}
      }
      default:
        return state
    }
  }

  const DATASUCCESS = '[SERVICE] DATASUCCESS'

  export function dataSuccess(data) {
    return {
      type: DATASUCCESS,
      payload: data
    }
  }

  export function getServiceInfo(info) {
    return dispatch => {
        request.get(config.api.base + config.api.querySmartDeviceWays, info)
        .then(res => {
            if(res.success) {
                const lights = res.dataObject.ways.filter(function(light) {
                  return light.name.indexOf('请勿打扰') > -1 ||light.name.indexOf("请即清理") > -1
                })
                dispatch(dataSuccess({lights: lights}))
            }
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
