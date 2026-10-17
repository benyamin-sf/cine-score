function Box({
  className,
  children,
}: Readonly<{ className: string[]; children: React.ReactNode }>) {
  return <div className={`box ${className.join(' ')}`}>{children}</div>
}

export default Box
