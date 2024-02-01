// using approach of promises and then

const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler).catch((err) => next(err))
    }
}

export { asyncHandler }


// const asyncHandler=(func)=>{}  //basic     //asyncHandler is a higher order function(that function that can be used as a paarmeter or return)
// const asyncHandler=(func)=>()=>{}   //highe order i.e, callback ke andar callback
// const asyncHandler=(func)=>{async()=>{} }
//             //or
// const asyncHandler=(func)=>async()=>{}


// using approach of try and catch

// const asyncHandler = (func) => async (req, res, next) => {
//     try {
//         await func(req,res,next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })           //read node js api error
//     }
// }   