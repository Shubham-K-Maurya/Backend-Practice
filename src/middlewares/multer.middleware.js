import multer from "multer";
// come from link :https://www.npmjs.com/package/multer -> and search disk storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)//avoiding this here
        cb(null, file.originalname)
    }
})

export const upload = multer({ 
    storage,
 })