import { InputText, InputTextProps } from "primereact/inputtext";
import { classNames as cx } from "primereact/utils";

export type LInputTextProps = {
  errorMessage?: string | false;
  labeltext: string;
} & InputTextProps;
export const LInputText = ({
  errorMessage,
  labeltext,
  ...props
}: LInputTextProps) => {
  return (
    <div className="field w-full">
      <div className="p-float-label w-full">
        <InputText
          className={cx({
            "p-invalid": !!errorMessage,
            "w-full": true,
          })}
          {...props}
        />
        <label htmlFor={props['id']}>{labeltext}</label>
      </div>
      {errorMessage && <small className="p-error">{errorMessage}</small>}
    </div>
  );
};
