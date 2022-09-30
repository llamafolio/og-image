import { readFileSync } from 'fs';
import { marked } from 'marked';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';
import { CSSReset } from "./css-reset";

const twemoji = require('twemoji');
const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);

const antebasBold = readFileSync(`${__dirname}/../_fonts/Antebas-Bold.woff2`).toString('base64');
const interRegular = readFileSync(`${__dirname}/../_fonts/Inter-Regular.woff2`).toString('base64');
const interBold = readFileSync(`${__dirname}/../_fonts/Inter-Bold.woff2`).toString('base64');
const veraMono = readFileSync(`${__dirname}/../_fonts/Vera-Mono.woff2`).toString('base64');
const spaceGroteskMedium = readFileSync(`${__dirname}/../_fonts/SpaceGrotesk-Medium.woff2`).toString('base64');

function getCss(theme: string) {
    let background = 'white';
    let foreground = 'black';
    let radial = 'lightgray';

    if (theme === 'dark') {
        background = 'black';
        foreground = 'white';
        radial = 'dimgray';
    }

    return `
        @font-face {
            font-family: 'Antebas';
            font-style:  normal;
            font-weight: 700;
            src: url(data:font/woff2;charset=utf-8;base64,${antebasBold}) format('woff2');
        }

        @font-face {
            font-family: 'Inter';
            font-style:  normal;
            font-weight: 700;
            src: url(data:font/woff2;charset=utf-8;base64,${interBold}) format('woff2');
        }

        @font-face {
            font-family: 'Inter';
            font-style:  normal;
            font-weight: 400;
            src: url(data:font/woff2;charset=utf-8;base64,${interRegular}) format('woff2');
        }

        @font-face {
            font-family: 'Vera';
            font-style: normal;
            font-weight: 400;
            src: url(data:font/woff2;charset=utf-8;base64,${veraMono}) format("woff2");
        }

        @font-face {
            font-family: 'Space Grotesk';
            font-style: normal;
            font-weight: 500;
            src: url(data:font/woff2;charset=utf-8;base64,${spaceGroteskMedium}) format("woff2");
        }

        ${CSSReset}

        body {
            background: ${background};
            font-family: 'Space Grotesk', sans-serif;
            height: 100vh;
            margin: 0;
            width: 100%;
        }

        code {
            color: #D400FF;
            font-family: 'Vera';
            white-space: pre-wrap;
            letter-spacing: -5px;
        }

        code:before, code:after {
            content: '\`';
        }

        .container {
            background-image: url('https://llamafolio.com/static/images/og-image-service/card-bg.svg');
            background-position: center;
            background-repeat: no-repeat;
            height: 630px;
            position: relative;
            width: 1200px;
        }

        .header {
            padding-left: 49px;
            padding-top: 46px;
            width: 100%;
        }

        .logo {
            height: 65px;
            width: 350px;
        }

        .main {
            display: flex;
            background: #2F332C;
            border-top-right-radius: 16px;
            color: #FFF;
            flex-direction: column;
            height: 239px;
            padding-left: 49px;
            position: absolute;
            padding-top: 37px;
            top: 300px;
            width: 771px;
        }

        .content-title {
            font-family: 'Antebas', sans-serif;
            font-size: 32px;
            font-weight: 700;
            line-height: 18px;
            margin-top: 10px;
            opacity: 0.8;
        }

        .content-container {
            display: flex;
            align-items: center;
        }

        .content-value {
            font-family: 'Inter', sans-serif;
            font-size: 116px;
            font-weight: 700;
            margin-right: 12px;
        }

        .content-value-symbol {
            font-size: 87px;
            margin-right: 20px;
        }

        .content-value-container {
            display: flex;
            flex-direction: column;
            margin-top: 24px;
        }

        .content-value-change {
            font-family: 'Antebas', sans-serif;
            font-size: 18px;
            font-weight: 700;
            margin-left: 4px;
            opacity: 0.8;
        }

        .content-value-percent {
            color: #23E895;
            font-family: 'Inter', sans-serif;
            font-size: 43px;
            font-weight: 700;
        }

        .footer {
            display: flex;
            align-items: center;
            background: #2F332C;
            border-bottom-right-radius: 16px;
            color: #FFF;
            height: 77px;
            opacity: 0.9;
            position: absolute;
            padding-inline-start: 16px;
            padding-inline-end: 16px;
            top: 542.45px;
            width: 771px;
        }

        .footer-icon {
            height: 18px;
            margin-bottom: 25px;
            margin-right: 16px;
            width: 18px;
        }

        .footer-description {
            font-size: 19px;
            font-weight: 500;
            line-height: 24px;
        }
    `;
}

export function getHtml(parsedReq: ParsedRequest) {
    const { text, theme, md, images, widths, heights } = parsedReq;

    return `
        <!DOCTYPE html>
        <html>
            <meta charset="utf-8">
            <title>Generated Image</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
                ${getCss(theme)}
            </style>
            <body>
                <div class="container">
                    <div class="header">
                        <img src="https://llamafolio.com/static/images/og-image-service/llamafolio-logo.svg" class="logo">
                    </div>

                    <div class="main">
                        <p class="content-title">Wallet Balance</p>

                        <div class="content-container">
                            <p class="content-value">
                                <span class="content-value-symbol">$</span>5.65b
                            </p>

                            <div class="content-value-container">
                                <p class="content-value-change">24 hour change</p>
                                <p class="content-value-percent">+ 1.65%</p>
                            </div>
                        </div>
                    </div>

                    <div class="footer">
                        <img src="https://llamafolio.com/static/images/og-image-service/info-icon.svg" class="footer-icon">
                        <p class="footer-description">LlamaFolio is committed to transparency &amp; proving accurate data without advertisements or sponsored content. Learn more at: llamafolio.com</p>
                    </div>
                </div>
            </body>
        </html>
    `;
}

// function getImage(src: string, width ='auto', height = '225') {
//     return `<img
//         class="logo"
//         alt="Generated Image"
//         src="${sanitizeHtml(src)}"
//         width="${sanitizeHtml(width)}"
//         height="${sanitizeHtml(height)}"
//     />`
// }

// function getPlusSign(i: number) {
//     return i === 0 ? '' : '<div class="plus">+</div>';
// }
