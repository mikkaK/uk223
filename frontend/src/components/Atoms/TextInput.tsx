interface Props {
  setText: (value: string, field?: string) => any;
  text: string;
  label: string;
  field?: string;
}

//Simple text input field with a name for forms
export function TextInput(props: Props) {
  return (
    <div>
      <label htmlFor={props.label}>{props.label}</label>
      <input
        name={props.label}
        type="text"
        value={props.text}
        onChange={(e) => props.setText(e.target.value, props.field)}
      />
    </div>
  );
}
