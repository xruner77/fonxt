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
    `chown -R www:www ${CONFIG.remoteDir}/assets ${CONFIG.remoteDir}/case ${CONFIG.remoteDir}/downloads ${CONFIG.remoteDir}/api ${CONFIG.remoteDir}/go ${CONFIG.remoteDir}/*.html ${CONFIG.remoteDir}/*.png ${CONFIG.remoteDir}/*.txt ${CONFIG.remoteDir}/*.xml 2>/dev/null || true`,
    `chmod -R 755 ${CONFIG.remoteDir}/assets ${CONFIG.remoteDir}/case ${CONFIG.remoteDir}/downloads ${CONFIG.remoteDir}/api ${CONFIG.remoteDir}/go ${CONFIG.remoteDir}/*.html ${CONFIG.remoteDir}/*.png ${CONFIG.remoteDir}/*.txt ${CONFIG.remoteDir}/*.xml 2>/dev/null || true`,
  ].join(' && ');

  const sshCmd = `ssh -n -T -p ${CONFIG.port} -i "${CONFIG.keyPath}" -o StrictHostKeyChecking=no -o ConnectTimeout=15 ${CONFIG.user}@${CONFIG.host} "${remoteCmds}"`;
  run(sshCmd, 'Extracting and updating permissions on server');

  // 5. Clean up local archive
  if (fs.existsSync(archivePath)) {
    fs.unlinkSync(archivePath);
    console.log('🧹 Cleaned up local ' + CONFIG.archiveName);
  }

  // 6. Automated Smoke Testing Gate
  console.log('\n🔍 Running Post-Deployment Smoke Test Gate...');
  try {
    execSync('node scripts/smoke_test.js https://fonxt.com', { stdio: 'inherit' });
    console.log('\n🎉 Deployment and Smoke Test Gate successfully PASSED! All standalone pages and APIs are live at https://fonxt.com');
  } catch (err) {
    console.warn('\n⚠️ Smoke test detected issues. Please check the report above.');
    throw err;
  }
}

deploy().catch((err) => {
  console.error('\n💥 Deployment failed:', err);
  process.exit(1);
});
