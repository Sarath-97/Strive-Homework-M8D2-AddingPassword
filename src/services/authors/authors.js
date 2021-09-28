
import express from "express"
import q2m from "query-to-mongo"

import AuthorModel from "./authorSchema.js"

const authorRouter = express.Router()

authorRouter.post("/", async (req, res, next) => {
  try {
    const newAuthor = new AuthorModel(req.body) // here happens validation of the req.body, if it's not ok mongoose will throw a "ValidationError"
    const { _id } = await newAuthor.save()

    res.status(201).send({ _id })
  } catch (error) {
    next(error)
  }
})
authorRouter.get("/", async (req, res, next) => {
  try {
    const query = q2m(req.query)

    console.log(query)
    
    const total = await AuthorModel.countDocuments(query.criteria)
    const authors = await AuthorModel.find(query.criteria, query.options.fields)
      .limit(query.options.limit)
      .skip(query.options.skip)
      .sort(query.options.sort) // no matter how I write them, mongo is going to apply  ALWAYS sort skip limit in this order

    res.send({ links: query.links("/authors", total), total, authors, pageTotal: Math.ceil(total / query.options.limit) })
  } catch (error) {
    next(error)
  }
})


authorRouter.put("/:blogId", async(req,res,next) => {
    try {
      const authorId = req.params.authorId
  
      const modifiedauthor = await AuthorModel.findByIdAndUpdate(authorId, req.body, {
        new: true // returns the modified blog
      })
  
      if(modifiedauthor){
        res.send(modifiedauthor)
      } else {
        next(createError(404, `blog with id ${authorId} not found!`))
      }
    } catch (error) {
      next(error)
    }
  })

authorRouter.delete("/:authorId", async(req,res,next) => {
    try {
      const authorId = req.params.authorId
  
      const deletedauthor = await AuthorModel.findByIdAndDelete(authorId)
  
      if(deletedauthor){
        res.status(204).send()
      } else {
        next(createError(404, `blog with id ${authorId} not found!`))
      }
    } catch (error) {
      next(error)
    }
  })

export default authorRouter

