import express from 'express'
import path from 'path'
import fs from 'fs'

const app = express()

/**
 * PT Halo Komunikasi Sejahtera
 * Defining API routing for all controllers
 * WARNING: DON'T CHANGE THIS FILE, AND DON'T PUT THE ROUTER HERE
 * all routing will be dynamic
 * You should put your index.ts that contain list of router in your controller dir
 * if fall error middleware, you should double check index.ts
 */
fs.readdir(path.join(__dirname, './../core/'), (err, dir) => {
  dir.forEach(dir2 => {
    fs.readdir(path.join(__dirname, './../core/' + dir2), (err, controller) => {
      controller.forEach(file => {
        var routes = require(path.join(
          __dirname,
          '../..' + './../core/' + dir2
        ))
        app.use(routes)
      })
    })
  })
})

export default app
