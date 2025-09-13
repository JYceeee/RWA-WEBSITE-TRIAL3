<template>
  <div class="auth-card">
    <div class="auth-logo"><img src="/icons/signup-icon1.png" alt="Mortgage RWA" /></div>
    <h1 class="auth-title">Log in to your account</h1>
    <p class="auth-sub">Welcome back! Please enter your details.</p>
    <!-- <div class="auth-tabs">
      <a href="#" class="auth-tab" @click.prevent="$emit('navigate','signup')">Sign up</a>
      <span class="auth-tab active">Log in</span>
    </div> -->
    <form class="auth-form" @submit.prevent="$emit('notify','Logged in (demo)')">
      <label for="lemail" class="auth-label">Email</label>
      <input id="lemail" type="email" class="input auth-input" placeholder="Enter your email" required />
      <label for="lpass" class="auth-label">Password</label>
      <input id="lpass" type="password" class="input auth-input" placeholder="••••••••" required />
      <div class="auth-row">
        <label class="auth-check"><input type="checkbox" /> <span>Remember for 30 days</span></label>
        <a href="#" class="auth-link">Forgot password</a>
      </div>
      <button class="btn orange auth-submit" type="submit">Sign in</button>
      <button class="btn auth-social" type="button">Sign in with Google</button>
      <p class="auth-alt">Don’t have an account? <a href="#" class="auth-link" @click.prevent="$emit('navigate','signup')">Sign up</a></p>
    </form>
  </div>
</template>

<script>
export default { name: 'LoginView', emits: ['notify','navigate'] }
</script>
