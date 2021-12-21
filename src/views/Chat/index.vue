<template>
  <div class="chat-index">
    <div class="chat-content">
      <a-row :gutter="[24, 24]">
        <a-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
          <a-card title="注册" :bordered="false" hoverable :bodyStyle="{ minHeight: '260px' }">
            <!-- 注册 -->
            <a-form :model="formState" ref="regForm">
              <a-form-item label="账号" name="username">
                <a-input v-model:value="formState.username" allow-clear />
              </a-form-item>
              <a-form-item label="密码" name="password">
                <a-input v-model:value="formState.password" type="password" allow-clear />
              </a-form-item>
              <a-form-item label="昵称" name="nickname">
                <a-input v-model:value="formState.nickname" allow-clear />
              </a-form-item>
              <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                <a-button type="primary" @click="onSubmit" :loading="loadingCtrl.regLoading">注册</a-button>
                <a-button style="margin-left: 10px" @click="resetRegForm">Cancel</a-button>
              </a-form-item>
            </a-form>
          </a-card>
        </a-col>
        <a-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
          <a-card title="登录" :bordered="false" hoverable :bodyStyle="{ minHeight: '260px' }">
            <!-- 登录 -->
            <a-form :model="loginForm" ref="loginFormR">
              <a-form-item label="账号" name="user">
                <a-input v-model:value="loginForm.user" allow-clear />
              </a-form-item>
              <a-form-item label="密码" name="password">
                <a-input v-model:value="loginForm.pwd" type="password" allow-clear />
              </a-form-item>
              <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                <a-button type="primary" @click="loginByPwd" :loading="loadingCtrl.loginLoading">登录</a-button>
                <a-button style="margin-left: 10px" @click="resetLoginForm">Cancel</a-button>
              </a-form-item>
            </a-form>
          </a-card>
        </a-col>
        <a-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
          <a-card title="用户信息" :bordered="false" hoverable :bodyStyle="{ minHeight: '260px' }">
            <!-- 用户信息 -->
            <a-descriptions :column="{ xs: 1, sm: 2, md: 2 }">
              <a-descriptions-item label="UserName">{{ loginState.info?.user?.username || '' }}</a-descriptions-item>
              <a-descriptions-item label="activated">{{ loginState.info?.user?.activated || '' }}</a-descriptions-item>
              <a-descriptions-item label="type">{{ loginState.info?.user?.type || '' }}</a-descriptions-item>
              <a-descriptions-item label="uuid">{{ loginState.info?.user?.uuid || '' }}</a-descriptions-item>
            </a-descriptions>
          </a-card>
        </a-col>
      </a-row>
      <a-row :gutter="[24, 24]">
        <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <!-- 发送消息 -->
          <a-card :title="`发送消息 to ${chatObj ? chatObj : '请选择联系人'}`" :bordered="false" hoverable>
            <a-form-item label="内容">
              <a-input v-model:value="msg" allow-clear />
            </a-form-item>
            <a-button @click="sendMsg" type="primary">发送</a-button>
          </a-card>
        </a-col>
        <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <!-- 好友列表 -->
          <a-card title="好友列表" :bordered="false" hoverable>
            <a-list item-layout="horizontal" :data-source="loginState.friendsList">
              <template #renderItem="{ item }">
                <a-list-item>
                  <a-list-item-meta>
                    <template #title>
                      <a href="javascript:void(0)">{{ item }}</a>
                    </template>
                    <template #avatar>
                      <a-avatar
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                      />
                    </template>
                  </a-list-item-meta>
                  <template #actions>
                    <a href="javascript:void(0)" @click="contact(item)">contact</a>
                  </template>
                </a-list-item>
              </template>
            </a-list>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script setup>
import conn from '@/utils/WebIM';
import config from '@/utils/WebIMConfig'
import { computed, reactive, ref } from 'vue';
import { message, notification } from 'ant-design-vue';
import { useStore } from 'vuex';
import { getFriends } from '@/api/hxRegister'

// 引入 vuex
const store = useStore()

// 加载状态控制
const loadingCtrl = reactive({
  regLoading: false,
  loginLoading: false
})

// 用户信息存储
const loginState = reactive({
  // 用户信息
  info: computed(() => store.state.user || {}),
  // 好友列表
  friendsList: []
})

const regForm = ref()
const loginFormR = ref()

