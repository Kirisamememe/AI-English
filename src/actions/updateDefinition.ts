'use server'

import prisma from "@/actions/db";

const updateDefinition = async (datatype: 1 | 2, definitionId: number, data: string) => {
    try {
        return await prisma.definitions.update({
            where: {
                definition_id: definitionId
            },
            data: {
                [datatype === 1 ? "definition" : "example"]: data
            }
        })
    }catch (error){
        throw error
    }
}

export default updateDefinition