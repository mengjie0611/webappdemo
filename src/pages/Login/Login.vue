<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <div class="logo"><img class="img" src="./images/code.jpg" alt=""></div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on: isShowSms}">
            <section class="login_message">
              <div class="PrePhoneNumber">+86</div>
              <input class="placeholder" type="tel" maxlength="11" placeholder="输入手机号" v-model="phone" name="phone" v-validate="{required: false}">
              <span style="color: red;" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>
            </section>
            <section class="login_verification">
              <input class="placeholder" type="text" maxlength="6" placeholder="请输入验证码" v-model="code" name="code" v-validate="{required: false}">
              <button :disabled="!isRightPhone || computeTime>0" class="get_verification" :class="{right_phone_number: isRightPhone}" @click.prevent="sendCode">
                {{computeTime>0 ? `短信已发送(${computeTime}s)` : '获取验证码'}}
              </button>
              <span style="color: red;" v-show="errors.has('code')">{{ errors.first('code') }}</span>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">{{$t("Login")}}</button>
        </form>
      </div>
      <!--<a href="javascript:" class="go_back" @click="$router.replace('/profile')">
        <i class="iconfont icon-jiantou2"></i>
      </a>
      -->
    </div>
    <!-- <div>
      <button @click.prevent="change">切换语言</button>
    </div> -->
    <div class="bottom">
      <img src="./images/di.png" alt="">
    </div>
  </section>

</template>

<script type="text/ecmascript-6">
import { Toast, MessageBox } from 'mint-ui'
export default {
  name: 'Login',
  data() {
    return {
      isShowSms: true, // true: 显示短信登陆界面,  false: 显示密码登陆界面
      phone: '', // 手机号
      code: '', // 短信验证码
      computeTime: 0, // 计时剩余时间
    }
  },

  computed: {
    // 是否是一个正确的手机号
    isRightPhone() {
      return /^1\d{10}$/.test(this.phone)
    },
  },

  methods: {
    async sendCode() {
      // 进行倒计时效果显示
      this.computeTime = 10
      const intervalId = setInterval(() => {
        this.computeTime--
        if (this.computeTime <= 0) {
          this.computeTime = 0
          clearInterval(intervalId)
        }
      }, 1000)
      let phoneNumber = this.phone
      // 发请求
      const result = await this.$API.reqSendCode(phoneNumber)
      if (result.code === 0) {
        Toast('验证码短信已发送')
      } else {
        // 停止倒计时
        this.computeTime = 0
        MessageBox('提示', result.msg || '发送失败')
      }
    },
    async login() {
      const { phone, code } = this
      let phoneNumber = phone
      let messageCode = code
      // 短信登陆
      let result = await this.$API.reqSmsLogin({ phoneNumber, messageCode })
      // 根据请求的结果, 做不同响应处理
      if (result.code === 0) {
        const user = result.data
        this.$store.dispatch('saveUser', user) // 将user和token保存到state, 将token保存local
        // 跳转到个人中心
        this.$router.replace({ path: '/msite' })
      } else {
        MessageBox('提示', result.msg)
      }
    },

    updateCaptcha() {
      this.$refs.captcha.src = 'http://localhost:4000/captcha?time=' + Date.now()
    },
    change() {
      const locale = this.$i18n.locale === 'en' ? 'zh_CN' : 'en'
      this.$i18n.locale = locale
      localStorage.setItem('locale_key', locale)
    },
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl';

.loginContainer {
  width: 100%;
  height: 100%;
  background: #fff;

  .loginInner {
    padding-top: 60px;
    width: 80%;
    margin: 0 auto;

    .login_header {
      .login_logo {
        font-size: 30px;
        font-weight: bold;
        color: #686565;
        text-align: center;
        font-family: SourceHanSansCN-Medium;
      }

      .log_logo2 {
        font-size: 10px;
      }

      .login_header_title {
        padding-top: 40px;
        text-align: center;

        >a {
          color: #333;
          font-size: 14px;
          padding-bottom: 4px;

          &:first-child {
            margin-right: 40px;
          }

          &.on {
            color: #1577FF;
            font-weight: 700;
            border-bottom: 2px solid #1577FF;
          }
        }
      }
    }

    .login_content {
      >form {
        >div {
          display: none;

          &.on {
            display: block;
          }

          input {
            width: 100%;
            height: 100%;
            padding-left: 10px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: 0;
            font: 400 14px Arial;

            &:focus {
              border: 1px solid #1577FF;
            }
          }

          .login_message {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;
            border: none !important;
            outline: none !important;
            border-bottom: 1px solid #DDDDDD !important;
          }

          .login_verification {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;
            border: none !important;
            outline: none !important;
            border-bottom: 1px solid #DDDDDD !important;

            .get_verification {
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              border: 0;
              color: #ccc;
              font-size: 14px;
              background: transparent;
              border-radius: 16px;
              height: 32px;
              width: 110px;
              border: 1px solid #DDDDDD;

              &.right_phone_number {
                color: black;
              }
            }

            .switch_button {
              font-size: 12px;
              border: 1px solid #ddd;
              border-radius: 8px;
              transition: background-color 0.3s, border-color 0.3s;
              padding: 0 6px;
              width: 30px;
              height: 16px;
              line-height: 16px;
              color: #fff;
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);

              &.off {
                background: #fff;

                .switch_text {
                  float: right;
                  color: #ddd;
                }
              }

              &.on {
                background: #1577FF;
              }

              >.switch_circle {
                // transform translateX(27px)
                position: absolute;
                top: -1px;
                left: -1px;
                width: 16px;
                height: 16px;
                border: 1px solid #ddd;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                transition: transform 0.3s;

                &.right {
                  transform: translateX(27px);
                }
              }
            }
          }

          .login_hint {
            margin-top: 12px;
            color: #999;
            font-size: 14px;
            line-height: 20px;

            >a {
              color: #1577FF;
            }
          }
        }

        .login_submit {
          display: block;
          outline: none;
          width: 100%;
          height: 42px;
          margin-top: 30px;
          border-radius: 4px;
          background: linear-gradient(154deg, #7EB4FF 0%, #1577FF 100%);
          color: #fff;
          text-align: center;
          font-size: 16px;
          line-height: 42px;
          border: 0;
          border-radius: 24px;
        }
      }

      .about_us {
        display: block;
        font-size: 12px;
        margin-top: 20px;
        text-align: center;
        color: #999;
      }
    }

    .go_back {
      position: absolute;
      top: 5px;
      left: 5px;
      width: 30px;
      height: 30px;

      >.iconfont {
        font-size: 20px;
        color: #999;
      }
    }
  }
}

.logo {
  .img {
    display: block;
    width: 125px;
    height: 125px;
    margin: 0 auto;
    margin-top: 92.5px;
  }
}

.bottom {
  img {
    width: 100%;
    height: 187px;
  }
}

.PrePhoneNumber {
  display: inline-block;
  width: 10%;
  height: 48px;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  line-height: 22px;
  color: #333333;
  opacity: 1;
}

.placeholder {
  width: 80% !important;
  font-family: PingFangSC-Regular;
  border: none !important;
  outline: none !important;
}

input::-webkit-input-placeholder {
  color: #999999 !important;
  font-size: 16px !important;
}

input:-internal-autofill-selected {
  background: none !important;
  appearance: none !important;
}
</style>
