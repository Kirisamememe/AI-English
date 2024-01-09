import { PrismaClient } from '@prisma/client';
const prismaClientSingleton = () => new PrismaClient({ datasources: {  db: { url: process.env.DATABASE_URL } } });

// グローバルスコープにprismaを宣言しますが、これはTypeScriptの型定義です
declare global {
    var prisma: PrismaClient | undefined;
}

// globalThisを使用してグローバル変数にアクセスし、
// prismaが未定義の場合は新しいPrismaClientインスタンスを割り当てます
const prisma = globalThis.prisma ?? prismaClientSingleton();

// 開発環境でのみグローバルなprismaインスタンスを再利用します
if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = prisma;
}

export default prisma;
