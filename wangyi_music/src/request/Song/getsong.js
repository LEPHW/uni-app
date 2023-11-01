 import getData from '@/request/index'
 export function songPlay(songId){
    return getData({
        url:`/song/url?id=${songId}`,
        method:'GET',
    })
 }