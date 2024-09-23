import { Classes } from "../constants/constants";
import { data, saveData } from "../data/data";
import { render } from "../render/render";

export const deleteEntryAction = () => {
  document
    .querySelectorAll<HTMLButtonElement>(`.${Classes.DeleteEntry}`)
    .forEach(
      (el) =>
        (el.onclick = (e) => {
          if (!window.confirm("Delete this entry?")) {
            return;
          }

          const classes = (e.currentTarget as Element).parentElement
            ?.parentElement?.classList;

          classes?.forEach((c) => {
            if (c.startsWith(Classes.ListRowEntryId)) {
              const id = c.substring(Classes.ListRowEntryId.length);
              data.deleted = data.deleted ?? {};
              data.deleted[id] = true;
              saveData();
            }
          });

          render();
        })
    );
};
