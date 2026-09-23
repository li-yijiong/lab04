const themeBtn = document.getElementById('themeBtn');
const html = document.documentElement;

// 页面加载时读取本地保存的主题
const savedTheme = localStorage.getItem('theme');
if(savedTheme === 'light'){
  html.classList.add('light');
}

themeBtn.addEventListener('click', function(){
  html.classList.toggle('light');
  // 保存主题到本地存储，刷新不会丢失
  if(html.classList.contains('light')){
    localStorage.setItem('theme','light');
  }else{
    localStorage.setItem('theme','dark');
  }
})
