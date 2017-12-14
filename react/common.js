function addURLParam(url, name, value) {
  url += (url.indexOf("?") == -1 ? "?" : "&");
  url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
  return url;
}
/**
 * 
 * @param {post, get} type 
 * @param {url} api 
 * @param {object} data 
 */
function ajax (type, api, data) {
  return new Promise (function (resolve, reject) {
    const xhr = new XMLHttpRequest() || new ActiveXObject();
    xhr.onreadystatechange = function () {
      if (4 === xhr.readyState) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
          console.log(xhr);
          resolve(JSON.parse(xhr.responseText));
        } else {
          // error
          reject(xhr.status);
        }
      }
    }
    if ("POST" === type.toUpperCase()) {
      xhr.open(type, api);
      xhr.send(data);
    } else if ("GET" === type.toUpperCase()) {
      let url = api;
      for (let key in data) {
        url = addURLParam(url, key, data[key]);
      }
      xhr.open(type, api);
      xhr.send(null);
    }
  })
}

export default ajax;