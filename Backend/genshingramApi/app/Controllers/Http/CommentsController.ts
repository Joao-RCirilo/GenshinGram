import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comment from 'App/Models/Comment'
import Post from 'App/Models/Post'

export default class CommentsController {

  public async store({request, response, params}){
    const body = request.body()
    const postsId = params.postsId

    await Post.findOrFail(postsId)

    body.postsId = postsId

    const comment = await Comment.create(body)

    response.status(201)

    return{
      message: "comentário adicionado!",
      data: comment,
    }
  }

}
