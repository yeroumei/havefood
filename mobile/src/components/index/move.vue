<template>
  <main>
    <!--顶部标题栏-->
    <header class="topbar">
      <i class="add icon" @click="downshow()"></i>
      <h1 class="find">食趣</h1>
      <router-link to="/login">
        <i class="mail icon"></i>
      </router-link>
      <!--add的二级菜单-->
      <div class="downmenu" v-show="show">
        <span></span>
        <ul>
          <li @click="select = true">
            <img src="../../assets/images/picbtn.png" />
            晒作品
          </li>
          <router-link to="/addrecipe">
            <li>
              <img src="../../assets/images/upbtn.png" />
              传菜谱
            </li>
          </router-link>
          <router-link to="/addnews">
            <li>
              <van-icon name="notes-o" size="20px" style="top:2px;padding: 0 8px;" />
              <!-- <img src="../../assets/images/upbtn.png"/> -->
              写文章
            </li>
          </router-link>
        </ul>
      </div>
      <van-action-sheet v-model="select" :actions="actions" @select="onSelect" />
    </header>
    <section style="padding:44px 0 50px 0">
      <van-swipe :autoplay="3000" style="height: 154px;">
        <van-swipe-item v-for="(item, index) in daydata">
          <router-link :to=" {name:'newsdetail', params: {id:item._id}}">
            <img v-lazy="item.cover_pic" @click="newsDetails(item)" width="100%" />
            <!-- <img v-if="item.step && item.style == 'video'" v-lazy="item.step[item.step.length-1].img" width="100%" /> -->
          </router-link>
        </van-swipe-item>
      </van-swipe>
      <!--tab切换按钮-->
      <div class="nav">
        <mt-navbar v-model="selected">
          <mt-tab-item
            :class="{active:selected=='tab1'}"
            @click.native.prevent="selected = 'tab1'"
          >最新</mt-tab-item>
          <mt-tab-item
            :class="{active:selected=='tab2'}"
            @click.native.prevent="selected = 'tab2'"
          >最热</mt-tab-item>
        </mt-navbar>
      </div>
      <!--tab切换内容-->
      <div class="nav_container">
        <!-- 最新 -->
        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="tab1">
            <div class="time">
              <div class="new" v-for="(item,index) in news">
                <a class="user">
                  <img :src="item.avatar" />
                </a>
                <div class="shows">
                  <a class="username">{{item.author}}</a>
                  <br />
                  <span>{{item.time}}</span>
                  <!-- <a class="desk">{{item.content}}</a> -->
                  <a class="shows_img">
                    <p class="p_title">{{item.content}}</p>
                    <img v-if="item.media.type == 'image'" v-for="p in item.media.matter" :src="p" @click="ImagePreview(item.media.matter)" />
					          <van-image-preview v-model="preview" :images="images"></van-image-preview>
                    <video
                      v-if="item.media.type == 'video'"
                      :src="item.media.matter"
                      controls="controls"
                    ></video>
                  </a>
                </div>
                <div class="zan">
                  <span>
                    <van-icon
                      :color="$store.state.userinfo ? item.loves.indexOf($store.state.userinfo.username) !== -1 ? '#ff5151': '' : ''"
                      size="16px"
                      name="like-o"
                      @click="onlove(item)"
                    />
                    <span style="font-size:10px">{{item.loves.length}}</span>
                  </span>
                  <span @click="toSay(item,index)">
                    <van-icon size="16px" name="chat-o" />
                    <span style="font-size:10px">{{item.comments ? item.comments.length : ''}}</span>
                  </span>
                </div>
                <p style="display: flex;align-items: flex-end;" v-if="showflag && tosay == index">
                    <van-field
                    v-model="message"
                    rows="2"
                    autosize
                    type="textarea"
                    placeholder="写评论..."
                  />
                  <van-button hairline size="small" @click="saySome(item)">完成</van-button>
                </p>
                <van-divider v-if="item.comments.length>0" @click="checkAll(item)">查看评论<van-icon name="arrow-down" style="padding-left:6px" /></van-divider>
              </div>
            </div>
          </mt-tab-container-item>

          <!-- 最热 -->
          <mt-tab-container-item id="tab2">
            <div class="hot">
              <div class="new" v-for="(item,index) in hots">
                <a class="user">
                  <img :src="item.avatar" />
                </a>
                <div class="shows">
                  <a class="username">{{item.author}}</a>
                  <br />
                  <span>{{item.time}}</span>
                  <!-- <a class="desk">{{item.content}}</a> -->
                  <a class="shows_img">
                    <p class="p_title">{{item.content}}</p>
                    <img v-if="item.media.type == 'image'" v-for="p in item.media.matter" :src="p" @click="ImagePreview(item.media.matter)" />
                    <van-image-preview v-model="preview" :images="images"></van-image-preview>
                    <video
                    v-if="item.media.type == 'video'"
                    :src="item.media.matter"
                    controls="controls"
                    ></video>
                  </a>
                </div>
                <div class="zan">
                  <span>
                    <van-icon
                    :color="$store.state.userinfo ? item.loves.indexOf($store.state.userinfo.username) !== -1 ? '#ff5151': '' : ''"
                    size="16px"
                    name="like-o"
                    @click="onlove(item)"
                    />
                    <span style="font-size:10px">{{item.loves.length}}</span>
                  </span>
                  <span  @click="toSay(item,index)">
                    <van-icon size="16px" name="chat-o" />
                    <span style="font-size:10px">{{item.comments ? item.comments.length : ''}}</span>
                  </span>
                </div>
                <p style="display: flex;align-items: flex-end;" v-if="showflag && tosay == index">
                    <van-field
                    v-model="message"
                    rows="2"
                    autosize
                    type="textarea"
                    placeholder="写评论..."
                  />
                  <van-button hairline size="small" @click="saySome(item)">完成</van-button>
                </p>
                <van-divider v-if="item.comments.length>0" @click="checkAll(item)">查看评论<van-icon name="arrow-down" style="padding-left:6px" /></van-divider>
              </div>
            </div>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </section>
    <van-popup v-model="checkcom" position="bottom" closeable>
        <Precom :show='checkcom' :record = "record" :proid="proid" ></Precom>
    </van-popup>
  </main>
