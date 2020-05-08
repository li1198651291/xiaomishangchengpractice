import navData from './data/nav-data.js';
import categoryData from './data/category-data.js';
import flashData from "./data/flashsale-data.js";
import {  phoneData, hotData, movieData, intellHotData, afData, cxData } from './data/promo-data.js';

//搜索栏
var search = document.getElementById('search');
var hotWord = document.getElementsByClassName('search-hot-word')[0];
var searchBtn = document.querySelector('.search-btn');
search.addEventListener('focus',function(e) {
  hotWord.style.visibility = 'hidden';
  this.style.borderColor = '#ff6700';
  searchBtn.style.borderColor = '#ff6700';
})
search.addEventListener('blur',function(e) {
  if(!e.target.value) {
    hotWord.style.visibility = 'visible';
    this.style.borderColor = '#e0e0e0';
    searchBtn.style.borderColor = '#e0e0e0';
  }
})
//轮播
var slideShow = document.getElementsByClassName('slideshow');
var bullet = document.getElementsByClassName('pagination-bullet');
var slidetimer = setInterval(function() {
  slideNext()
},3000)
function slideNext() {
  var nextIndex = 0;
  for (let i = 0; i < slideShow.length; i++) {
    if(slideShow[i].classList.contains('opacity')) {
      slideShow[i].classList.remove('opacity');
      bullet[i].classList.remove('active');
      nextIndex = i + 1;
      if(nextIndex === 5) {
        nextIndex = 0
      }
      slideShow[nextIndex].classList.add('opacity');
      bullet[nextIndex].classList.add('active');
      break;
    }
  }
}
function slidePre() {
  var preIndex = 0;
  for (let i = 0; i < slideShow.length; i++) {
    if(slideShow[i].classList.contains('opacity')) {
      slideShow[i].classList.remove('opacity');
      bullet[i].classList.remove('active');
      preIndex = i - 1;
      if(preIndex === -1) {
        preIndex = 4
      }
      slideShow[preIndex].classList.add('opacity');
      bullet[preIndex].classList.add('active');
      break;
    }
  }
}
var pagination = document.getElementsByClassName('pagination')[0];

pagination.onclick = function(e) {
  if(e.target.tagName === 'A') {
    for (let i = 0; i < bullet.length; i++) {
      console.log(i)
      if(bullet[i] === e.target) {
        var active = document.getElementsByClassName('active')[0];
        var opacity = document.getElementsByClassName('opacity')[0];
        opacity.classList.remove('opacity');
        active.classList.remove('active');
        bullet[i].classList.add('active');
        slideShow[i].classList.add('opacity');
        console.log(i)
        break;
      }
    }
  }
}
var preBtn = document.getElementsByClassName('preBtn')[0];
var nextBtn = document.getElementsByClassName('nextBtn')[0];
preBtn.onclick = function() {
  slidePre();
}
nextBtn.onclick = function() {
  slideNext();
}
var slideshowWrapper = document.getElementsByClassName('slideshow-wrapper')[0];
slideshowWrapper.onmouseover = function() {
  clearInterval(slidetimer)
}
slideshowWrapper.onmouseleave = function() {
  slidetimer = setInterval(function() {
    slideNext()
  },3000)
}
//导航栏

var navItem = document.getElementsByClassName('nav-item');
               
function createNavChild(obj) {
  var itemChild = document.createElement('div');
  itemChild.innerHTML = `<ul class="child-list">
                        <li><a href="#"><div class="figure first"><img src=${obj.image[0]} alt="" width="160px" height="110px"></div><div class="title">${obj.name[0]}</div><p class="price">${obj.price[0]}</p></a></li>
                        <li><a href="#"><div class="figure"><img src=${obj.image[1]} alt="" width="160px" height="110px"></div><div class="title">${obj.name[1]}</div><p class="price">${obj.price[1]}</p></a></li>
                        <li><a href="#"><div class="figure"><img src=${obj.image[2]} alt="" width="160px" height="110px"></div><div class="title">${obj.name[2]}</div><p class="price">${obj.price[2]}</p></a></li>
                        <li><a href="#"><div class="figure"><img src=${obj.image[3]} alt="" width="160px" height="110px"></div><div class="title">${obj.name[3]}</div><p class="price">${obj.price[3]}</p></a></li>
                        <li><a href="#"><div class="figure"><img src=${obj.image[4]} alt="" width="160px" height="110px"></div><div class="title">${obj.name[4]}</div><p class="price">${obj.price[4]}</p></a></li>
                        <li><a href="#"><div class="figure"><img src=${obj.image[5]} alt="" width="160px" height="110px"></div><div class="title">${obj.name[5]}</div><p class="price">${obj.price[5]}</p></a></li>
                      </ul>`;
  itemChild.className = 'item-child';  
  return itemChild;
}

