import { asyncHandler } from "../utils/asyncHandeler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResoponse.js";
const registerUser = asyncHandler(async (req, res) => {
    const { fullname, email, username, password } = req.body
    //exampal of simple check is empty or not
    // if (fullname === "") {
    //     throw new ApiError(400, "fullName required")
    // }

    // get user detatils from frontend
    //validation -not empty
    //Check if user already exists: username and email
    //check for image, check for avatar
    //upload them to cloudinay, avatar
    //create user object - create user db entry
    //remove password and refresh token field from response
    //check for user creation
    //return rs

    if (
        [fullname, username, email, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All field required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists.")
    }
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required.")
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required.")
    }
    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createUser = await User.findById(user._id).select("-password -refreshToken")
    if (!createUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createUser, "User registered successfully.")
    )
})
export { registerUser }