const { exec } = require('child_process');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

console.log(colors.cyan + colors.bright + '🤖 Portfolio Website Test Suite' + colors.reset);
console.log(colors.blue + '=' + '='.repeat(50) + colors.reset);

// Check if development server is running
function checkDevServer() {
  return new Promise((resolve) => {
    const http = require('http');
    
    const options = {
      hostname: 'localhost',
      port: 5173,
      path: '/',
      method: 'GET',
      timeout: 3000
    };

    const req = http.request(options, (res) => {
      resolve(true);
    });

    req.on('error', () => {
      resolve(false);
    });

    req.on('timeout', () => {
      resolve(false);
    });

    req.end();
  });
}

// Start development server
function startDevServer() {
  return new Promise((resolve, reject) => {
    console.log(colors.yellow + '🚀 Starting development server...' + colors.reset);
    
    const devServer = exec('npm run dev', { cwd: path.join(__dirname, '../..') });
    
    devServer.stdout.on('data', (data) => {
      if (data.includes('Local:') || data.includes('localhost:5173')) {
        console.log(colors.green + '✅ Development server started successfully' + colors.reset);
        setTimeout(() => resolve(devServer), 2000); // Give server time to fully start
      }
    });

    devServer.stderr.on('data', (data) => {
      console.error(colors.red + 'Dev server error: ' + data + colors.reset);
    });

    devServer.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`Dev server exited with code ${code}`));
      }
    });

    // Timeout after 30 seconds
    setTimeout(() => {
      reject(new Error('Dev server start timeout'));
    }, 30000);
  });
}

// Run Selenium tests
function runSeleniumTests() {
  return new Promise((resolve, reject) => {
    console.log(colors.cyan + '🧪 Running Selenium tests...' + colors.reset);
    
    const testProcess = exec('npx mocha tests/selenium/portfolio-comprehensive.test.js --timeout 60000', {
      cwd: path.join(__dirname, '../..')
    });

    testProcess.stdout.on('data', (data) => {
      console.log(data);
    });

    testProcess.stderr.on('data', (data) => {
      console.error(colors.red + data + colors.reset);
    });

    testProcess.on('exit', (code) => {
      if (code === 0) {
        console.log(colors.green + colors.bright + '🎉 All tests passed!' + colors.reset);
        resolve();
      } else {
        console.log(colors.red + colors.bright + '❌ Some tests failed!' + colors.reset);
        reject(new Error(`Tests failed with code ${code}`));
      }
    });
  });
}

// Main test execution
async function runTests() {
  let devServer = null;
  
  try {
    // Check if dev server is already running
    const serverRunning = await checkDevServer();
    
    if (!serverRunning) {
      devServer = await startDevServer();
    } else {
      console.log(colors.green + '✅ Development server is already running' + colors.reset);
    }

    // Run the tests
    await runSeleniumTests();
    
  } catch (error) {
    console.error(colors.red + colors.bright + '❌ Test execution failed:' + colors.reset);
    console.error(colors.red + error.message + colors.reset);
    process.exit(1);
  } finally {
    // Clean up dev server if we started it
    if (devServer) {
      console.log(colors.yellow + '🛑 Stopping development server...' + colors.reset);
      devServer.kill('SIGTERM');
    }
  }
}

// Handle process termination
process.on('SIGINT', () => {
  console.log(colors.yellow + '\n🛑 Test execution interrupted' + colors.reset);
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log(colors.yellow + '\n🛑 Test execution terminated' + colors.reset);
  process.exit(0);
});

// Run the tests
if (require.main === module) {
  runTests();
}

module.exports = { runTests, checkDevServer };
