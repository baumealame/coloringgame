      window.addEventListener('load', () => {
  // 'fill-block' 클래스를 가진 요소를 찾습니다.
  const fillBlockElements = document.querySelectorAll('.fill-block');

  // 각 요소를 순회하면서 배경색을 설정합니다.
  fillBlockElements.forEach((element) => {
    element.setAttribute('fill', '#f3f2ea');
  });
});
      
      
      const svgImage = document.getElementById('svg-image');
      const colorPicker = document.getElementById('color-picker');
      const colorSwatches = document.querySelectorAll('.color-swatch');
      const resetButton = document.getElementById('reset-button');
      const saveButton = document.getElementById('save-button');

      let selectedColor = '#f3f2ea'; 
      
              
      // 컬러 팔레트의 스와치를 클릭하면 해당 색상을 선택한 색상으로 설정합니다.
      colorSwatches.forEach((swatch) => {
        swatch.addEventListener('click', () => {
          selectedColor = swatch.style.backgroundColor;
        });
      });
      

      colorPicker.addEventListener('change', (event) => {
        selectedColor = event.target.value;
      });

      
      svgImage.addEventListener('click', (event) => {
        const targetTagName = event.target.tagName;
        const targetClassList = event.target.classList;
        const isFillBlockElement =
          (targetTagName === 'path' ||
            targetTagName === 'rect' ||
           targetTagName === 'ellipse' ||
           targetTagName === 'polygon' ||
            targetTagName === 'line' ||
            targetTagName === 'circle') &&
          targetClassList.contains('fill-block');     
          
        if (isFillBlockElement) {
          event.target.setAttribute('fill', selectedColor);
        }
      });

      resetButton.addEventListener('click', () => {
        const paths = svgImage.getElementsByTagName('path');
        const rects = svgImage.getElementsByTagName('rect');
        const circles = svgImage.getElementsByTagName('circle');
        const lines = svgImage.getElementsByTagName('line');
        const ellipses = svgImage.getElementsByTagName('ellipse');
        const polygons = svgImage.getElementsByTagName('polygon');

        for (let path of paths) {
          if (path.classList.contains('fill-block')) {
            path.setAttribute('fill', '#f3f2ea');
          } else {
            path.removeAttribute('fill');
          }
        }
          
        for (let line of lines) {
          if (line.classList.contains('fill-block')) {
            line.setAttribute('fill', '#f3f2ea');
          } else {
            line.removeAttribute('fill');
          }
        }
          
        for (let rect of rects) {
          if (rect.classList.contains('fill-block')) {
            rect.setAttribute('fill', '#f3f2ea');
          } else {
            rect.removeAttribute('fill');
          }
        }

        for (let circle of circles) {
          if (circle.classList.contains('fill-block')) {
            circle.setAttribute('fill', '#f3f2ea');
          } else {
            circle.removeAttribute('fill');
          }
        }
          
        for (let ellipse of ellipses) {
          if (ellipse.classList.contains('fill-block')) {
            ellipse.setAttribute('fill', '#f3f2ea');
          } else {
            ellipse.removeAttribute('fill');
          }
        }
          
        for (let polygon of polygons) {
          if (polygon.classList.contains('fill-block')) {
            polygon.setAttribute('fill', '#f3f2ea');
          } else {
            polygon.removeAttribute('fill');
          }
        }
          
      });
      
      
saveButton.addEventListener('click', () => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const svgData = new XMLSerializer().serializeToString(svgImage);
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  context.putImageData(imageData, 0, 0);

  const image = new Image();
  image.onload = () => {
    // 원래 크기의 3배로 설정
    canvas.width = image.width * 3;
    canvas.height = image.height * 3;
    // 안티앨리어싱이 적용
    context.imageSmoothingEnabled = true;
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    // 이미지를 Base64 데이터 URL로 변환
    const dataURL = canvas.toDataURL('image/jpeg', 1.0);

    // 사용자 에이전트 확인
    const userAgent = navigator.userAgent.toLowerCase();

    if (userAgent.indexOf('android') !== -1) {
      // 안드로이드 기기에서 실행 중인 경우
      if (typeof window.Android !== 'undefined' && typeof window.Android.saveImageToAlbum === 'function') {
        // 모바일 사진 앨범에 저장
        window.Android.saveImageToAlbum(dataURL);
      }
    } else if (userAgent.indexOf('iphone') !== -1 || userAgent.indexOf('ipad') !== -1 || userAgent.indexOf('ipod') !== -1) {
      // 아이폰 또는 아이패드에서 실행 중인 경우
      // 이미지를 새 창으로 열기
      const newWindow = window.open();
      newWindow.document.write('<img src="' + dataURL + '" alt="컬러링_제주잠녀항쟁" style="max-width: 100%; height: auto;" />');
    } else {
      // 데스크탑 또는 다른 모바일 기기에서 실행 중인 경우
      // JPG 형식으로 이미지 다운로드
      const downloadLink = document.createElement('a');
      downloadLink.href = dataURL;
      downloadLink.download = '컬러링_제주잠녀항쟁.jpg';
      downloadLink.click();
    }
  };

  image.src = 'data:image/svg+xml;base64,' + btoa(svgData);
});

    /*        
        // JPG 형식으로 이미지를 다운로드
        const downloadLink = document.createElement('a');
        downloadLink.href = canvas.toDataURL('image/jpeg', 1.0);
        downloadLink.download = 'coloring.jpg';
        downloadLink.click();
            
        // 모바일 사진 앨범에 저장
        if (typeof window.Android !== 'undefined' && typeof window.Android.saveImageToAlbum === 'function') {
          window.Android.saveImageToAlbum(downloadLink.href);
        }
*/
