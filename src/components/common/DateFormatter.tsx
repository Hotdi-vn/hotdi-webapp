export default function DateFormatter({ date, locales = 'vi', format = {
    year: "numeric",
    month: "short",
    day: "numeric"
} }: {
    date: Date, locales?: string, format?: {
        year: "numeric" | "2-digit",
        month: "numeric" | "2-digit" | "long" | "short" | "narrow",
        day: "numeric" | "2-digit"
    }
}) {

    return (
        <div className="text-gray-500/75 text-xs">
            {Intl.DateTimeFormat(locales, format).format(date)}
        </div>
    );
}
