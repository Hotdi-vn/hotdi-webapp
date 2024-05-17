import localFont from "next/font/local";

const beVietnamPro = localFont({
    src: [
        { path: './BeVietnamPro-Thin.ttf', weight: '100', style: 'normal' },
        { path: './BeVietnamPro-ThinItalic.ttf', weight: '100', style: 'italic' },
        { path: './BeVietnamPro-ExtraLight.ttf', weight: '200', style: 'normal' },
        { path: './BeVietnamPro-ExtraLightItalic.ttf', weight: '200', style: 'italic' },
        { path: './BeVietnamPro-Light.ttf', weight: '300', style: 'normal' },
        { path: './BeVietnamPro-LightItalic.ttf', weight: '300', style: 'italic' },
        { path: './BeVietnamPro-Regular.ttf', weight: '400', style: 'normal' },
        { path: './BeVietnamPro-Italic.ttf', weight: '400', style: 'italic' },
        { path: './BeVietnamPro-Medium.ttf', weight: '500', style: 'normal' },
        { path: './BeVietnamPro-MediumItalic.ttf', weight: '500', style: 'italic' },
        { path: './BeVietnamPro-SemiBold.ttf', weight: '600', style: 'normal' },
        { path: './BeVietnamPro-SemiBoldItalic.ttf', weight: '600', style: 'italic' },
        { path: './BeVietnamPro-Bold.ttf', weight: '700', style: 'normal' },
        { path: './BeVietnamPro-BoldItalic.ttf', weight: '700', style: 'italic' },
        { path: './BeVietnamPro-ExtraBold.ttf', weight: '800', style: 'normal' },
        { path: './BeVietnamPro-ExtraBoldItalic.ttf', weight: '800', style: 'italic' },
        { path: './BeVietnamPro-Black.ttf', weight: '900', style: 'normal' },
        { path: './BeVietnamPro-BlackItalic.ttf', weight: '900', style: 'italic' }
    ],
    variable: '--font-be-vietnam-pro'
})

export { beVietnamPro }
