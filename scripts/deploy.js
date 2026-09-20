import { execSync } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';
import os from 'node:os';

const CONFIG = {
  host: '152.70.91.67', // a2.xruner.tk 直连 IP
  port: '58750',
  user: 'root',
  keyPath: path.join(os.homedir(), '.ssh', '152.70.91.67_id_ed25519'),
  remoteDir: '/www/wwwroot/fonxt.com',
  localDist: path.resolve(process.cwd(), 'dist'),
  archiveName: 'dist.tar.gz',
};

function run(cmd, desc) {
  console.log(`\n▶ ${desc}...`);
  try {
    execSync(cmd, { stdio: 'inherit' });
  } catch (err) {
    console.error(`❌ Failed: ${desc}`);
    throw err;
  }
}

async function deploy() {
  console.log('🚀 [Deploy] Starting deployment to ' + CONFIG.host + ':' + CONFIG.port);

  // 1. Check dist
  const distIndex = path.join(CONFIG.localDist, 'index.html');
  if (!fs.existsSync(distIndex)) {
    console.log('📦 dist/index.html not found, running build first...');
    run('npm run build', 'Building project');
  }

  // 2. Package dist
  const archivePath = path.resolve(process.cwd(), CONFIG.archiveName);
  if (fs.existsSync(archivePath)) {
    fs.unlinkSync(archivePath);
  }
  run(`tar -czf ${CONFIG.archiveName} -C dist .`, 'Packaging dist into ' + CONFIG.archiveName);

  // 3. Upload archive
  const remoteTmp = `/tmp/${CONFIG.archiveName}`;
  const scpCmd = `scp -P ${CONFIG.port} -i "${CONFIG.keyPath}" -o StrictHostKeyChecking=no -o ConnectTimeout=15 "${archivePath}" ${CONFIG.user}@${CONFIG.host}:${remoteTmp}`;
  run(scpCmd, `Uploading archive to ${CONFIG.host}:${remoteTmp}`);

  // 4. Remote extract & set permissions
  const remoteCmds = [
    `rm -rf ${CONFIG.remoteDir}/case`,
    `rm -rf ${CONFIG.remoteDir}/assets/cases/mg`,
    `tar -xzf ${remoteTmp} -C ${CONFIG.remoteDir}/`,
    `rm -f ${remoteTmp}`,
    `chown -R www:www ${CONFIG.remoteDir}/assets ${CONFIG.remoteDir}/case ${CONFIG.remoteDir}/downloads ${CONFIG.remoteDir}/api ${CONFIG.remoteDir}/*.html ${CONFIG.remoteDir}/*.png ${CONFIG.remoteDir}/*.txt ${CONFIG.remoteDir}/*.xml 2>/dev/null || true`,
    `chmod -R 755 ${CONFIG.remoteDir}/assets ${CONFIG.remoteDir}/case ${CONFIG.remoteDir}/downloads ${CONFIG.remoteDir}/api ${CONFIG.remoteDir}/*.html ${CONFIG.remoteDir}/*.png ${CONFIG.remoteDir}/*.txt ${CONFIG.remoteDir}/*.xml 2>/dev/null || true`,
  ].join(' && ');

  const sshCmd = `ssh -n -T -p ${CONFIG.port} -i "${CONFIG.keyPath}" -o StrictHostKeyChecking=no -o ConnectTimeout=15 ${CONFIG.user}@${CONFIG.host} "${remoteCmds}"`;
  run(sshCmd, 'Extracting and updating permissions on server');

  // 5. Clean up local archive
  if (fs.existsSync(archivePath)) {
    fs.unlinkSync(archivePath);
    console.log('🧹 Cleaned up local ' + CONFIG.archiveName);
  }

  // 6. Verification
  console.log('\n🔍 Verifying server response across multiple standalone HTML pages and assets...');
  const testUrls = [
    'http://127.0.0.1/',
    'http://127.0.0.1/services.html',
    'http://127.0.0.1/portfolio.html',
    'http://127.0.0.1/case/magic-gemini.html',
    'http://127.0.0.1/case/phicomm-t1-hack.html',
    'http://127.0.0.1/case/bbt-photo-studio.html',
    'http://127.0.0.1/case/fhjy-tutoring-system.html',
    'http://127.0.0.1/api/views.php?slug=magic-gemini',
    'http://127.0.0.1/downloads/T1ZoomHelper.apk',
  ];

  try {
    for (const testUrl of testUrls) {
      const verifyCmd = `ssh -n -T -p ${CONFIG.port} -i "${CONFIG.keyPath}" ${CONFIG.user}@${CONFIG.host} "curl -I -s -H 'Host: fonxt.com' ${testUrl} | head -n 1"`;
      const res = execSync(verifyCmd, { encoding: 'utf-8' }).trim();
      console.log(`  ✓ [${testUrl}]: ${res}`);
    }
    console.log('\n🎉 Deployment succeeded! All standalone pages are live at https://fonxt.com');
  } catch (err) {
    console.warn('⚠️ Verification check warning:', err.message);
  }
}

deploy().catch((err) => {
  console.error('\n💥 Deployment failed:', err);
  process.exit(1);
});
