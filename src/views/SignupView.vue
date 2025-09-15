<template>
  <div class="auth-card">
    <!-- 简单弹窗 -->
    <div v-if="showModal" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <h3>{{ modalTitle }}</h3>
          <p>{{ modalMessage }}</p>
          <button class="btn orange" @click="handleModalAction">{{ modalButtonText }}</button>
        </div>
      </div>
    </div>

    <div class="auth-logo"><img src="/icons/RWA-logo.png" alt="Mortgage RWA" /></div>
    <h1 class="auth-title">Create an account</h1>

    <form class="auth-form" @submit.prevent="submitSignup">
      <input
        v-model.trim="user_email"
        type="email"
        class="input auth-input"
        placeholder="Enter your email"
        required
      />
      <input
        v-model="user_password"
        type="password"
        class="input auth-input"
        placeholder="Enter your password"
        required
      />

      <div class="auth-row">
        <label class="auth-check">
          <input type="checkbox" v-model="agree" />
          <span>I agree to the Terms and Privacy Policy.</span>
        </label>
      </div>

      <button class="btn orange auth-submit" type="submit" :disabled="loading || !agree">
        {{ loading ? 'Creating...' : 'Get started' }}
      </button>

      <div class="auth-or"><span>OR</span></div>

      <!-- 第三方按钮先保留占位，避免 404 静态路径 -->
      <button class="btn auth-social" type="button">Sign up with Google</button>
      <button class="btn auth-social" type="button">Sign up with Facebook</button>
      <button class="btn auth-social" type="button">Sign up with Apple</button>

      <p class="auth-alt">
        Already have an account?
        <a href="#" class="auth-link" @click.prevent="$emit('navigate','login')">Log in</a>
      </p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SignupView',
  emits: ['notify','navigate'],
  data() {
    return {
      user_email: '',
      user_password: '',
      agree: true,
      loading: false,

      showModal: false,
      modalTitle: '',
      modalMessage: '',
      modalButtonText: '',
      modalAction: null
    };
  },
  methods: {
    async submitSignup() {
      if (!this.user_email || !this.user_password) {
        this.$emit('notify', 'Please enter email and password.');
        return;
      }
      if (!this.agree) {
        this.$emit('notify', 'Please agree to the terms to continue.');
        return;
      }
      this.loading = true;
      try {
        const { data } = await axios.post(
          import.meta.env.VITE_API_SIGNUP_URL,
          {
            user_email: this.user_email,
            user_password: this.user_password
          },
          { headers: { 'Content-Type': 'application/json' } }
        );

        // 按后端约定：status === 0 表示成功
        if (data.status === 0) {
          this.modalTitle = 'Signup Successful';
          this.modalMessage = data.message || 'You can log in now.';
          this.modalButtonText = 'Go to Login';
          this.modalAction = () => {
            this.showModal = false;
            this.$router.push('/login');
          };
        } else {
          this.modalTitle = 'Signup Failed';
          this.modalMessage = data.message || 'Signup failed, please try again.';
          this.modalButtonText = 'Close';
          this.modalAction = () => { this.showModal = false; };
        }
        this.showModal = true;
      } catch (error) {
        this.modalTitle = 'Signup Failed';
        this.modalMessage = error?.response?.data?.message || 'Network error, please try again later.';
        this.modalButtonText = 'Close';
        this.modalAction = () => { this.showModal = false; };
        this.showModal = true;
      } finally {
        this.loading = false;
      }
    },
    handleModalAction() {
      if (typeof this.modalAction === 'function') this.modalAction();
      else this.showModal = false;
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
.modal-mask {
  position: fixed; z-index: 9999; inset: 0; background: rgba(0,0,0,0.3);
  display: flex; align-items: center; justify-content: center;
}
.modal-container {
  background: #fff; border-radius: 10px; box-shadow: 0 2px 8px #aaa;
  padding: 32px 24px; min-width: 300px; max-width: 90vw; text-align: center;
}
.auth-title { margin: 16px 0 24px; font-size: 24px; font-weight: 600; color: #333; text-align: center; }
</style>
