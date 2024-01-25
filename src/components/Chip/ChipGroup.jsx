import React from 'react';
import Chip from './Chip';

/**
 * Chip Component를 위해 사용되는 ChipGroup Component입니다.
 * size를 sm, md, lg 중 선택하여 줄 수 있고, 해당 size에 따라 width, height, text 크기가 변경됩니다.
 * text는 Chip Component 내부에 적용될 텍스트를 전달합니다.
 * src는 Chip Component 내부에 적용될 이미지 URL을 전달합니다.
 * check는 Chip Component 내부에 적용될 checked 상태를 전달합니다. value와 비교하여 checked 상태를 관리합니다.
 * onClick이 될 때마다 value를 변경하여 checked 상태를 관리합니다. (추후 실제 데이터를 넣어보면서 수정 필요)
 * @property {string} currentValue - 현재 선택된 value를 전달합니다. (추후 실제 데이터를 넣을 때 수정될 수 있습니다.)
 * @property {function} setCurrentValue - 현재 선택된 value를 변경하는 함수를 전달합니다. (추후 실제 데이터를 넣을 때 수정될 수 있습니다.)
 * @property {array} ChipData - Chip Component에 전달될 데이터를 전달합니다. 수입, 지출에 관련된 데이터를 넣어주면 됩니다.
 * @returns
 */
const ChipGroup = ({
  currentValue,
  ChipData,
  changeValue,
  name,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {ChipData?.map(({ id, text, value, src }) => {
        return (
          <Chip
            size="sm"
            key={id}
            text={text}
            src={src}
            check={currentValue === value ? 'true' : undefined}
            onClick={() => changeValue(value, src)}
            name={name}
          />
        );
      })}
    </div>
  );
};

export default ChipGroup;
