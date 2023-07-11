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
