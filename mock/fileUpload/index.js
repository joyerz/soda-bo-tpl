const Koa = require('koa')
const koaBody = require('koa-body')
const Router = require('koa-router')
const fs = require('fs')
const path = require('path')
const bodyParser = require('koa-bodyparser')
// const staticServices = require('koa-static-router');
const staticServices = require('koa-static')

const app = new Koa()
const router = new Router()
// 配置静态资源
const staticPath = './uploads/'
const p = path.join( __dirname, staticPath)
app.use(staticServices(p))

app.use(bodyParser())

app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 200 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
  },
}))

router.get('/', (ctx, next) => {
  // ctx.router available
  ctx.body = `
    <form action="http://localhost:3200/uploadFile" method="post" enctype="multipart/form-data">
    <input type="file" name="file" id="file" value="" multiple="multiple" />
    <input type="submit" value="提交"/>
</form>
  `
  next()
})

router.post('/uploadFile', async (ctx, next) => {
  // 上传单个文件
  const file = ctx.request.files.file // 获取上传文件
  let url = ''
  if(file && file.size > 0) {
    // 创建可读流
    const reader = fs.createReadStream(file.path)
    let filePath = path.join(__dirname, '/uploads/') + `${file.name}`
    // 创建可写流
    const upStream = fs.createWriteStream(filePath)
    // 可读流通过管道写入可写流
    reader.pipe(upStream)
    url = 'http://localhost:3200/' + file.name
  }
  return ctx.body = {
    // msg: url.length > 0 ? 'success' : 'fail',
    name: file.name,
    status: 'done',
    url,
    thumbUrl: url,
  }
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3200)
