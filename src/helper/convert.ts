export function convertStringTime(time:string){
    return new Date(Date.parse(time)).toUTCString().slice(4,12)
}

export function getTimeDifferenceFromNow(givenDate: string) {
  // Convert the given date string to a Date object
  const createDate = new Date(Date.parse(givenDate));
  // Get the current date and time
  const currentDate = new Date();
  

  const timeDifference = currentDate.getTime() - createDate.getTime();

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return days + 'd';
  } else if (hours>0) {
    return hours % 24 + 'h';
  }
  else if (minutes > 0)
  return minutes % 60 + 'm'
  
  return 'Just now'
}


export function getMediaType(media:string){
    const type =  media.slice(media.lastIndexOf(".")+1,media.length);
    switch (type) {
      case "mp4":
      case "mp3":
      case "aac":
      case "mpeg":
      case "webm":
      case "mkv":

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