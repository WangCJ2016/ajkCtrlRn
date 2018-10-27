import { request, config} from '../config'


const DATASUCCESS = '[TEMCTRL] DATASUCCESS'
const initalState = {
    devices: [],
    temCltrIf: false
}

export function temCtrl(state=initalState,action) {
    switch (action.type) {
      case DATASUCCESS: {
        return {...state, ...action.payload}
      }
      default:
        return state
    }
  }


export function dataSuccess(data) {
return {
    type: DATASUCCESS,
    payload: data
}
}

export function getDevices(info) {
return dispatch => {
    request.get(config.api.base + config.api.queryHeatings, info)
    .then(res => {
        console.log(res)
        if (res.success) {
            const arr = res.dataObject.map(item => ({
                ...item, ways: item.ways.filter(way => way.name.indexOf('地暖') > -1)
            }))
            let temCltrIf = false
            if(arr.length > 0) {
                temCltrIf = true
            }
            dispatch(dataSuccess({devices: arr, temCltrIf: temCltrIf}))
        }
    })
}
}

export function smartControl(info) {
    return function(dispatch,getState){
      request.get(config.api.base + config.api.smartHostControl, info)
              .then(res => {
                  console.log(res)
              })
    }
  }