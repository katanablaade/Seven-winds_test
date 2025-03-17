import { useForm } from 'react-hook-form';

import './TableNewItem.style.scss';
import add from '../../assets/add.png';
import del from '../../assets/delete.png';

interface TableNewItemProps {
  pl?: number;
  // parentId: number;
  // handleCreateRow: (row: RowData) => void;
  onSubmit: (data: FormData) => void;
}

type FormData = {
  rowName: string;
  salary: string;
  equipmentCosts: string;
  overheads: string;
  estimatedProfit: string;
};

export function TableNewItem({ pl = 0, onSubmit }: TableNewItemProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      rowName: '',
      salary: '0',
      equipmentCosts: '0',
      overheads: '0',
      estimatedProfit: '0',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="table-content-wrapper">
        <ul className="table-content-list-1">
          <li className="table-content-1-item" style={{ paddingLeft: pl }}>
            <div className="table-content-icon-wrapper">
              <img src={add} alt="" className="table-content-icon-add" />
              <img src={del} alt="" className="table-content-icon-delete" />
            </div>
          </li>
          <li className="table-content-1-item">
            <input {...register('rowName')} type="text" />
          </li>
        </ul>
        <ul className="table-content-list-2">
          <li className="table-content-2-item">
            <input
              {...register('salary', {
                required: true,
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Введите только числа',
                },
              })}
              type="text"
              className={`${errors.salary ? 'error' : ''} table-content-input`}
            />
          </li>
          <li className="table-content-2-item">
            <input
              {...register('equipmentCosts', {
                required: true,
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Введите только числа',
                },
              })}
              type="text"
            />
          </li>
          <li className="table-content-2-item">
            <input
              {...register('overheads', {
                required: true,
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Введите только числа',
                },
              })}
              type="text"
            />
          </li>
          <li className="table-content-2-item">
            <input
              {...register('estimatedProfit', {
                required: true,
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Введите только числа',
                },
              })}
              type="text"
            />
          </li>
        </ul>
      </div>
      <input style={{ display: 'none' }} type="submit" />
    </form>
  );
}
