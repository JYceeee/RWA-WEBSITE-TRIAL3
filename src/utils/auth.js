// src/utils/auth.js

const AUTH_EVENT = 'auth-changed';

export function setAuth() {
  // 只记录登录状态，不再存 token
  localStorage.setItem('isLoggedIn', 'true');

  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function clearAuth() {
  localStorage.setItem('isLoggedIn', 'false');

  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function isLoggedIn() {
  return localStorage.getItem('isLoggedIn') === 'true';
}

// 保留接口，但始终返回空
export function getToken() {
  return '';
}

export const AUTH_CHANGED_EVENT = AUTH_EVENT;
