// import * as smz_common from '../smz/smz_common.js'; const common=smz_common.SmzCommon;
// import * as smz_common from 'smz_common.js'; const common=smz_common.SmzCommon;

'use strict';

export const SmzCommon = (function(){

const SmzCommon = {};

SmzCommon.clone = function(data){
  // vue use Proxy and structuredClone not working
  return JSON.parse(JSON.stringify(data));
};

return SmzCommon;

})();
