const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const main = async (num) => {
    await prisma.words.delete({
        where: {
            word_id: num,
        },
    });
}

main(512).catch(console.error)
main(513).catch(console.error)
main(514).catch(console.error)