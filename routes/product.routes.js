const Router = require("express")
const router = new Router()
const ProductController = require('../contoller/product.controller')

const multer = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // '/files' это директория в которую будут сохранятся файлы 
    cb(null, 'files/')
  },
  filename: (req, file, cb) => {
    // Возьмем оригинальное название файла, и под этим же названием сохраним его на сервере
    const { originalname } = file
    
    let expansion = originalname.split('.')[1]
    cb(null, 'product'+req.params.id+'.png')
  }
})

const upload = multer({ storage: storage })

router.post('/product', ProductController.createProduct)
router.post('/product/image/:id',  upload.single('file') ,ProductController.updateImage)
router.put('/product', ProductController.updateProduct)
router.get('/product', ProductController.getProducts)
router.delete('/product', ProductController.deleteProduct)


module.exports = router