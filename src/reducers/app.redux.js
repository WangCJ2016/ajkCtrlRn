import { request, config} from '../config'
import { encode64 } from '../utils'
import { Toast } from 'antd-mobile-rn'

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
      Toast.loading('')
      request.get( config.api.base + config.api.getHouseInfo, info)
      .then(res => {
        Toast.hide()
        console.log(res)
        if(res.success) {
          dispatch(dataSuccess({
            roomName: res.dataObject.name,
            hotelId: encode64(res.dataObject.hotelId),
            houseId: encode64(res.dataObject.id),
            serverId: res.dataObject.serverId,
            lock: res.dataObject.lock === 0 ? true : false
          }))
        } else {
          if (cb) cb()
          dispatch(dataSuccess({
            isBindDevice: false,
            UniqueId: info.pid,
            houseId: ''
          }))
        }
      })
    }
  }

 