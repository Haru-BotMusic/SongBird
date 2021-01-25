const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "lyrics",
  aliases: ["ly"],
  description: "Get lyrics for the currently playing song",
  async execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("There is nothing playing.").catch(console.error);
    function sendLyrics(lyrics, album_art) {
      charLength = lyrics.length;
      if (charLength < 2048) {
        cantEmbeds = 1
      }
      else {
        for (let i = 2; i < 10; i++) {
          if (charLength < 2048 * i) {
            cantEmbeds = i
            break;
          } 
        }
      }
      function embeds(lyrics, cant, album_art) {
        String.prototype.trimEllip = function (length) {
          return this.length > length ? this.substring(0, length) : this;
        }
        if (!album_art) album_art='https://kknd26.ru/images/no_photo.png';
        let lyricsEmbed = new MessageEmbed()
          .setThumbnail(album_art)
          .setTitle(queue.songs[0].title)
          .setDescription(lyrics.trimEllip(2047))
          .setColor("#F8AA2A")
        message.channel.send(lyricsEmbed).catch(console.error);
        lyrics = lyrics.replace(lyrics.trimEllip(2047), '');
        for (let i = 2; i <= cant; i++) {

          let lyricsEmbed = new MessageEmbed()
            .setDescription(lyrics.trimEllip(2047))
            .setColor("#F8AA2A")
            .setTimestamp();
          message.channel.send(lyricsEmbed).catch(console.error);
          lyrics = lyrics.replace(lyrics.trimEllip(2048), '');
        }
      }
      embeds(lyrics, cantEmbeds, album_art);
    }
    try {
        const url = 'https://api.lxndr.dev/lyrics/?song=' + encodeURI(queue.songs[0].title);
        console.log(url)
        fetch(url)
          .then(response => response.json())
          .then(data => {
            sendLyrics(data.lyrics, data.album_art);
          });


    } catch (error) {
      lyrics = `No lyrics found for ${queue.songs[0].title}.`;
      message.channel.send(lyrics)
      console.log(error)
    }
  }
};
