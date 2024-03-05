import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import Application from '@ioc:Adonis/Core/Application'
import { v4 as uuidv4 } from 'uuid'

export default class PostsController {
  private validationOptions = {
    types: ['image'],
    size: '5mb'
  }

  public async store({ request, response }: HttpContextContract) {
    const body = request.body()

    const post = await Post.create(body)

    const image = request.file('image', this.validationOptions)

    if (image) {
      const imageName = `${uuidv4()}.${image.extname}`

      await image.move(Application.tmpPath('uploads'), {
        name: imageName
      })

      body.image = imageName
    }

    response.status(201)

    return {
      message: "Post criado!",
      data: post
    }
  }

  public async index() {

    const posts = await Post.query().preload('comment')

    return {
      data: posts,
    }

  }

  public async show({ params }: HttpContextContract) {

    const posts = await Post.findOrFail(params.id)

    return {
      data: posts
    }
  }

  public async destroy({ params }: HttpContextContract) {
    const posts = await Post.findOrFail(params.id)

    await posts.delete

    return {
      message: "Post Excluído!",
      data: posts
    }
  }

  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const posts = await Post.findOrFail(params.id)

    posts.title = body.title
    posts.description = body.description

    if (posts.image = body.image || !posts.image) {
      const image = request.file('image', this.validationOptions)

      if (image) {
        const imageName = `${uuidv4()}.${image.extname}`

        await image.move(Application.tmpPath('uploads'), {
          name: imageName
        })

        posts.image = imageName
      }
    }
    await posts.save()

    return{
      message:"Post atualizado!",
      data: posts
    }

  }

}
