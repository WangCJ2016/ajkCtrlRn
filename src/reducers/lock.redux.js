import { request, config} from '../config'

export function lock(state={},action) {
    switch (action.type) {
      case DATASUCCESS: {
        return {...state, ...action.payload}
      }
      default:
        return state
    }
  }

  const DATASUCCESS = '[LOCK] DATASUCCESS'

  export function dataSuccess(data) {
    return {
      type: DATASUCCESS,
      payload: data
    }
  }

  export function getLockInfo(info) {
    return dispatch => {
        request.get(config.api.base + config.api.queryHostDeviceByType, info)
        .then(res => {
           
          if (res.success) {
              dispatch(dataSuccess({deviceId: res.dataObject.devices[0].deviceId}))
          }
        })
    }
  }

  export function smartHostControl(info, cb) {
    return function(dispatch) {
      request.get(config.api.base + config.api.smartHostControl, info)
        .then((res) => {
           
            if(res.success) {
              cb()
            } 
        })
    }
  }
 