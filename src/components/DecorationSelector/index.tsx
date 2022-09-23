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
      return rampage ? 'Select rampage decoration' : 'Select decoration';
    }
    return value;
  }, [rampage, value]);

  const skillName = useMemo(() => {
    if (!value) {
      return '---';
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
          <GameIcon src={icon} size={24} style={{ marginRight: '10px', marginTop: '1px' }} />
          <TextWrapper>
            <DecoNameWrapper>
              <DecoName filled={!!value}>{decoName}</DecoName>
              <TextIconWrapper>▼</TextIconWrapper>
            </DecoNameWrapper>
            <SkillName filled={!!value}>{skillName}</SkillName>
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
  margin-bottom: 10px;
  width: fit-content;

  :hover {
    color: ${({ theme }) => theme.colors.dark[2]};
  }
`;

const DecoName = styled.div<{ filled: boolean }>`
  font-size: 14px;
  font-weight: ${({ filled }) => filled ? '800' : '350'};
  font-style: ${({ filled }) => filled ? 'normal' : 'italic'};
`;

const SkillName = styled.div<{ filled: boolean }>`
  font-size: 12px;
  font-weight: ${({ filled }) => filled ? '600' : '350'};
  font-style: ${({ filled }) => filled ? 'normal' : 'italic'};
`;

const TextIconWrapper = styled.div`
  margin-left: 10px;
  font-size: 8px;
`;

const OuterContainer = styled.div`
  display: flex;
`;

const ClearButton = styled(ClickableDiv)`
  margin-left: 15px;
  :hover {
    color: ${({ theme }) => theme.colors.dark[2]};
  }
`;
