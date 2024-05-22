// import { exec } from 'child_process'

var defaultCollection = "users"
var defaultModel = MODELS[defaultCollection].model

const postClientUser = async (data, otherData) => {
    // console.log(otherData)
    

    var newuser  = {
        _id : data.userId,
        phone : otherData.phone,
        phonenumber:otherData.phone,
        firstName : otherData.firstName,
        lastName : otherData.lastName,
        email : otherData.email,
        name : otherData.name,
        status : "active",
        role : data.role ? data.role : "user"
    }


    // res
    // return user
    // var user = {
    //     userId : data.userId
    // }
    // var user = newuser;
    var user = await defaultModel.create(newuser)
    return user
    // var data = await defaultModel.create(req.body)
    // res.send(data)
}
export default postClientUser