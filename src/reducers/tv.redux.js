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
    return dispatch => {
      request.get( config.api.base + config.api.queryTvDevices, info)
      .then(res => {
        console.log(res)
        if(res.success) {
            let arry = []
            for(let i in res.dataObject){
              arry.push({...res.dataObject[i], title: Object.keys(res.dataObject[i])[0]})
            }
            dispatch(dataSuccess({tvs: arry}))
        }
      })
    }
  }

  export function smartHostControl(info) {
    return function(dispatch) {
      request.get(config.api.base + config.api.smartHostControl, info)
        .then((res) => {
            console.log(res)
          
        })
    }
  }