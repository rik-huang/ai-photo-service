const aiJobService = require('./aiJobService');
const aiProviderService = require('./aiProviderService');
const pool = require('./db');

// 伪代码：AI任务自动执行worker
async function runPendingJobs() {
  // 查询所有pending的AI任务
  const [jobs] = await pool.query("SELECT * FROM ai_jobs WHERE status='pending'");
  for (const job of jobs) {
    try {
      await aiJobService.updateJobStatus(job.id, { status: 'processing' });
      let aiResult;
      if (job.type === 'img2text') {
        aiResult = await aiProviderService.callImg2Text(JSON.parse(job.input));
        await aiJobService.updateJobStatus(job.id, { status: 'success', result: JSON.stringify(aiResult) });
        // 自动入队text2img任务（每个场景生成一条）
        if (aiResult && aiResult.data && aiResult.data.scenes) {
          for (const scene of aiResult.data.scenes) {
            // 获取模特画像（可根据业务调整）
            const [taskRows] = await pool.query('SELECT * FROM tasks WHERE id=?', [job.task_id]);
            const task = taskRows[0];
            const [tplRows] = await pool.query("SELECT * FROM templates WHERE brand_id=? LIMIT 1", [task.brand_id]);
            const portrait = tplRows[0]?.portrait_text || '';
            const text = `${portrait} ${scene.desc}`;
            await aiJobService.createJob({
              task_id: job.task_id,
              type: 'text2img',
              input: JSON.stringify({ text })
            });
          }
        }
      } else if (job.type === 'text2img') {
        aiResult = await aiProviderService.callText2Img(JSON.parse(job.input));
        await aiJobService.updateJobStatus(job.id, { status: 'success', result: JSON.stringify(aiResult) });
        // 预留：人工筛选图片后再入队clothes_swap任务
      } else if (job.type === 'clothes_swap') {
        aiResult = await aiProviderService.callClothesSwap(JSON.parse(job.input));
        await aiJobService.updateJobStatus(job.id, { status: 'success', result: JSON.stringify(aiResult) });
        // 自动更新主任务状态为ai_clothes
        await pool.query("UPDATE tasks SET status='ai_clothes' WHERE id=?", [job.task_id]);
      }
    } catch (err) {
      await aiJobService.updateJobStatus(job.id, { status: 'failed', error_msg: err.message });
    }
  }
}

// 可用setInterval定时调用
setInterval(runPendingJobs, 10000); // 每10秒扫描一次

// 导出以便手动触发
module.exports = { runPendingJobs }; 