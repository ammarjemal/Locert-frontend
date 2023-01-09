export default function Select({
    onChange,
    onBlur,
    id,
    className,
    isInValid,
    children,
    defaultValue,
    placeholder
}){
  const classes = `bg-inherit border-gray-400 dark:bg-slate-800 dark:text-white/80 dark:border-slate-600 tracking-wide placeholder-gray-400 bg-white focus:ring disabled:opacity-40 disabled:cursor-not-allowed focus:border-emerald-500 focus:ring-emerald-500/20 border rounded-xl outline-none ring-none focus:ring px-2 sm:px-3 py-2.5 flex items-center justify-between my-5 rounded-xl appearance-none relative w-full placeholder-gray-400 text-gray-900 focus:outline-none focus:z-10 sm:text-sm ${className} ${isInValid && "border-rose-500"}`
  return(
    <select
        className={classes}
        onChange={onChange}
        onBlur={onBlur}
        id={id}
        defaultValue={defaultValue}
        placeholder={placeholder}
        >
        {children}
    </select>
  )
}