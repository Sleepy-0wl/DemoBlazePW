import {PlaywrightTestConfig} from '@playwright/test';

const config: PlaywrightTestConfig = {
    timeout: 60000,
    retries: 0,
    testDir: 'tests',
    use: {
        headless: true,
        viewport: {width: 1280, height: 720},
        actionTimeout: 10000,
        ignoreHTTPSErrors: true,
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
    },
    projects: [
        { name: 'setup', 
        testDir: './',
        testMatch: 'auth.setup.ts',
        },
        {
            name: 'Chromium',
            use: {
                browserName: 'chromium',
                storageState: 'playwright/.auth/user.json'    
            },
            dependencies: ['setup'],
        },
        {
            name: 'LogInSignIn',
            testDir: 'tests/signInAndLogIn',
            use: {
                browserName: 'chromium',    
            },
        },
        {
            name: 'Functionality',
            testDir: 'tests/functionality',
            use: {
                browserName: 'chromium',
                storageState: 'playwright/.auth/user.json'    
            },
            dependencies: ['setup'],
        },
    ]
}

export default config;