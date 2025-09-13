<template>
  <header class="header"> 
    <div class="container nav">
      <div class="left">
        <a class="brand" href="#" @click.prevent="go('/')">
          <img src="/icons/RWA-logo.png" alt="Mortgage RWA" class="brand-logo" />
        </a>
        <nav class="menu" aria-label="Primary">
          <a href="#" @click.prevent="go('/home')">Home</a>
          <a href="#" @click.prevent="go('/projects')">Projects</a>
          <a href="#" @click.prevent="go('/portfolio')">Portfolio</a>
          <a href="#" @click.prevent="noop">More ▾</a>
        </nav>
      </div>

      <div class="right">
        <!-- Search -->
        <div class="search-wrapper">
          <form class="search-form" @submit.prevent="submitSearch">
            <input
              ref="searchInput"
              type="text"
              class="search-input"
              :class="{ expanded: searchOpen }"
              placeholder="Search..."
              v-model="searchText"
            />
            <button type="button" class="search-toggle" @click="toggleSearch">
              <img src="/icons/search-icon.png" alt="Search" />
            </button>
          </form>
        </div>
      
      <!-- User Auth Buttons -->
        <!-- <template v-if="isLoggedIn"> -->
          <button class="btn orange pill" @click.prevent="go('/wallet')">
            <img class="btn-icon" src="/icons/login-wallet-icon.png" alt="" />
            <span>Wallet</span>
          </button>

          <button class="btn light pill" @click.prevent="go('/profile')">
            <img class="btn-icon" src="/icons/user.png" alt="" />
          Profile</button>
      <!-- </template> -->
      <!-- <template v-else>
        <a class="btn ghost" href="#" @click.prevent="navigate('login')">Log in</a>
        <a class="btn orange" href="#" @click.prevent="navigate('signup')">Sign up</a>
      </template> -->
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  props: {},
  data(){
    return { searchOpen: false, searchText: '' }
  },
  methods: {
    noop(){},
    go(path){ this.$router.push(path); this.closeSearch(); },
    toggleSearch(){
      this.searchOpen = !this.searchOpen
      this.$nextTick(()=>{ if(this.searchOpen && this.$refs.searchInput) this.$refs.searchInput.focus() })
    },
    closeSearch(){
      this.searchOpen = false
      this.searchText = ''
    },
    submitSearch(){
      this.$emit('search', this.searchText)
    },
    onDocClick(e){
      const input = this.$refs.searchInput
      const btn = this.$el.querySelector('.search-toggle')
      if(!input) return
      if(this.searchOpen && !input.contains(e.target) && !btn.contains(e.target)){
        this.closeSearch()
      }
    },
    async connectWallet() {
      if (typeof window.ethereum !== "undefined") {
        try {
          // 请求用户授权
          const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
          this.account = accounts[0];
          console.log("钱包已连接：", this.account);
        } catch (error) {
          console.error("连接失败", error);
        } 
      } else {
        alert("请先安装 MetaMask 插件！");
      }
    },
    shortenAddress(addr) {
      return addr.slice(0, 6) + "..." + addr.slice(-4);
    }
  },
  mounted(){ document.addEventListener('click', this.onDocClick) },
  beforeUnmount(){ document.removeEventListener('click', this.onDocClick) }
}
</script>
<style scoped>
.icon-btn {
  margin-right: 10px;
  border: none;
  background: transparent;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
}
.icon-btn:focus { outline: 2px solid #94a3b8; outline-offset: 2px; }
</style>