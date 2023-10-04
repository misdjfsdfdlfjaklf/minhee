$(function () {
    const menu = $('header ul li')
    const content = $('main .section')
    // console.log(menu)
    // console.log(content)
    
    // --------------메뉴 클릭했을때 위치, on 
    menu.click(function (e) {
        e.preventDefault();
        $(this).addClass('on')
        $(this).siblings().removeClass('on')
    
        const idx = $(this).index();
        // console.log(idx)
    
        const section = content.eq(idx)
        console.log(section)
    
        let sectionDistance = section.offset().top
        $('html, body').animate({
            scrollTop: sectionDistance
        }, 1000)
    })
    
    // 윈도우 스크롤을 했을때 
    $(window).scroll(function () {
        content.each(function () {
            if ($(this).offset().top <= $(window).scrollTop() +100 ) {
                const idx = $(this).index()
                menu.removeClass('on')
                menu.eq(idx).addClass('on')
            }
        })
    })
    })


    // header bg
    $(function(){
      const header = $('header'),
              page = $('#profile'),
              pageOffsetTop = page.offset().top;
              
  
      // $(window).resize(function(){
      //     pageOffsetTop = page.offset().top;
      // })
  
  
      $(window).scroll(function(){
          const scrolled = $(window).scrollTop() >= pageOffsetTop
          header.toggleClass('down',scrolled)
      })
  })


    // 꽃잎 효과
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    
    window.addEventListener("resize", resizeCanvas);
    const canvas = document.getElementById("effectimg");
    const ctx = canvas.getContext("2d");
    const imgCnt = 10;                  // 표시할 꽃잎 이미지 갯수 //
    const aryImg = [];
    const aryCloud = [];
    const effectimgw = 2000;               // canvas의 가로 크기 //
    const effectimgh = 1000;               // canvas의 세로 크기 //
    const imgBaseSizeW = 20;            // 꽃잎 이미지의 가로 사이즈 //
    const imgBaseSizeH = 24;            // 꽃잎 이미지의 세로 사이즈 //
    const aspectMax = 2.5;
    const aspectMin = 0.5;
    const speedMax = 1.0;              // 최대 속도값 //
    const speedMin = 0.5;              // 최소 속도값 //
    const wind = 100;
    const img = new Image();
    img.src = "../images/effect.png";
    img.onload = () => {
      resizeCanvas();
      flow_start();
    };
    
    function setImagas() {
      let aspect = 0;
      for (let i = 0; i < imgCnt; i++) {
        aspect = Math.random() * (aspectMax - aspectMin) + aspectMin;
        aryImg.push({
          "posx": Math.random() * effectimgw,
          "posy": Math.random() * effectimgh,
          "sizew": imgBaseSizeW * aspect,
          "sizeh": imgBaseSizeH * aspect,
          "speedy": Math.random() * (speedMax - speedMin) + speedMin,
          "angle": Math.random() * 360,
        });
      }
    }
    
    let idx = 0;
    let idxc = 0;
    let cos = 0;
    let sin = 0;
    const rad = Math.PI / 180;
    function flow() {
      ctx.clearRect(0, 0, effectimgw, effectimgh);
      for (idx = 0; idx < imgCnt; idx++) {
        aryImg[idx].posx += wind / aryImg[idx].sizew;
        aryImg[idx].posy += aryImg[idx].speedy;
        (idx % 2) ? aryImg[idx].angle += 1 : aryImg[idx].angle -= 1;
        cos = Math.cos(aryImg[idx].angle * rad);
        sin = Math.sin(aryImg[idx].angle * rad);
        ctx.setTransform(cos, sin, sin, cos, aryImg[idx].posx, aryImg[idx].posy);
        ctx.drawImage(img, 0, 0, aryImg[idx].sizew, aryImg[idx].sizeh);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        if (aryImg[idx].posy >= effectimgh) {
          aryImg[idx].posy = -aryImg[idx].sizeh;
          if (imgCnt < idx) {
            aryImg.splice(idx, 1);
          }
        }
        if (aryImg[idx].posx >= effectimgw) {
          aryImg[idx].posx = -aryImg[idx].sizew;
          if (imgCnt < idx) {
            aryImg.splice(idx, 1);
          }
        }
      }
      for (idxc = 0; idxc < aryCloud.length; idxc++) {
        ctx.drawImage(aryCloud[idxc].img, aryCloud[idxc].posx, aryCloud[idxc].posy, aryCloud[idxc].img.width, aryCloud[idxc].img.height);
        aryCloud[idxc].posx += aryCloud[idxc].speed / 15;
        if (aryCloud[idxc].posx > effectimgw) {
          aryCloud[idxc].posx = -aryCloud[idxc].img.width;
        }
      }
    }
    function flow_start() {
      setImagas();
      setInterval(flow, 10);
    }

    // content 영역
    $(document).ready(function () {
      $(".slide_list").bxSlider({
          auto: true,
          pager: false,
          controls: true,
          autoControls: false,
          minSlides: 1,
          maxSlides: 4,
          moveSlides: 1,
          slideWidth: 285,
          slideMargin: 20,
          autoHover: true,
      });
  });