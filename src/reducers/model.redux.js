import { request, config} from '../config'

export function model(state={},action) {
    switch (action.type) {
      case DATASUCCESS: {
        return {...state, ...action.payload}
      }
      default:
        return state
    }
  }

  const DATASUCCESS = '[MODEL] DATASUCCESS'

  export function dataSuccess(data) {
    return {
      type: DATASUCCESS,
      payload: data
    }
  }

  export function getHostScenes(info) {
    return dispatch => {
      request.get( config.api.base + config.api.queryHostScenes, info)
      .then(res => {
        console.log(res)
        if(res.success) {
            if(res.dataObject.type===0) {
                dispatch(dataSuccess({
                    models: res.dataObject.scenes.filter(model=>model.name.indexOf('情景') > -1),
                    type: res.dataObject.type
                })) 
            }else {
                dispatch(dataSuccess({
                    models: res.dataObject.models,
                    type: 1
                }))
            }
          
        }
      })
    }
  }


 export function actionCtrl(info) {
    return (dispatch) => {
        request.get(config.api.base + config.api.smartHostControl, info)
        .then(res => {
          if(res.success) {
            console.log(res)
          }
        })
      }
 }