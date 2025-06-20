export const questions = {

qi1: {
  text: "결정을 앞둔 선택지[명제]가 있는가?", x: "50%", y: "86%",
  options: {
  O: "qi2",
  "...": "qi2",
  X: "q100",
  }},
qi2: { text: "적절한 선택인지 점검이 필요한가?", x: "50%", y: "80%",
      options: {
      O: "qi3",
      "...": "qi1",
      X: "q100"    
   }},
qi3: {
  text: "선택 점검에 할애할 시간은 얼마인가?", x: "50%", y: "72%",
  options: {
    "l": { action: "decreaseTime" },
    current: { action: "startTimer" , next: "qa1m"}, // default display, controlled by state
    "r": { action: "increaseTime" }
  }
},

qa1m: { 
  text: "자원* 소모가 적절한 수준인가?", x: "41%", y: "63%",
  explanation: "*재화/시간/체력",
    options: {
    O: "qb1m",
    menu: {
      label: "☰",
      children: {
        "...": "qa2",
        "-": "qb1m"
      }},
    X: "qb1m",
    }},
  qa2: { text: "재화 소모가 적절한 수준인가?", x: "30%", y: "63.5%",
    options: {
    O: "qa3",
    "-": "qa3",
    X: "qa3",
    }},
  qa3: { text: "시간 소모가 적절한 수준인가?", x: "31%", y: "59%",
    options: {
    O: "qa4",
    "-": "qa4",
    X: "qa4",
    }},
  qa4: { text: "체력 소모가 적절한 수준인가?", x: "32.5%", y: "54%",
    options: {
    O: "qb1m",
    "-": "qb1m",
    X: "qb1m",
    }},
  qa2_ex: { 
    text: ["당위 당 단가는 저렴한가?",
    "사용 빈도/기대 수명 대비 가격은 적절한가?",
    "부가적인 비용은 포함되어 있는가?"],
    x: "20%", y: "63.2%"
  },
  qa3_ex: { 
    text: ["부차적인 시간이 들지는 않는가?"],
    x: "20%", y: "58%"
  },
  qa4_ex: { 
    text: ["컨디션에 무리가 없는가?", "이후 회복에 자원이 많이 소모되지 않는가?", "체력 소모 대비 충분한 결과인가?"],
    x: "22%", y: "52%"
  },

qb1m: { text: "맥락*에 부합하는 선택인가?", x: "44%", y: "54%",
  explanation:"*현재 상황/사회적 기대",
  options: {
    O: "qc1m",
    menu: {
      label: "☰",
      children: {
        "...": "qb2",
        "-": "qc1m"
      }},
    X: "qc1m",
    }},
  qb2: { text: "현재 상황에 맞는 선택인가?", x: "35%", y: "48%",
  options: {
    O: "qb3",
   "-": "qb3",
    X: "qb3",
    }},
  qb3: { text: "사회적 기대에 부합하는 선택인가?", x: "38%", y: "43.5%",
  options: {
    O: "qc1m",
   "-": "qc1m",
    X: "qc1m",
    }},
  qb1_ex: { x: "28%", y: "42%",
    text: ["나의 상태에 적절한가?",
    "장소/때/날씨 등에 적절한가?",
    "다른 일에 방해되지 않는가?"]},
  qb2_ex: { x: "34%", y: "37%",
    text: ["나의 사회적 이미지에 긍정적인가?",
    "사회/주변인의 기대에 어긋나지 않는가?"]},    

 qc1m: { text: "기능*이 우수한가?", x: "50%", y: "48%",
  explanation:"*목적 부합성/실패율/경험",
  options: {
    O: "qd1m",
    menu: {
      label: "☰",
      children: {
        "...": "qc2",
        "-": "qd1m"
      }},
    X: "qd1m",
  }},

  qc2: { text: "본래 목적에 효과적인가?", x: "44%", y: "39.5%",
  options: {
    O: "qc3",
   "-": "qc3",
    X: "qc3",
    }},
  qc3: { text: "실패 확률이 적은가?", x: "50%", y: "36.5%",
  options: {
    O: "qc4",
   "-": "qc4",
    X: "qc4",
    }},
  qc4: { text: "좋은 경험[사용성]을 제공하는가?", x: "56.5%", y: "39.5%",
  options: {
    O: "qd1m",
   "-": "qd1m",
    X: "qd1m",
    }},

    qc2_ex: { x: "41%", y: "32%",
    text: ["문제를 실제로 해결할 수 있는가?",
    "목적에 특화/최적화된 방식인가?", "기대한 결과가 안정적으로 재현될 것인가?"]},  
    qc3_ex: { x: "51%", y: "28.5%",
    text: ["비슷한 선택이 실패한 사례가 있었는가?",
    "실행하는 데 변수나 불확실한 요소가 많은가?", "문제가 생겼을 때 쉽게 복구하거나 대처할 수 있는가?"]},  
    qc4_ex: { x: "61%", y: "33%",
    text: ["접근성이 좋은가?",
    "편리/쾌적함을 제공하는가?"]},

qd1m: { text: "미래*에 이로운 선택인가?", x: "57%", y: "54%",
    explanation:"*지속 가능성/건강",
    options: {
      O: "qe1m",
      menu: {
        label: "☰",
        children: {
          "...": "qd2",
          "-": "qe1m"
        }},
      X: "qe1m",
    }},
  qd2: { text: "환경을 고려한 선택인가?", x: "64%", y: "43.5%",
  options: {
    O: "qd3",
   "-": "qd3",
    X: "qd3",
    }},
  qd3: { text: "미래의 나에게 유익한 선택인가?", x: "67.5%", y: "48%",
  options: {
    O: "qe1m",
   "-": "qe1m",
    X: "qe1m",
    }},
    qd2_ex: { x: "70%", y: "40%",
    text: ["쓰레기를 유발하는가?",
    "자원이 낭비되는가?", 
    "지속 가능한 구조에 속하는가?"]},  
    qd3_ex: { x: "77.5%", y: "45.5%",
    text: ["건강에 유익한가?",
    "유지하려는 생활 루틴과 충돌하지 않는가?", 
    "새로운 것을 습득하게 되는가?", 
    "내가 되고 싶은 모습에 가까워지는가?"]},  

qe1m: { text: "내면*에 반하지 않는 선택인가?", x: "59%", y: "63%",
    explanation:"*단편적 끌림/안정/자아 일치",
    options: {
      O: "qo1",
      menu: {
        label: "☰",
        children: {
          "...": "qe2",
          "-": "qo1"
        }},
      X: "qo1",
  }},

    qe2: { text: "단편적으로, 끌리는 선택인가?", x: "69%", y: "54%",
    options: {
      O: "qe3",
      "-": "qe3",
      X: "qe3",
    }},
    qe3: { text: "장기적으로 마음이 편안한 선택인가?", x: "70%", y: "59%",
    options: {
      O: "qe4",
      "-": "qe4",
      X: "qe4"
    }},
    qe4: { text: "자아와 일치하는 선택인가?", x: "70.3%", y: "63.5%" ,
    options: {
      O: "qo1",
      "-": "qo1",
      X: "qo1"
    }},
    qe3_ex: { 
      text: ["불안을 유발하지 않는가?",
      "나에게 당당할 수 있는 선택인가?"],
      x: "79%", y: "58%"
    },
    qe4_ex: { 
      text: ["내가 추구하는 나와 어울리는가?", "나다운가?", "내가 중시하는 가치나 신념을 훼손하지 않는가?"],
      x: "81.5%", y: "63.2%"
    },

qo1: { text: ["점검 결과","총 [score]점으로, [result] 선택으로 판단된다.","이 선택지로 결정하는가?"], 
    x: "50%", y: "19%", 
    options: {
      O: "q100",
      "...": "qo2",
      X: "qo2",
   }},
  qo2: { text: "대안이 있는가?", x: "42%", y: "16%",
      options: {
      O: "qi2",
      "...": "qo3",
      X: "qo3",
     
   }},
  qo3: { text: "결정을 유보하는가?", x: "59%", y: "16%",
      options: {
      O: "q100",
      "...": "q11",
      X: "qo1",

   }},

  q100: { text: "점검을 종료한다.", x: "50%", y: "11%" }
};