// 注册表单
const formState = reactive({
  username: '',
  password: '',
  nickname: '',
  appKey: config.appkey,
  success: (res) => {
    console.log(res);
    loadingCtrl.regLoading = false
  },
  error: (err) => {
    let errorData = JSON.parse(err.data);
    if (errorData.error === 'duplicate_unique_property_exists') {
      console.log('用户已存在!');
      message.error('用户已存在!');
    } else if (errorData.error === 'illegal_argument') {
      if (errorData.error_description === 'USERNAME_TOO_LONG') {
        console.log('用户名超过64个字节!')
        message.error('用户名超过64个字节!');
      } else {
        console.log('用户名不合法!')
        message.error('用户名不合法!');
      }
    } else if (errorData.error === 'unauthorized') {
      console.log('注册失败，无权限！')
      message.error('注册失败，无权限!');
    } else if (errorData.error === 'resource_limited') {
      console.log('您的App用户注册数量已达上限,请升级至企业版！')
      message.error('您的App用户注册数量已达上限,请升级至企业版!');
    }
    loadingCtrl.regLoading = false
  },
})

// 注册方法
const onSubmit = () => {
  loadingCtrl.regLoading = true
  conn.registerUser(formState)
}

// 注册表单清空
const resetRegForm = () => {
  regForm.value.resetFields()
}

// 登录表单清空
const resetLoginForm = () => {
  loginFormR.value.resetFields()
}

// 密码登录表单
const loginForm = reactive({
  user: '',
  pwd: '',
  appKey: config.appkey,
  success: (res) => {
    console.log(res);
    loadingCtrl.loginLoading = false
    message.success('登陆成功')
    // loginState.info = res
    store.commit('setUser', res)
    // 登录成功后拉去联系人列表
    getFriends(loginState.info.user.username)
      .then(data => {
        console.log(data);
        loginState.friendsList = data.data.data
      })
  },
  error: (err) => {
    message.error('登陆失败')
    console.log(err);
    loadingCtrl.loginLoading = false
  }
})

// 密码登录
const loginByPwd = () => {
  loadingCtrl.loginLoading = true
  conn.open(loginForm)
  // conn.close({ reason: 'close' });
}

// 文字消息内容
const msg = ref('')
// f发送对象
const chatObj = ref('')

// 选择联系人
const contact = (item) => {
  console.log(item);
  chatObj.value = item
}

// 发送单聊文字消息
const sendMsg = () => {
  // 生成唯一的消息id
  let id = conn.getUniqueId()
  // 设定消息类型
  let msgType = new WebIM.message('txt', id);
  msgType.set({
    msg: msg.value,                  // 消息内容
    to: chatObj.value,                // 接收消息对象（用户id）
    chatType: 'singleChat',          // 设置为单聊
    // ext: {
    //   key: value,
    //   key2: {
    //     key3: value2
    //   }
    // },                                  //扩展消息
    success: (id, serverMsgId) => {
      console.log('send private text Success');
      message.success('发送消息成功')
    },
    fail: (e) => {
      // 失败原因:
      // e.type === '603' 被禁言
      // e.type === '605' 群组不存在
      // e.type === '602' 不在群组或聊天室中
      // e.type === '504' 撤回消息时超出撤回时间
      // e.type === '505' 未开通消息撤回
      // e.type === '506' 没有在群组或聊天室白名单
      // e.type === '501' 消息包含敏感词
      // e.type === '502' 被设置的自定义拦截捕获
      // e.type === '503' 未知错误
      console.log("Send private text error", e);
      message.error('发送消息失败，移步console查看错误信息')
    }
  });
  conn.send(msgType.body);
}

// 开启监听
conn.listen({
  onOpened: () => { message.success('连接成功') },                  //连接成功回调 
  onClosed: () => { message.success('连接关闭') },                  //连接关闭回调
  onTextMessage: (message) => {
    console.log(message)
    notification.open({
      message: `来自 ${message.from} 的新消息`,
      description: message.data,
      placement: 'bottomRight'
    })
  },
  onEmojiMessage: function (message) { },   //收到表情消息
  onPictureMessage: function (message) { }, //收到图片消息
  onCmdMessage: function (message) { },     //收到命令消息
  onAudioMessage: function (message) { },   //收到音频消息
  onLocationMessage: function (message) { },//收到位置消息
})
</script>
<style lang="less" scoped>
.chat-index {
  box-sizing: border-box;
  padding: 15px;
  .chat-content {
    width: 100%;
  }
  .ant-row {
    margin-bottom: 20px;
    .ant-card {
      border-radius: 10px;
      min-height: 300px;
    }
  }
}
</style>