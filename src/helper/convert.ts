export function convertStringTime(time:string){
    return new Date(Date.parse(time)).toUTCString().slice(4,12)
}

export function getMediaType(media:string){
    const type =  media.slice(media.lastIndexOf(".")+1,media.length);
    switch (type) {
      case "mp4":
      case "mp3":
      case "aac":
      case "mpeg":
      case "webm":
        return "video";
      case "bmp":
      case "gif":
      case "ico":
      case "jpeg":
      case "jpg":
      case "png":
      case "svg":
      case "webp":
        return "image";
  
      default:
        return"unknown";
    }
}