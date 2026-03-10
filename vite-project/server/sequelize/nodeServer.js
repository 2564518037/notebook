import Note from "./noteModel.js";
import { Op } from "sequelize";

export async function getAllNotes() {
    return await Note.findAll();
}
export async function searchNotes(title) {
    return await Note.findAll({
        where:{
            [Op.or]:[{
                title: {
                    [Op.like]: `%${title}%`
                },
                content: {
                    [Op.like]: `%${title}%`
                }
            }]
        }
    });
}


export async function createNote(title, content) {
    return await Note.create({
        title,
        content
    });
}
export async function deleteNote(id) {
    return await Note.destroy({
        where: {
            id
        }
    });
}
