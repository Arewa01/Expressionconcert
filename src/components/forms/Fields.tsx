import { useId } from "react";

const control =
  "w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-neutral-400 focus:border-brand focus:ring-2 focus:ring-brand/15";

function Label({ htmlFor, label, required }: { htmlFor?: string; label: string; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold text-ink">
      {label}
      {required && <span className="text-brand"> *</span>}
    </label>
  );
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { label: string; name: string; hint?: string };

export function Field({ label, hint, className = "", ...props }: InputProps) {
  const id = useId();
  return (
    <div className={className}>
      <Label htmlFor={id} label={label} required={props.required} />
      <input id={id} className={control} {...props} />
      {hint && <p className="mt-1.5 text-xs text-neutral-500">{hint}</p>}
    </div>
  );
}

export function TextArea({
  label,
  className = "",
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; name: string }) {
  const id = useId();
  return (
    <div className={className}>
      <Label htmlFor={id} label={label} required={props.required} />
      <textarea id={id} rows={5} className={control} {...props} />
    </div>
  );
}

export function Select({
  label,
  options,
  className = "",
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; name: string; options: string[] }) {
  const id = useId();
  return (
    <div className={className}>
      <Label htmlFor={id} label={label} required={props.required} />
      <select id={id} className={control} {...props}>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

/** Pill-style radio group. */
export function Choice({
  label,
  name,
  options,
  required,
  value,
  onChange,
  className = "",
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
  value?: string;
  onChange?: (v: string) => void;
  className?: string;
}) {
  return (
    <fieldset className={className}>
      <legend className="mb-2 block text-sm font-semibold text-ink">
        {label}
        {required && <span className="text-brand"> *</span>}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o} className="cursor-pointer">
            <input
              type="radio"
              name={name}
              value={o}
              required={required}
              className="peer sr-only"
              {...(onChange ? { checked: value === o, onChange: () => onChange(o) } : {})}
            />
            <span className="inline-block rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-700 transition-colors peer-checked:border-brand peer-checked:bg-brand peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-brand/30 hover:border-brand">
              {o}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
