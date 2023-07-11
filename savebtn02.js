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
      newWindow.document.write('<img src="' + dataURL + '" alt="플로렌스나이팅게일" style="max-width: 100%; height: auto;" />');
    } else {
      // 데스크탑 또는 다른 모바일 기기에서 실행 중인 경우
      // JPG 형식으로 이미지 다운로드
      const downloadLink = document.createElement('a');
      downloadLink.href = dataURL;
      downloadLink.download = '플로렌스나이팅게일.jpg';
      downloadLink.click();
    }
  };

  image.src = 'data:image/svg+xml;base64,' + btoa(svgData);
});