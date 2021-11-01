// import {fetch} from 'react-native';
const post = async (url: string, params: {[key: string]: any}) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};

const get = async (url: string, params?: {[key: string]: any}) => {
  try {
    let _url = url;

    if (params) {
      let paramsArray: any[] = [];
      //拼接参数
      Object.keys(params).forEach((key: string) => {
        paramsArray.push(key + '=' + params[key]);
      });
      if (_url.search(/\?/) === -1) {
        _url += '?' + paramsArray.join('&');
      } else {
        _url += '&' + paramsArray.join('&');
      }
    }
    console.log(_url);
    const response = await fetch(_url);
    let responseJson = await response.json();
    console.log(responseJson);
    return response;
  } catch (e) {
    console.log(e);
  }
};

export {post, get};
