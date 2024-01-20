'use client'

import clsx from 'clsx'
import { useFormStatus } from 'react-dom'

export function SubmitButton({ className, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const { pending } = useFormStatus()

    return (
        <button type="submit" aria-disabled={pending} className={clsx('', className)} {...rest} />
    )
}