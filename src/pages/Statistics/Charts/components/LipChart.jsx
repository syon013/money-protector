import React, { useEffect, useState } from 'react';
import ECharts from 'echarts-for-react'; //다양한 차트를 사용할수있는 차트 라이브러리
import {
  getAllIncomeByClassification,
  getAllExpenditureByClassification,
} from '../../../../API/TEST_API';

/** 오늘 날짜를 new Date() 메서드를 활용해 today 변수에 정의합니다. */
const today = new Date();

/**
 * Lip Chart의 기본 설정을 저장합니다.
 */
const LIP_CHART_CONFIG = {
  tooltip: {
    trigger: 'item',
    formatter: function (params) {
      return `${params.name}: ${params.value.toLocaleString()}원`;
    },
    textStyle: {
      fontFamily: 'Tenada', // tooltip에 폰트스타일을 적용합니다.
      fontSize: 14, // tooltip에 폰트사이즈를 적용합니다.
      fontWeight: 'bold', // tooltip에 폰트 굵기를 적용합니다.
    },
  },
  legend: {
    orient: 'horizontal', //가로 세로를 정의합니다.
    top: '0', // 위치를 정의합니다.
    center: 'center', // 위치를 정의합니다.
  },
  label: {
    show: true,
    formatter: function (params) {
      return `${params.name}: ${params.data.formattedValue}원`;
    },
    fontFamily: 'Tenada', // 라벨에 폰트스타일 적용합니다.
    fontSize: 12, // 라벨에 폰트사이즈를 적용합니다.
    fontWeight: 'bold', // 라벨에 폰트 굵기를 적용합니다.
  },
};

/** 세가지 항목을 구조분해 할당을 정의합니다. */
const { tooltip, legend, label } = LIP_CHART_CONFIG;

const Chart = () => {
  /** 수입에 대한 데이터를 useState에 정의합니다. */
  const [incomeChartData, setIncomeChartData] = useState([]);
  /** 지출에 대한 데이터를 useState에 정의합니다. */
  const [expenditureChartData, setExpenditureChartData] = useState([]);

  useEffect(() => {
    getAllIncomeByClassification(
      today.getFullYear(), //현재 년도를 인자로 넘겨줍니다.
      today.getMonth() + 1, //현재 달을 인자로 넘겨줍니다.
    ).then(res => {
      //data 라는 변수에 응답값을 map()메서드를 활용하여 객체형태의 key,value 에 정의해줍니다.
      const data = res.data.map(item => ({
        value: item.price,
        name: item.classification,
        formattedValue: item.price.toLocaleString(),
      }));
      // 46.line 에 정의해놓은 useState 에 정의합니다.
      setIncomeChartData(data);
    });

    getAllExpenditureByClassification(
      today.getFullYear(), //현재 년도를 인자로 넘겨줍니다.
      today.getMonth() + 1, //현재 달을 인자로 넘겨줍니다.
    ).then(res => {
      //data 라는 변수에 응답값을 map()메서드를 활용하여 객체형태의 key,value 에 정의해줍니다.
      const data = res.data.map(item => ({
        value: item.price,
        name: item.classification,
        formattedValue: item.price.toLocaleString(),
      }));
      // 49.line 에 정의해놓은 useState 에 정의합니다.
      setExpenditureChartData(data);
    });
  }, []);

  return (
    <div className="mb-20 w-full">
      <div className="my-14 flex w-full justify-center">
        <h2 className="text-30px">이번 달 수입 내역</h2>
      </div>
      {incomeChartData.length > 0 ? (
        <ECharts
          option={{
            //43.line 구조분해 할당 정의 해놓았습니다.
            tooltip, // 15.line ~ 25.line 참고
            legend, // 26.line ~ 30.line 참고
            series: [
              {
                name: '소비 내역',
                type: 'pie',
                radius: '80%',
                top: '100',
                data: incomeChartData, // 46.line 에 정의해놓은 useState 값을 할당합니다.
                label: label, // 31.line ~ 43.line 참고
              },
            ],
          }}
          opts={{ width: 'auto', height: 'auto' }} //반응형 옵션을 줍니다.
          className="text-sm md:text-[6px] lg:text-[4px]"
        />
      ) : (
        <div className="flex justify-center text-20px text-grayscaleD">
          <h3>표시할 차트 내용이 없습니다.</h3>
        </div>
      )}

      <div className="my-14 flex w-full justify-center">
        <h2 className="text-30px">이번 달 지출 내역</h2>
      </div>

      {expenditureChartData.length > 0 ? (
        <ECharts
          option={{
            tooltip, // 15.line ~ 25.line 참고
            legend, // 26.line ~ 30.line 참고
            series: [
              {
                name: '지출 내역',
                type: 'pie',
                radius: '80%',
                top: '100',
                data: expenditureChartData, // 49.line 에 정의해놓은 useState 값을 할당합니다.
                label: label, // 31.line ~ 43.line 참고
              },
            ],
          }}
          opts={{ width: 'auto', height: 'auto' }} //반응형 옵션을 줍니다.
        />
      ) : (
        <div className="flex justify-center text-20px text-grayscaleD">
          <h3>표시할 차트 내용이 없습니다.</h3>
        </div>
      )}
    </div>
  );
};

export default Chart;
