<template>
  <div class="auth-card">
    <div class="auth-logo"><img src="/icons/signup-icon1.png" alt="Mortgage RWA" /></div>
    <h1 class="auth-title">Log in to your account</h1>
    <p class="auth-sub">Welcome back! Please enter your details.</p>

    <form class="auth-form" @submit.prevent="submitLogin">
      <label for="lemail" class="auth-label">Email</label>
      <input
        id="lemail"
        type="email"
        class="input auth-input"
        placeholder="Enter your email"
        v-model.trim="user_email"
        required
      />

      <label for="lpass" class="auth-label">Password</label>
      <input
        id="lpass"
        type="password"
        class="input auth-input"
        placeholder="••••••••"
        v-model="user_password"
        required
      />

      <div class="auth-row">
        <label class="auth-check">
          <input type="checkbox" v-model="remember" />
          <span>Remember for 30 days</span>
        </label>
        <a href="#" class="auth-link" @click.prevent="$emit('navigate','forgot')">Forgot password</a>
      </div>

      <button class="btn orange auth-submit" type="submit" :disabled="loading">
        {{ loading ? 'Logging in...' : 'Log in' }}
      </button>

      <p class="auth-alt">
        Don’t have an account?
        <a href="#" class="auth-link" @click.prevent="$emit('navigate','signup')">Sign up</a>
      </p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginView',
  emits: ['notify','navigate'],
  data() {
    return {
      user_email: '',
      user_password: '',
      remember: true,
      loading: false
    }
  },
  methods: {
    async submitLogin() {
      if (!this.user_email || !this.user_password) {
        this.$emit('notify', 'Please enter email and password.');
        return;
      }
      this.loading = true;
      try {
        const { data } = await axios.post(
          import.meta.env.VITE_API_LOGIN_URL,
          {
            user_email: this.user_email,
            user_password: this.user_password
          },
          { headers: { 'Content-Type': 'application/json' } }
        );

        if (data.status === 0) {
          // 1) 保存 token（可能已含 "Bearer " 前缀）
          if (data.token) {
            localStorage.setItem('token', data.token);
            axios.defaults.headers.common['Authorization'] = data.token; // 不要重复拼 Bearer
          }
          // 记住邮箱（可选）
          if (this.remember) localStorage.setItem('remember_email', this.user_email);

          // 3) 标记登录态
          localStorage.setItem('isLoggedIn', 'true');
          
          // 4) 提示并跳转（如果你的路由实际是 /homeview，就改成 '/homeview'）
          this.$emit('notify', data.message || 'Login success!');
          this.$router.push('/home');
        } else {
          // 登录失败：弹窗提示
          alert('Wrong email or password. Please check if you have registered this email.');
        }
      } catch (err) {
        // 这里不要用错误的 $emit 事件名；给出“登录失败/网络错误”的友好提示
        const msg = err?.response?.data?.message;
        // if (msg && /password|email|credential/i.test(msg)) {
        //   alert('邮箱或密码不正确，请检查是否已注册该邮箱');
        // } else {
        //   this.$emit('notify', msg || 'Network Error. Please try again later.');
        // }
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
.auth-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px #eee;
  padding: 32px;
  min-width: 340px;
  max-width: 400px;
}
.auth-title { color: #000; }
</style>
