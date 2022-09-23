import React, { useCallback, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { X } from 'react-feather';
import { decorationTable, rampageDecorationTable } from '@/assets/game-data';
import { getDecorationSlotIcon, stringifySkill } from '@/util/items';
import SelectDecorationModal from '@/components/ItemSelectModals/SelectDecorationModal';
import ClickableDiv from '@/components/ClickableDiv';
import GameIcon from '@/components/GameIcon';

export interface DecorationSelectorProps {
  slotSize: number,
  value: string | null,
  onChange: (val: string | null) => void,
  rampage?: boolean,
};
const DecorationSelector = ({ slotSize, value, onChange, rampage }: DecorationSelectorProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  const decoName = useMemo(() => {
    if (!value) {
      return rampage ? 'Rampage decoration' : 'Decoration slot';
    }
    return value;
  }, [rampage, value]);

  const skillName = useMemo(() => {
    if (!value) {
      return 'No skill';
    }
    return rampage ? rampageDecorationTable[value].skill : stringifySkill(decorationTable[value].skill);
  }, [rampage, value]);

  const icon = useMemo(() => getDecorationSlotIcon(slotSize), [slotSize]);

  const handleSelectItem = useCallback((val: string) => {
    onChange(val);
  }, [onChange]);

  const handleClearItem = useCallback(() => {
    onChange(null);
  }, [onChange]);


  function renderModal() {
    return (
      <SelectDecorationModal
        rampage={rampage}
        slotSize={slotSize}
        opened={modalOpen}
        onClose={() => { setModalOpen(false); }}
        onSelectItem={handleSelectItem}
      />
    );
  }

  return (
    <>
      {renderModal()}
      <OuterContainer>
        <SelectorContainer onActivate={() => { setModalOpen(true); }}>
          <GameIcon src={icon} size={24} style={{ marginRight: '10px' }} />
          <TextWrapper>
            <DecoNameWrapper>
              <DecoName>{decoName}</DecoName>
              <TextIconWrapper>▼</TextIconWrapper>
            </DecoNameWrapper>
            <SkillName>{skillName}</SkillName>
          </TextWrapper>
        </SelectorContainer>
        {value && <ClearButton onActivate={handleClearItem}><X size={16} /></ClearButton>}
      </OuterContainer>
    </>
  );
};

export default DecorationSelector;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const DecoNameWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const SelectorContainer = styled(ClickableDiv)`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  width: fit-content;

  :hover {
    color: ${({ theme }) => theme.colors.dark[2]};
  }
`;

const DecoName = styled.div`
  font-size: 14px;
`;

const SkillName = styled.div`
  font-size: 12px;
`;

const TextIconWrapper = styled.div`
  margin-left: 10px;
  font-size: 8px;
`;

const OuterContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ClearButton = styled(ClickableDiv)`
  margin-left: 15px;
  :hover {
    color: ${({ theme }) => theme.colors.dark[2]};
  }
`;
