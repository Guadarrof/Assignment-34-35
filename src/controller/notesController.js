import {ToDo} from "../models/toDo.js"

export const createNote = async(req, res)=>{
    const {body} = req;
    try {
       const note= await ToDo.create({...body})
       res.json({
        ok:true,
        note, 
        msg:"Nota creada correctamente"
    })
    } catch (error) {
        res.status(500)
            .json({
                ok:false,
                msg:"Ha habido un error en el servidor"
            })
    }
}

export const listNotes = async (req, res) => {
    try {
        const foundNotes = await ToDo
                                    .find({deletedAt: { $in: [null, undefined]}})
                                    .select('-__v -deletedAt -createdAt -updatedAt')

        if (!foundNotes) {
            return res.status(404)
                .json({
                    ok: false,
                    msg: "No se han encontrado notas"
                })
        }

        res.json({
            ok: true,
            foundNotes
        })
        
    } catch (error) {
        res.status(500)
            .json({
                ok:false,
                msg:"Ha habido un error en el servidor"
            })
    }
}

export const readNote= async (req, res) =>{
    const { id } = req.params
    try {
        const foundNote = await ToDo.findOne({
            _id: id,
            deletedAt: { $in: [null, undefined]}
        })

        if (!foundNote) {
            return res.status(404)
                .json({
                    ok: false,
                    msg: "No se ha encontrado la nota"
                })
        }

        res.json({
            ok: true,
            foundNote,
        })

    } catch (error) {
        console.log(error)
        res.status(500)
            .json({
                ok: false,
                msg: "Ha habido un error en el servidor."
            })
    }
}

export const editNote= async (req, res) => {    
    const { id } = req.params
    try {
        const foundNote = await ToDo.findOne({
            _id: id,
            deletedAt: { $in: [null, undefined]}
        })

        if (!foundNote) {
            return res.status(404)
                .json({
                    ok: false,
                    msg: "No se ha encontrado la nota"
                })
        }

        const newNote = await ToDo.findByIdAndUpdate(id, req.body, { new: true })

        res.json({
            ok: true,
            note: newNote,
            msg: "La nota ha sido actualizada correctamente"
        })

    } catch (error) {
        console.log(error)
        res.status(500)
            .json({
                ok: false,
                msg: "Ha habido un error en el servidor."
            })
    }
}

export const deleteNote = async (req, res) => {
    const { id } = req.params

    try {
        const foundNote = await ToDo.findOne({
            _id: id,
            deletedAt: { $in: [null, undefined]}
        })

        if (!foundNote) {
            return res.status(404)
                .json({
                    ok: false,
                    msg: "No se ha encontrado la nota"
                })
        }

        await ToDo.findByIdAndUpdate(id, {deletedAt: new Date()}, { new: true })

        res.json({
            ok: true,
            msg: "La nota se elimino correctamente"
        })

    } catch (error) {
        console.log(error)
        res.status(500)
            .json({
                ok: false,
                msg: "Ha habido un error en el servidor."
            })
    }
}