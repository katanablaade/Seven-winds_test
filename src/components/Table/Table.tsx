import { useState, useEffect, useCallback } from 'react';
import { getTreeRows, deleteRow, updateRow } from 'src/services/api';
import TableItem from '../TableItem/TableItem';

import './Table.style.scss';

export interface RowData {
  id: number;
  rowName: string;
  total: number;
  salary: number;
  equipmentCosts: number;
  overheads: number;
  estimatedProfit: number;
  child: RowData[];
}

export function Table() {
  const [rows, setRows] = useState<RowData[]>([]);

  const fetchRows = async () => {
    try {
      const fetchedRows = await getTreeRows();
      setRows(fetchedRows);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = useCallback(async (id: number) => {
    try {
      await deleteRow(id);
      setRows((prevRows) => prevRows.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Ошибка при удалении строки:', error);
    }
  }, []);

  const handleUpdate = useCallback((id: number) => {
    updateRow(id).then(() => {
      setRows((prevRows) =>
        prevRows.map((item) =>
          item.id === id ? { ...item, ...updatedRows } : item
        )
      );
    });
  }, []);

  useEffect(() => {
    fetchRows();
  }, []);

  return (
    <div className="table">
      <div className="table-titles">
        <div className="table-titles-wrapper">
          <p className="table-titles-name">Строительно-монтажные работы</p>
        </div>
      </div>

      <div className="separator"></div>

      <div className="table-captures">
        <ul className="table-captures-1">
          <li className="table-captures-1-item">Уровень</li>
          <li className="table-captures-1-item">Наименование работ</li>
        </ul>
        <ul className="table-captures-2">
          <li className="table-captures-2-item">Основная з/п</li>
          <li className="table-captures-2-item">Оборудование</li>
          <li className="table-captures-2-item">Накладные расходы</li>
          <li className="table-captures-2-item">Сметная прибыль</li>
        </ul>
      </div>

      <div className="table-content">
        {rows.map((row) => (
          <TableItem
            key={row.id}
            row={row}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
            pl={10}
          />
        ))}
      </div>
    </div>
  );
}
