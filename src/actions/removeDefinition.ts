'use server'

import prisma from "@/actions/db";

const removeDefinition = async (definitionId: number) => {
    await prisma.definitions.delete({
        where: {
            definition_id: definitionId
        }
    })
}

export default removeDefinition