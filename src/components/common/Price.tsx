export default function Price({ price = 0, locales = 'vi-VN', currency = 'VND' }: { price?: number, locales?: string, currency?: string }) {
    return (
        <div className='text-base font-semibold text-[#3A6F05]'>
            {Intl.NumberFormat(locales, { style: "currency", currency: currency }).format(price)}
        </div>
    );
}