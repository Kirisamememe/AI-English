'use server'

import prisma from "@/actions/db";

const createDefinition = async (meaningId: number, definition: string = "Input a definition", example?: string) => {

    return prisma.definitions.create({
        data: {
            meaning_id: meaningId,
            definition: definition,
            example: example,
            order: null,
            created_at: new Date(),
        }
    })
}

export default createDefinition