import { request, config} from '../config'

const initalState = {
    hotelList: []
}
export function hotelList(state=initalState,action) {
    switch (action.type) {
      case DATASUCCESS: {
        return {...state, ...action.payload}
      }
      default:
        return state
    }
  }

  const DATASUCCESS = '[HOTELLIST] DATASUCCESS'

  export function dataSuccess(data) {
    return {
      type: DATASUCCESS,
      payload: data
    }
  }

  export function getHotelList(info) {
    return dispatch => {
      request.get( config.api.base + config.api.getHotelList, info)
      .then(res => {
        console.log(res)
        if(res.success) {
            dispatch(dataSuccess({
                hotelList: res.dataObject || []
            }))
        }
      })
    }
  }

  export function getHotelRoomsList(info) {
    return dispatch => {
        request.get( config.api.base + config.api.getHotelRoomsList, info)
        .then(res => {
          console.log(res)
          if(res.success) {
              dispatch(dataSuccess({
                  hotelRoomList: res.dataObject || []
              }))
          }
        })
      } 
  }

  // 绑定设备
  export function bindHouseToPad(info, cb) {
    return dispatch => {
        request.get( config.api.base + config.api.bindHouseToPad, info)
        .then(res => {
          console.log(res)
          if(res.success) {
             cb()
          }
        })
      } 
  }

 