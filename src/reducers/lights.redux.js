import { request, config} from '../config'

const initialState = {
    lightType: '卧室',
    lights: []
}

export function lights(state=initialState, action) {
    switch (action.type) {
      case DATASUCCESS: {
        return {...state, ...action.payload}
      }
      case CAHNGELIGHTSTATUS: {
        const lights = lightStatusHandle(state.lights, action.payload)
        return {...state, lights: lights}
      }
      default:
        return state
    }
  }

  const DATASUCCESS = '[LIGHT] DATASUCCESS'
  const CAHNGELIGHTSTATUS = '[LIGHT] CAHNGELIGHTSTATUS'

  export function dataSuccess(data) {
    return {
      type: DATASUCCESS,
      payload: data
    }
  }



  export function getSwitchServerId(info) {
    return dispatch => {
      request.get( config.api.base + config.api.querySmartDeviceWays, info)
      .then(res => {
        console.log(res)
        if(res.success) {
          dispatch(dataSuccess({
            lights: res.dataObject.ways.filter(way => way.name.includes('灯')),
            serverId: res.dataObject.serverId
          }))
        }
      })
    } 
  }

  export function lightClick(info) {
    return function(dispatch) {
        dispatch(changelightstatus(info.wayId))
      request.get(config.api.base + config.api.smartHostControl, info)
        .then((res) => {
            console.log(res)
          if (res && res.success) {
           // dispatch(changelightstatus(info.wayId))
          }
        })
    }
  }

  function changelightstatus(wayId) {
      return {
          type: CAHNGELIGHTSTATUS,
          payload: wayId
      }
  }






  // reducer handle
  function lightStatusHandle(lights, wayId) {
     return lights.map(light => {
          if(light.wayId === wayId) {
              return {...light, status: light.status === 'ON' ? 'OFF' : "ON"}
          }
          return light
      })
  }