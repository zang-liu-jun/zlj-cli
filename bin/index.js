#!/usr/bin/env node

import download from 'download-git-repo'; //下载仓库
import commander from 'commander'; //命令行参数解析
import ora from 'ora';	//loading动画，最新版本不支持cjs
import inquirer from "inquirer";//与用户交互
import chalk from 'chalk';

commander.command('create <project>')
  .action(project => {
    inquirer
      .prompt([
        {
          type: 'rawlist',
          name: 'projectType',
          message: '请选择项目类型',
          choices: ['Vue3.2+Vite+TS模板', 'react']
        }
      ])
      .then((answers) => {
        if (answers.projectType === "Vue3.2+Vite+TS模板") {
          const spinner = ora('Downloading...').start();
          download("direct:" + "https://gitee.com/Zliuj/vite-vue3-template.git", project, { clone: true }, (err) => {
            spinner.stop();
            console.log(chalk.rgb(162, 254, 157).bold('Created successfully!'));
            console.log(chalk.rgb(119,243,252).bold(`cd ${project}\nnpm install\nnpm run dev`));
          });
        } else {
          console.log(chalk.red("暂时还没有模板，敬请期待！"));
        }
      })
      .catch((error) => {
        console.log(chalk.red(error));
      });
  });

commander.parse(process.argv)

