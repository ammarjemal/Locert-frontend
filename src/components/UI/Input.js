import { Fragment } from "react"
import styles from "./styles.module.css";
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
  const classes = `bg-inherit border-gray-400 dark:bg-slate-800 dark:text-white/80 dark:border-slate-600 tracking-wide placeholder-gray-400 bg-white focus:ring disabled:opacity-40 disabled:cursor-not-allowed focus:border-emerald-500 focus:ring-emerald-500/20 border rounded-xl outline-none ring-none focus:ring px-2 sm:px-3 py-2.5 flex items-center justify-between my-5 rounded-xl appearance-none relative w-full placeholder-gray-400 text-gray-900 focus:outline-none focus:z-10 sm:text-sm ${className} ${isInValid && "border-rose-500"}`
  // 
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
            className={classes+' '+styles.autofill}
            placeholder={placeholder}
          />
        </div>
      }
      {variant==="basic" &&
        <input
          className={`${classes} ${styles.autofill}`}
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
            className={`w-full outline-none bg-inherit ${styles.autofill}`}
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