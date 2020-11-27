const httpCall = (
  method: string,
  url: string,
  data: any,
  token: any,
  callback: (result: any) => any
) => {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  if (callback)
    xhr.onload = function () {
      callback(JSON.parse(this["responseText"]));
    };
  if (data != null) {
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer " + token);
    console.log(data);
    console.log(JSON.stringify(data))
    xhr.send(JSON.stringify(data));
  } else xhr.send();
};
export default httpCall;

export const httpCallWithoutStringify = (
  method: string,
  url: string,
  data: any,
  token: any,
  callback: (result: any) => any
) => {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  if (callback)
    xhr.onload = function () {
      callback(JSON.parse(this["responseText"]));
    };
  if (data != null) {
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer " + token);
    xhr.send(data);
    
  } else xhr.send();
};