navItem[0].appendChild(createNavChild(navData.小米手机));
navItem[1].appendChild(createNavChild(navData.Redmi));
navItem[2].appendChild(createNavChild(navData.电视));
navItem[3].appendChild(createNavChild(navData.笔记本));
navItem[4].appendChild(createNavChild(navData.家电));
navItem[5].appendChild(createNavChild(navData.路由器));
navItem[6].appendChild(createNavChild(navData.智能硬件));

//生成左侧选项卡结构
{/* <div class="children">
  <div class="children-item"><a href="#"><img src="./image/category/黑鲨3.jpg" alt="" width="40" height="40"><span>腾讯黑鲨游戏手机3</span></a></div>
</div> */}

var categoryItem = document.getElementsByClassName('category-item');
function createCategoryChild(obj) {
  var children = document.createElement('div');
  var len = obj.name.length;
  for (let i = 0; i < len; i++) {
    var childrenItem = document.createElement('div');
    childrenItem.innerHTML = `<a href="#"><img class="category-child-img" src=${obj.url[i]} alt="" width="40" height="40"><span class="category-child-name">${obj.name[i]}</span></a>`;
    childrenItem.className = 'children-item';
    children.appendChild(childrenItem);//是否影响性能，需不需要fragment？？？
  }
  children.className = 'children';
  return children;
}
for (let i = 0; i < categoryItem.length; i++) {
  categoryItem[i].appendChild(createCategoryChild(categoryData[i]))
}

//闪购轮播
var flashsaleList = document.getElementsByClassName('flashsale-list')[0];
function createFlashsaleItem(arr) {
  var ul = document.createElement('ul');
  ul.className = 'swiper-wrapper';
  var len = arr.length;
  for (let i = 0; i < len; i++) {
    var swiperItem = document.createElement('li');
    swiperItem.className = `${i}-item swiper-item`;
    var left = i * (234 + 14) + 14
    swiperItem.style.left = `${left}px`
    swiperItem.innerHTML = `<a href="#">
                              <div class="content">
                                <div class="thumb">
                                  <img src=${arr[i].url} alt=${arr[i].title} width="160" height="160">
                                </div>
                                <h3 class="title">${arr[i].title}</h3>
                                <p class="desc">${arr[i].desc}</p>
                                <p class="price">
                                  <span>${arr[i].priceNew}</span>元
                                  <span class="del">${arr[i].price}</span>
                                </p>
                              </div>
                            </a>`
    ul.appendChild(swiperItem);
  }
  return ul;
}
flashsaleList.appendChild(createFlashsaleItem(flashData))
var swiperItem = document.getElementsByClassName('swiper-item');
var swiperPre = document.getElementsByClassName('swiper-pre')[0];
var swiperNext = document.getElementsByClassName('swiper-next')[0];
swiperItem[0].className += ' swiper-active-item';

