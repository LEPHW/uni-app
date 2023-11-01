<template>
    <div class="playbox">
       <div class="musicName" @click=songWord>
            <img :src="playsong.picUrl" alt="">
            <div class="name">
                <span>{{playsong.name}}</span>
                <span style="color: rgba(174, 174, 174, 0.878);font-size: 12px;">横滑切换上下首</span>
                <audio  ref="audioShow" :src="picUrl">
                </audio>
            </div>
       </div>
       <div class="play" @click="playAudio()">
                <van-icon name="play-circle-o"  v-if="isshow" size="35px"/>
                <van-icon name="pause-circle-o" v-else size="35px"/>
            </div>
       <div class="liebiao">
             <van-icon name="wap-nav" size="35px"/>
       </div>
    </div>
    //歌词弹出层
    <van-popup
    v-model:show="showSongWord"
    position="right"
    :style="{ width: '100%', height: '100%' }"
    >
        <SongWord :playsong="playsong" :audioShow="audioShow" ></SongWord>
    </van-popup>   
</template>
<script setup>
import SongWord from '@/components/songword/songword'
import { computed, nextTick, ref, watch } from 'vue';
import {songPlay} from '@/request/Song/getsong'
import { useStore } from 'vuex';
const store=useStore()
const audioShow=ref()
const isshow=computed(()=>store.state.playAudio)
const playsong=computed(()=>store.state.playsong)
const picUrl=ref('')
const playAudio=()=>{
    if(isshow.value){
        audioShow.value.play()
        store.commit('getplayAudio',!isshow.value)
    }
    else{
        audioShow.value.pause()
        store.commit('getplayAudio',!isshow.value)
    }
}

const showSongWord=computed(()=>store.state.showSongWord)
const songWord=()=>{
    store.commit('getshowSongWord',true)
}
const onShowSongWord=()=>{
    store.commit('getshowSongWord',false)
}
watch(playsong,async(newValue)=>{
    const {data:{data}}=await songPlay(newValue.id)
    picUrl.value=data[0].url
   //判断hasOwnProperty('xx')对象是否存在xx属性
    if(playsong.value.hasOwnProperty('show')){
        if(playsong.value.show){
            //判断是否已存在picUrl，避免重加载，重新播放音乐
            if(playsong.value.haveUrl){
                audioShow.value.src=picUrl.value
            }
            nextTick(()=>{
                audioShow.value.play(),
                store.commit('getplayAudio',!playsong.value.show)
            })
        }else{
            audioShow.value.pause(),
            store.commit('getplayAudio',!playsong.value.show)
        }
    }
},{
    deep:true,
    immediate:true
})



</script>
<!--scoped脱离此作用域，style中的css将不生效，防止其它组件继承样式 -->
<style scoped lang="less">
.playbox{
   width: 100%;
   height: 100%;
   padding: 8px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   font-size: 28px;
   .musicName{
    display:flex;
    flex:1;
    img{
        width: 60PX;
        height: 60PX;
        background-color: pink;
        border-radius: 50%;
        margin-right:30px
    }
   }
    .name{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    span{
        margin-top: 10px;
    }
   .liebiao{
    margin-left: 20px;
   }
}
</style>