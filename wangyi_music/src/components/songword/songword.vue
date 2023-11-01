<template>
    <div class="songword">
        <img :src="props.playsong.picUrl" alt="" class="bgcImg">
        <div class="top">
                <div @click="backPage">
                    <svg class="icon" aria-hidden="true" >
                        <use xlink:href="#icon-zuojiantou"></use>
                    </svg>
                </div>
                <div class="name">
                    <span>{{props.playsong.name}}</span>
                    <div class="autoName">
                       <span v-for="item in props.playsong.nickName" :key="item">{{" "+item.name}}</span>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-gengduo"></use>
                        </svg>
                    </div>
                </div>
                <div class="fenxiang">
                    <svg class="icon" aria-hidden="true" >
                        <use xlink:href="#icon-fenxiang" ></use>
                    </svg>
                </div>
        </div>
        <div class="cipan">
            <img class="cizhen" :class="{active:changePlay,isactive:!changePlay}" src="@/assets/img/cizhen.png" alt="">
            <img class="cipan" src="@/assets/img/cipan.png" alt="">
            <img class="picUrl" :class="{active:!changePlay,isactive:changePlay}" :src="props.playsong.picUrl" alt="">
        </div>
        <div class="foot">
            <div class="footTop">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xihuan"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiazai"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-a-ziyuan11"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-guanjianci"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-icon"></use>
                </svg>
            </div>
            <van-progress  :percentage="50"  stroke-width="8"
            pivot-text=" "  pivot-color="#fff"  color="linear-gradient(to right, #9FCBDC, #1989FA)"/>
            <div class="playList">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xunhuan"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-shangyishou_huaban"></use>
                </svg>
                <svg class="icon iconPuse" aria-hidden="true" @click="playMusic" v-if="changePlay">
                    <use xlink:href="#icon-bofang_huaban"></use>
                </svg>
                <svg class="icon iconPuse" aria-hidden="true" @click="playMusic" v-else>
                    <use xlink:href="#icon-zanting_huaban"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiayishou_huaban"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-24gl-playlistMusic3"></use>
                </svg>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
  const store=useStore()
  const props=defineProps({
    playsong:{
        type:Object,
        define:{}
    },
    audioShow:{
        type:Object,
        define:{}
    }
  })
  const backPage=()=>{
    store.commit('getshowSongWord',false)
  }
  const changePlay=computed(()=>store.state.playAudio)
  const playMusic=()=>{
    store.commit("getplayAudio",!changePlay.value)
    if(!changePlay.value){
        props.audioShow.play()
    }else{
        props.audioShow.pause()
    }
    
  }
</script>
<!--scoped脱离此作用域，style中的css将不生效，防止其它组件继承样式 -->
<style scoped lang="less">
@keyframes rotateImg {
    0%{transform:rotateZ(0deg)}
    100%{transform:rotateZ(360deg)}
}
.songword{
    .bgcImg{
        width: 100%;
        height: 100%;
        filter: blur(80px);
        position: absolute;
        z-index: -999;
    }
    position: relative;
    width:100%;
    height:100vh;
    box-sizing:border-box;
    overflow:hidden;
    .top{
        display:flex;
        justify-content:space-around;
        align-items:center;
        margin:15px;  
        font-size:50px;
        color:#494646;
        .name{
            flex:1;
            display:flex;
            flex-direction:column;
            font-size:28px;
            margin-left:15px;
            .autoName{
                color:#3c3c3c;
                font-size:24px;
            }
        }
       
    }
    .cipan{
        // background-color:green;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        
        .cizhen{
            position: absolute;
            left: 50%;
            width:146px;
            height:236px; 
            z-index: 999;
            // 固定旋转点
            transform-origin:10px top;
            &.active{
                transform: rotate(-20deg) ;
                transition: all 1s;
            }
            &.isactive{
                transform: rotate(0) ;
                transition: all 1s;
            }
        }
       
        .cipan{
            position: absolute;
            top: 130px;
            width: 494px;
            height: 494px;
        }
        .picUrl{
            position: absolute;
            top:220px;
            border-radius: 50%;
            width: 312px;
            height:312px;
            background-color: rgb(168, 221, 242);
            animation:rotateImg 10s linear infinite;
            animation-play-state: running;
            // animation-play-state: paused;
            &.active{
                animation-play-state: running;
            }
            &.isactive{
                animation-play-state: paused;
            }
        }
    }
    .foot{
        position: absolute;
        width: 100%;
        bottom: 0;
        .footTop{
            color:#3c3c3c;
            display: flex;
            font-size: 60px;
            justify-content: space-around;
        }
        .playList{
            display: flex;
            justify-content: space-around;
            color: #3c3c3c;
            font-size: 60px;
            justify-items: center;
            align-items: center;
            margin-bottom: 15px;
            .iconPuse{
                font-size: 90px;
            }
        }
       
    }
    //进度条
    :deep .van-progress{
        margin: 40px 0;
    }
    :deep .van-progress__pivot {
                height: 30px !important;
                // width: 10px !important;
                background-color: #4190ff !important;
                border-radius:50%;
                
            }
}
</style>