import clsx from "clsx";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({ className, ...rest}: Props) => {
    return <button className={clsx('', className)} {...rest}/>
}