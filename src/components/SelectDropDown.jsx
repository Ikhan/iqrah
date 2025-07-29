export default function SelectDropDown({
  label,
  options = [],
  value,
  onChange,
  placeholder = "-- select --",
  disabled = false,
}) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{ display: "block", marginBottom: 4 }}>{label}</label>
      <select value={value} onChange={onChange} disabled={disabled}>
        <option value="">{placeholder}</option>
        {options.map(({ value: optValue, label: optLabel }) => (
          <option key={optValue} value={optValue}>
            {optLabel}
          </option>
        ))}
      </select>
    </div>
  );
}
