angular.module('WarRoom')
.factory('SettingsService', SettingsService);

var settings = JSON.parse(localStorage.getItem('settings')) || {
    warningThreshold: 50,
    criticalThreshold: 500
};

function SettingsService(){
  return {
    getThresholds: function(){
      console.log(settings);
      console.log(settings.warningThreshold);
      console.log(settings.criticalThreshold);
        return {
          warning: settings.warningThreshold,
          critical: settings.criticalThreshold
        }
    },
    setThresholds: function(warning, critical){
      console.log(settings);
      console.log(warning);
      console.log(critical);
      settings.warningThreshold = warning;
      settings.criticalThreshold = critical;
      console.log(settings);
      localStorage.setItem('settings', JSON.stringify({settings}));
    }
  };
};

// function SettingsService(){
//   return settings;
// }
