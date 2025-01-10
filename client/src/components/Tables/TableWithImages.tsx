
import LocationImage from '@components/Images/LocationImage';
import { Character,GameLocation } from '@_types/gddTypes';
import * as table_style from "./Table.module.scss";
import * as button_style from "@components/Buttons/Button.module.scss";
import { useNavigate } from 'react-router-dom';
import { useCurrentLanguage } from '@hooks/useCurrentLanguage';
import { tableTranslator } from './localisation/tableTranslator';
import { icons } from '@assets/icons';

interface TableProps{
    data: (Character | GameLocation)[];
    handleDeteleItem:(itemId:string)=>void;
}

function TableWithImages({data, handleDeteleItem} : TableProps) {
    const navigate : any = useNavigate();

    const currentLang = useCurrentLanguage();
    const loc = tableTranslator[currentLang];
    return (
        <table className={table_style.table}>
      <thead>
        <tr>
          <th>{loc.nameHeader}</th>
          <th>{loc.actionHeader}</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td style={{ height: "150px" }} >
              <div
                style={{
                  display: "grid",
                  alignItems: "center",
                  gridTemplateColumns: "200px 200px",
                  gap: 20,
                }}
              >
                {item.mainImage && item.mainImage.id.length > 0 ? (
                  <LocationImage
                    path={item.mainImage.path}
                    alt={"main image"}
                    width="90px"
                  ></LocationImage>
                ) : (
                  <span style={{ fontSize: "1.7rem", color: "grey" }}>
                    {icons.close}
                  </span>
                )}

                <span>{item.name}</span>
              </div>
            </td>
            <td
              style={{
                height: "150px",
                display: "flex",
                alignItems: "center",
                width: "auto",
                justifyContent: "center",
                flexDirection: "row",
                gap: 5,
              }}
            >
              <button
                className={button_style.create_btn}
                onClick={() => navigate(`${item.id}`)}
              >
                {icons.edit}
              </button>
              <button
                className={button_style.delete_btn}
                onClick={() => {
                  handleDeteleItem(item.id);
                }}
              >
                {icons.delete}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    );
}

export default TableWithImages;