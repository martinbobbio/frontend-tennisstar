window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "UA-121423657-1");

if(navigator.serviceWorker){
    navigator.serviceWorker.register('/sw.js');
}
function notificationAPP(){
  if(!window.Notification) return;
  if(Notification.permission === "granted"){
    const notification = new Notification("Tennis-Star APP",{body:"Descargar nuestra aplicación del playstore", icon:"https://raw.githubusercontent.com/martinbobbio/davinci-tennisstar-frontend/master/src/assets/images/logo.png"});
    notification.onclick = () => location.href = "https://play.google.com/store/apps/details?id=davinci.tennisstar.fernandez.bobbio";
  }else if(Notification.permission == "denied" || Notification.permission === "default"){
    Notification.requestPermission(function(){});
  }
}

notificationAPP();

