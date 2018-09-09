import { request, config} from '../config'
import { encode64 } from '../utils'

export function app(state={},action) {
    switch (action.type) {
      case DATASUCCESS: {
        return {...state, ...action.payload}
      }
      default:
        return state
    }
  }

  const DATASUCCESS = '[APP] DATASUCCESS'

  export function dataSuccess(data) {
    return {
      type: DATASUCCESS,
      payload: data
    }
  }

  export function getHouseInfo(info, cb) {
    return dispatch => {
      request.get( config.api.base + config.api.getHouseInfo, info)
      .then(res => {
        console.log(res)
        if(res.success) {
          dispatch(dataSuccess({
            roomName: res.dataObject.name,
            hotelId: encode64(res.dataObject.hotelId),
            houseId: encode64(res.dataObject.id),
            serverId: res.dataObject.serverId
          }))
        } else {
          dispatch(dataSuccess({
            isBindDevice: false,
            UniqueId: info.pid
          }))
          if (cb) cb()
        }
      })
    }
  }

 