<!-- src/views/SignupView.vue -->
<template>
  <div class="auth-card">
    <div class="auth-logo"><img src="/icons/RWA-logo.png" alt="Mortgage RWA" /></div>
    <h1 class="auth-title">Create an account</h1>
    <form class="auth-form" @submit.prevent="$emit('notify','Signed up (demo)')">
      <input type="email" class="input auth-input" placeholder="Enter your email" required />
      <button class="btn orange auth-submit" type="submit">Get started</button>
      <div class="auth-or"><span>OR</span></div>
      <button class="btn auth-social" type="button">
        <img class="btn-icon" src="/public/icons/google-logo.png" alt="Google" />
        Sign up with Google </button>
      <button class="btn auth-social" type="button">
        <img class="btn-icon" src="/public/icons/facebook-blue-logo.png" alt="Facebook" />
        Sign up with Facebook</button>
      <button class="btn auth-social" type="button">
        <img class="btn-icon" src="/public/icons/apple-black-logo.png" alt="Apple" />
        Sign up with Apple</button>
      <p class="auth-alt">Already have an account? <a href="#" class="auth-link" @click.prevent="$emit('navigate','login')">Log in</a></p>
    </form>
  </div>
</template>

<script>
export default { name: 'SignupView', emits: ['notify','navigate'] }
</script>
