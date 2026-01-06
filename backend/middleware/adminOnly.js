

const adminOnly = async (req, res, next) =>{
    if(req.userRole !== "admin"){
        return res.status(403).json({
            success: false,
            message:"Succes dinay onlyb admin cal log in"
        })
    }
    next()
}

export default adminOnly;