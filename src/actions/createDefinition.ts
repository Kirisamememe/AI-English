'use server'

import prisma from "@/actions/db";

const createDefinition = async (meaningId: number, definition: string = "Input a definition", example?: string) => {
    const maxOrder = await prisma.definitions.aggregate({
        _max: {
            order: true,
        },
        where: {
            meaning_id: meaningId,
        },
    });

    const newOrder = (maxOrder._max.order || 0) + 1;

    return prisma.definitions.create({
        data: {
            meaning_id: meaningId,
            definition: definition,
            example: example,
            order: newOrder,
            created_at: new Date(),
        }
    })
}

export default createDefinition