</template>
<script>
import { Toast } from 'vant';
import Precom from '../discovery/discory_pro/pre_comments'
export default {
    components: { Precom },
  data() {
    return {
      preview:false,
      images:[],
        show: false,
        checkcom:false,
        select: false,
        selected: "tab1",
        actions: [
          { name: "图文分享", path: "/addmove_img" },
          { name: "视频食谱", path: "/addmove_mp4" },
          { name: "", path: "" }
        ],
      daydata: [],
      news:[],
      hots:[],
      message:'',
      tosay:'',
      showflag:false,
      record:'',
      proid:''
    };
  },
  mounted() {
    this.getDay(); //轮播
    this.getMove();
    this.getMove2();
  },
  methods: {
    checkAll(item){
      this.checkcom = !this.checkcom
      this.record = item.comments
      this.proid = item._id
    },
    downshow() {
      this.show = !this.show;
    },
    onSelect(item) {
      console.log(item);
      this.$router.push({ path: item.path });
      this.select = false;
    },
    rand(arr, ranNum) {
      //分别随机抽取2推荐的每日三餐，避免抽取重复
      // var ranNum = 2;
      var hash = {};
      var result = [];
      while (ranNum > 0) {
        var ran = Math.floor(Math.random() * arr.length);
        if (!hash[ran]) {
          hash[ran] = 1;
          result.push(arr[ran]);
          ranNum--;
        }
      }
      return result;
    },
    getDay(){
			this.$axios.get('/newsSend',{
				params:{
					status:0 //只显示已发布的
				}
			}).then(res=>{
				console.log(res.data,'新闻')
				this.daydata = this.rand(res.data,3)
			})
    },
    // 查看文章详情
		newsDetails(item){
			console.log(item,'item的详情')
			this.$store.commit('getnewsdetails',{newsdetails:item}) 
		},
    getMove() {
      this.$axios.get("/moveList").then(res => {
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].time = new Date(res.data[i].time).format(
            "yyyy-MM-dd hh:ss:mm"
          );
        }
		this.news = this.sortKey(res.data,'time')
      });
	},
	 getMove2() {
      this.$axios.get("/moveList").then(res => {
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].time = new Date(res.data[i].time).format(
            "yyyy-MM-dd hh:ss:mm"
          );
        }
		this.hots = this.sortKey(res.data,'loves')
      });
	},
	// 排序封装
	 sortKey(array,key){
          return array.sort(function(a,b){
              var x = a[key];
              var y = b[key];
              return ((y<x)?-1:(x>y)?1:0)   //从小到大排序
      })
	 },
	//  点赞
    onlove(item) {
      if(this.$store.state.userinfo.username){ //验证已登录
        var flag = item.loves.indexOf(this.$store.state.userinfo.username);
        if (flag !== -1) {
          item.loves.splice(flag, 1);
        } else {
          item.loves.push(this.$store.state.userinfo.username);
        }
        this.$axios
          .post("/loveMoves", {
          loves: item.loves,
          _id: item._id
          })
          .then(res => {
          console.log(res.data, "谁点赞了呢");
        });
      }else{
        this.$router.push({path:'/login'})
        console.log('请先登录')
      }
    },
  // 打开评论
  toSay(item,index){
    if(this.$store.state.userinfo.username){ //验证已登录
        console.log(item,index,'准备')
        this.tosay = index
        this.showflag = !this.showflag 
    }else{
      this.$router.push({path:'/login'})
      console.log('请先登录')
    }
  },
  // 提交评论
  saySome(item){
      if(this.message == ''){
        Toast({ message:'评论内容不能为空' });
      }else{
        this.$axios.post('/addComments',{
          from_user: this.$store.state.userinfo.username,
          avatar: this.$store.state.userinfo.avatar,
          to_user: item.author,
          pro_id: item._id,
          content:this.message,
          time: new Date().format("yyyy-MM-dd hh:ss:mm")
        }).then(res=>{
          this.showflag = false
          console.log(res.data,'评论')
          res.data.list.reply = []  //用于存储回复信息
          item.comments.push(res.data.list)
          // 将评论存进指定的动态
          this.$axios.post('/sureMoves',{
            _id : item._id,
            comments : item.comments
          }).then(res=>{
            console.log(res.data,'更新')
            this.message = ''
          })
        })
      }
  },
	ImagePreview(image){
		this.images = image
		this.preview = true
	}
  }
};
</script>

