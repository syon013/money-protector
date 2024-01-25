import React, { useEffect, useMemo, useState } from 'react';
import ECharts from 'echarts-for-react'; //다양한 차트를 사용할수있는 차트 라이브러리
import {
  getAllIncomeByMonth,
  getAllExpenditureByMonth,
} from '../../../../API/TEST_API';
// 화면 크기를 가져와 주는 라이브러리
import { useWindowSize } from '@uidotdev/usehooks';

/**
 * Bar Chart의 기본 설정을 저장합니다.
 */
const BAR_CHART_CONFIG = {
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['수입', '지출'],
    top: '0', // top bottom right left 위치
    center: 'center', // right left center 위치
  },
  toolbox: {
    show: true, // 보여줄지 말지를 블리언값 으로 결정
    feature: {
      magicType: { show: true, type: ['line', 'bar'] }, // bar타입 , line 타입 두가지로 설정
      // dataView: { show: true, readOnly: false }, 메모 기능 유무
      // restore: { show: true }, 새로고침을 기능 유무
      // saveAsImage: { show: true }, 그래프를 캡쳐나 저장할수있는 기능 유무
    },
  },
  calculable: true,
  xAxis: [
    {
      type: 'category',
      data: Array(12)
        .fill()
        .map((_, i) => i + 1 + '월'), // x축 데이터 1월부터 12월까지 배열로 만들어줌
    },
  ],
};

/** 구조 분해 할당을 정의합니다. */
const { tooltip, legend, toolbox, calculable, xAxis } = BAR_CHART_CONFIG;

const BarChart = () => {
  /** 수입에 대한 데이터를 useState에 정의합니다. */
  const [incomeChartData, setIncomeChartData] = useState([]);
  /** 지출에 대한 데이터를 useState에 정의합니다. */
  const [expenditureChartData, setExpenditureChartData] = useState([]);

  /**
   * 화면 크기를 가져온다.
   * { width, height } 값을 받을 수 있습니다.
   * 여기서는 너비만 필요합니다.
   */
  const { width } = useWindowSize();

  /**
   * 차트의 y축인 yAxis값을 화면 크기에 따라서 변경합니다.
   * 화면의 너비가 768 초과면 전체 금액을 보여줍니다. (예시. 150,000원)
   * 화면의 너비가 768 이하 ~ 480 초과면 만원단위로 금액을 보여줍니다 (예시 15만원, 0.3만원)
   * 화면 너비가 480이하면 y축에 아무것도 보여주지 않습니다.
   */
  const yAxis = useMemo(() => {
    if (width > 768) {
      return {
        show: true,
        type: 'value',
        axisLabel: {
          formatter: function (value) {
            return value.toLocaleString() + '원';
          },
        },
      };
    } else if (width > 480) {
      return {
        show: true,
        type: 'value',
        axisLabel: {
          formatter: function (value) {
            return value / 10000 + '만원';
          },
        },
      };
    } else {
      return {
        show: false,
      };
    }
  }, [width]);

  useEffect(() => {
    getAllIncomeByMonth().then(res => {
      setIncomeChartData(Object.values(res.data));
    });

    getAllExpenditureByMonth().then(res => {
      setExpenditureChartData(Object.values(res.data));
    });
  }, []);

  return (
    <div className="mb-20 w-full">
      <div className="my-14 flex w-full justify-center">
        <h2 className="text-30px">수입내역</h2>
      </div>

      <ECharts
        option={{
          //43.line 구조분해 할당 정의 해놓았습니다.
          tooltip, // 14.line ~ 16.line 참고
          legend, // 17.line ~ 21.line 참고
          toolbox, // 22.line ~ 30.line 참고
          calculable, // 31.line 참고
          xAxis, // 32.line ~ 40.line 참고
          yAxis: yAxis, // 58.line ~ 90.line 참고
          series: [
            {
              name: '수입',
              type: 'bar',
              data: incomeChartData, // 47.line 에 정의해놓은 useState 값을 할당합니다.
            },
            {
              name: '지출',
              type: 'bar',
              data: expenditureChartData, // 49.line 에 정의해놓은 useState 값을 할당합니다.
            },
          ],
        }}
        opts={{ width: 'auto', height: 'auto' }} //반응형 옵션을 줍니다.
        className="text-sm md:text-[6px] lg:text-[4px]"
      />
    </div>
  );
};

export default BarChart;
