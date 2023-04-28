import { useState } from "react";

export const useGetBinaryArray = (mediaType:string) => {

  const [bin, setBin] = useState<(1|0)[]>([]);

  const setMedia = (media:string) => {
    switch(mediaType) {
      case 'text':
        let r = media
                .split('')
                .map(k => k.charCodeAt(0).toString(2))
                .join('')
                .split('')
                .map(k => k=='1'?1:0); 
        setBin(r);
      break;
    }
  }

  return {
    bin, setMedia
  }
}
