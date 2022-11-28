import { InputMask, InputMaskProps } from "primereact/inputmask";
import { classNames as cx } from "primereact/utils";

export type LInputTextProps = {
  errorMessage?: string | false;
  labeltext: string;
} & InputMaskProps;
export const LInputMask = ({
  errorMessage,
  labeltext,
  ...props
}: LInputTextProps) => {
  return (
    <div className="field w-full">
      <div className="p-float-label w-full">
        <InputMask
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
