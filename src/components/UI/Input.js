import { Fragment } from "react"

export default function Input({
    onChange,
    onKeyDown,
    onBlur,
    value,
    id,
    name,
    type,
    placeholder,
    className,
    isInValid,
    variant,
    children
}){
  const classes = `px-3 py-2 flex items-center justify-between my-5 rounded-xl appearance-none relative w-full border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-emerald-400 focus:border-emerald-400 focus:z-10 sm:text-sm ${className} ${isInValid && "border-rose-500"}`
  return(
    <Fragment>
      {variant==="search" &&
        <div className="mb-3">
          <input
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={value}
            id={id}
            name={name}
            type={type}
            className={classes}
            placeholder={placeholder}
          />
        </div>
      }
      {variant==="basic" &&
        <input
          className={classes}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          id={id}
          type={type}
          placeholder={placeholder}
          autoComplete="true"
          />
      }
      {variant==="password" &&
        <div className={classes}>
          <input
            className="w-full outline-none"
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            id={id}
            type={type}
            placeholder={placeholder}
            autoComplete="true"
            />
            {children}
        </div>
      }
    </Fragment>
  )
}