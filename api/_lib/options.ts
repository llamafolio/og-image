import chrome from 'chrome-aws-lambda';

let exePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

if (process.platform === 'win32') {
    exePath = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
}

if (process.platform === 'linux') {
    if (process.env.BROWSER === 'chromium') {
        exePath = '/usr/bin/chromium-browser'
    } else {
        exePath = '/usr/bin/google-chrome'
    }
}

interface Options {
    args: string[];
    executablePath: string;
    headless: boolean;
}

export async function getOptions(isDev: boolean) {
    let options: Options;
    if (isDev) {
        options = {
            args: [],
            executablePath: exePath,
            headless: true
        };
    } else {
        options = {
            args: chrome.args,
            executablePath: await chrome.executablePath,
            headless: chrome.headless,
        };
    }
    return options;
}
