'use strict';

export const SmzCommon = (function(){

const SmzCommon = {};

SmzCommon.clone = function(data){
  return JSON.parse(JSON.stringify(data));
};

return SmzCommon;

})(); 
