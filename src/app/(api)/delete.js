const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const main = async (num) => {
    await prisma.articleHistory.delete({
        where: {
            article_id: num,
        },
    });
}

main(1).catch(console.error)
main(2).catch(console.error)