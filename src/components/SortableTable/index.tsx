import React, { useCallback, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { Table } from '@mantine/core';
import { ChevronUp, ChevronDown, Icon } from 'react-feather';
import ClickableDiv from '@/components/ClickableDiv';

export interface SortOptions {
  key: string,
  order: 'ASC' | 'DESC',
}

export interface DataColumn<T> {
  key: string,
  label: React.ReactNode,
  render: (item: T) => React.ReactNode,
  sort?: (a: T, b: T) => number,
}

export interface SortableTableProps<T> {
  columns: Array<DataColumn<T>>,
  data: T[],
  getItemKey: (item: T) => string,
  onSelectItem?: (item: T) => void,
  filter?: (item: T) => boolean,
};

function SortableTable<T>({ columns, data, getItemKey, onSelectItem, filter }: SortableTableProps<T>) {
  const [sort, setSort] = useState<SortOptions | null>(null);

  const handleSort = useCallback((key: string) => {
    setSort((prevSort) => {
      if (!prevSort || prevSort.key !== key) {
        return { key, order: 'ASC' };
      }
      if (prevSort.order === 'ASC') {
        return { key, order: 'DESC' };
      }
      return null;
    });
  }, []);

  const unsortedRows = useMemo(() => {
    return data.map((item) => {
      const jsx = (
        <ClickableRow
          key={getItemKey(item)}
          as="tr"
          onActivate={onSelectItem && (() => { onSelectItem(item); }) }
        >
          {columns.map((col) => (
            <td key={col.key}>
              {col.render(item)}
            </td>
          ))}
        </ClickableRow>
      );
      return { item, jsx };
    });
  }, [columns, data, getItemKey, onSelectItem]);

  const sortedRows = useMemo(() => {
    return unsortedRows
      .filter(({ item }) => !filter || filter(item))
      .sort((a, b) => {
        if (!sort) return 0;
        const sortColumn = columns.find((col) => col.key === sort.key);
        if (!sortColumn?.sort) return 0;
        let order = sortColumn.sort(a.item, b.item);
        if (sort.order === 'DESC') {
          order *= -1;
        }
        return order;
      })
      .map((row) => row.jsx);
  }, [columns, filter, sort, unsortedRows]);

  const renderedColumns = useMemo(() => {
    let SortIcon: Icon | null = null;
    if (sort) {
      if (sort.order === 'ASC') {
        SortIcon = ChevronUp;
      } else if (sort.order === 'DESC') {
        SortIcon = ChevronDown;
      }
    }
    return columns.map((col) => (
      <ClickableHeader
        key={col.key}
        as="th"
        onActivate={col.sort && (() => { handleSort(col.key); })}
      >
        <LabelWrapper>
          {col.label}
          <IconContainer>
            {SortIcon && (sort?.key === col.key) && <SortIcon size={16} />}
          </IconContainer>
        </LabelWrapper>
      </ClickableHeader>
    ));
  }, [columns, handleSort, sort]);

  return (
    <Table striped highlightOnHover>
      <thead>
        <tr>
          {renderedColumns}
        </tr>
      </thead>
      <tbody>{sortedRows}</tbody>
    </Table>
  );
};

export default SortableTable;

const ClickableRow = styled(ClickableDiv)`
  cursor: pointer;        
`;

const ClickableHeader = styled(ClickableDiv)`
  cursor: pointer;

  :hover {
    color: ${({ theme }) => theme.colors.dark[2]};
  }
`;

const LabelWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: fit-content;
`;


const IconContainer = styled.div`
  position: absolute;
  top: 3px;
  right: -25px;
`;
