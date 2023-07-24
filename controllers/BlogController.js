import BlogModel from "../models/BlogModel.js";

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await BlogModel.findAll(); // Agregar await aquí
        res.json(blogs);
    } catch (error) {
        res.json({ message: error.message });
    }
};


export const getBlog = async (req, res) => {
    try {
        const blog = await BlogModel.findOne({
            where: { id: req.params.id }
        });
        
        if (blog) {
            res.json(blog);
        } else {
            res.json({ message: "Blog no encontrado" });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const createBlog = async (req, res) => {
    try{
        BlogModel.create(req.body)
        res.json({
            "message": "Registro creado correctamente!"
        })
    } catch(error){
        res.json( { message : error.message} )
    }
}

export const updateBlog = async (req, res) => {
    try {
        await BlogModel.update(req.body, {
            where: {id: req.params.id}
        })
        res.json({
            "message": "Registro actualizado correctamente!"
        })
    } catch (error) {
        res.json( { message : error.message} )
    }
}

export const deleteBlog = async (req, res) => {
    try {
        BlogModel.destroy({
            where: { id: req.params.id }
        })
        res.json({
            "message": "Registro eliminado correctamente!"
        })
    } catch (error) {
        res.json( { message : error.message} )
    }
}