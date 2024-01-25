/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      //메인 색상 3가지 입니다.
      primaryColor: '#3498DB',
      secondaryColor: '#E74C3C',
      tertiaryColor: '#27AE60',
      FourthColor: '#fbf5f0',

      //회색조 색상 입니다.
      grayscaleA: '#fff',
      grayscaleB: '#fbf5f0',
      grayscaleC: '#bebebe',
      grayscaleD: '#6b6b6b',
      grayscaleE: '#535353',
      grayscaleF: '#212121',
      grayscaleG: '#1b1b1b',
      grayscaleH: '#000',
    },
    //폰트 글씨체를 커스컴합니다.
    fontFamily: {
      tenada: ['Tenada'],
      RubikRegular: ['RubikRegular'],
    },
    //폰트사이즈를 커스텀합니다.
    fontSize: {
      '0px': '0px',
      '10px': '10px',
      '11px': '11px',
      '12px': '12px',
      '14px': '14px',
      '16px': '16px',
      '20px': '20px',
      '24px': '24px',
      '30px': '30px',
      '40px': '40px',
    },
    //반응형 최소 최대 값을 정의합니다.
    screens: {
      sm: { min: '320px', max: '650px' },
      md: { min: '650px', max: '1023px' },
      lg: { min: '1024px' },
    },
  },
  plugins: [],
};
