#!/usr/bin/env node

'use strict';

const __root = process.cwd()
const fs = require('fs')
const path = require('path')
const program = require('commander')
const download = require('download-git-repo')
const appInfo = require('./package.json')

program
  .version(appInfo.version)
  .usage('[options] <file ...>')
  .option('-i, --init [name]', '输入项目名, 进行初始化, 缺省则在当前目录下创建')
  .parse(process.argv);

function initProj(name) {

  if(name === undefined){
    return;
  }else{
    let tip, projPath
    if(name === true){

      tip = "准备在当前目录下初始化项目"
      projPath = path.resolve(__root)
    }else{

      tip = `准备创建项目:${name}`
      projPath = path.resolve(__root, name)
    }
    console.log(tip)
    console.log(`项目路径：${projPath}`)

    if(name === true || !fs.existsSync(projPath)){
      console.log("正在创建项目中...")

      download('jiaolongHuang/vueapp-tpl', projPath, function(err) {

        console.log(err ? err : '项目创建成功~~');
      });
    }else {
      console.warn(name + ' 项目已经存在，请使用别的名字');
    }
  }
}

initProj(program.init);
