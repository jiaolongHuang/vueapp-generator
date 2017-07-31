#!/usr/bin/env node

'use strict';

const __root = process.cwd()
const exec = require('child_process').exec
const fs = require('fs')
const path = require('path')
const program = require('commander')
const mkdirp = require('mkdirp')
const download = require('download-git-repo')

program
  .version('1.0.0')
  .usage('[options] <file ...>')
  .option('-i, --init [value]', '输入项目名，进行初始化')
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
      download('jiaolongHuang/vueapp-tpl', projPath, function(err) {
        console.log(err ? err : '项目创建成功~~');
        // 创建成功以后，进入项目目录
        try {
          exec('pwd', function(){
            cwd:  projPath
          }, function(err, stdout, stderr){
            if(err){
               console.log(err);
            }else{
              console.log('进入项目目录');
            }
          });
        }
        catch (err) {
          console.log(err);
        }

      });
    }else {
      console.warn(name + ' 项目已经存在，请使用别的名字');
    }
  }
}

initProj(program.init);
