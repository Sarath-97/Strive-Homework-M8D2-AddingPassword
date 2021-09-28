import mongoose from "mongoose"
import bcrypt from "bcrypt"


const { Schema, model } = mongoose

const AuthorSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
)

AuthorSchema.pre("save", async function (next) {
  const newAuthor = this
  const plainPW = newAuthor.password

  if(newAuthor.isModified("password")) {
    newAuthor.password = await bcrypt.hash(plainPW,10)
  }
  next()
})

AuthorSchema.methods.toJSON = function () {

  const authorDocument = this

  const authorObject = authorDocument.toObject()
  
  delete authorObject.password

  // delete authorObject.__v
}

AuthorSchema.statics.checkCredentials = async function (email, plainPW) {
  const author = await this.findOne({email})

  if(user){
    const isMatch  = await bcrypt.compare(plainPW, author.password)

    if(isMatch) return author
    else return null
  } else{
    return null
  }
}

export default model("Author", AuthorSchema)
