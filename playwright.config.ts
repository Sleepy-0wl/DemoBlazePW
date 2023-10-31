import {PlaywrightTestConfig} from '@playwright/test';

const config: PlaywrightTestConfig = {
    timeout: 60000,
    retries: 0,
    testDir: 'tests',
    fullyParallel: true,
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
            testDir: './tests',
            testMatch: '*.spec.ts',
            use: {
                browserName: 'chromium',
                storageState: 'playwright/.auth/user.json'    
            },
            dependencies: ['setup'],
        },
        {
            name: 'LogInSignIn',
            testDir: 'tests/signInAndLogIn',
            testMatch: '*.spec.ts',
            use: {
                browserName: 'chromium',    
            },
        },
        {
            name: 'Functionality',
            testDir: 'tests/functionality',
            testMatch: '*.spec.ts',
            use: {
                browserName: 'chromium',
                storageState: 'playwright/.auth/user.json'    
            },
            dependencies: ['setup'],
        },
    ]
}

export default config;