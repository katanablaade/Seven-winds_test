import { memo, useCallback, useState } from 'react';
import { deleteRow, createRowInEntity, updateRow } from 'src/services/api';
import { RowData } from '../Table/Table';
import { TableNewItem } from '../TableNewItem/TableNewItem';
import { SubmitHandler } from 'react-hook-form';

import './TableItem.style.scss';
import add from '../../assets/add.png';
import del from '../../assets/delete.png';

interface TableItemProps {
  row: RowData;
  pl?: number;
  handleDelete: (id: number) => void;
  handleUpdate: (id: number) => void;
}
type FormData = {
  rowName: string;
  salary: string;
  equipmentCosts: string;
  overheads: string;
  estimatedProfit: string;
};

const TableItem = memo(
  ({ row, handleDelete, handleUpdate, pl = 0 }: TableItemProps) => {
    const [isVisibleNewItem, setIsVisibleNewItem] = useState(false);
    const [rowChildren, setRowChildren] = useState(row.child);
    const [isEditing, setIsEditing] = useState(false);
    const [editedRow, setEditedRow] = useState(row);

    const addRow = useCallback(() => {
      setIsVisibleNewItem(true);
    }, []);

    const handleChildDelete = useCallback(async (id: number) => {
      try {
        await deleteRow(id);
        setRowChildren((prevRows) => prevRows.filter((item) => item.id !== id));
      } catch (error) {
        console.error('Ошибка при удалении строки:', error);
      }
    }, []);

    const handleChildUpdate = useCallback(async (id: number) => {
      try {
        deleteRow(id);
        setRowChildren((prevRows) => prevRows.filter((item) => item.id === id));
      } catch (error) {
        console.error('Ошибка при удалении строки:', error);
      }
    }, []);

    const handleCreateRow = (row: RowData) => {
      setRowChildren((prevRows) => {
        console.log(prevRows, row);
        return [...prevRows, row];
      });
      setIsVisibleNewItem(false);
    };

    const toggleEdit = () => {
      setIsEditing((prev) => !prev);
      if (!isEditing) {
        setEditedRow(row);
      }
    };

    const onSubmitNewItem: SubmitHandler<FormData> = (data) => {
      createRowInEntity({
        rowName: data.rowName,
        salary: Number(data.salary),
        equipmentCosts: Number(data.equipmentCosts),
        overheads: Number(data.overheads),
        estimatedProfit: Number(data.estimatedProfit),
        parentId: row.id,
      }).then((res) => handleCreateRow({ ...res.current, child: [] }));
    };

    const onSubmitChangeItem: SubmitHandler<FormData> = (data) => {
      updateRow({
        id: row.id,
        rowName: data.rowName,
        salary: Number(data.salary),
        equipmentCosts: Number(data.equipmentCosts),
        overheads: Number(data.overheads),
        estimatedProfit: Number(data.estimatedProfit),
      }).then((res) => handleUpdate({ ...res, child: [] }));
    };

    return (
      <>
        {isEditing ? (
          <TableNewItem pl={pl + 10} onSubmit={onSubmitChangeItem} />
        ) : (
          <div className="table-content-wrapper" onDoubleClick={toggleEdit}>
            <ul className="table-content-list-1">
              <li className="table-content-1-item" style={{ paddingLeft: pl }}>
                <div className="table-content-icon-wrapper">
                  <img
                    onClick={addRow}
                    src={add}
                    alt="add"
                    className="table-content-icon-add"
                  />
                  <img
                    onClick={() => handleDelete(row.id)}
                    src={del}
                    alt="del"
                    className="table-content-icon-delete"
                  />
                </div>
              </li>
              <li className="table-content-1-item">{row.rowName}</li>
            </ul>
            <ul className="table-content-list-2">
              <li className="table-content-2-item">{row.salary}</li>
              <li className="table-content-2-item">{row.equipmentCosts}</li>
              <li className="table-content-2-item">{row.overheads}</li>
              <li className="table-content-2-item">{row.estimatedProfit}</li>
            </ul>
          </div>
        )}
        {rowChildren.map((item) => (
          <TableItem
            key={item.id}
            row={item}
            handleDelete={handleChildDelete}
            handleUpdate={handleChildUpdate}
            pl={pl + 20}
          />
        ))}
        {isVisibleNewItem && (
          <TableNewItem pl={pl + 10} onSubmit={onSubmitNewItem} />
        )}
      </>
    );
  }
);

export default TableItem;
