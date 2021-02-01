const i18n = require("i18n");


exports.canModifyQueue = (member) => {
  const { channelID } = member.voice;
  const botChannel = member.guild.voice.channelID;

  if (channelID !== botChannel) {
    return;
  }

  return true;
};

var DJ_PERMISSION_OBJ='';
exports.isDJOnly = (command,member,message) => {
  /**
   * Role checking logic
   */
  if(!member&&message){
    member=message.member
  }
  if(DJ_Commands.indexOf('command')<0){
    return false;
  }
  if (!DJ_PERMISSION_OBJ && message) {
    DJ_PERMISSION_OBJ = message.guild.roles.cache.find(role => role.name === DJ_ROLE)
  };

  if(DJ_PERMISSION_OBJ && !member.roles.cache.has(DJ_PERMISSION_OBJ.id)) {
     mesage && message.reply(i18n.__("common.errorDJOnly")); 
     return true;
  } 
  return false;
};

let config;

try {
  config = require("../config.json");
} catch (error) {
  config = null;
}

exports.TOKEN = config ? config.TOKEN : process.env.TOKEN;
exports.PREFIX = config ? config.PREFIX : process.env.PREFIX;
exports.YOUTUBE_API_KEY = config ? config.YOUTUBE_API_KEY : process.env.YOUTUBE_API_KEY;
exports.SOUNDCLOUD_CLIENT_ID = config ? config.SOUNDCLOUD_CLIENT_ID : process.env.SOUNDCLOUD_CLIENT_ID;
exports.MAX_PLAYLIST_SIZE = config ? config.MAX_PLAYLIST_SIZE : process.env.MAX_PLAYLIST_SIZE;
exports.PRUNING = config ? config.PRUNING : process.env.PRUNING;
exports.STAY_TIME = config ? config.STAY_TIME : process.env.STAY_TIME;
exports.DEFAULT_VOLUME = config ? config.DEFAULT_VOLUME: process.env.DEFAULT_VOLUME;
var LOCALE = exports.LOCALE = config ? config.LOCALE : process.env.LOCALE;
i18n.setLocale(LOCALE);
var DJ_ROLE = config ? config.DJ_ROLE : process.env.DJ_ROLE;
var DJ_Commands='loop,move,pause,pruning,remove,shuffle,skip,skipto,volume';