<style scoped>
/*顶部标题栏*/
.topbar {
  height: 44px;
  width: 100%;
  background: #fefefe;
  position: fixed;
  top: 0px;
  z-index: 1;
}
.icon {
  height: 44px;
  width: 52px;
  position: absolute;
  display: block;
  top: 0px;
}
.add {
  left: 0px;
  background: url(../../assets/images/addbtn.png) center no-repeat;
  background-size: 52px 44px;
}
.mail {
  right: 0px;
  background: url(../../assets/images/mailbtn.png) center no-repeat;
  background-size: 52px 44px;
}
.find {
  height: 32px;
  line-height: 32px;
  background: #f5f5f5;
  color: #aaa;
  border-radius: 2px;
  margin: 0px 52px;
  font-size: 14px;
  display: block;
  position: relative;
  top: 6px;
}
.find img {
  height: 14px;
  width: 14px;
  margin: 9px 4px 0px 0px;
}
/*add的二级菜单*/
.downmenu {
  position: absolute;
  top: 44px;
  left: 10px;
  border-radius: 4px;
}
.downmenu span {
  position: absolute;
  top: 0px;
  left: 10px;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 7px solid #333;
}
.downmenu ul {
  margin-top: 7px;
  border-radius: 4px;
  background: #333;
}
.downmenu ul li {
  height: 48px;
  line-height: 48px;
  color: #fff;
  font-size: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-right: 16px;
  display: block;
}
.downmenu ul li img {
  height: 30px;
  width: 30px;
  display: block;
  margin: 9px 4px 9px 6px;
  display: inline-block;
  vertical-align: top;
}
/*tab切换*/
.nav {
  background: #fefefe;
  padding: 20px 3.125%;
  width: 100%;
  box-sizing: border-box;
}
.mint-navbar {
  height: 30px;
  margin: 16px auto 16px;
  border: 1px solid #ff4c35;
  border-radius: 6px;
  display: inline-block;
}
.mint-tab-item {
  display: inline-block;
  width: 80px;
  font-size: 12px;
  color: #ff4c35;
  padding: 9px 0;
}
.active {
  background: #ff4c35;
  color: #fff;
}
/*动态展示*/
.new {
  width: 100%;
  border-bottom: 1px solid #f5f5f5;
  padding: 15px 5%;
  box-sizing: border-box;
  position: relative;
}
.user img {
  display: block;
  width: 30px;
  height: 30px;
  position: absolute;
  top: 15px;
  left: 5%;
}
.shows {
  display: inline-block;
  width: 100%;
  padding-left: 35px;
  text-align: left;
  box-sizing: border-box;
}
.shows span {
  color: #999;
  font-size: 12px;
}
.username {
  color: #ff5151;
  font-size: 14px;
}
/* .desk{
		color: #1995f5;
	    font-size: 12px;
	} */
.p_title {
  font-size: 16px;
  line-height: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.shows_img img {
  display: inline-block;
  vertical-align: top;
  width: 33%;
  padding: 5px;
  box-sizing: border-box;
  margin-right: -4px;
}
.shows_img video {
  display: inline-block;
  vertical-align: top;
  width: 95%;
  box-sizing: border-box;
  margin-right: -4px;
}
.zan {
  /* float: right; */
  text-align: right;
  font-size: 12px;
  color: #aaa;
  line-height: 18px;
  padding: 10px 15px 0 0;
}

</style>