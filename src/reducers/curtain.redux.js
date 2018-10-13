import { request, config} from '../config'

const initailState = {
    curtains: []
}
export function curtain(state=initailState,action) {
    switch (action.type) {
      case DATASUCCESS: {
          return {...state, ...action.payload}
      }
      case BTNSTATUS: {
          const curtains = curtainsHandle(state, action.payload)
          return {...state, curtains: curtains}
      }
      default:
        return state
    }
  }

  const DATASUCCESS = '[CURTAIN] DATASUCCESS'
  const BTNSTATUS = '[CURTAIN] BTNSTATUS'

  export function dataSuccess(data) {
    return {
      type: DATASUCCESS,
      payload: data
    }
  }

  export function getCurtainInfo(info) {
    return dispatch => {
      request.get( config.api.base + config.api.queryCurtains, info)
      .then(res => {
        if(res.success) {
            let curtainsArr = []
            for (const key in res.dataObject.curtains) {
                const _curtains = res.dataObject.curtains[key].map(curtain=> ({...curtain, btn: -1}))
                curtainsArr.push({ways: _curtains, title: key})
            }
            dispatch(dataSuccess({type: res.dataObject.type, curtains: curtainsArr}))
        }
      })
    }
  }


  export function smartHostControl(info) {
    return function(dispatch) {
      request.get(config.api.base + config.api.smartHostControl, info)
        .then((res) => {
          if (res && res.success) {
            dispatch(btnType({wayId: info.wayId, type: info.actionType}))
          }
        })
    }
  }
 
  function btnType(data) {
      return {
          type: BTNSTATUS,
          payload: data
      }
  } 




  // reducer handle

  function curtainsHandle(state, {wayId, type}) {
      const _curtains = state.curtains.map(curtain => {
         const _curtain = curtain.ways.map(way => {
              if(way.wayId === wayId) {
                  return {...way, btn: type}
              }
              return way
          })
          return {...curtain, ways: _curtain}
      })
      return _curtains
  }