<template>
  <div class="allStore">
    <div class="allStoreMain wrapper">
      <div class="filterArea">
        <p class="searchStore">
          <input type="text" placeholder="请输入门店名称" @click="$to('/usercenter/searchStore')"/>
          <i class="iconfont icon-search"></i>
        </p>
        <p class="positionOper">
          <i class="iconfont icon-location"></i>{{position.addr}}
          <span class="forDistance" v-if="isOpenLocation" @click="showForDistancePopup(true)">
            按距离<i class="iconfont icon-triangle"></i>
            </span>
          <span class="openLocation" v-else>
            <i class="iconfont icon-openLoc"></i>开启定位
          </span>
        </p>
      </div>
      <div class="storeCon">
        <ul class="storeList">
          <li class="oneStore" v-for="n in 3" :key="n">
            <div class="storeMain">
              <h4>雨花石美妆（广州店）</h4>
              <p>广东省广州市天河区中山大道西299号大舜丽池行政楼2楼</p>
            </div>
            <div class="storeDistance">
              <i class="iconfont icon-location"></i>
              <span>1m</span>
            </div>
          </li>
        </ul>
      </div>
     
      <ForDistancePopup v-show="forDistancePopupShow"/>
    </div>
    
    <CopyRight />
  </div>
</template>

<style rel="stylesheet/scss" lang="scss" scoped>
.allStoreMain{
  .filterArea{
    padding-bottom:pxToRem(15);
    margin-bottom:pxToRem(20);
    background:#fff;
    position:relative;
    z-index:1000;
    .searchStore{
      padding:pxToRem(30) 0;
      position:relative;
      input{
        display:block;
        color:#CCCCCC;
        font-size:14px;
        text-indent:pxToRem(39);
        width:pxToRem(690);
        height:pxToRem(80);
        line-height:pxToRem(80);
        border:1px solid #DDDDDD;
        border-radius:pxToRem(40);
        margin:0 auto;
        @include placeholder(#CCCCCC,14px);
      }
      .icon-search{
        color:#999999;
        right:pxToRem(72);
        @include vertical-center();
      }
    }
    .positionOper{
      color:#666666;
      font-size:13px;
      text-indent:pxToRem(80);
      height:pxToRem(65);
      line-height:pxToRem(65);
      position:relative;
      .icon-location{
        color:#999999;
        text-indent:0;
        left:pxToRem(30);
        @include vertical-center();
      }
      .forDistance,.openLocation{
        display:block;
        text-indent:0;
        height:pxToRem(65);
        line-height:pxToRem(65);
        right:pxToRem(30);
        @include vertical-center();
        .icon-triangle{
          color:#666666;
          font-size:6px;
          margin-left:pxToRem(12);
          position:relative;
          top:-2px;
        }
        .icon-openLoc{
          color:#666666;
          margin-right:pxToRem(14);
        }
      }
    }

  }
  .storeCon{
    background:#fff;
    .storeList{
      margin:0 0 0 pxToRem(30);
      .oneStore{
        overflow:hidden;
        position:relative;
        &:after{
          @include set-bottom-line(100%,#E7E7E7,0);
        }
        .storeMain{
          margin:pxToRem(48) pxToRem(191) pxToRem(27) 0;
          h4{
            color:#333333;
            font-size:15px;
            line-height:pxToRem(60);
            @include ellipsis();
          }
          p{
            color:#999999;
            font-size:13px;
            line-height:pxToRem(36);
          }
        }
        .storeDistance{
          width:pxToRem(144);
          right:0;
          @include vertical-center();
          &:before{
            @include set-left-line(130%,#E7E7E7,0)
          }
          .icon-location{
            display:block;
            color:#FF812C;
            text-align:center;
            margin:0 0 pxToRem(21) 0;
          }
          span{
            display:block;
            color:#999999;
            font-size:13px;
            text-align:center;
            line-height:1;
          }
        }
      }
    }
  }
 
}
</style>

<script>
import ForDistancePopup from "components/ForDistancePopup.vue";
import CopyRight from "components/CopyRight.vue";
// import pub from 'js/common/pubMethod'

export default {
  components: {
    ForDistancePopup,
    CopyRight
  },
  data() {
    return {
      isOpenLocation:true,
      position:{}
    };
  },
  computed:{
    forDistancePopupShow(){
      return this.$store.state.forDistancePopupShow;
    }
  },
  created() {
    this.$setTitle("全部门店")
    this.getLocation();
  },
  mounted() {

  },
  methods: {
    // 接口请求方法

    // 普通方法
    showForDistancePopup(forDistancePopupShow){
      this.$store.commit('showForDistancePopup', forDistancePopupShow)
    },
    getLocation(){
      let _this = this;
      let geolocation = new qq.maps.Geolocation();
      geolocation.getLocation((pos) => {
        _this.isOpenLocation = true;
        console.log(pos);
        _this.position = pos;
      }, (error) => {
        _this.isOpenLocation = false;
        console.log(error)
        if(error.code == 1){ // 拒绝授权

        }else{ // 定位失败
          _this.$messagebox.alert('定位失败', '提示');
        }
      }, {
        timeout: 10000,
        failTipFlag:true
      });
    }
  }
};
</script>