function moveNext() {
  var swiperWrapper= document.getElementsByClassName('swiper-wrapper')[0];
  var swiperActiveItem = document.querySelector('.swiper-active-item');
  var index = parseInt(swiperActiveItem.classList) + 4;
  swiperPre.classList.remove('disable');
  if(index >= flashData.length - 1 - (flashData.length - 1) % 4) {
    index = flashData.length - 1 - (flashData.length - 1) % 4;
    swiperNext.className += ' disable';
  }
  swiperActiveItem.classList.remove('swiper-active-item');
  swiperItem[index].className += ' swiper-active-item';
  var moveDis = -(parseInt(swiperItem[index].style.left) - 14);
  swiperWrapper.style.transform = `translateX(${moveDis}px)`;
}
function movePre() {
  var swiperWrapper= document.getElementsByClassName('swiper-wrapper')[0];
  var swiperActiveItem = document.querySelector('.swiper-active-item');
  var index = parseInt(swiperActiveItem.classList) - 4;
  swiperNext.classList.remove('disable')
  if(index <= 0) {
    index = 0;
    swiperPre.className += ' disable';
  }
  swiperActiveItem.classList.remove('swiper-active-item');
  swiperItem[index].className += ' swiper-active-item';
  var moveDis = -(parseInt(swiperItem[index].style.left) - 14);
  swiperWrapper.style.transform = `translateX(${moveDis}px)`;
}
swiperNext.onclick = function() {
  if(!swiperNext.classList.contains('disable')) {
    moveNext()
  }
}
swiperPre.onclick = function() {
  if(!swiperPre.classList.contains('disable')) {
    movePre()
  } 
}
var direction = 'right';
var swiperTimer = setInterval(function() {
  if(direction === 'right') {
    if(swiperNext.classList.contains('disable')) {
      direction = 'left';
      movePre()
      return;
    }
    moveNext() 
  } else {
    if(swiperPre.classList.contains('disable')) {
      direction = 'right';
      moveNext() 
      return
    }
    movePre()
  }
}, 4000)
flashsaleList.onmouseover = function() {
  clearInterval(swiperTimer);
}
flashsaleList.onmouseleave = function() {
  swiperTimer = setInterval(function() {
    if(direction === 'right') {
      if(swiperNext.classList.contains('disable')) {
        direction = 'left';
        movePre()
        return;
      }
      moveNext() 
    } else {
      if(swiperPre.classList.contains('disable')) {
        direction = 'right';
        moveNext() 
        return
      }
      movePre()
    }
  }, 4000)
}
//生成展览区域
class Promo {
  constructor(id, data) {
    var container = document.getElementById(id);
    this.container = container;
    this.mainData = data.mainData;
    this.minerData = data.minerData;
    this.title = data.title;
  }
  createItem() {
    var fragment = document.createDocumentFragment();
    for (let i = 0; i < this.mainData.length; i++) {
      var brickItem = document.createElement('div');
      brickItem.className = `brick-item`;
      brickItem.innerHTML = `<a href="#">
                                <div class="content">
                                  <div class="thumb">
                                    <img src=${this.mainData[i].url} alt=${this.mainData[i].title} width="160" height="160">
                                  </div>
                                  <h3 class="title">${this.mainData[i].title}</h3>
                                  <p class="desc">${this.mainData[i].desc}</p>
                                  <p class="price">
                                    <span>${this.mainData[i].priceNew}</span>元
                                    <span class="del">${this.mainData[i].price}</span>
                                  </p>
                                </div>
                              </a>`
      fragment.appendChild(brickItem);
    }
    var containerS = document.createElement('div');
    if(this.minerData) {
      var brickItemS = document.createElement('div');
      brickItemS.className = `brick-item brick-item-s`;
      brickItemS.innerHTML = `<a href="#">
                                <div class="figure-s">
                                  <img src=${this.minerData.url} alt="" width="80" height="80"/>
                                </div>
                                <h3 class="title">${this.minerData.title}</h3>
                                <p class="price">${this.minerData.price}</p>
                              </a>`
      containerS.appendChild(brickItemS);                        
    }
    if(this.title) {
      var moreItem = document.createElement('div');
      moreItem.className = `brick-item brick-item-s`;
      moreItem.innerHTML = `<a href="#">
                                <div class="figure-more">
                                  <img src="./image/右箭头.png" alt="" width="46" height="46"/>
                                </div>
                                <div class="more">浏览更多<span>${this.title}</span></div>
                              </a>`
      containerS.appendChild(moreItem);        
    }
    fragment.appendChild(containerS);
    this.container.appendChild(fragment);
  }
}
var phonePromo = new Promo('phone-promo', phoneData);
phonePromo.createItem();
var hotPromo = new Promo('hot-promo', hotData);
hotPromo.createItem();
var hotPromo = new Promo('movie-promo', movieData);
hotPromo.createItem();
var intellPromo = new Promo('intell-promo', intellHotData);
intellPromo.createItem();
var afPromo = new Promo('af-promo', afData);
afPromo.createItem();
var cxPromo = new Promo('cx-promo', cxData);
cxPromo.createItem();
var rimPromo = new Promo('rim-promo', hotData);
rimPromo.createItem();
var rimcxPromo = new Promo('rim-cx-promo', cxData);
rimcxPromo.createItem();
//展览区域切换控制

function toggle(list, item) {
  var promoBtnParent = document.getElementById(list);
  var item = document.getElementById(item);

  for (let i = 0; i < promoBtnParent.children.length; i++) {
    promoBtnParent.children[i].onmouseover = function() {
      if(this.className === 'tab-active') {
      } else {
        var activeItem = promoBtnParent.getElementsByClassName('tab-active');
        var show = item.getElementsByClassName('show');
        for (let j = 0; j < activeItem.length; j++) {
          activeItem[j].classList.remove('tab-active');
          show[j].classList.remove('show');
        }
        this.className = 'tab-active';
        item.children[i].classList.add('show');
      }
    }
  }
}
toggle('appliances-list', 'appliances');
toggle('intelligence-list', 'intelligence');
toggle('rim-list', 'rim');