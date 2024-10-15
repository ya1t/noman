let savedPattern = []; // 저장된 패턴을 보관하는 배열

// 그리드를 생성하는 함수
document.getElementById('generate').addEventListener('click', function () {
  const beadPatternDiv = document.getElementById('initial-pattern'); // 초기 패턴 표시 영역
  const beadCount = parseInt(document.getElementById('bead-count').value); // 열 개수
  const rowsCount = parseInt(document.getElementById('rows-count').value); // 행 개수

  const colors = [
    document.getElementById('selected-color-1').value,
    document.getElementById('selected-color-2').value,
    document.getElementById('selected-color-3').value,
    document.getElementById('selected-color-4').value,
    document.getElementById('selected-color-5').value,
  ];

  let currentColor = colors[0];
  let isMouseDown = false; // 마우스 클릭 상태 확인

  // 초기 패턴 그리드 초기화
  beadPatternDiv.innerHTML = '';
  beadPatternDiv.style.gridTemplateColumns = `repeat(${beadCount}, 20px)`; // 열에 맞게 그리드 설정

  // 패턴 저장 배열 초기화
  savedPattern = [];

  // 그리드 생성
  for (let i = 0; i < rowsCount; i++) {
    let row = []; // 각 행을 저장할 배열
    for (let j = 0; j < beadCount; j++) {
      const bead = document.createElement('div');
      bead.className = 'bead';
      bead.style.backgroundColor = 'white'; // 초기 색상

      // 클릭하여 색칠
      bead.addEventListener('click', function () {
        bead.style.backgroundColor = currentColor;
        row[j] = currentColor; // 색상을 저장
        updateBeadTotals('initial'); // 초기 패턴 비즈 개수 업데이트
      });

      // 드래그하여 색칠
      bead.addEventListener('mousedown', function () {
        isMouseDown = true;
        bead.style.backgroundColor = currentColor;
        row[j] = currentColor; // 색상을 저장
        updateBeadTotals('initial');
      });

      bead.addEventListener('mouseover', function () {
        if (isMouseDown) {
          bead.style.backgroundColor = currentColor;
          row[j] = currentColor; // 색상을 저장
          updateBeadTotals('initial');
        }
      });

      // 마우스 클릭 해제
      bead.addEventListener('mouseup', function () {
        isMouseDown = false;
      });

      // 그리드에 비즈 추가
      beadPatternDiv.appendChild(bead);
    }
    savedPattern.push(row); // 행을 패턴 배열에 추가
  }

  // 마우스 클릭 해제 이벤트
  document.addEventListener('mouseup', function () {
    isMouseDown = false;
  });

  // 색상 선택 이벤트
  document.getElementById('selected-color-1').addEventListener('click', () => {
    currentColor = colors[0];
  });
  document.getElementById('selected-color-2').addEventListener('click', () => {
    currentColor = colors[1];
  });
  document.getElementById('selected-color-3').addEventListener('click', () => {
    currentColor = colors[2];
  });
  document.getElementById('selected-color-4').addEventListener('click', () => {
    currentColor = colors[3];
  });
  document.getElementById('selected-color-5').addEventListener('click', () => {
    currentColor = colors[4];
  });
});

// 패턴 저장 버튼
document.getElementById('save-pattern').addEventListener('click', function () {
  if (savedPattern.length > 0) {
    alert('Pattern saved!');
  } else {
    alert('No pattern to save!');
  }
});

// 비즈 개수 업데이트 함수
function updateBeadTotals(type) {
  let beadTotals = {}; // 초기화
  let beads;
  let totalBeadsList;

  // 그리드에 있는 비즈 색상 계산
  if (type === 'initial') {
    beads = document.querySelectorAll('#initial-pattern .bead');
    totalBeadsList = document.getElementById('initial-total-beads');
  } else if (type === 'final') {
    beads = document.querySelectorAll('#final-pattern .bead');
    totalBeadsList = document.getElementById('final-total-beads');
  }

  beads.forEach((bead) => {
    const color = bead.style.backgroundColor;
    if (!beadTotals[color]) {
      beadTotals[color] = 0;
    }
    beadTotals[color]++;
  });

  // 색상 별 총 비즈 개수 표시
  totalBeadsList.innerHTML = '';
  for (const [color, count] of Object.entries(beadTotals)) {
    const listItem = document.createElement('li');
    const colorSample = document.createElement('span');
    colorSample.className = 'color-sample';
    colorSample.style.backgroundColor = color;
    listItem.appendChild(colorSample);
    listItem.appendChild(document.createTextNode(`${count} beads`));
    totalBeadsList.appendChild(listItem);
  }
}

// 최종 패턴 생성
document.getElementById('create-final-pattern').addEventListener('click', function () {
  const repeatCount = parseInt(document.getElementById('repeat-count').value); // 반복 횟수
  const finalPatternDiv = document.getElementById('final-pattern'); // 최종 패턴 표시 영역

  if (savedPattern.length === 0) {
    alert('No pattern saved yet!');
    return;
  }

  const beadCount = savedPattern[0].length; // 저장된 패턴의 열 수
  const rowsCount = savedPattern.length; // 저장된 패턴의 행 수

  // 최종 패턴 그리드 초기화
  finalPatternDiv.innerHTML = '';
  finalPatternDiv.style.gridTemplateColumns = `repeat(${beadCount}, 20px)`; // 열에 맞게 그리드 설정

  // 저장된 패턴을 세로로 반복하여 그리드 생성
  for (let r = 0; r < repeatCount; r++) {
    for (let i = 0; i < rowsCount; i++) {
      for (let j = 0; j < beadCount; j++) {
        const bead = document.createElement('div');
        bead.className = 'bead';
        bead.style.backgroundColor = savedPattern[i][j]; // 저장된 패턴을 반복
        finalPatternDiv.appendChild(bead);
      }
    }
  }

  // 최종 패턴에 필요한 비즈 개수 업데이트
  updateBeadTotals('final');
});

// PDF 다운로드 기능 추가
document.getElementById('download-pdf').addEventListener('click', function () {
  const pageContent = document.body; // 페이지 전체를 캡처

  const options = {
    margin: 0.5,
    filename: 'pattern.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
  };

  // 페이지 전체를 PDF로 변환
  html2pdf().from(pageContent).set(options).save();
});

// JPG 다운로드 기능 추가
document.getElementById('download-jpg').addEventListener('click', function () {
  const pageContent = document.body; // 페이지 전체를 캡처

  // html2canvas를 사용하여 페이지를 캡처
  html2canvas(pageContent, { scale: 2 }).then(function (canvas) {
    canvas.toBlob(function (blob) {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'pattern.jpg'; // 파일명 설정
      link.click(); // 다운로드 실행
    }, 'image/jpeg', 1.0); // 이미지 형식과 품질 설정
  });
});
