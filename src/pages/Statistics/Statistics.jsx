import React, { useState } from 'react';
import Chart from './Charts/components/LipChart';
import BarChart from './Charts/components/BarChart';
import Tab from '../../components/Tab/Tab';
import { TAP_CHART_DATA } from '../../data/TapGroup';

const Statistics = () => {
  /** Tab 컴포넌트에 필요한 useState 를 정의합니다.   */
  const [activeTab, setActiveTab] = useState('LIP');

  /**클릭이벤트로 value값을 받는 클릭함수입니다. Tab 컴포넌트에서 사용합니다. */
  const handleTapClick = value => {
    setActiveTab(value);
  };

  return (
    <main className="flex flex-col items-center justify-center text-30px">
      <h2 className="mt-32 sm:text-20px md:text-24px lg:text-30px">
        다양한 Chart로 보기
      </h2>

      <section className="mt-24 flex w-full flex-col items-center justify-center">
        <div className="w-full">
          <Tab
            tapListData={TAP_CHART_DATA}
            onClick={handleTapClick}
            activeTab={activeTab}
          />
        </div>

        {activeTab === 'LIP' ? <Chart /> : <BarChart />}
      </section>
    </main>
  );
};

export default Statistics;
