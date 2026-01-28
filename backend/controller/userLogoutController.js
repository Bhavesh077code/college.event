

export const logoutUser = async (_, res) => {
    try {
        return res.status(200).cookie("token", "").json({
            success: true,
            message: "Logout SuccessFully"
        })
    } catch (error) {
        console.log(error);
    }
}