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
  
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Authorization", "Bearer " + token);
  console.log(" ICI " + token)
  console.log(xhr)
  console.log(JSON.stringify(data))
  if(data === null){
    xhr.send()
  }
  else{
    xhr.send(JSON.stringify(data));
  }
  
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
