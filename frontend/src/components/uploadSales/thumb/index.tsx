import { FaFile } from "react-icons/fa";
import { CircularProgressbar } from 'react-circular-progressbar';
import styled from './styled.module.scss';
import { UploadedFile } from "../uploadSales";

type ThumbProps = {
  files: UploadedFile[]
  CleanFiles: () => void;
};

export const Thumb = ({ files, CleanFiles }: ThumbProps) => {
  return (
    <aside className={styled['thumb']}>
      {files.map((file) => (
        <div className={styled['data']} key={file.id}>
          <div className={styled['data__informations']}>
            <FaFile className="text-3xl" />
            <div>
              <p>{file.name}</p>
              <p>{file.size} MB</p>
            </div>
            <button
              className={styled['informations__clear']}
              onClick={() => CleanFiles()}
            >
              Remover Arquivo
            </button>
          </div>
        </div>
      ))}
    </aside>
  );
};
