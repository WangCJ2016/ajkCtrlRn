export function encode64(input) {
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/=";
    var output = "";
    var chr1, chr2, chr3 = "";
    var enc1, enc2, enc3, enc4 = "";
    var i = 0;
    do {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
      chr1 = chr2 = chr3 = "";
      enc1 = enc2 = enc3 = enc4 = "";
    } while (i < input.length);
    return output;
  }


export function modelArr(name) {
  switch (name) {
    case '影视':
      return {
        bg: require('./pages/ModelPage/assets/movie.png'),
        icon: require('./pages/ModelPage/assets/movie_icon.png')
      }
      break;
    case '起床':
    return {
      bg: require('./pages/ModelPage/assets/mor.png'),
      icon: require('./pages/ModelPage/assets/mor_icon.png')
    }
      break;
    case '迎宾':
    return {
      bg: require('./pages/ModelPage/assets/customer.png'),
      icon: require('./pages/ModelPage/assets/customer_icon.png')
    }
      break;
    case '外出':
    return {
      bg: require('./pages/ModelPage/assets/checkout.png'),
      icon: require('./pages/ModelPage/assets/checkout_icon.png')
    }
      break;
    case '睡眠':
    return {
      bg: require('./pages/ModelPage/assets/sleep.png'),
      icon: require('./pages/ModelPage/assets/sleep_icon.png')
    }
      break;
    case '阅读':
    return {
      bg: require('./pages/ModelPage/assets/read.png'),
      icon: require('./pages/ModelPage/assets/read_icon.png')
    }
      break;
  
    default:
    return {
      bg: require('./pages/ModelPage/assets/normal.png'),
      icon: require('./pages/ModelPage/assets/normal_icon.png')
    }
  }
}

export function lightsUrl(name, status) {
  if(status === 'ON') {
    switch (name) {
      case '床头灯':
        return require('./pages/LightPage/assets/chuangtou_on.png')
        break;
      case '灯带':
        return require('./pages/LightPage/assets/dengdai_on.png')
        break;
      case '镜前灯':
        return require('./pages/LightPage/assets/jq_on.png')
        break;  
      case '廊灯':
        return require('./pages/LightPage/assets/langdeng_on.png')
        break;
      case '淋浴灯':
        return require('./pages/LightPage/assets/linyudeng_on.png')
        break; 
      case '射灯':
      return require('./pages/LightPage/assets/shedeng_on.png')
      break;
      case '夜灯':
        return require('./pages/LightPage/assets/yed_on.png')
        break;
      case '主灯':
        return require('./pages/LightPage/assets/zhud_on.png')
        break;
      default:
        return require('./pages/LightPage/assets/tonyon_on.png')
        break;
    }
  } else {
    switch (name) {
      case '床头灯':
        return require('./pages/LightPage/assets/chuangtou_off.png') 
        break;
      case '灯带':
      return require('./pages/LightPage/assets/dengdai_off.png')
        break;
      case '镜前灯':
        return require('./pages/LightPage/assets/jq_off.png')
        break;
      case '廊灯':
        return require('./pages/LightPage/assets/langdeng_off.png')
        break;
      case '淋浴灯':
        return require('./pages/LightPage/assets/linyudeng_off.png')
        break;
      case '射灯':
        return require('./pages/LightPage/assets/shedeng_off.png')
        break;
      case '夜灯':
        return require('./pages/LightPage/assets/yed_off.png')
        break;
      case '主灯':
        return require('./pages/LightPage/assets/zhud_off.png')
        break;
      default:
        return require('./pages/LightPage/assets/tonyon_off.png')
        break;
    }
  }
}