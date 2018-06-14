import * as React from "react";
import { IFormContext, FormContext } from "./Form";

/* The available editors for the field */
type Editor = "textbox" | "multilinetextbox" | "dropdown";

export interface IFieldProps {
  /* The unique field name */
  id: string;

  /* The label text for the field */
  label?: string;

  /* The editor for the field */
  editor?: Editor;

  /* The drop down items for the field */
  options?: string[];

  /* The field value */
  value?: any;
}

export const Field: React.SFC<IFieldProps> = ({
  id,
  label,
  editor,
  options,
  value
}) => {
  return (
    <FormContext.Consumer>
      {(context: IFormContext) => (
        <div className="form-group">
          {label && <label htmlFor={id}>{label}</label>}

          {editor!.toLowerCase() === "textbox" && (
            <input
              id={id}
              type="text"
              value={value}
              onChange={
                (e: React.FormEvent<HTMLInputElement>) =>
                  context.setValues({ [id]: e.currentTarget.value })
              }
              onBlur={
                (e: React.FormEvent<HTMLInputElement>) =>
                  console.log(e) /* TODO: validate field value */
              }
              className="form-control"
            />
          )}

          {editor!.toLowerCase() === "multilinetextbox" && (
            <textarea
              id={id}
              value={value}
              onChange={
                (e: React.FormEvent<HTMLTextAreaElement>) =>
                  context.setValues({ [id]: e.currentTarget.value })
              }
              onBlur={
                (e: React.FormEvent<HTMLTextAreaElement>) =>
                  console.log(e) /* TODO: validate field value */
              }
              className="form-control"
            />
          )}

          {editor!.toLowerCase() === "dropdown" && (
            <select
              id={id}
              name={id}
              value={value}
              onChange={
                (e: React.FormEvent<HTMLSelectElement>) =>
                  context.setValues({ [id]: e.currentTarget.value })
              }
              onBlur={
                (e: React.FormEvent<HTMLSelectElement>) =>
                  console.log(e) /* TODO: validate field value */
              }
              className="form-control"
            >
              {options &&
                options.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
            </select>
          )}

          {/* TODO - display validation error */}
        </div>
      )}
    </FormContext.Consumer>
  );
};
Field.defaultProps = {
  editor: "textbox"
};