import { createStore } from 'vuex'
const store=createStore({
  state(){
      return {
        // 发现音乐
        songList: JSON.parse(sessionStorage.getItem('getSonglist')) ||{},
        //播放量
        playNum:sessionStorage.getItem('getplayNum') ||'' ,
        //需要播放的音乐
        playsong:{
          id: '400162138',
          name:"海阔天空",
          nickName:[{"name":"Beyond"}],
          picUrl: "http://p2.music.126.net/a9oLdcFPhqQyuouJzG2mAQ==/3273246124149810.jpg"
        },
        //播放音乐
        playAudio:true,
        //显示歌词弹出层
        showSongWord:false
      }
  },
  // getters相当于computed属性，当对应的state中的数据变化时执行
  getters:{
      // // 第一个参数默认是state，当msg变化时具有响应式
      // reverMsg(state){
      //     return state.msg.split('').reverse().join('')
      // },
      // // getters是当前store下的getters属性
      // getLength(state,getters){
      //     return getters.reverMsg.length
      // }
  },
  mutations:{
      // //通过store.commit方法触发对应函数状态变更，是同步函数  
      // //  默认第一个参数时createStore中的state
      // btnClick(state,value){
      //     state.count+=value
      // },
      // btnMsg(state,Msg){
      //     state.msg=Msg
      // }
    // 获取歌单总数据
    getSonglist(state,song){
      state.songList=song
    },
   //获取歌单播放次数  
    getplayNum(state,num){
      state.playNum=num
    },
    //播放音乐
    getplayMusic(state,song){
      state.playsong=song
    },
    //歌词弹出层
    getshowSongWord(state,showSongWord){
      state.showSongWord=showSongWord
    },
    //播放音乐
    getplayAudio(state,playAudio){
      state.playAudio=playAudio
    }
  },
  // 异步函数
  actions: {
  },
  // 局部store模块
  modules: {
  }
})
export default store

